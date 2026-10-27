import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider, useAuth } from './context/AuthContext';
import ExploreApp from './pages/Explore';
import Home from './pages/Home';
import Auth from './pages/Auth';
import './styles/tokens.css';

/* ── Error boundary ─────────────────────────────────── */
class ErrorBoundary extends React.Component {
  state = { failed: false, msg: '' };
  static getDerivedStateFromError(e) { return { failed: true, msg: String(e) }; }
  render() {
    if (this.state.failed) {
      return (
        <div role="alert" style={{ padding: '3rem', fontFamily: 'monospace', maxWidth: 600 }}>
          <strong style={{ color: '#900', display: 'block', marginBottom: '0.5rem' }}>
            Something went wrong.
          </strong>
          <pre style={{ fontSize: '0.75em', color: '#555', whiteSpace: 'pre-wrap',
                        background: '#f5f5f5', padding: '1rem', borderRadius: 4 }}>
            {this.state.msg}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '1rem', padding: '0.5rem 1.25rem', cursor: 'pointer',
                     fontFamily: 'inherit' }}
          >
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

/* ── Router — only rendered when user is logged in ───── */
function AppRouter() {
  const { user, loading } = useAuth();
  const route = useRoute();

  if (loading) {
    return (
      <div className="auth-loading" role="status" aria-label="Loading StructIQ">
        <span>LOADING STRUCTIQ…</span>
      </div>
    );
  }

  /* Not logged in → show auth page */
  if (!user) return <Auth />;

  /* Logged in → route to page */
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
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </ErrorBoundary>
);
