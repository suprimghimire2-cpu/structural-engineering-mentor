import React, { useState } from "react";
import { findKnowledge, knowledge } from "../data/knowledge.js";
import { navigate } from "../router.js";

const SUGGEST = ["Why does a beam bend?", "What is buckling?", "What does stiffness mean?", "How does load path work?"];

export default function Mentor() {
  const [q, setQ] = useState("");
  const [log, setLog] = useState([]);

  const ask = (text) => {
    const t = text.trim();
    if (!t) return;
    const hit = findKnowledge(t);
    setLog((l) => [{ q: t, hit }, ...l]);
    setQ("");
  };

  return (
    <div className="page-wrap">
      <div className="eyebrow-line">MENTOR</div>
      <h1>Ask about a concept</h1>
      <p className="lead">The Mentor currently matches your question to the written knowledge base and shows that
        concept in layers. It is not a generative AI and will say so when it finds nothing.</p>
      <form className="ask" onSubmit={(e) => { e.preventDefault(); ask(q); }}>
        <label className="field-label" htmlFor="ask">Your question</label>
        <div className="ask-row">
          <input id="ask" className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about a structural concept…" />
          <button className="primary-button" type="submit">Ask</button>
        </div>
      </form>
      <div className="chips">{SUGGEST.map((s) => <button key={s} className="chip" onClick={() => ask(s)}>{s}</button>)}</div>

      <div className="log" aria-live="polite">
        {log.map((m, i) => (
          <section key={i} className="answer">
            <p className="you">You asked: {m.q}</p>
            {m.hit ? (
              <>
                <h2>{m.hit.title}</h2>
                <h3>Direct answer</h3><p>{m.hit.summary}</p>
                <h3>Physical intuition</h3><p>{m.hit.sections.physical}</p>
                {m.hit.sections.equation && <><h3>Equation & assumptions</h3><p>{m.hit.sections.equation}</p></>}
                {m.hit.sections.failureReasoning && <><h3>What can go wrong</h3><p>{m.hit.sections.failureReasoning}</p></>}
                <p className="notice">Source: StructIQ knowledge base — <strong>Draft</strong>, not independently reviewed. Educational use only.</p>
                <button className="secondary-button" onClick={() => navigate("knowledge", m.hit.id)}>Open full “{m.hit.title}” page →</button>
              </>
            ) : (
              <p>No verified concept matches that question yet. Concepts available: {knowledge.map((k) => k.title).join(", ")}.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
