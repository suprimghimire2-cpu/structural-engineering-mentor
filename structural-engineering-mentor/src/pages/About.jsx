import React from "react";
import { navigate } from "../router.js";

const PHASES = [
  ["Available now", "Knowledge base (18 concepts, draft), keyword Mentor, RC beam flexure comparison across ACI 318, IS 456 and Eurocode 2."],
  ["Next", "Review states on every concept, prerequisite graph, learning paths, worked examples with practice questions."],
  ["Later", "Verified calculators (section properties, SFD/BMD), shear and detailing comparison, steel and columns, code registry with edition tracking."],
  ["Only after validation", "Advanced analysis, import/export, automated design reports, AI-assisted workflows."]
];

export default function About() {
  return (
    <div className="page-wrap">
      <div className="eyebrow-line">ABOUT & SOURCES</div>
      <h1>What StructIQ is, and is not</h1>
      <p className="lead">StructIQ is an interactive structural-engineering learning platform: learn behaviour, analyse,
        study how different standards prescribe design, compare them, and see how calculations become detailing.</p>
      <section><h2>Professional boundary</h2>
        <p>Everything here is educational. It is not a substitute for an engineer of record, current licensed codes,
          geotechnical investigation, peer review or regulatory approval. Do not use any output for construction.</p></section>
      <section><h2>Source policy</h2>
        <ul>
          <li>Code content is paraphrased from the named standard and tied to an edition; no large passages are reproduced.</li>
          <li>National Annexes, local amendments and errata are not applied unless stated.</li>
          <li>Content labelled <strong>Draft</strong> has not had a technical or code review. Treat it as a study aid and verify against the standard.</li>
          <li>Editions referenced: ACI 318 (2019/2025 formats share the sectional-strength approach used here), IS 456:2000, EN 1992-1-1 with EN 1990 recommended values.</li>
        </ul></section>
      <section><h2>Roadmap</h2>
        <div className="road">{PHASES.map(([t, d]) => <div key={t} className="road-row"><strong>{t}</strong><span>{d}</span></div>)}</div></section>
      <section><h2>Reference registry (to verify before relying on anything)</h2>
        <ul>
          <li>ACI CODE-318 — American Concrete Institute (concrete.org)</li>
          <li>IS 456:2000 — Bureau of Indian Standards</li>
          <li>EN 1992-1-1 and EN 1990 — CEN / national standards bodies; second-generation Eurocodes are being phased in</li>
          <li>Nepal NBC series — Department of Urban Development and Building Construction (dudbc.gov.np)</li>
          <li>WCAG 2.2 — W3C (accessibility target for this site)</li>
        </ul></section>
      <button className="primary-button" onClick={() => navigate("codes")}>Open the code comparison →</button>
    </div>
  );
}
