import React, { useMemo, useState } from "react";
import { aci318, is456, ec2, validate, barLayout, minClearSpacing, simpleSpanShear } from "../calculations/rcBeam.js";

const CODE_META = [
  { id: "aci318", fn: aci318, name: "ACI 318", philosophy: "Strength design: factored loads vs. nominal strength × φ. Reduction factor depends on strain in the tension steel." },
  { id: "is456", fn: is456, name: "IS 456:2000", philosophy: "Limit state design: partial safety factors on materials (γc 1.5, γs 1.15) give design strengths (0.87fy for steel; the compression block is 0.36·fck·b·xu acting 0.416xu below the top face)." },
  { id: "ec2", fn: ec2, name: "Eurocode 2", philosophy: "Limit state design: partial factors on materials (γc 1.5, γs 1.15) with EN 1990 load combinations; values here are EN recommended, not a National Annex." }
];
const DEFAULTS = { span: 6, b: 300, d: 450, fck: 25, fy: 500, dead: 12, live: 10, db: 20, cover: 30 };
const FIELDS = [
  ["span", "Span L", "m"], ["b", "Width b", "mm"], ["d", "Effective depth d", "mm"],
  ["fck", "Concrete strength (fck / f′c)", "MPa"], ["fy", "Steel yield (fy)", "MPa"],
  ["dead", "Dead load incl. self-weight (characteristic)", "kN/m"], ["live", "Live load (characteristic)", "kN/m"],
  ["db", "Bar diameter", "mm"], ["cover", "Clear cover to stirrup", "mm"]
];
const f0 = (v) => Math.round(v).toLocaleString();

function BeamSection({ b, d, cover, layout, h }) {
  const W = 180, sc = W / b, H = h * sc, st = 8 * sc, c = cover * sc, r = (layout.db / 2) * sc;
  const y = H - c - st - r;
  const first = c + st + r, span = (b - 2 * (cover + 8) - layout.db) * sc;
  const xs = Array.from({ length: layout.n }, (_, i) => first + (layout.n === 1 ? 0 : (span * i) / (layout.n - 1)));
  return (
    <svg viewBox={`-30 -10 ${W + 60} ${H + 40}`} role="img" className="section-svg"
      aria-label={`Beam cross-section ${b} by ${h} millimetres with ${layout.n} bars of ${layout.db} millimetres diameter, schematic not to scale`}>
      <rect x="0" y="0" width={W} height={H} className="sec-concrete" />
      <rect x={c} y={c} width={W - 2 * c} height={H - 2 * c} className="sec-stirrup" />
      {xs.map((x, i) => <circle key={i} cx={x} cy={y} r={r} className="sec-bar" />)}
      <text x={W / 2} y={H + 18} textAnchor="middle" className="sec-label">b = {b} mm</text>
      <text x={-8} y={H / 2} textAnchor="middle" className="sec-label" transform={`rotate(-90 -8 ${H / 2})`}>h ≈ {h} mm</text>
    </svg>
  );
}

function Bmd({ L, Mu, wu }) {
  const pts = Array.from({ length: 21 }, (_, i) => { const t = i / 20; return [20 + t * 260, 20 + 4 * t * (1 - t) * 70]; });
  return (
    <svg viewBox="0 0 300 120" role="img" className="bmd-svg"
      aria-label={`Bending moment diagram, parabolic, maximum ${Mu.toFixed(1)} kilonewton metres at midspan`}>
      <line x1="20" y1="20" x2="280" y2="20" className="bmd-axis" />
      <polyline points={pts.map((p) => p.join(",")).join(" ")} className="bmd-line" />
      <text x="150" y="108" textAnchor="middle" className="sec-label">Mmax = wL²/8 = {Mu.toFixed(1)} kNm (factored, code-dependent)</text>
    </svg>
  );
}

