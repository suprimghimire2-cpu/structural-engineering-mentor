import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import ExploreApp from './pages/Explore';
import Home from './pages/Home';
import './styles/tokens.css';

/* ── Error boundary ─────────────────────────────────── */
class ErrorBoundary extends React.Component {
  state = { failed: false, msg: '' };
  static getDerivedStateFromError(e) { return { failed: true, msg: String(e) }; }
  render() {
    if (this.state.failed) {
      return (
        <div role="alert" style={{ padding: '3rem', fontFamily: 'monospace' }}>
          <strong style={{ color: '#900' }}>Something went wrong.</strong>
          <pre style={{ marginTop: '1rem', fontSize: '0.8em', color: '#555', whiteSpace: 'pre-wrap' }}>
            {this.state.msg}
          </pre>
          <button onClick={() => window.location.reload()}
                  style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', cursor: 'pointer' }}>
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ── Hash router ─────────────────────────────────────── */
function useRoute() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  useEffect(() => {
    const h = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);
  return route;
}

function AppRouter() {
  const route = useRoute();
  if (route.startsWith('#/explore')) {
    const conceptId = route.startsWith('#/explore/')
      ? decodeURIComponent(route.slice(10))
      : null;
    return <ExploreApp initialConcept={conceptId} />;
  }
  return <Home />;
}

/* ── Mount ───────────────────────────────────────────── */
createRoot(document.getElementById('root')).render(
  <ErrorBoundary>
    <AppRouter />
  </ErrorBoundary>
);
