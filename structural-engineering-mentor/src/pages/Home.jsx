import React from 'react';
import Nav from '../components/Nav';
import '../styles/home.css';

/* ── Data ─────────────────────────────────────────────────── */

const KNOWLEDGE_DOMAINS = [
  { name: 'Structural Mechanics',       status: 'live'    },
  { name: 'Structural Behaviour',       status: 'live'    },
  { name: 'Structural Elements',        status: 'live'    },
  { name: 'Loads & Actions',            status: 'live'    },
  { name: 'Structural Systems',         status: 'live'    },
  { name: 'Failure & Stability',        status: 'live'    },
  { name: 'Foundations & Geotechnics',  status: 'partial' },
  { name: 'Reinforced Concrete',        status: 'planned' },
  { name: 'Steel Structures',           status: 'planned' },
  { name: 'Timber Structures',          status: 'planned' },
  { name: 'Masonry',                    status: 'planned' },
  { name: 'Structural Dynamics',        status: 'planned' },
  { name: 'Earthquake Engineering',     status: 'planned' },
  { name: 'Wind Engineering',           status: 'planned' },
  { name: 'Finite Element Analysis',    status: 'planned' },
  { name: 'Connections',                status: 'planned' },
  { name: 'Construction & Detailing',   status: 'planned' },
  { name: 'Codes & Standards',          status: 'planned' },
];

const ELEMENTS = [
  { id: 'beam',       name: 'Beam',       cat: 'Structural Elements', desc: 'Resists transverse loading through bending and shear',           status: 'live'    },
  { id: 'column',     name: 'Column',     cat: 'Structural Elements', desc: 'Transfers axial and combined actions vertically',                status: 'live'    },
  { id: 'slab',       name: 'Slab',       cat: 'Structural Elements', desc: 'Plate element distributing gravity loads to supports',           status: 'live'    },
  { id: 'shear-wall', name: 'Shear Wall', cat: 'Structural Elements', desc: 'Vertical element resisting in-plane lateral forces',            status: 'live'    },
  { id: 'foundation', name: 'Foundation', cat: 'Structural Elements', desc: 'Transfers superstructure actions to the supporting ground',     status: 'live'    },
  { id: 'diaphragm',  name: 'Diaphragm',  cat: 'Structural Systems',  desc: 'Distributes in-plane lateral forces to vertical resisting elements', status: 'live' },
  { id: 'load-path',  name: 'Load Path',  cat: 'Structural Systems',  desc: 'The continuous route from applied action to the ground',        status: 'live'    },
  { id: null,         name: 'Brace',      cat: 'Structural Elements', desc: 'Diagonal member providing lateral resistance and stability',     status: 'planned' },
  { id: null,         name: 'Truss',      cat: 'Structural Elements', desc: 'Pin-jointed framework carrying load primarily in axial forces',  status: 'planned' },
  { id: null,         name: 'Connection', cat: 'Connections',         desc: 'Force transfer between structural members and at supports',      status: 'planned' },
];

const QUESTIONS = [
  'What is happening?',
  'Why is it happening?',
  'How does the structure carry the load?',
  'How does the element behave?',
  'What controls the behaviour?',
  'How can it fail?',
  'How would an engineer recognise the problem?',
  'What changes when the loading or geometry changes?',
];

const KNOWLEDGE_PATH = [
  { label: 'Mechanics',  desc: 'Force, moment, shear, stress, strain' },
  { label: 'Behaviour',  desc: 'Stiffness, strength, stability, ductility' },
  { label: 'Elements',   desc: 'Beam, column, slab, wall, foundation' },
  { label: 'Systems',    desc: 'Load paths, frames, lateral systems' },
  { label: 'Analysis',   desc: 'Models, results, interpretation' },
  { label: 'Design',     desc: 'Codes, checks, judgement' },
];

