import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { id: 'home',    label: 'Home',       href: '#/'        },
  { id: 'explore', label: 'Knowledge',  href: '#/explore' },
  { id: 'mentor',  label: 'Mentor',     href: '#/explore#mentor' },
  { id: 'tools',   label: 'Tools',      href: '#/',        note: 'soon' },
];

export default function Nav({ current = 'home' }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const hash = typeof window !== 'undefined' ? window.location.hash : '';

  return (
    <nav className="sq-nav" aria-label="Main navigation">

      {/* Brand */}
      <a href="#/" className="sq-nav__brand" aria-label="StructIQ home">
        <span className="sq-nav__brandword">StructIQ</span>
        <span className="sq-nav__brandsub">Structural Engineering Knowledge System</span>
      </a>

      {/* Desktop links */}
      <div className="sq-nav__links">
        {NAV_LINKS.map(({ id, label, href, note }) => (
          <a
            key={id}
            href={href}
            className={
              'sq-nav__link' +
              (current === id ||
               (id === 'explore' && hash.startsWith('#/explore'))
                ? ' sq-nav__link--active'
                : '')
            }
          >
            {label}
            {note && <span className="sq-nav__note">{note}</span>}
          </a>
        ))}
      </div>

      {/* User controls */}
      {user && (
        <div className="sq-nav__user">
          <div
            className="sq-nav__avatar"
            aria-label={`Signed in as ${user.name}`}
            title={user.email}
          >
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="sq-nav__userinfo">
            <span className="sq-nav__username">{user.name}</span>
          </div>

          <button
            className="sq-nav__logout"
            type="button"
            onClick={logout}
            aria-label="Sign out"
          >
            Sign out
          </button>
        </div>
      )}

    </nav>
  );
}
