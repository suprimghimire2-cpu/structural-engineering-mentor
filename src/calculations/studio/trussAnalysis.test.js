import { test } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeTruss, assembleTruss, solveLinearSystem } from './trussAnalysis.js';
import { TRUSS_TEMPLATES, cloneModel } from './benchmarks.js';

const near = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`);
const tri = () => analyzeTruss(cloneModel(TRUSS_TEMPLATES[0].model));

test('triangular benchmark reactions and member forces match independent joint equilibrium', () => {
  const r = tri(); assert.equal(r.ok,true);
  const reactions = Object.fromEntries(r.supportReactions.map((x)=>[x.nodeId,x]));
  near(reactions.A.fxKN,0); near(reactions.A.fyKN,15); near(reactions.B.fyKN,15);
  const forces=Object.fromEntries(r.members.map((x)=>[x.id,x.axialForceKN]));
  near(forces.AB,11.25); near(forces.AC,-18.75); near(forces.BC,-18.75);
  // At the apex, each compression member contributes 15 kN upward; horizontal components cancel.
  near(2*18.75*(4/5),30); near(18.75*(3/5)-18.75*(3/5),0);
});
test('triangular benchmark displacement and member stress use declared units', () => {
  const r=tri(); const displacements=Object.fromEntries(r.nodalDisplacements.map((x)=>[x.nodeId,x]));
  near(displacements.A.uxMM,0); near(displacements.A.uyMM,0); near(displacements.B.uyMM,0);
  near(displacements.B.uxMM,0.3375,1e-9); near(displacements.C.uxMM,0.16875,1e-9); near(displacements.C.uyMM,-0.7125,1e-9);
  const members=Object.fromEntries(r.members.map((x)=>[x.id,x]));
  near(members.AB.axialStressMPa,11.25); near(members.AB.elongationMM,0.3375); near(members.AB.axialStrain,0.0003375/6);
});
test('multi-panel determinate truss benchmark reactions and member forces', () => {
  const r=analyzeTruss(cloneModel(TRUSS_TEMPLATES[1].model)); assert.equal(r.ok,true);
  const reactions=Object.fromEntries(r.supportReactions.map((x)=>[x.nodeId,x])); near(reactions.A.fyKN,10); near(reactions.C.fyKN,10); near(reactions.A.fxKN,0);
  const n=Object.fromEntries(r.members.map((x)=>[x.id,x.axialForceKN]));
  near(n.AB,7.5); near(n.BC,7.5); near(n.AD,-12.5); near(n.EC,-12.5); near(n.DB,12.5); near(n.BE,12.5); near(n.DE,-15);
});
test('global stiffness assembly has expected axial-bar entries and is symmetric', () => {
  const model={nodes:[{id:'A',xM:0,yM:0},{id:'B',xM:6,yM:0}],members:[{id:'AB',startNode:'A',endNode:'B',elasticModulusGPa:200,areaMM2:1000}],supports:[{nodeId:'A',restrainX:true,restrainY:true},{nodeId:'B',restrainX:false,restrainY:true}],loads:[]};
  const a=assembleTruss(model); const k=a.globalK; near(k[0][0],200e6/6); near(k[0][2],-200e6/6); near(k[1][1],0);
  for(let i=0;i<k.length;i++)for(let j=0;j<k.length;j++)near(k[i][j],k[j][i]);
});
test('equilibrium, free residual and matrix symmetry verification are small', () => {
  for(const template of TRUSS_TEMPLATES.slice(0,2)){const r=analyzeTruss(cloneModel(template.model));assert.equal(r.ok,true);near(r.verification.globalEquilibriumResidual.sumFxKN,0,1e-8);near(r.verification.globalEquilibriumResidual.sumFyKN,0,1e-8);near(r.verification.globalEquilibriumResidual.sumMomentKNM,0,1e-8);assert.ok(r.verification.freeDofResidualKN<1e-8);assert.ok(r.verification.matrixSymmetryRelativeResidual<1e-14);}
});
test('zero loading gives zero displacements and member actions', () => {
  const model=cloneModel(TRUSS_TEMPLATES[0].model);model.loads=[];const r=analyzeTruss(model);assert.equal(r.ok,true);
  for(const n of r.nodalDisplacements){near(n.uxMM,0);near(n.uyMM,0)}for(const m of r.members){near(m.axialForceKN,0);near(m.axialStressMPa,0)}
});
test('double load scales displacements and member forces linearly', () => {
  const model=cloneModel(TRUSS_TEMPLATES[0].model), once=analyzeTruss(model);model.loads[0].fyKN*=2;const twice=analyzeTruss(model);
  for(let i=0;i<once.members.length;i++)near(twice.members[i].axialForceKN,2*once.members[i].axialForceKN);
  for(let i=0;i<once.nodalDisplacements.length;i++){near(twice.nodalDisplacements[i].uxMM,2*once.nodalDisplacements[i].uxMM);near(twice.nodalDisplacements[i].uyMM,2*once.nodalDisplacements[i].uyMM)}
});
test('deterministic mixed-load scale cases preserve linear response and equilibrium', () => {
  const unit=cloneModel(TRUSS_TEMPLATES[0].model);unit.loads[0].fxKN=4;const reference=analyzeTruss(unit);assert.equal(reference.ok,true);
  for(const factor of [0.25,0.5,1.5,3]){const model=cloneModel(unit);model.loads[0].fxKN*=factor;model.loads[0].fyKN*=factor;const result=analyzeTruss(model);assert.equal(result.ok,true);
    for(let i=0;i<result.members.length;i++)near(result.members[i].axialForceKN,factor*reference.members[i].axialForceKN,1e-7);
    for(let i=0;i<result.nodalDisplacements.length;i++){near(result.nodalDisplacements[i].uxMM,factor*reference.nodalDisplacements[i].uxMM,1e-7);near(result.nodalDisplacements[i].uyMM,factor*reference.nodalDisplacements[i].uyMM,1e-7);}
    near(result.verification.globalEquilibriumResidual.sumFxKN,0,1e-8);near(result.verification.globalEquilibriumResidual.sumFyKN,0,1e-8);}
});
test('under-restrained unstable benchmark is rejected with useful error', () => {
  const r=analyzeTruss(cloneModel(TRUSS_TEMPLATES[2].model));assert.equal(r.ok,false);assert.match(r.errors.join(' '),/singular|unstable|restraint/i);
});
test('truss rejects duplicate IDs, missing endpoints, zero length and invalid properties or loads', () => {
  const base=cloneModel(TRUSS_TEMPLATES[0].model);
  const cases=[];
  cases.push({...cloneModel(base),nodes:[...base.nodes,{...base.nodes[0]}]});
  cases.push({...cloneModel(base),members:[...base.members,{...base.members[0]}]});
  cases.push({...cloneModel(base),members:[{...base.members[0],endNode:'missing'},...base.members.slice(1)]});
  cases.push({...cloneModel(base),nodes:[...base.nodes,{id:'Z',xM:0,yM:0}],members:[...base.members,{...base.members[0],id:'AZ',endNode:'Z'}]});
  cases.push({...cloneModel(base),members:[{...base.members[0],elasticModulusGPa:0},...base.members.slice(1)]});
  cases.push({...cloneModel(base),members:[{...base.members[0],areaMM2:-1},...base.members.slice(1)]});
  cases.push({...cloneModel(base),loads:[{nodeId:'missing',fxKN:0,fyKN:-1}]});
  for(const model of cases)assert.equal(analyzeTruss(model).ok,false);
});
test('very small and large positive stiffness models remain finite', () => {
  for(const [E,A] of [[1e-5,1e-3],[1e6,1e9]]){const model=cloneModel(TRUSS_TEMPLATES[0].model);for(const member of model.members){member.elasticModulusGPa=E;member.areaMM2=A}const r=analyzeTruss(model);assert.equal(r.ok,true);for(const n of r.nodalDisplacements)assert.ok(Number.isFinite(n.uxMM)&&Number.isFinite(n.uyMM));}
});
test('duplicate support definitions and invalid nodal force components are rejected', () => {
  const model=cloneModel(TRUSS_TEMPLATES[0].model);model.supports.push({...model.supports[0]});assert.equal(analyzeTruss(model).ok,false);
  const bad=cloneModel(TRUSS_TEMPLATES[0].model);bad.loads[0].fxKN=NaN;assert.equal(analyzeTruss(bad).ok,false);
});
test('missing arrays, non-finite solver entries and overflowing finite model values fail safely', () => {
  assert.equal(analyzeTruss({nodes:[],members:[]}).ok,false);
  assert.throws(()=>solveLinearSystem([[1]],[Infinity]),/finite/i);
  const extreme=cloneModel(TRUSS_TEMPLATES[0].model);for(const member of extreme.members){member.elasticModulusGPa=1e308;member.areaMM2=1e308}
  const result=analyzeTruss(extreme);assert.equal(result.ok,false);assert.match(result.errors.join(' '),/non-finite/i);
});
