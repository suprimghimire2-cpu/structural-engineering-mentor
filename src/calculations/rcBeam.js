// Educational RC beam flexure: simply supported, rectangular section, singly reinforced.
// Units: mm, N, MPa, kN, kNm. Each function returns explicit steps so the UI can show them.
// NOT for project design. Provisions are paraphrased from ACI 318, IS 456:2000 and
// EN 1992-1-1 / EN 1990 recommended values; National Annex / local amendments are ignored.

const r = (v, d = 1) => Math.round(v * 10 ** d) / 10 ** d;
const sqrtOrNull = (v) => (v < 0 ? null : Math.sqrt(v));

export function validate(i) {
  const errs = [];
  for (const k of ['span', 'b', 'd', 'fck', 'fy', 'dead', 'live'])
    if (!(Number.isFinite(i[k]) && i[k] >= 0)) errs.push(`${k} must be a non-negative number`);
  for (const k of ['span', 'b', 'd', 'fck', 'fy'])
    if (!(i[k] > 0)) errs.push(`${k} must be greater than zero`);
  if (i.dead + i.live <= 0) errs.push('Total load must be greater than zero');
  return errs;
}

// Mu in kNm from factored UDL wu (kN/m) and span (m)
export const simpleSpanMoment = (wu, span) => (wu * span * span) / 8;
export const simpleSpanShear = (wu, span) => (wu * span) / 2;

// Shared solver: rectangular stress block of mean stress `sigma` (MPa) acting on depth s
// M = sigma*b*s*(d - s/2)  ->  s = d - sqrt(d^2 - 2M/(sigma*b)).  M in N·mm.
function blockDepth(M, sigma, b, d) {
  const root = sqrtOrNull(d * d - (2 * M) / (sigma * b));
  return root === null ? null : d - root;
}

export function aci318(i) {
  const wu = 1.2 * i.dead + 1.6 * i.live; // 1.2D + 1.6L
  const Mu = simpleSpanMoment(wu, i.span);
  const phi = 0.9; // tension-controlled section
  const Mn = (Mu * 1e6) / phi;
  const a = blockDepth(Mn, 0.85 * i.fck, i.b, i.d);
  if (a === null) return { code: 'ACI 318', wu, Mu, fail: 'Section too small: no real solution for the stress block depth.' };
  const As = (0.85 * i.fck * i.b * a) / i.fy;
  const beta1 = i.fck <= 28 ? 0.85 : Math.max(0.65, 0.85 - (0.05 * (i.fck - 28)) / 7);
  const c = a / beta1;
  const epsT = (0.003 * (i.d - c)) / c;
  const AsMin = Math.max((0.25 * Math.sqrt(i.fck)) / i.fy, 1.4 / i.fy) * i.b * i.d;
  return {
    code: 'ACI 318', wu, Mu, phiOrGamma: `φ = ${phi}`, As, AsMin, AsReq: Math.max(As, AsMin),
    depthRatio: c / i.d, ductilityLabel: 'c/d (tension-controlled if εt ≥ 0.005)',
    ductilityOk: epsT >= 0.005, ductilityDetail: `εt = ${r(epsT, 4)}`,
    steps: [
      `wu = 1.2D + 1.6L = ${r(wu, 2)} kN/m`,
      `Mu = wu·L²/8 = ${r(Mu, 1)} kNm`,
      `Mn required = Mu/φ = ${r(Mu / phi, 1)} kNm (φ = ${phi}, valid only if tension-controlled)`,
      `a = d − √(d² − 2Mn/(0.85·f'c·b)) = ${r(a, 1)} mm`,
      `As = 0.85·f'c·b·a/fy = ${r(As, 0)} mm²`,
      `As,min = max(0.25√f'c, 1.4)/fy · b·d = ${r(AsMin, 0)} mm²`,
      `β1 = ${r(beta1, 2)}, c = a/β1 = ${r(c, 1)} mm, εt = ${r(epsT, 4)}`
    ],
    refs: ['ACI 318 ch. 5 (load combinations), ch. 22 (sectional strength), 9.6.1 (minimum flexural reinforcement), 21.2 (strength reduction factors)']
  };
}

