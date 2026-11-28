import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeBeam } from './beamAnalysis.js';
import { BEAM_TEMPLATES, cloneModel } from './benchmarks.js';

const near = (actual, expected, tolerance = 1e-9) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`);
const result = (index) => analyzeBeam(cloneModel(BEAM_TEMPLATES[index].model));

test('centre point-load benchmark reactions, shear and moment', () => {
  const r = result(0); assert.equal(r.ok, true); near(r.reactions.A.verticalKN, 10); near(r.reactions.B.verticalKN, 10);
  near(r.shearAt(2), 10); near(r.shearAt(3, 'left'), 10); near(r.shearAt(3, 'right'), -10); near(r.extrema.momentMax.valueKNM, 30); near(r.extrema.momentMax.positionM, 3);
});
test('off-centre point load reactions and diagram ordinates', () => {
  const r = analyzeBeam({ spanM: 8, pointLoads: [{id:'P',positionM:2,magnitudeKN:12}], udlSegments: [] });
  near(r.reactions.A.verticalKN, 9); near(r.reactions.B.verticalKN, 3); near(r.momentAt(2), 18); near(r.momentAt(8), 0);
});
test('full-span UDL benchmark has correct reactions and exact sagging peak', () => {
  const r = result(1); near(r.reactions.A.verticalKN, 30); near(r.reactions.B.verticalKN, 30); near(r.extrema.momentMax.valueKNM, 45); near(r.extrema.momentMax.positionM, 3);
});
test('partial UDL plus multiple point loads gives independently derived results', () => {
  const r = result(2); near(r.reactions.A.verticalKN, 21); near(r.reactions.B.verticalKN, 15);
  near(r.shearAt(1), 21); near(r.shearAt(2,'left'), 17); near(r.shearAt(2,'right'), 5); near(r.shearAt(5,'right'), -7);
  near(r.momentAt(2), 40); near(r.momentAt(5), 37); near(r.extrema.momentMax.positionM, 3.25); near(r.extrema.momentMax.valueKNM, 43.125);
});
test('separate UDL segments superpose with independent resultants', () => {
  const r=analyzeBeam({spanM:10,pointLoads:[],udlSegments:[{id:'U1',startM:1,endM:4,magnitudeKNPerM:2},{id:'U2',startM:6,endM:9,magnitudeKNPerM:3}]});
  near(r.totalAppliedLoadKN,15);near(r.reactions.A.verticalKN,6.75);near(r.reactions.B.verticalKN,8.25);
  near(r.shearAt(5),0.75);near(r.momentAt(5),18.75);near(r.momentAt(10),0);
});
test('superposition and double-load scaling hold for reactions and moment', () => {
  const a = analyzeBeam({spanM:6,pointLoads:[{id:'P',positionM:2,magnitudeKN:9}],udlSegments:[]});
  const b = analyzeBeam({spanM:6,pointLoads:[],udlSegments:[{id:'U',startM:1,endM:4,magnitudeKNPerM:2}]});
  const combined = analyzeBeam({spanM:6,pointLoads:[{id:'P',positionM:2,magnitudeKN:9}],udlSegments:[{id:'U',startM:1,endM:4,magnitudeKNPerM:2}]});
  near(combined.reactions.A.verticalKN,a.reactions.A.verticalKN+b.reactions.A.verticalKN); near(combined.momentAt(3),a.momentAt(3)+b.momentAt(3));
  const doubled = analyzeBeam({spanM:6,pointLoads:[{id:'P',positionM:2,magnitudeKN:18}],udlSegments:[{id:'U',startM:1,endM:4,magnitudeKNPerM:4}]});
  near(doubled.reactions.A.verticalKN,2*combined.reactions.A.verticalKN); near(doubled.momentAt(3),2*combined.momentAt(3));
});
test('support point loads and endpoint loads retain equilibrium and zero end moments', () => {
  const r = analyzeBeam({spanM:5,pointLoads:[{id:'A-load',positionM:0,magnitudeKN:4},{id:'B-load',positionM:5,magnitudeKN:7}],udlSegments:[]});
  near(r.reactions.A.verticalKN,4); near(r.reactions.B.verticalKN,7); near(r.momentAt(0),0); near(r.momentAt(5),0);
});
test('zero loading returns zero response', () => {
  const r = analyzeBeam({spanM:3,pointLoads:[],udlSegments:[]}); near(r.reactions.A.verticalKN,0); near(r.extrema.momentMax.valueKNM,0); near(r.extrema.shearMin.valueKN,0);
});
test('beam rejects invalid span, external loads, UDL range, duplicate IDs and negative magnitude', () => {
  for (const model of [
    {spanM:0,pointLoads:[],udlSegments:[]},
    {spanM:3,pointLoads:[{id:'P',positionM:4,magnitudeKN:1}],udlSegments:[]},
    {spanM:3,pointLoads:[],udlSegments:[{id:'U',startM:2,endM:2,magnitudeKNPerM:1}]},
    {spanM:3,pointLoads:[{id:'X',positionM:1,magnitudeKN:1}],udlSegments:[{id:'X',startM:0,endM:1,magnitudeKNPerM:1}]},
    {spanM:3,pointLoads:[{id:'P',positionM:1,magnitudeKN:-1}],udlSegments:[]},
  ]) assert.equal(analyzeBeam(model).ok,false);
});
test('event-aware shear segments show true jumps while moment remains continuous', () => {
  const r=result(0); const jump=r.shearSegments.find((segment)=>segment.startM===3);
  near(jump.startShearKN,-10); near(r.shearAt(3,'left'),10); near(r.shearAt(3,'right'),-10); near(r.momentAt(3),30);
  near(r.momentAt(3-1e-8),r.momentAt(3+1e-8),1e-6);
});
test('global force and moment residuals are small', () => {
  for(const template of BEAM_TEMPLATES){const r=analyzeBeam(cloneModel(template.model));assert.ok(Math.abs(r.equilibrium.verticalResidualKN)<1e-10);assert.ok(Math.abs(r.equilibrium.momentResidualKNM)<1e-10);}
});
test('missing arrays and overflowing finite inputs fail safely', () => {
  assert.equal(analyzeBeam({spanM:6,pointLoads:[]}).ok,false);
  const extreme=analyzeBeam({spanM:6,pointLoads:[],udlSegments:[{id:'U',startM:0,endM:6,magnitudeKNPerM:1e308}]});
  assert.equal(extreme.ok,false);assert.match(extreme.errors.join(' '),/non-finite/i);
});
test('deterministic load-position cases preserve equilibrium and end-moment conditions', () => {
  for(let index=1;index<=8;index+=1){const span=4+index,position=span*index/10,load=3*index;const r=analyzeBeam({spanM:span,pointLoads:[{id:'P',positionM:position,magnitudeKN:load}],udlSegments:[]});assert.equal(r.ok,true);near(r.reactions.A.verticalKN+r.reactions.B.verticalKN,load);near(r.momentAt(0),0);near(r.momentAt(span),0);}
});
