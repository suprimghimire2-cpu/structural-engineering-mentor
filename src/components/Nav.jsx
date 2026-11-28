import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { id: 'home',    label: 'Overview',   href: '#/'        },
  { id: 'explore', label: 'Knowledge',  href: '#/explore' },
  { id: 'mentor',  label: 'Mentor',     href: '#/explore#mentor' },
  { id: 'codes',   label: 'Code Learning', href: '#/codes' },
];

export default function Nav({ current = 'home' }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const hash = typeof window !== 'undefined' ? window.location.hash : '';
  const isActive = (id) => id === 'mentor'
    ? hash.includes('#mentor')
    : id === 'explore'
      ? current === 'explore' && !hash.includes('#mentor')
      : current === id;

  return (
    <nav className="sq-nav" aria-label="Main navigation">

      {/* Brand */}
      <a href="#/" className="sq-nav__brand" aria-label="StructIQ home">
        <svg className="sq-nav__mark" viewBox="0 0 36 36" aria-hidden="true">
          <path d="M7 28V8h22M7 18h22M18 8v20" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="7" cy="8" r="2.5" fill="currentColor"/><circle cx="29" cy="28" r="2.5" fill="currentColor"/>
        </svg>
        <span className="sq-nav__brandtext"><span className="sq-nav__brandword">StructIQ</span>
        <span className="sq-nav__brandsub">Structural Engineering Knowledge System</span>
        </span>
      </a>

      <button className="sq-nav__toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="sq-primary-links" onClick={() => setMenuOpen((open) => !open)}>
        {menuOpen ? <X aria-hidden="true"/> : <Menu aria-hidden="true"/>}
      </button>

      {/* Desktop links */}
      <div className={'sq-nav__links' + (menuOpen ? ' sq-nav__links--open' : '')} id="sq-primary-links">
        {NAV_LINKS.map(({ id, label, href, note }) => (
          <a
            key={id}
            href={href}
            className={
              'sq-nav__link' +
              (isActive(id)
                ? ' sq-nav__link--active'
                : '')
            }
            aria-current={isActive(id) ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
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