export default function Codes() {
  const [v, setV] = useState(DEFAULTS);
  const [selected, setSelected] = useState(["aci318", "is456", "ec2"]);
  const [open, setOpen] = useState(null);
  const input = Object.fromEntries(Object.entries(v).map(([k, x]) => [k, x === "" ? NaN : Number(x)]));
  const errs = validate(input);
  const results = useMemo(() => errs.length ? [] : CODE_META.filter((c) => selected.includes(c.id)).map((c) => ({ ...c, res: c.fn(input) })),
    [v, selected]); // eslint-disable-line
  const toggle = (id) => setSelected((s) => s.includes(id) ? (s.length > 1 ? s.filter((x) => x !== id) : s) : [...s, id]);
  const h = input.d + input.cover + 8 + input.db / 2;

  return (
    <div className="page-wrap wide">
      <div className="eyebrow-line">CODE LEARNING & COMPARISON · RC BEAM FLEXURE</div>
      <h1>One beam, three codes</h1>
      <p className="lead">Same simply supported beam, same geometry and materials; only the code method changes.
        Follow <strong>Learn → Analyse → Code → Design → Detail → Compare</strong>.</p>
      <p className="notice warn"><strong>Educational only.</strong> Paraphrased provisions, EN recommended values, no National Annex or local amendments,
        flexure only (no shear, deflection, cracking or anchorage). Status: <strong>Draft — calculation unit-tested, code clauses not yet independently reviewed.</strong> Not for design.</p>

      <h2>1 · Define the problem</h2>
      <div className="inputs">
        {FIELDS.map(([k, label, unit]) => (
          <label key={k} className="inp"><span>{label} <small>({unit})</small></span>
            <input className="input" type="number" inputMode="decimal" min="0" step="any" value={v[k]}
              onChange={(e) => setV({ ...v, [k]: e.target.value })} /></label>
        ))}
      </div>
      <p className="muted">Assumptions: simply supported, uniformly distributed load, rectangular section, single layer of tension bars, 20 mm aggregate, 8 mm stirrups. Use the same fy for all codes for comparability — real grades differ per country.</p>
      <div className="chips" role="group" aria-label="Codes to compare">
        {CODE_META.map((c) => <button key={c.id} aria-pressed={selected.includes(c.id)} className={"chip" + (selected.includes(c.id) ? " on" : "")} onClick={() => toggle(c.id)}>{c.name}</button>)}
      </div>
      {errs.length > 0 && <div className="notice err" role="alert">{errs.map((e) => <div key={e}>{e}</div>)}</div>}

      {!errs.length && (<>
        <h2>2 · Behaviour & analysis</h2>
        <p>Load → shear → moment → curvature → deflection. For a UDL on a simple span the factored moment is <code>wu·L²/8</code> and end shear <code>wu·L/2</code>. The load factor, and so the design moment, depends on the code:</p>
        {results[0] && !results[0].res.fail && <Bmd L={input.span} Mu={results[0].res.Mu} wu={results[0].res.wu} />}

        <h2>3–5 · Code method, result and detail</h2>
        <div className="code-grid">
          {results.map(({ id, name, philosophy, res }) => {
            if (res.fail) return <section key={id} className="code-card"><h3>{name}</h3><p className="notice err">{res.fail}</p></section>;
            const lay = barLayout(res.AsReq, input.db, input.b, input.cover);
            const min = minClearSpacing(id, input.db);
            const spaceOk = lay.clear >= min;
            return (
              <section key={id} className="code-card">
                <h3>{name}</h3>
                <p className="muted">{philosophy}</p>
                <dl className="kv">
                  <dt>Factored load</dt><dd>{res.wu.toFixed(1)} kN/m</dd>
                  <dt>Design moment</dt><dd>{res.Mu.toFixed(1)} kNm</dd>
                  <dt>End shear (factored)</dt><dd>{simpleSpanShear(res.wu, input.span).toFixed(1)} kN</dd>
                  <dt>Required As</dt><dd>{f0(res.As)} mm²</dd>
                  <dt>Minimum As</dt><dd>{f0(res.AsMin)} mm² {res.AsMin > res.As ? "(governs)" : ""}</dd>
                  <dt>Ductility</dt><dd className={res.ductilityOk ? "ok" : "bad"}>{res.ductilityOk ? "OK" : "FAILS"} — {res.ductilityDetail}</dd>
                </dl>
                {!res.ductilityOk && <p className="notice err">Section would need more depth or compression steel under this code; the single-layer result below is not valid.</p>}
                {res.fckWarning && <p className="notice warn">{res.fckWarning}</p>}
                <h4>Detail (illustrative)</h4>
                <p>{lay.n} × Ø{lay.db} = {f0(lay.provided)} mm² provided. Clear spacing {lay.clear.toFixed(0)} mm vs. minimum ≈ {min.toFixed(0)} mm — <span className={spaceOk ? "ok" : "bad"}>{spaceOk ? "fits one layer" : "does not fit one layer; use two layers or smaller bars"}</span>.</p>
                {lay.clear > 0 && <BeamSection b={input.b} d={input.d} cover={input.cover} layout={lay} h={h} />}
                <button className="secondary-button" aria-expanded={open === id} onClick={() => setOpen(open === id ? null : id)}>{open === id ? "Hide" : "Show"} calculation steps</button>
                {open === id && (<div className="steps"><ol>{res.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
                  <p className="muted"><strong>Where to look:</strong> {res.refs[0]}. Verify against the current edition.</p></div>)}
              </section>
            );
          })}
        </div>

        <h2>6 · Compare — and interpret</h2>
        <div className="table-wrap">
          <table className="cmp">
            <thead><tr><th scope="col">Dimension</th>{results.map((r) => <th scope="col" key={r.id}>{r.name}</th>)}</tr></thead>
            <tbody>
              <tr><th scope="row">Load combination</th>{results.map((r) => <td key={r.id}>{r.id === "aci318" ? "1.2D + 1.6L" : r.id === "is456" ? "1.5(D + L)" : "1.35G + 1.5Q (Eq. 6.10 form)"}</td>)}</tr>
              <tr><th scope="row">Resistance factors</th>{results.map((r) => <td key={r.id}>{r.res.phiOrGamma}</td>)}</tr>
              <tr><th scope="row">Design moment (kNm)</th>{results.map((r) => <td key={r.id}>{r.res.Mu.toFixed(1)}</td>)}</tr>
              <tr><th scope="row">Required As (mm²)</th>{results.map((r) => <td key={r.id}>{r.res.fail ? "—" : f0(r.res.As)}</td>)}</tr>
              <tr><th scope="row">Minimum As (mm²)</th>{results.map((r) => <td key={r.id}>{r.res.fail ? "—" : f0(r.res.AsMin)}</td>)}</tr>
              <tr><th scope="row">Ductility check</th>{results.map((r) => <td key={r.id}>{r.res.fail ? "—" : r.res.ductilityLabel}</td>)}</tr>
            </tbody>
          </table>
        </div>
        <div className="notice">
          <strong>Why the numbers differ.</strong> The design moments differ because each code factors the same characteristic loads differently, and the live-to-dead ratio changes which is heavier.
          Resistance factors are applied differently too: ACI reduces the nominal strength with φ, while IS 456 and Eurocode 2 reduce material strengths. Stress-block shapes are not identical,
          and each code limits neutral-axis depth for ductility in its own way. Comparing steel areas is therefore only meaningful for the same design situation, units and edition; a larger
          or smaller As here is not a statement that one code is “safer”. A qualified engineer must interpret differences for any real project.
        </div>
      </>)}
    </div>
  );
}
