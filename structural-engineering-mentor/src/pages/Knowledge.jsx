import React, { useMemo, useState } from "react";
import { knowledge, categories, knowledgeById } from "../data/knowledge.js";
import { navigate } from "../router.js";

const TEXT = [
  ["definition", "Definition"], ["role", "Role in structures"], ["physical", "Physical intuition"],
  ["behaviour", "Behaviour"], ["loadPath", "Load path"], ["equation", "Equation & assumptions"],
  ["analysis", "In analysis"], ["resultInterpretation", "Interpreting results"],
  ["designThinking", "Design thinking"], ["practice", "In practice"], ["construction", "Construction"],
  ["failureReasoning", "Failure reasoning"]
];
const LISTS = [["failureModes", "Failure modes"], ["commonMistakes", "Common mistakes"],
  ["troubleshooting", "Troubleshooting"], ["practicalQuestions", "Questions to ask"]];

const norm = (s) => String(s).toLowerCase();

export default function Knowledge({ conceptId }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const selected = knowledgeById.get(conceptId) || knowledgeById.get("beam") || knowledge[0];
  const unknown = conceptId && !knowledgeById.has(conceptId);

  const filtered = useMemo(() => knowledge.filter((k) =>
    (category === "All" || k.category === category) &&
    (!query || norm(k.title + " " + k.summary + " " + k.id).includes(norm(query)))
  ), [query, category]);

  const s = selected.sections || {};
  return (
    <div className="knowledge-layout">
      <aside className="k-side" aria-label="Concept browser">
        <label className="field-label" htmlFor="k-search">Search concepts</label>
        <input id="k-search" className="input" type="search" placeholder="e.g. buckling, load path"
          value={query} onChange={(e) => setQuery(e.target.value)} />
        <label className="field-label" htmlFor="k-cat">Category</label>
        <select id="k-cat" className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>{categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <ul className="k-list">
          {filtered.map((k) => (
            <li key={k.id}>
              <button className={"k-item" + (k.id === selected.id ? " active" : "")}
                aria-current={k.id === selected.id ? "page" : undefined} onClick={() => navigate("knowledge", k.id)}>
                <span>{k.title}</span><small>{k.category} · {k.level}</small>
              </button>
            </li>
          ))}
          {!filtered.length && <li className="muted">No concepts match “{query}”.</li>}
        </ul>
      </aside>

      <article className="k-detail">
        {unknown && <p className="notice warn">Concept “{conceptId}” does not exist yet — showing Beam instead.</p>}
        <div className="eyebrow-line">{selected.category} · {selected.level}</div>
        <h1>{selected.title}</h1>
        <p className="lead">{selected.summary}</p>
        <p className="notice">Review status: <strong>Draft</strong> — authored for learning; not yet independently reviewed or code-verified.</p>
        {TEXT.map(([k, label]) => s[k] && <section key={k}><h2>{label}</h2><p>{s[k]}</p></section>)}
        {LISTS.map(([k, label]) => Array.isArray(s[k]) && s[k].length > 0 && (
          <section key={k}><h2>{label}</h2><ul>{s[k].map((x, i) => <li key={i}>{x}</li>)}</ul></section>))}
        {s.practicalQuestion && <section><h2>Think about it</h2><p>{s.practicalQuestion}</p></section>}
        {s.related?.length > 0 && (
          <section><h2>Related concepts</h2>
            <div className="chips">{s.related.map((id) => knowledgeById.has(id)
              ? <button key={id} className="chip" onClick={() => navigate("knowledge", id)}>{knowledgeById.get(id).title}</button>
              : <span key={id} className="chip disabled" title="Not written yet">{id.replace(/-/g, " ")} (planned)</span>)}</div>
          </section>)}
        {selected.id === "beam" && (
          <p><button className="primary-button" onClick={() => navigate("codes")}>See an RC beam designed to three codes →</button></p>)}
      </article>
    </div>
  );
}