export function is456(i) {
  const wu = 1.5 * (i.dead + i.live); // 1.5(DL+LL)
  const Mu = simpleSpanMoment(wu, i.span);
  const k = (0.87 * i.fy * i.fy) / (i.fck * i.b); // Annex G-1.1(b) form
  const q = 0.87 * i.fy * i.d;
  const disc = sqrtOrNull(q * q - 4 * k * Mu * 1e6);
  if (disc === null) return { code: 'IS 456', wu, Mu, fail: 'Section too small: Mu exceeds the capacity of this expression.' };
  const Ast = (q - disc) / (2 * k);
  const xu = (0.87 * i.fy * Ast) / (0.36 * i.fck * i.b);
  const xuMaxRatio = i.fy <= 250 ? 0.53 : i.fy <= 415 ? 0.48 : 0.46; // cl. 38.1 note
  const AstMin = (0.85 * i.b * i.d) / i.fy; // cl. 26.5.1.1(a)
  return {
    code: 'IS 456', wu, Mu, phiOrGamma: 'γm: 1.5 (concrete), 1.15 (steel) → 0.87fy', As: Ast, AsMin: AstMin,
    AsReq: Math.max(Ast, AstMin), depthRatio: xu / i.d,
    ductilityLabel: `xu/d (limit ${xuMaxRatio} for fy=${i.fy})`, ductilityOk: xu / i.d <= xuMaxRatio,
    ductilityDetail: `xu,max/d = ${xuMaxRatio}`,
    steps: [
      `wu = 1.5(DL + LL) = ${r(wu, 2)} kN/m`,
      `Mu = wu·L²/8 = ${r(Mu, 1)} kNm`,
      `Mu = 0.87·fy·Ast·d·(1 − Ast·fy/(b·d·fck)) → Ast = ${r(Ast, 0)} mm²`,
      `xu = 0.87·fy·Ast/(0.36·fck·b) = ${r(xu, 1)} mm (xu/d = ${r(xu / i.d, 3)})`,
      `Ast,min = 0.85·b·d/fy = ${r(AstMin, 0)} mm²`
    ],
    refs: ['IS 456:2000 cl. 18.2 (partial safety factors), Annex G cl. G-1.1 (flexure), cl. 38.1 (stress block, xu,max), cl. 26.5.1.1 (minimum tension steel)']
  };
}

export function ec2(i) {
  const wu = 1.35 * i.dead + 1.5 * i.live; // EN 1990 Eq. 6.10 (6.10a/b alternatives may govern in practice)
  const MEd = simpleSpanMoment(wu, i.span);
  const alphaCc = 1.0;
  const fcd = (alphaCc * i.fck) / 1.5;
  const fyd = i.fy / 1.15;
  const s = blockDepth(MEd * 1e6, fcd, i.b, i.d); // λx with η = 1.0, λ = 0.8 for fck ≤ 50
  if (s === null) return { code: 'Eurocode 2', wu, Mu: MEd, fail: 'Section too small: no real solution for the compression zone depth.' };
  const z = i.d - s / 2;
  const As = (MEd * 1e6) / (fyd * z);
  const x = s / 0.8;
  const fctm = 0.3 * Math.pow(i.fck, 2 / 3); // valid for fck ≤ 50 MPa
  const AsMin = Math.max((0.26 * fctm) / i.fy, 0.0013) * i.b * i.d;
  return {
    code: 'Eurocode 2', wu, Mu: MEd, phiOrGamma: 'γc = 1.5, γs = 1.15', As, AsMin, AsReq: Math.max(As, AsMin),
    depthRatio: x / i.d, ductilityLabel: 'x/d (recommended limit 0.45 without redistribution)',
    ductilityOk: x / i.d <= 0.45, ductilityDetail: 'x/d ≤ 0.45 (fck ≤ 50 MPa)',
    fckWarning: i.fck > 50 ? 'Rectangular block parameters λ, η used here are only valid for fck ≤ 50 MPa.' : null,
    steps: [
      `wEd = 1.35G + 1.5Q = ${r(wu, 2)} kN/m (Eq. 6.10 form)`,
      `MEd = wEd·L²/8 = ${r(MEd, 1)} kNm`,
      `fcd = αcc·fck/γc = ${r(fcd, 2)} MPa (αcc = 1.0), fyd = fyk/γs = ${r(fyd, 1)} MPa`,
      `λx = d − √(d² − 2MEd/(b·fcd)) = ${r(s, 1)} mm → x = ${r(x, 1)} mm, z = d − λx/2 = ${r(z, 1)} mm`,
      `As = MEd/(fyd·z) = ${r(As, 0)} mm²`,
      `As,min = max(0.26·fctm/fyk, 0.0013)·b·d = ${r(AsMin, 0)} mm² (fctm = ${r(fctm, 2)} MPa)`
    ],
    refs: ['EN 1990 cl. 6.4.3.2 (STR combinations), EN 1992-1-1 cl. 3.1.6 (design strengths), 3.1.7 (rectangular block), 5.5 (ductility, x/d), 6.1 (bending), 9.2.1.1 (minimum reinforcement)']
  };
}

export const CODES = { aci318, is456, ec2 };

// Bar layout: n bars of diameter db, single layer.
export function barLayout(AsReq, db, b, cover, stirrup = 8) {
  const barArea = (Math.PI * db * db) / 4;
  const n = Math.max(2, Math.ceil(AsReq / barArea));
  const provided = n * barArea;
  const clear = (b - 2 * (cover + stirrup) - n * db) / (n - 1);
  return { n, db, provided, clear, barArea };
}
// Minimum clear spacing between parallel bars (paraphrased; verify against current edition)
export function minClearSpacing(code, db, dagg = 20) {
  if (code === 'aci318') return Math.max(25, db, (4 / 3) * dagg); // ACI 25.2.1
  if (code === 'is456') return Math.max(db, dagg + 5); // IS 456 cl. 26.3.2
  return Math.max(db, dagg + 5, 20); // EN 1992-1-1 cl. 8.2(2)
}