/* ── Structural Frame SVG ────────────────────────────────── */
function StructuralFrame() {
  const colX   = [80, 240, 400, 560, 720];
  const floorY = [90, 185, 280, 375];
  const foundY = 465;
  const bays   = [[80,240],[240,400],[400,560],[560,720]];

  return (
    <svg
      viewBox="0 0 800 520"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        {/* Graph paper grids */}
        <pattern id="gp-minor" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#DDDAD2" strokeWidth="0.22"/>
        </pattern>
        <pattern id="gp-major" width="50" height="50" patternUnits="userSpaceOnUse">
          <rect width="50" height="50" fill="url(#gp-minor)"/>
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#CECA C2" strokeWidth="0.45"/>
        </pattern>
        {/* Hatch patterns */}
        <pattern id="hp-ground" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#B5B1A9" strokeWidth="1.5"/>
        </pattern>
        <pattern id="hp-slab" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#9A9690" strokeWidth="0.6"/>
        </pattern>
        {/* Load arrowhead */}
        <marker id="mk-load" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
          <polygon points="0,0 3,6 6,0" fill="#9B1C1C"/>
        </marker>
      </defs>

      {/* Paper background */}
      <rect width="800" height="520" fill="#F8F7F3"/>
      <rect width="800" height="520" fill="url(#gp-major)" opacity="0.9"/>

      {/* Ground fill */}
      <rect x="40" y={foundY} width="720" height="52" fill="url(#hp-ground)" opacity="0.32"/>
      {/* Ground line */}
      <line x1="40" y1={foundY} x2="760" y2={foundY} stroke="#192820" strokeWidth="2.5"/>

      {/* Foundation pads */}
      {colX.map((x) => (
        <rect key={'fp'+x} x={x-19} y={foundY-11} width="38" height="13"
              fill="#192820" rx="1.5"/>
      ))}

      {/* Columns */}
      {colX.map((x) => (
        <rect key={'cl'+x} x={x-5} y={floorY[0]} width="10"
              height={foundY - floorY[0]} fill="#263C2C" stroke="#192820" strokeWidth="1"/>
      ))}

      {/* Floors — slab + I-beam per bay */}
      {floorY.map((y) => (
        <g key={'fl'+y}>
          {/* Slab */}
          <rect x={colX[0]} y={y-3} width={colX[4]-colX[0]} height="6"
                fill="url(#hp-slab)" stroke="#192820" strokeWidth="0.8" opacity="0.6"/>
          {/* I-beams */}
          {bays.map(([x1, x2]) => (
            <g key={'bm'+x1+y}>
              <rect x={x1+6}  y={y+3}  width={x2-x1-12} height="3"  fill="#263C2C" stroke="#192820" strokeWidth="0.5"/>
              <rect x={x1+10} y={y+6}  width={x2-x1-20} height="8"  fill="#35503C" stroke="#192820" strokeWidth="0.4"/>
              <rect x={x1+6}  y={y+14} width={x2-x1-12} height="3"  fill="#263C2C" stroke="#192820" strokeWidth="0.5"/>
            </g>
          ))}
        </g>
      ))}

      {/* UDL loading */}
      <line x1={colX[0]} y1="28" x2={colX[4]} y2="28" stroke="#9B1C1C" strokeWidth="1.5"/>
      {[120,200,280,360,440,520,600,680].map((x) => (
        <line key={'la'+x} x1={x} y1="28" x2={x} y2={floorY[0]-8}
              stroke="#9B1C1C" strokeWidth="1.2" markerEnd="url(#mk-load)"/>
      ))}
      <text x="727" y="33" fontSize="9" fill="#9B1C1C"
            fontFamily="'JetBrains Mono',monospace" letterSpacing="0.5">w</text>

      {/* Bay dimension lines */}
      {bays.map(([x1, x2]) => (
        <g key={'db'+x1}>
          <line x1={x1} y1="53" x2={x2} y2="53" stroke="#8A8680" strokeWidth="0.7"/>
          <line x1={x1} y1="48" x2={x1} y2="58" stroke="#8A8680" strokeWidth="0.7"/>
          <line x1={x2} y1="48" x2={x2} y2="58" stroke="#8A8680" strokeWidth="0.7"/>
          <text x={(x1+x2)/2} y="46" textAnchor="middle" fontSize="8" fill="#8A8680"
                fontFamily="'JetBrains Mono',monospace">6000</text>
        </g>
      ))}

      {/* Storey height dimensions */}
      {[[floorY[0],floorY[1]],[floorY[1],floorY[2]],[floorY[2],floorY[3]],[floorY[3],foundY]].map(([y1,y2],i) => (
        <g key={'dh'+i}>
          <line x1="742" y1={y1} x2="742" y2={y2} stroke="#8A8680" strokeWidth="0.7"/>
          <line x1="738" y1={y1} x2="746" y2={y1} stroke="#8A8680" strokeWidth="0.7"/>
          <line x1="738" y1={y2} x2="746" y2={y2} stroke="#8A8680" strokeWidth="0.7"/>
          <text x="750" y={(y1+y2)/2+3} fontSize="8" fill="#8A8680"
                fontFamily="'JetBrains Mono',monospace">3000</text>
        </g>
      ))}

      {/* Column grid bubbles A–E */}
      {['A','B','C','D','E'].map((l, i) => (
        <g key={'gb'+l}>
          <circle cx={colX[i]} cy="64" r="9" fill="none" stroke="#8A8680" strokeWidth="0.7"/>
          <text x={colX[i]} y="68" textAnchor="middle" fontSize="8" fill="#5A5750"
                fontFamily="'JetBrains Mono',monospace" fontWeight="600">{l}</text>
        </g>
      ))}

      {/* Floor level labels */}
      {['4','3','2','1'].map((l, i) => (
        <g key={'fl'+l}>
          <text x="60" y={floorY[i]+4} textAnchor="end" fontSize="8" fill="#5A5750"
                fontFamily="'JetBrains Mono',monospace">{l}F</text>
          <line x1="63" y1={floorY[i]} x2="74" y2={floorY[i]}
                stroke="#8A8680" strokeWidth="0.5" strokeDasharray="3,2"/>
        </g>
      ))}
      <text x="60" y={foundY+4} textAnchor="end" fontSize="8" fill="#5A5750"
            fontFamily="'JetBrains Mono',monospace">GL</text>

      {/* Bending moment diagram — top floor only */}
      {bays.map(([x1, x2]) => (
        <path key={'bmd'+x1}
              d={`M ${x1+6} ${floorY[0]+17} Q ${(x1+x2)/2} ${floorY[0]+45} ${x2-6} ${floorY[0]+17}`}
              fill="rgba(155,28,28,0.06)" stroke="#9B1C1C" strokeWidth="0.85" opacity="0.65"/>
      ))}
      <text x={colX[0]+14} y={floorY[0]+42} fontSize="7.5" fill="#9B1C1C" opacity="0.65"
            fontFamily="'JetBrains Mono',monospace">M(x)</text>

      {/* Section cut at column C */}
      <g opacity="0.42">
        <line x1={colX[2]} y1="76" x2={colX[2]} y2={foundY-5}
              stroke="#1A2E1E" strokeWidth="0.9" strokeDasharray="5,3"/>
        <polygon points={`${colX[2]-6},80 ${colX[2]+6},80 ${colX[2]},70`} fill="#1A2E1E"/>
        <polygon points={`${colX[2]-6},${foundY-4} ${colX[2]+6},${foundY-4} ${colX[2]},${foundY+6}`}
                 fill="#1A2E1E"/>
        <text x={colX[2]+10} y="74" fontSize="7" fill="#1A2E1E"
              fontFamily="'JetBrains Mono',monospace">S-S</text>
      </g>

      {/* Load path trace — dashed red down column B */}
      <line x1={colX[1]} y1="28" x2={colX[1]} y2={foundY}
            stroke="#9B1C1C" strokeWidth="1.4" strokeDasharray="4,5" opacity="0.22"
            markerEnd="url(#mk-load)"/>

      {/* Title block */}
      <rect x="494" y="477" width="258" height="36" fill="none" stroke="#8A8680" strokeWidth="0.8"/>
      <line x1="494" y1="488" x2="752" y2="488" stroke="#8A8680" strokeWidth="0.5"/>
      <text x="623" y="486" textAnchor="middle" fontSize="7.5" fill="#192820"
            fontFamily="'JetBrains Mono',monospace" fontWeight="600" letterSpacing="2">STRUCTIQ</text>
      <text x="623" y="498" textAnchor="middle" fontSize="7" fill="#5A5750"
            fontFamily="'JetBrains Mono',monospace">FIG.01 — STRUCTURAL ELEVATION</text>
      <text x="623" y="508" textAnchor="middle" fontSize="6.5" fill="#8A8680"
            fontFamily="'JetBrains Mono',monospace">GRID 6000 | STOREY 3000 | NTS</text>
    </svg>
  );
}

