import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import "./app.css";
import Home from "./pages/Home.jsx";
import Knowledge from "./pages/Knowledge.jsx";
import Mentor from "./pages/Mentor.jsx";
import Codes from "./pages/Codes.jsx";
import About from "./pages/About.jsx";
import SiteNav from "./components/SiteNav.jsx";
import { useRoute, navigate } from "./router.js";

class ErrorBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="page-wrap"><h1>Something went wrong</h1>
        <p className="muted">{String(this.state.error.message || this.state.error)}</p>
        <button className="secondary-button" onClick={() => { location.hash = "#/"; location.reload(); }}>Back to home</button>
      </div>
    );
  }
}

function App() {
  const { page, param } = useRoute();
  React.useEffect(() => { window.scrollTo(0, 0); }, [page]);
  if (page === "home") return <Home onNavigate={navigate} />;
  return (
    <div className="site-shell app-shell">
      <SiteNav current={page} onNavigate={navigate} />
      <main id="main">
        {page === "knowledge" && <Knowledge conceptId={param} />}
        {page === "mentor" && <Mentor />}
        {page === "codes" && <Codes />}
        {page === "about" && <About />}
        {!["knowledge", "mentor", "codes", "about"].includes(page) && (
          <div className="page-wrap"><h1>Page not found</h1>
            <button className="secondary-button" onClick={() => navigate("home")}>Back to home</button></div>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode><ErrorBoundary><App /></ErrorBoundary></React.StrictMode>
);
