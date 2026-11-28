import { test } from 'node:test';
import assert from 'node:assert/strict';
import { knowledge } from './knowledge.js';

test('academy expands the knowledge base by exactly twelve complete concepts', () => {
  const added = ['compatibility','principle-of-virtual-work','unit-load-method','moment-area-method','conjugate-beam-method','method-of-joints','method-of-sections','flexibility-method','matrix-stiffness-method','slope-deflection-method','influence-lines','muller-breslau-principle'];
  const ids = knowledge.map((concept) => concept.id);
  assert.equal(knowledge.length, 66);
  assert.equal(new Set(ids).size, 66);
  for (const id of added) {
    const concept = knowledge.find((entry) => entry.id === id);
    assert.ok(concept, `missing ${id}`);
    for (const field of ['definition','physical','behaviour','loadPath','equation','analysis','resultInterpretation','practice','designThinking','construction','failureReasoning','related']) {
      assert.ok(concept.sections[field], `${id} missing ${field}`);
    }
  }
});

test('symmetric triangular truss method-of-joints example balances', () => {
  const P = 30, sin = 4 / 5, cos = 3 / 5;
  const reaction = P / 2;
  const diagonalCompression = reaction / sin;
  const chordTension = diagonalCompression * cos;
  assert.equal(reaction, 15);
  assert.equal(diagonalCompression, 18.75);
  assert.equal(chordTension, 11.25);
  assert.equal(2 * diagonalCompression * sin, P);
  assert.equal(chordTension - diagonalCompression * cos, 0);
  assert.equal(reaction + reaction, P);
});

test('method-of-sections cut through BC, BF and EF satisfies section equilibrium', () => {
  const Dy = (20 * 1.5) / 9;
  const Ay = 20 - Dy;
  const Ax = 0;
  assert.ok(Math.abs(Dy * 9 - 20 * 1.5) < 1e-12);
  assert.ok(Math.abs(Ay + Dy - 20) < 1e-12);

  const EF = -((Ay * 3) - (20 * 1.5)) / 2;
  const BF = (20 - Ay) / (4 / 5);
  const BC = -(Ax + BF * (3 / 5) + EF);
  assert.ok(Math.abs(EF - (-10)) < 1e-12);
  assert.ok(Math.abs(BF - (25 / 6)) < 1e-12);
  assert.ok(Math.abs(BC - 7.5) < 1e-12);

  // Independent section check about A: BF acts at B, EF at y=2 m, and E carries the point load.
  const sumFx = Ax + BC + BF * (3 / 5) + EF;
  const sumFy = Ay - 20 + BF * (4 / 5);
  const sumMA = BF * (3 * (4 / 5)) - EF * 2 - 20 * 1.5;
  assert.ok(Math.abs(sumFx) < 1e-12);
  assert.ok(Math.abs(sumFy) < 1e-12);
  assert.ok(Math.abs(sumMA) < 1e-12);
});

test('unit-load centre deflection agrees with closed form for a point load', () => {
  const P = 20, L = 6, EI = 25000;
  const halfSpanIntegral = (5 * (L / 2) ** 3 / 3) / EI;
  const integrated = 2 * halfSpanIntegral;
  const closedForm = P * L ** 3 / (48 * EI);
  assert.ok(Math.abs(halfSpanIntegral - 0.0018) < 1e-12);
  assert.ok(Math.abs(integrated - 0.0036) < 1e-12);
  assert.ok(Math.abs(integrated - closedForm) < 1e-12);
  assert.equal(10 + 10, P);
});

test('moment-area UDL beam deflection satisfies symmetry and reaction checks', () => {
  const w = 10, L = 6, EI = 25000;
  const half = L / 2;
  const areaNumerator = 15 * half ** 2 - (5 / 3) * half ** 3;
  const firstMomentNumerator = 10 * half ** 3 - 1.25 * half ** 4;
  const area = areaNumerator / EI;
  const centroid = firstMomentNumerator / areaNumerator;
  const leverArm = L / 2 - centroid;
  const tangentDeviation = area * leverArm;
  const supportSlope = area;
  const midspanDeflection = supportSlope * (L / 2) - tangentDeviation;
  const tangentDeviationNumerator = 45 * half ** 2 - 15 * half ** 3 + 1.25 * half ** 4;
  const closedForm = 5 * w * L ** 4 / (384 * EI);
  assert.equal(areaNumerator, 90);
  assert.equal(centroid, 1.875);
  assert.equal(leverArm, 1.125);
  assert.equal(tangentDeviationNumerator, 101.25);
  assert.equal(tangentDeviation, tangentDeviationNumerator / EI);
  assert.equal(supportSlope, 90 / EI);
  assert.ok(Math.abs(midspanDeflection - 0.00675) < 1e-12);
  assert.ok(Math.abs(midspanDeflection - closedForm) < 1e-12);
  assert.equal(w * L / 2 + w * L / 2, w * L);
});

test('propped cantilever compatibility and support equilibrium close', () => {
  const w = 10, L = 4;
  const prop = (3 * w * L) / 8;
  const fixedVertical = w * L - prop;
  const fixedMoment = (w * L ** 2) / 2 - prop * L;
  assert.equal(prop, 15);
  assert.equal(fixedVertical, 25);
  assert.equal(fixedMoment, 20);
  assert.equal(prop + fixedVertical, w * L);
  assert.equal(fixedMoment + prop * L - w * L ** 2 / 2, 0);
  assert.ok(Math.abs(w * L ** 4 / 8 - prop * L ** 3 / 3) < 1e-10);
});

test('moving point-load influence-line ordinate gives the selected section moment', () => {
  const L = 10, x = 4, P = 50;
  const ordinateLeft = (a) => a * (L - x) / L;
  const ordinateRight = (a) => x * (L - a) / L;
  assert.equal(ordinateLeft(2), 1.2);
  assert.equal(ordinateRight(7), 1.2);
  const ordinate = ordinateLeft(x);
  assert.equal(ordinate, 2.4);
  assert.equal(ordinateRight(x), ordinate);
  assert.equal(ordinateLeft(0), 0);
  assert.equal(ordinateRight(L), 0);
  assert.equal(P * ordinate, 120);
  assert.equal(0 * (L - x) / L, 0);
});
