import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/auth.css';

/* ── Structural frame SVG — adapted for dark background ────── */
function AuthFrame() {
  const colX   = [50, 170, 290, 410];
  const floorY = [60, 130, 200, 270];
  const foundY = 330;

  return (
    <svg
      viewBox="0 0 460 370"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="auth-frame-svg"
    >
      <defs>
        <pattern id="ap-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.4"/>
        </pattern>
        <pattern id="ap-ground" width="7" height="7" patternUnits="userSpaceOnUse"
                 patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2"/>
        </pattern>
        <marker id="ap-arrow" markerWidth="5" markerHeight="5" refX="2.5" refY="5" orient="auto">
          <polygon points="0,0 2.5,5 5,0" fill="rgba(220,80,80,0.7)"/>
        </marker>
      </defs>

      {/* Graph paper */}
      <rect width="460" height="370" fill="none"/>
      <rect width="460" height="370" fill="url(#ap-grid)"/>

      {/* Ground */}
      <rect x="20" y={foundY} width="420" height="38" fill="url(#ap-ground)" opacity="0.5"/>
      <line x1="20" y1={foundY} x2="440" y2={foundY}
            stroke="rgba(255,255,255,0.35)" strokeWidth="2"/>

      {/* Foundation pads */}
      {colX.map((x) => (
        <rect key={'fp'+x} x={x-13} y={foundY-8} width="26" height="10"
              fill="rgba(255,255,255,0.25)" rx="1"/>
      ))}

      {/* Columns */}
      {colX.map((x) => (
        <rect key={'c'+x} x={x-4} y={floorY[0]} width="8"
              height={foundY - floorY[0]}
              fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8"/>
      ))}

      {/* Floors */}
      {floorY.map((y) => (
        <g key={'fl'+y}>
          <rect x={colX[0]} y={y-2} width={colX[3]-colX[0]} height="4"
                fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.7"/>
          {[[colX[0],colX[1]],[colX[1],colX[2]],[colX[2],colX[3]]].map(([x1,x2]) => (
            <g key={'b'+x1+y}>
              <rect x={x1+5}  y={y+2}  width={x2-x1-10} height="2"
                    fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
              <rect x={x1+8}  y={y+4}  width={x2-x1-16} height="5"
                    fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.4"/>
              <rect x={x1+5}  y={y+9}  width={x2-x1-10} height="2"
                    fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5"/>
            </g>
          ))}
        </g>
      ))}

      {/* Load arrows */}
      {[95, 180, 265, 365].map((x) => (
        <line key={'la'+x} x1={x} y1="20" x2={x} y2={floorY[0]-6}
              stroke="rgba(220,80,80,0.6)" strokeWidth="1"
              markerEnd="url(#ap-arrow)"/>
      ))}
      <line x1={colX[0]} y1="20" x2={colX[3]} y2="20"
            stroke="rgba(220,80,80,0.6)" strokeWidth="1"/>

      {/* Grid bubbles */}
      {['A','B','C','D'].map((l, i) => (
        <g key={'gb'+l}>
          <circle cx={colX[i]} cy={floorY[0]-18} r="8"
                  fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.7"/>
          <text x={colX[i]} y={floorY[0]-14} textAnchor="middle"
                fontSize="7" fill="rgba(255,255,255,0.3)"
                fontFamily="'JetBrains Mono',monospace">{l}</text>
        </g>
      ))}

      {/* Floor labels */}
      {['4','3','2','1'].map((l, i) => (
        <text key={'fll'+l} x="32" y={floorY[i]+4} textAnchor="end"
              fontSize="7" fill="rgba(255,255,255,0.2)"
              fontFamily="'JetBrains Mono',monospace">{l}F</text>
      ))}
      <text x="32" y={foundY+5} textAnchor="end" fontSize="7"
            fill="rgba(255,255,255,0.2)"
            fontFamily="'JetBrains Mono',monospace">GL</text>

      {/* Title block */}
      <rect x="280" y="338" width="152" height="24"
            fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.7"/>
      <text x="356" y="348" textAnchor="middle" fontSize="6"
            fill="rgba(255,255,255,0.25)"
            fontFamily="'JetBrains Mono',monospace" letterSpacing="1.5">STRUCTIQ</text>
      <text x="356" y="357" textAnchor="middle" fontSize="5.5"
            fill="rgba(255,255,255,0.15)"
            fontFamily="'JetBrains Mono',monospace">STRUCTURAL ELEVATION — NTS</text>
    </svg>
  );
}

