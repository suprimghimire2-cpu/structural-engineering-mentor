import React, { useMemo, useRef, useState } from 'react';
import {
  Search, BookOpen, MessageCircle, ChevronRight,
  Sparkles, ArrowRight, Menu, X,
} from 'lucide-react';
import { knowledge, knowledgeById, categories, findKnowledge } from '../data/knowledge';
import '../styles.css';

/* ═══════════════════════════════════════════════════════
   EXPLORE APP  — the existing structural knowledge system
═══════════════════════════════════════════════════════ */
export default function ExploreApp({ initialConcept }) {
  const [query,    setQuery]    = useState('');
  const [selected, setSelected] = useState(() => {
    if (initialConcept) {
      const found = knowledge.find((k) => k.id === initialConcept);
      if (found) return found;
    }
    return knowledge.find((k) => k.id === 'beam') || knowledge[0];
  });
  const [category, setCategory] = useState('All');
  const [mobile,   setMobile]   = useState(false);
  const [chat,     setChat]     = useState('');
  const [messages, setMessages] = useState([]);
  const detailRef = useRef(null);

  const filtered = useMemo(() => knowledge.filter(
    (k) =>
      (category === 'All' || k.category === category) &&
      (!query ||
        k.title.toLowerCase().includes(query.toLowerCase()) ||
        k.summary.toLowerCase().includes(query.toLowerCase()))
  ), [query, category]);

  const choose = (k) => {
    setSelected(k);
    setMobile(false);
    detailRef.current?.scrollTo({ top: 0 });
  };

  const ask = (e) => {
    e.preventDefault();
    if (!chat.trim()) return;
    const q = chat.trim();
    const hit = findKnowledge(q);
    setMessages((m) => [
      ...m,
      {
        q,
        a: hit
          ? `This relates to ${hit.title}. ${hit.summary} ${hit.sections.physical}`
          : 'Try asking about bending moment, shear, stiffness, buckling, load path, beam, column, slab, shear wall, or foundation.',
      },
    ]);
    setChat('');
  };

  return (
    <div className="app">
      {/* ── HEADER ─────────────────────────────────────── */}
      <header className="top">
        <div className="brand">
          <div className="brandMark">S</div>
          <div>
            <div className="brandName">
              STRUCT<span>IQ</span>
            </div>
            <div className="brandSub">
              Knowledge Explorer ·{' '}
              <a href="#/" style={{ color: 'inherit', textDecoration: 'none' }}>
                ← Home
              </a>
            </div>
          </div>
        </div>

        <button
          className="mobileBtn"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={mobile}
          onClick={() => setMobile(!mobile)}
        >
          {mobile ? <X /> : <Menu />}
        </button>

        <div className="topSearch">
          <Search size={18} />
          <input
            aria-label="Search concepts"
            placeholder="Search any engineering concept…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      {/* ── LAYOUT ─────────────────────────────────────── */}
      <div className="layout">
        {/* SIDEBAR */}
        <aside className={mobile ? 'sidebar open' : 'sidebar'}>
          <div className="sideTitle">Explore</div>
          <button
            className={category === 'All' ? 'sideBtn active' : 'sideBtn'}
            onClick={() => setCategory('All')}
          >
            <BookOpen /> All knowledge
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={category === c ? 'sideBtn active' : 'sideBtn'}
              onClick={() => setCategory(c)}
            >
              <ChevronRight /> {c}
            </button>
          ))}
          <div className="sideCard">
            <Sparkles size={18} />
            <b>Mentor mode</b>
            <p>Ask why, how, what-if, or practical engineering questions.</p>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          {/* HERO STRIP */}
          <section className="hero">
            <div>
              <div className="eyebrow">ENGINEERING KNOWLEDGE ENGINE</div>
              <h1>
                Understand structures.
                <br />
                <em>Think like an engineer.</em>
              </h1>
              <p>
                Explore structural concepts through definitions, mechanics, practical
                meaning, failure modes, equations and connected ideas.
              </p>
              <div className="heroSearch">
                <Search />
                <input
                  aria-label="Search concepts"
                  placeholder="Try: P-Delta, shear force, stiffness…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="heroGraphic">
              <div className="tower">
                {[0, 1, 2, 3, 4].map((f) => (
                  <div className="floor" key={f}>
                    <i /><i /><i /><i />
                  </div>
                ))}
                <div className="ground" />
              </div>
              <div className="loadArrow">LOAD PATH ↓</div>
            </div>
          </section>

          {/* KNOWLEDGE GRID */}
          <section className="contentGrid">
            <div className="library">
              <div className="sectionHead">
                <div>
                  <span className="eyebrow">KNOWLEDGE LIBRARY</span>
                  <h2>{category === 'All' ? 'Core concepts' : category}</h2>
                </div>
                <span className="count">{filtered.length} concepts</span>
              </div>
              <div className="cards">
                {filtered.map((k) => (
                  <ConceptCard
                    key={k.id}
                    k={k}
                    selected={selected?.id === k.id}
                    onChoose={choose}
                  />
                ))}
              </div>
            </div>

            {/* DETAIL PANEL */}
            {selected && (
              <aside
                className="detail"
                ref={detailRef}
                aria-label="Concept detail"
              >
                <div className="detailTop">
                  <span className="pill">{selected.level}</span>
                  <span className="category">{selected.category}</span>
                </div>
                <h2>{selected.title}</h2>
                <p className="lead">{selected.summary}</p>

                <Detail label="Definition"               text={selected.sections.definition} />
                <Detail label="Structural role"          text={selected.sections.role} />
                <Detail label="Physical meaning"         text={selected.sections.physical} />
                <Detail label="How it behaves"           text={selected.sections.behaviour} />
                <Detail label="Load path"                text={selected.sections.loadPath} />
                <Detail label="Engineering / equation"   text={selected.sections.equation} />
                <Detail label="Analysis"                 text={selected.sections.analysis} />
                <Detail label="How to interpret results" text={selected.sections.resultInterpretation} />
                <Detail label="Practical engineering"    text={selected.sections.practice} />
                <Detail label="Design thinking"          text={selected.sections.designThinking} />
                <Detail label="Construction"             text={selected.sections.construction} />
                <Detail label="Why can it fail?"         text={selected.sections.failureReasoning} />

                <ListDetail label="Failure modes"    items={selected.sections.failureModes} />
                <ListDetail label="Common mistakes"  items={selected.sections.commonMistakes} />
                <ListDetail label="Troubleshooting"  items={selected.sections.troubleshooting} />

                {selected.sections.practicalQuestion && (
                  <div className="practicalQuestion">
                    <div className="practicalQuestionIcon">?</div>
                    <div>
                      <span className="eyebrow">ENGINEER'S QUESTION</span>
                      <p>{selected.sections.practicalQuestion}</p>
                    </div>
                  </div>
                )}

                <ListDetail
                  label="Practical engineering questions"
                  items={selected.sections.practicalQuestions}
                />

                <div className="related">
                  <h3>Related concepts</h3>
                  <div>
                    {(selected.sections?.related ?? []).map((r) => (
                      <RelatedChip key={r} id={r} onChoose={choose} />
                    ))}
                  </div>
                </div>
              </aside>
            )}
          </section>

          {/* MENTOR */}
          <section className="mentor" id="mentor">
            <div className="mentorIntro">
              <div className="mentorIcon"><MessageCircle /></div>
              <div>
                <span className="eyebrow">ENGINEERING MENTOR</span>
                <h2>Ask the question behind the calculation.</h2>
                <p>
                  Start with the engineering concept. This interface will eventually
                  understand projects, selected codes and imported analysis results.
                </p>
              </div>
            </div>
            <div className="chat">
              <div className="messages" aria-live="polite">
                {messages.length === 0 ? (
                  <div className="empty">
                    <b>Try asking:</b>
                    <div className="suggestions">
                      {[
                        'Why does a beam bend?',
                        'Why can a column buckle?',
                        'What is stiffness?',
                        'What is a load path?',
                      ].map((q) => (
                        <button key={q} onClick={() => setChat(q)}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((m, i) => (
                    <div key={i} className="msg">
                      <div className="userQ">{m.q}</div>
                      <div className="answer">
                        <Sparkles size={15} />
                        <span>{m.a}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <form onSubmit={ask} className="chatForm">
                <input
                  value={chat}
                  onChange={(e) => setChat(e.target.value)}
                  aria-label="Ask the mentor"
                  placeholder="Ask a structural engineering question…"
                />
                <button>
                  Ask mentor <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

/* ── Helper components ─────────────────────────────── */

function ConceptCard({ k, selected, onChoose }) {
  const related = k.sections?.related ?? [];
  return (
    <button
      type="button"
      className={selected ? 'concept selected' : 'concept'}
      aria-pressed={selected}
      onClick={() => onChoose(k)}
    >
      <span className="conceptTop">
        <span>{k.category}</span>
        <ArrowRight size={16} aria-hidden="true" />
      </span>
      <span className="cTitle">{k.title}</span>
      <span className="cSummary">{k.summary}</span>
      <span className="relatedMini">
        {related.slice(0, 3).map((x) => (
          <span key={x}>{x.replaceAll('-', ' ')}</span>
        ))}
      </span>
    </button>
  );
}

function RelatedChip({ id, onChoose }) {
  const k = knowledgeById.get(id);
  if (!k) {
    return (
      <span className="pending" title="Concept not yet written">
        {id.replaceAll('-', ' ')}
      </span>
    );
  }
  return (
    <button type="button" onClick={() => onChoose(k)}>
      {k.title}
    </button>
  );
}

function Detail({ label, text }) {
  if (!text) return null;
  return (
    <div className="detailSection">
      <h4>{label}</h4>
      <p>{text}</p>
    </div>
  );
}

function ListDetail({ label, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="detailSection">
      <h4>{label}</h4>
      <ul className="engineeringList">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}
