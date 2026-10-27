import React, { createContext, useContext, useState, useEffect } from 'react';

/* ── Storage keys ──────────────────────────────────────────── */
const USERS_KEY   = 'structiq_users_v1';
const SESSION_KEY = 'structiq_session_v1';

/* ── Helpers ───────────────────────────────────────────────── */

// SHA-256 hash via the Web Crypto API (available in all modern browsers)
// NOTE: this is a prototype implementation. localStorage is readable by
// anyone with access to the browser — do not use real passwords here.
async function hashPassword(password) {
  const data = new TextEncoder().encode(password + '__structiq__');
  const buf  = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function readUsers() {
  try   { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); }
  catch { return {}; }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession() {
  try   { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
  catch { return null; }
}

/* ── Context ───────────────────────────────────────────────── */
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session on mount
  useEffect(() => {
    const session = readSession();
    if (session) setUser(session);
    setLoading(false);
  }, []);

  /* register — creates a new account and logs in immediately */
  const register = async (name, email, password) => {
    const users = readUsers();
    const key   = email.toLowerCase().trim();

    if (users[key]) {
      throw new Error('An account with this email address already exists.');
    }
    if (!name.trim()) {
      throw new Error('Please enter your full name.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const hash    = await hashPassword(password);
    const created = new Date().toISOString();
    users[key]    = { name: name.trim(), email: key, hash, created };
    writeUsers(users);

    const session = { name: name.trim(), email: key, created };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  };

  /* login — verifies credentials and creates a session */
  const login = async (email, password) => {
    const users  = readUsers();
    const key    = email.toLowerCase().trim();
    const stored = users[key];

    if (!stored) {
      throw new Error('No account found with this email address.');
    }

    const hash = await hashPassword(password);
    if (hash !== stored.hash) {
      throw new Error('Incorrect password. Please try again.');
    }

    const session = { name: stored.name, email: key, created: stored.created };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return session;
  };

  /* logout — clears the session */
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