/* ── Auth page ─────────────────────────────────────────────── */
export default function Auth() {
  const { login, register } = useAuth();

  const [mode,    setMode]    = useState('login');   // 'login' | 'register'
  const [form,    setForm]    = useState({ name: '', email: '', password: '' });
  const [error,   setError]   = useState('');
  const [busy,    setBusy]    = useState(false);
  const [success, setSuccess] = useState('');

  const field = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setError('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setBusy(true);
    try {
      if (mode === 'login') {
        await login(form.email, form.password);
      } else {
        await register(form.name, form.email, form.password);
        setSuccess('Account created. Welcome to StructIQ.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const switchMode = () => {
    setMode((m) => (m === 'login' ? 'register' : 'login'));
    setForm({ name: '', email: '', password: '' });
    setError('');
    setSuccess('');
  };

  return (
    <div className="auth-page">

      {/* ── Left — brand panel ─────────────────────── */}
      <div className="auth-brand" aria-hidden="true">
        <div className="auth-brand__inner">
          <div className="auth-brand__logo">
            StructIQ
          </div>
          <p className="auth-brand__descriptor">
            Structural Engineering Knowledge System
          </p>
          <div className="auth-brand__frame">
            <AuthFrame />
          </div>
          <p className="auth-brand__tagline">
            Understand structures.<br />
            Think like an engineer.
          </p>
          <div className="auth-brand__meta">
            <span className="auth-brand__version">V 0.1 ALPHA</span>
            <span className="auth-brand__dot" />
            <span>Knowledge in development</span>
          </div>
        </div>
      </div>

      {/* ── Right — form panel ─────────────────────── */}
      <div className="auth-form-panel">
        <div className="auth-form-inner">

          {/* Header */}
          <div className="auth-form-head">
            <p className="auth-label">
              {mode === 'login' ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </p>
            <h1 className="auth-form-title">
              {mode === 'login' ? 'Welcome back' : 'Get started'}
            </h1>
            <p className="auth-form-desc">
              {mode === 'login'
                ? 'Sign in to your StructIQ account to access the structural engineering knowledge system.'
                : 'Create a free account to begin learning structural engineering from first principles.'}
            </p>
          </div>

          {/* Form */}
          <form className="auth-form" onSubmit={submit} noValidate>

            {mode === 'register' && (
              <div className="auth-field">
                <label className="auth-field__label" htmlFor="sq-name">
                  Full name
                </label>
                <input
                  id="sq-name"
                  className="auth-field__input"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={field('name')}
                  autoComplete="name"
                  disabled={busy}
                  required
                />
              </div>
            )}

            <div className="auth-field">
              <label className="auth-field__label" htmlFor="sq-email">
                Email address
              </label>
              <input
                id="sq-email"
                className="auth-field__input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={field('email')}
                autoComplete="email"
                disabled={busy}
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-field__label" htmlFor="sq-password">
                Password
              </label>
              <input
                id="sq-password"
                className="auth-field__input"
                type="password"
                placeholder={mode === 'register' ? 'Minimum 6 characters' : 'Your password'}
                value={form.password}
                onChange={field('password')}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                disabled={busy}
                required
              />
            </div>

            {/* Error */}
            {error && (
              <div className="auth-msg auth-msg--error" role="alert">
                <span className="auth-msg__icon">⚠</span>
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div className="auth-msg auth-msg--ok" role="status">
                <span className="auth-msg__icon">✓</span>
                {success}
              </div>
            )}

            <button
              className="auth-submit"
              type="submit"
              disabled={busy}
            >
              {busy
                ? 'Please wait…'
                : mode === 'login'
                  ? 'Sign in'
                  : 'Create account'}
            </button>
          </form>

          {/* Toggle */}
          <div className="auth-switch">
            <span>
              {mode === 'login' ? 'New to StructIQ?' : 'Already have an account?'}
            </span>
            <button
              type="button"
              className="auth-switch__btn"
              onClick={switchMode}
            >
              {mode === 'login' ? 'Create a free account' : 'Sign in instead'}
            </button>
          </div>

          {/* Disclaimer */}
          <p className="auth-disclaimer">
            This is a prototype. Account data is stored locally in your browser
            and is not sent to any server. Do not use important passwords.
          </p>

        </div>
      </div>

    </div>
  );
}