/* ── Page sections ───────────────────────────────────────── */

function Opening() {
  return (
    <section className="h-opening" aria-label="Introduction">
      <div className="h-opening__left">
        <p className="h-label">STRUCTURAL ENGINEERING KNOWLEDGE SYSTEM · V 0.1</p>
        <h1 className="h-opening__title">
          Understand how<br />structures work.
        </h1>
        <p className="h-opening__sub">
          StructIQ provides a structured environment for learning structural
          engineering from first principles — mechanics, behaviour, analysis,
          design and engineering judgement.
        </p>
        <div className="h-opening__actions">
          <a href="#/explore" className="h-btn h-btn--primary">
            Explore Structural Knowledge
          </a>
          <a href="#/explore#mentor" className="h-btn h-btn--ghost">
            Enter Mentor
          </a>
        </div>
      </div>
      <div className="h-opening__drawing" aria-hidden="true">
        <StructuralFrame />
      </div>
    </section>
  );
}

function KnowledgePath() {
  return (
    <section className="h-section h-path" aria-label="Knowledge progression">
      <div className="h-section__inner">
        <div className="h-section__lede">
          <p className="h-label">HOW THE KNOWLEDGE IS ORGANISED</p>
          <p className="h-path__intro">
            Structural engineering knowledge is organised as a progression
            from fundamental mechanics through to engineering practice.
            Each layer depends on the one below it.
          </p>
        </div>
        <div className="h-path__steps">
          {KNOWLEDGE_PATH.map((step, i) => (
            <div key={step.label} className="h-path__step">
              <span className="h-path__num">{String(i + 1).padStart(2, '0')}</span>
              <div className="h-path__content">
                <div className="h-path__label">{step.label}</div>
                <div className="h-path__desc">{step.desc}</div>
              </div>
              {i < KNOWLEDGE_PATH.length - 1 && (
                <span className="h-path__arrow" aria-hidden="true">↓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Domains() {
  return (
    <section className="h-section h-domains" aria-label="Engineering domains">
      <div className="h-section__inner">
        <div className="h-section__lede">
          <p className="h-label">KNOWLEDGE DOMAINS</p>
          <p className="h-domains__intro">
            StructIQ is being built domain by domain, starting with the mechanics
            and structural elements that underpin everything else.
          </p>
        </div>
        <div className="h-domain-index" role="list">
          {KNOWLEDGE_DOMAINS.map((d) => (
            <div key={d.name} className={`h-domain-row h-domain-row--${d.status}`} role="listitem">
              <span className="h-domain-row__name">{d.name}</span>
              <span className="h-domain-row__status">
                {d.status === 'live' ? 'LIVE' : d.status === 'partial' ? 'PARTIAL' : 'PLANNED'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section className="h-section h-philosophy" aria-label="Engineering philosophy">
      <div className="h-section__inner">
        <div className="h-philosophy__header">
          <p className="h-label h-label--light">LEARN THROUGH BEHAVIOUR</p>
          <p className="h-philosophy__intro">
            StructIQ is not a formula reference. It teaches engineers to ask the
            right questions about physical behaviour, cause and consequence,
            and the judgement required to interpret analysis results.
          </p>
        </div>
        <div className="h-philosophy__qs">
          {QUESTIONS.map((q) => (
            <div key={q} className="h-philosophy__q">
              <span className="h-philosophy__q-text">{q}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Elements() {
  return (
    <section className="h-section h-elements" aria-label="Structural elements">
      <div className="h-section__inner">
        <div className="h-section__lede">
          <p className="h-label">STRUCTURAL ELEMENTS</p>
          <p className="h-elements__intro">
            Each structural element is explained through its physical meaning,
            load path, failure modes and the engineering judgement required
            to analyse and design it correctly.
          </p>
        </div>
        <table className="h-elem-table" aria-label="Structural elements library">
          <thead>
            <tr>
              <th>Element</th>
              <th>Category</th>
              <th className="h-elem-table__hide-sm">Description</th>
              <th>Status</th>
              <th><span className="sr-only">Link</span></th>
            </tr>
          </thead>
          <tbody>
            {ELEMENTS.map((el) => (
              <tr key={el.name} className={el.status === 'planned' ? 'h-elem-table__planned' : ''}>
                <td className="h-elem-table__name">{el.name}</td>
                <td className="h-elem-table__cat">{el.cat}</td>
                <td className="h-elem-table__desc h-elem-table__hide-sm">{el.desc}</td>
                <td>
                  <span className={`h-elem-badge h-elem-badge--${el.status}`}>
                    {el.status === 'live' ? 'LIVE' : 'PLANNED'}
                  </span>
                </td>
                <td>
                  {el.id ? (
                    <a href={`#/explore/${el.id}`} className="h-elem-link">Open →</a>
                  ) : (
                    <span className="h-elem-table__cat">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function MentorPreview() {
  return (
    <section className="h-section h-mentor" aria-label="Mentor preview">
      <div className="h-section__inner h-mentor__inner">
        <div className="h-mentor__left">
          <p className="h-label">ENGINEERING MENTOR</p>
          <h2 className="h-mentor__heading">
            Ask the question behind<br />the calculation.
          </h2>
          <p className="h-mentor__body">
            The StructIQ mentor is designed to explain physical behaviour,
            diagnose structural problems, and support engineering judgement —
            not to look up definitions or return code clauses.
          </p>
          <a href="#/explore#mentor" className="h-btn h-btn--ghost h-mentor__cta">
            Open Mentor →
          </a>
        </div>
        <div className="h-mentor__terminal" aria-label="Sample mentor exchange">
          <div className="h-term__bar">
            <span className="h-term__dot"/><span className="h-term__dot"/><span className="h-term__dot"/>
            <span className="h-term__label">STRUCTIQ MENTOR — BETA</span>
          </div>
          <div className="h-term__body">
            <p className="h-term__role">ENGINEER</p>
            <p className="h-term__q">
              My software reports a very large bending moment in this beam.
              Should I make the section deeper?
            </p>
            <p className="h-term__role h-term__role--resp">STRUCTIQ</p>
            <p className="h-term__a">
              Before changing the section, ask why the moment is that large at
              that location. Check the tributary loading, span, support conditions,
              and continuity. A large number in the model is a demand result — not
              a verdict. Confirm the load path is correct, then identify which limit
              state governs before deciding what to change.
            </p>
            <a href="#/explore#mentor" className="h-term__open">
              Continue in Mentor →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeFooter() {
  return (
    <footer className="h-footer">
      <div className="h-footer__brand">
        StructIQ <span>Structural Engineering Knowledge System</span>
      </div>
      <div className="h-footer__meta">
        V 0.1 ALPHA — KNOWLEDGE IN DEVELOPMENT — NOT FOR USE IN STRUCTURAL DESIGN
      </div>
    </footer>
  );
}

/* ── Home page root ──────────────────────────────────────── */
export default function Home() {
  return (
    <div className="home-page">
      <Nav current="home" />
      <Opening />
      <KnowledgePath />
      <Domains />
      <Philosophy />
      <Elements />
      <MentorPreview />
      <HomeFooter />
    </div>
  );
}
