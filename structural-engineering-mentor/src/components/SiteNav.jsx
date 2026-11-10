import React from "react";

const LINKS = [
  ["knowledge", "Knowledge"],
  ["codes", "Code Learning"],
  ["mentor", "Mentor"],
  ["about", "About & Sources"]
];

export default function SiteNav({ current, onNavigate }) {
  return (
    <header className="topbar">
      <a className="skip-link" href="#main">Skip to content</a>
      <button className="brand brand-btn" onClick={() => onNavigate("home")} aria-label="StructIQ home">
        <div className="brand-mark"><span></span><span></span><span></span></div>
        <div className="brand-text"><strong>STRUCTIQ</strong><small>STRUCTURAL ENGINEERING SYSTEM</small></div>
      </button>
      <nav className="nav-links" aria-label="Primary">
        {LINKS.map(([id, label]) => (
          <button key={id} onClick={() => onNavigate(id)} className={"nav-link" + (current === id ? " active" : "")}
            aria-current={current === id ? "page" : undefined}>{label}</button>
        ))}
      </nav>
      <div className="nav-status"><span className="status-dot"></span>EDUCATIONAL USE</div>
    </header>
  );
}
