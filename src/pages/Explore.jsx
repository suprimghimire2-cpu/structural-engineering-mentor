import React, { useMemo, useRef, useState } from 'react';
import { Search, BookOpen, MessageCircle, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { knowledge, knowledgeById, categories, findKnowledge, getPrerequisites } from '../data/knowledge';
import SourceReviewPanel from '../components/SourceReviewPanel.jsx';
import Nav from '../components/Nav.jsx';
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

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const idTerm = term.replaceAll(' ', '-');
    return knowledge.filter(
      (k) =>
        (category === 'All' || k.category === category) &&
        (!term ||
          k.title.toLowerCase().includes(term) ||
          k.summary.toLowerCase().includes(term) ||
          k.category.toLowerCase().includes(term) ||
          k.id.includes(idTerm))
    );
  }, [query, category]);

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
      <Nav current="explore" />
      {/* ── LAYOUT ─────────────────────────────────────── */}
      <div className="layout">
        {/* SIDEBAR */}
        <nav className={mobile ? 'sidebar open' : 'sidebar'} aria-label="Knowledge categories">
          <div className="sideTitle">Browse the library</div>
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
          <a className="sideCard mentorShortcut" href="#mentor"><Sparkles size={18}/><b>Concept Mentor</b><p>Local concept matching prototype</p></a>
        </nav>

        {/* MAIN */}
        <main className="main">
          <header className="knowledge-header">
            <div><p className="eyebrow">STRUCTIQ / KNOWLEDGE LIBRARY / 01</p><h1>Structural knowledge,<br/><em>connected by behaviour.</em></h1><p>Explore mechanics, load paths, failure modes and the ideas that connect them.</p></div>
            <div className="knowledge-search"><Search aria-hidden="true"/><input aria-label="Search concepts" placeholder="Search concepts, behaviours or elements…" value={query} onChange={(e)=>setQuery(e.target.value)}/><kbd>/</kbd></div>
            <div className="knowledge-header-meta"><span>54 CONCEPTS</span><span>SELECTED / {category.toUpperCase()}</span></div>
          </header>

          {/* KNOWLEDGE GRID */}
          <section className="contentGrid" aria-label="Knowledge library and selected concept">
            <div className="library">
              <div className="sectionHead">
                <div>
                  <span className="eyebrow">INDEX / {String(filtered.length).padStart(2,'0')} MATCHES</span>
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

                <SourceReviewPanel concept={selected} />

                <RelationshipGroup
                  title="Prerequisites"
                  ids={getPrerequisites(selected.id)}
                  onChoose={choose}
                />
                <RelationshipGroup
                  title="Related concepts"
                  ids={selected.sections?.related ?? []}
                  onChoose={choose}
                />
              </aside>
            )}
          </section>

          {/* LOCAL MENTOR PROTOTYPE */}
          <section className="mentor" id="mentor">
            <div className="mentorIntro">
              <div className="mentorIcon"><MessageCircle /></div>
              <div>
                <span className="eyebrow">CONCEPT MATCH / LOCAL PROTOTYPE</span>
                <h2>Start with the behaviour.</h2>
                <p>
                  Questions are matched to concepts in this library. Responses are local summaries, not a connected AI service or project analysis.
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

function RelationshipGroup({ title, ids, onChoose }) {
  const concepts = [...new Set(ids)]
    .map((id) => knowledgeById.get(id))
    .filter(Boolean);
  if (!concepts.length) return null;

  return (
    <div className="related">
      <h3>{title}</h3>
      <div>
        {concepts.map((concept) => (
          <RelatedChip key={concept.id} id={concept.id} onChoose={onChoose} />
        ))}
      </div>
    </div>
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
