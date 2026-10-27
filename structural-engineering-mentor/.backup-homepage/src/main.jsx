import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

function HomePage({ onNavigate }) {
  return (
    <div className="site-shell">

      {/* NAVIGATION */}
      <header className="topbar">
        <div className="brand">
          <div className="brand-mark">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="brand-text">
            <strong>STRUCTIQ</strong>
            <small>STRUCTURAL ENGINEERING SYSTEM</small>
          </div>
        </div>

        <nav className="nav-links">
          <button
            onClick={() => onNavigate("knowledge")}
            className="nav-link"
          >
            Knowledge
          </button>

          <button
            onClick={() => onNavigate("mentor")}
            className="nav-link"
          >
            Mentor
          </button>

          <button
            onClick={() => onNavigate("explore")}
            className="nav-link"
          >
            Explore
          </button>
        </nav>

        <div className="nav-status">
          <span className="status-dot"></span>
          ENGINEERING MODE
        </div>
      </header>


      {/* HERO */}
      <main>

        <section className="hero">

          {/* ENGINEERING GRID */}
          <div className="engineering-grid"></div>

          {/* BLUEPRINT LINES */}
          <div className="blueprint blueprint-one"></div>
          <div className="blueprint blueprint-two"></div>

          {/* BACKGROUND STRUCTURE */}
          <div className="structure-background">

            <div className="column column-left"></div>
            <div className="column column-middle"></div>
            <div className="column column-right"></div>

            <div className="beam beam-top"></div>
            <div className="beam beam-middle"></div>
            <div className="beam beam-bottom"></div>

            <div className="brace brace-one"></div>
            <div className="brace brace-two"></div>

            <div className="load load-one">
              <span>↓</span>
              <small>W</small>
            </div>

            <div className="load load-two">
              <span>↓</span>
              <small>W</small>
            </div>

          </div>


          {/* HERO CONTENT */}
          <div className="hero-content">

            <div className="eyebrow">
              <span></span>
              STRUCTURAL ENGINEERING · KNOWLEDGE · ANALYSIS
            </div>

            <h1>
              Understand
              <br />
              <em>how structures</em>
              <br />
              work.
            </h1>

            <p className="hero-description">
              A systematic environment for learning structural engineering
              from first principles through mechanics, structural analysis,
              design and professional engineering practice.
            </p>

            <div className="hero-actions">

              <button
                className="primary-button"
                onClick={() => onNavigate("knowledge")}
              >
                <span>Explore the knowledge system</span>
                <span className="arrow">→</span>
              </button>

              <button
                className="secondary-button"
                onClick={() => onNavigate("mentor")}
              >
                Enter mentor
              </button>

            </div>

            <div className="hero-meta">
              <div>
                <strong>01</strong>
                <span>FIRST PRINCIPLES</span>
              </div>

              <div>
                <strong>02</strong>
                <span>ANALYSIS</span>
              </div>

              <div>
                <strong>03</strong>
                <span>DESIGN</span>
              </div>

              <div>
                <strong>04</strong>
                <span>PRACTICE</span>
              </div>
            </div>

          </div>


          {/* TECHNICAL LABEL */}
          <div className="technical-label label-top">
            STRUCTIQ / 001
          </div>

          <div className="technical-label label-bottom">
            STRUCTURAL SYSTEM
            <span>LOAD → MEMBER → SUPPORT</span>
          </div>

        </section>


        {/* SYSTEM OVERVIEW */}
        <section className="system-section">

          <div className="section-heading">

            <div>
              <span className="section-number">01 / SYSTEM</span>

              <h2>
                A structured way to
                <br />
                learn structural engineering.
              </h2>
            </div>

            <p>
              Structural engineering is not a collection of formulas.
              StructIQ is organised around the way engineers actually
              understand structures — from behaviour and mechanics to
              analysis, design and judgement.
            </p>

          </div>


          <div className="system-grid">

            <article
              className="system-card"
              onClick={() => onNavigate("knowledge")}
            >
              <div className="card-number">01</div>

              <div className="card-icon">
                ∑
              </div>

              <div className="card-content">
                <span>FOUNDATION</span>
                <h3>Engineering Knowledge</h3>

                <p>
                  Mechanics, materials, loads, structural behaviour,
                  mathematics and fundamental engineering principles.
                </p>

                <div className="card-link">
                  Explore knowledge →
                </div>
              </div>
            </article>


            <article
              className="system-card"
              onClick={() => onNavigate("analysis")}
            >
              <div className="card-number">02</div>

              <div className="card-icon">
                ◇
              </div>

              <div className="card-content">
                <span>BEHAVIOUR</span>
                <h3>Structural Analysis</h3>

                <p>
                  Understand load paths, reactions, internal forces,
                  deformation and how structural systems respond.
                </p>

                <div className="card-link">
                  Explore analysis →
                </div>
              </div>
            </article>


            <article
              className="system-card"
              onClick={() => onNavigate("design")}
            >
              <div className="card-number">03</div>

              <div className="card-icon">
                ◫
              </div>

              <div className="card-content">
                <span>APPLICATION</span>
                <h3>Structural Design</h3>

                <p>
                  Move from analysis to reinforced concrete, steel,
                  foundations and real engineering design decisions.
                </p>

                <div className="card-link">
                  Explore design →
                </div>
              </div>
            </article>


            <article
              className="system-card"
              onClick={() => onNavigate("mentor")}
            >
              <div className="card-number">04</div>

              <div className="card-icon">
                ?
              </div>

              <div className="card-content">
                <span>GUIDANCE</span>
                <h3>Engineering Mentor</h3>

                <p>
                  Ask questions, investigate concepts and work through
                  structural engineering problems step by step.
                </p>

                <div className="card-link">
                  Enter mentor →
                </div>
              </div>
            </article>

          </div>

        </section>


        {/* ENGINEERING PRINCIPLE */}
        <section className="principle-section">

          <div className="principle-label">
            ENGINEERING PRINCIPLE
          </div>

          <div className="principle-main">
            <span className="quote-mark">“</span>

            <h2>
              Every structure tells a story
              <br />
              through its <em>load path.</em>
            </h2>

            <p>
              Load enters the structure, travels through members,
              connections and supports, and ultimately reaches the ground.
              Understanding that behaviour is at the heart of structural
              engineering.
            </p>
          </div>

          <div className="load-path-diagram">

            <div className="path-node">
              <span>01</span>
              <strong>LOAD</strong>
              <small>Applied action</small>
            </div>

            <div className="path-line">
              →
            </div>

            <div className="path-node">
              <span>02</span>
              <strong>MEMBER</strong>
              <small>Structural response</small>
            </div>

            <div className="path-line">
              →
            </div>

            <div className="path-node">
              <span>03</span>
              <strong>SUPPORT</strong>
              <small>Reaction</small>
            </div>

            <div className="path-line">
              →
            </div>

            <div className="path-node">
              <span>04</span>
              <strong>GROUND</strong>
              <small>Load transfer</small>
            </div>

          </div>

        </section>


        {/* FOOTER */}
        <footer className="footer">

          <div className="footer-brand">
            <div className="brand-mark small">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div>
              <strong>STRUCTIQ</strong>
              <small>STRUCTURAL ENGINEERING SYSTEM</small>
            </div>
          </div>

          <p>
            Learn. Analyse. Design. Understand.
          </p>

          <span className="footer-code">
            SE / SYSTEM / 2026
          </span>

        </footer>

      </main>

    </div>
  );
}


/*
  ---------------------------------------------------------
  KEEP YOUR EXISTING APPLICATION LOGIC HERE
  ---------------------------------------------------------

  If your existing project already has navigation/state,
  replace the navigate function below with your existing
  navigation logic.

  For now this makes the homepage work independently.
*/

function App() {

  const [page, setPage] = React.useState("home");

  const navigate = (destination) => {
    setPage(destination);
  };

  if (page === "home") {
    return <HomePage onNavigate={navigate} />;
  }

  return (
    <div className="placeholder-page">

      <button
        className="back-button"
        onClick={() => setPage("home")}
      >
        ← Back to home
      </button>

      <div>
        <span className="section-number">STRUCTIQ</span>

        <h1>
          {page === "knowledge" && "Knowledge System"}

          {page === "mentor" && "Engineering Mentor"}

          {page === "analysis" && "Structural Analysis"}

          {page === "design" && "Structural Design"}

          {page === "explore" && "Explore"}

        </h1>

        <p>
          Your existing application content can be connected
          to this section without changing the homepage design.
        </p>
      </div>

    </div>
  );
}


ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);