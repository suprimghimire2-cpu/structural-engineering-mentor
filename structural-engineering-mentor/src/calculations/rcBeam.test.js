import { test } from 'node:test';
import assert from 'node:assert/strict';
import { aci318, is456, ec2, validate, simpleSpanMoment } from './rcBeam.js';

const base = { span: 6, b: 300, d: 450, fck: 25, fy: 500, dead: 20, live: 15 };
const near = (a, b, tol) => assert.ok(Math.abs(a - b) <= tol, `${a} vs ${b} (tol ${tol})`);

test('simple span moment wL²/8', () => near(simpleSpanMoment(10, 6), 45, 1e-9));
test('ACI factored load and Mu', () => { const r = aci318(base); near(r.wu, 48, 1e-9); near(r.Mu, 216, 1e-9); });
test('IS 456 factored load', () => near(is456(base).wu, 52.5, 1e-9));
test('EC2 factored load', () => near(ec2(base).wu, 49.5, 1e-9));
test('ACI As reproduces Mu/φ', () => {
  const r = aci318(base); const a = (r.As * 500) / (0.85 * 25 * 300);
  near((0.9 * r.As * 500 * (450 - a / 2)) / 1e6, r.Mu, 0.01);
});
test('IS 456 Ast reproduces Mu (G-1.1b)', () => {
  const r = is456(base);
  near((0.87 * 500 * r.As * 450 * (1 - (r.As * 500) / (300 * 450 * 25))) / 1e6, r.Mu, 0.01);
});
test('EC2 As reproduces MEd', () => {
  const r = ec2(base); const fcd = 25 / 1.5; const s = (r.As * (500 / 1.15)) / (fcd * 300);
  near((r.As * (500 / 1.15) * (450 - s / 2)) / 1e6, r.Mu, 0.01);
});
test('oversized moment returns failure not NaN', () => {
  for (const f of [aci318, is456, ec2]) assert.ok(f({ ...base, dead: 500, live: 500 }).fail);
});
test('minimum steel governs for tiny load', () => {
  const r = is456({ ...base, dead: 1, live: 1 }); assert.equal(r.AsReq, r.AsMin);
});
test('validation catches bad inputs', () => assert.ok(validate({ ...base, b: 0 }).length > 0));
