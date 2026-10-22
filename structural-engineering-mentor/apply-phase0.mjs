#!/usr/bin/env node
// STRUCTIQ Phase 0 patcher. Run from the project root:
//   node apply-phase0.mjs --dry-run   (lists what it would change, writes nothing)
//   node apply-phase0.mjs             (applies; originals saved to .backup-phase0/)
//   node apply-phase0.mjs --undo      (restores the originals)
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const FLAGS = new Set(process.argv.slice(2));
const DRY = FLAGS.has('--dry-run');
const UNDO = FLAGS.has('--undo');
const BK = path.join(root, '.backup-phase0');
const FILES = {
  main: 'src/main.jsx',
  data: 'src/data/knowledge.js',
  css: 'src/styles.css',
  html: 'index.html',
};

const stop = (msg) => { console.error('\nSTOPPED: ' + msg + '\nNo files were changed.'); process.exit(1); };
const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

if (UNDO) {
  if (!fs.existsSync(BK)) stop('No .backup-phase0 folder found.');
  for (const rel of Object.values(FILES)) {
    const b = path.join(BK, rel);
    if (fs.existsSync(b)) { fs.copyFileSync(b, path.join(root, rel)); console.log('restored', rel); }
  }
  process.exit(0);
}

for (const rel of Object.values(FILES))
  if (!fs.existsSync(path.join(root, rel)))
    stop(`Expected file not found: ${rel}\nRun this from the project root (the folder containing package.json and src/).`);

const orig = Object.fromEntries(Object.entries(FILES).map(([k, rel]) => [k, read(rel)]));
const norm = (t) => t.replace(/\r\n/g, '\n');

if (!/from '\.\/data\/knowledge'/.test(norm(orig.main)))
  stop("src/main.jsx does not import './data/knowledge'. Your project differs from the version I audited.");

const patched = norm(orig.main).includes('ConceptCard') && norm(orig.data).includes('knowledgeById');
if (patched) { console.log('Phase 0 already applied. Nothing to do.'); process.exit(0); }

function apply(name, text, pairs = [], regexes = [], globals = []) {
  const crlf = text.includes('\r\n');
  let s = norm(text);
  for (const [a, b] of pairs) {
    const n = s.split(a).length - 1;
    if (n !== 1) stop(`${name}: expected exactly 1 match, found ${n} for:\n  ${a.slice(0, 70).replace(/\n/g, '\\n')}`);
    s = s.replace(a, () => b);
  }
  for (const [re, b] of regexes) {
    if (!re.test(s)) stop(`${name}: pattern not found: ${re}`);
    s = s.replace(re, () => b);
  }
  for (const [a, b] of globals) {
    if (!s.includes(a)) stop(`${name}: expected to find ${a}`);
    s = s.split(a).join(b);
  }
  return { out: crlf ? s.replace(/\n/g, '\r\n') : s, edits: pairs.length + regexes.length + globals.length };
}

// ---------------- src/data/knowledge.js ----------------
const FIND = String.raw`export const knowledgeById = new Map(knowledge.map((k) => [k.id, k]));

const STOP = new Set(['an','the','is','are','was','were','be','what','why','how','when','where','which','who','does','do','did','can','could','should','would','will','of','in','on','at','to','for','and','or','it','its','this','that','with','about','explain','tell','me','my','if','happens','happen']);
const stem = (w) => w.replace(/(ing|ed|es|s|e)$/, '');
const tokens = (t) =>
  (String(t).toLowerCase().match(/[a-z0-9]+/g) || [])
    .filter((w) => w.length > 1 && !STOP.has(w))
    .map(stem)
    .filter(Boolean);

// token matches exactly, or by prefix for fragments of 4+ letters ("stiff" -> stiffness)
const has = (list, t) => list.includes(t) || (t.length >= 4 && list.some((w) => w.startsWith(t)));

function score(k, qt) {
  const title = tokens(k.title + ' ' + k.id.replace(/-/g, ' '));
  const summary = tokens(k.summary);
  const def = tokens(k.sections?.definition ?? '');
  const rel = (k.sections?.related ?? []).flatMap((r) => tokens(r.replace(/-/g, ' ')));
  return qt.reduce(
    (s, t) => s + (has(title, t) ? 5 : 0) + (has(summary, t) ? 2 : 0) + (has(def, t) ? 1 : 0) + (has(rel, t) ? 1 : 0),
    0
  );
}

// Natural-language lookup: ranks concepts by matching question words
// against title/id (strong), summary, definition and related ids (weak).
export function findKnowledge(q) {
  const qt = [...new Set(tokens(q))];
  if (!qt.length) return undefined;
  let best;
  let bestScore = 0;
  for (const k of knowledge) {
    const sc = score(k, qt);
    if (sc > bestScore) { best = k; bestScore = sc; }
  }
  return best;
}
`;
let dataText = orig.data;
{
  const crlf = dataText.includes('\r\n');
  let s = norm(dataText);
  const i = s.indexOf('export function findKnowledge(q)');
  if (i < 0) stop('knowledge.js: findKnowledge() not found.');
  if (s.indexOf('export', i + 10) !== -1) stop('knowledge.js: unexpected exports after findKnowledge(); not patching.');
  dataText = (crlf ? (x) => x.replace(/\n/g, '\r\n') : (x) => x)(s.slice(0, i) + FIND);
}
const R_data = apply('knowledge.js', dataText, [["        'bending-moment',\n", "        'moment',\n"]]);

// ---------------- src/main.jsx ----------------
const NEW_COMPONENTS = String.raw`function ConceptCard({ k, selected, onChoose }) {
  const related = k.sections?.related ?? [];
  return (
    <button
      type="button"
      className={selected ? 'concept selected' : 'concept'}
      aria-pressed={selected}
      onClick={() => onChoose(k)}
    >
      <span className="conceptTop">
        <span>{k.category}</span>
        <ArrowRight size={16} aria-hidden="true" />
      </span>
      <span className="cTitle">{k.title}</span>
      <span className="cSummary">{k.summary}</span>
      <span className="relatedMini">
        {related.slice(0, 3).map((x) => (
          <span key={x}>{x.replaceAll('-', ' ')}</span>
        ))}
      </span>
    </button>
  );
}

// Related concept that exists -> clickable. Not written yet -> inert chip.
function RelatedChip({ id, onChoose }) {
  const k = knowledgeById.get(id);
  if (!k) {
    return (
      <span className="pending" title="Concept not written yet">
        {id.replaceAll('-', ' ')}
      </span>
    );
  }
  return (
    <button type="button" onClick={() => onChoose(k)}>
      {k.title}
    </button>
  );
}

class ErrorBoundary extends React.Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <div role="alert" style={{ padding: 40 }}>
          Something went wrong while rendering the knowledge base. Check the
          browser console, then reload.
        </div>
      );
    }
    return this.props.children;
  }
}

function Detail({ label, text }) {`;
const R_main = apply('main.jsx', orig.main, [
  ["import React, { useMemo, useState } from 'react';", "import React, { useMemo, useRef, useState } from 'react';"],
  ["import { knowledge, categories, findKnowledge } from './data/knowledge';", "import { knowledge, knowledgeById, categories, findKnowledge } from './data/knowledge';"],
  ["  const choose = (k) => {\n    setSelected(k);\n    setMessages([]);\n    setMobile(false);\n  };",
   "  const detailRef = useRef(null);\n\n  const choose = (k) => {\n    setSelected(k);\n    setMobile(false);\n    detailRef.current?.scrollTo({ top: 0 });\n  };"],
  ["STRUCTURE<span>MENTOR</span>", "STRUCT<span>IQ</span>"],
  ['className="mobileBtn"', 'className="mobileBtn" type="button" aria-label="Toggle navigation" aria-expanded={mobile}'],
  ['placeholder="Search any engineering concept..."', 'aria-label="Search concepts"\n            placeholder="Search any engineering concept..."'],
  ['placeholder="Try: P-Delta, shear force, stiffness..."', 'aria-label="Search concepts"\n                  placeholder="Try: P-Delta, shear force, stiffness..."'],
  ['placeholder="Ask a structural engineering question..."', 'aria-label="Ask the mentor"\n                  placeholder="Ask a structural engineering question..."'],
  ['<div className="messages">', '<div className="messages" aria-live="polite">'],
  ['<aside className="detail">', '<aside className="detail" ref={detailRef} aria-label="Concept detail">'],
  ['<App />', '<ErrorBoundary><App /></ErrorBoundary>'],
  ['function Detail({ label, text }) {', NEW_COMPONENTS],
], [
  [/\{filtered\.map\(\(k\) => \([\s\S]*?<\/button>\s*\)\)\}/,
   "{filtered.map((k) => (\n                  <ConceptCard key={k.id} k={k} selected={selected?.id === k.id} onChoose={choose} />\n                ))}"],
  [/\{selected\.sections\.related\.map\(\(r\) => \{[\s\S]*?\n\s*\}\)\}/,
   "{(selected.sections?.related ?? []).map((r) => (\n                      <RelatedChip key={r} id={r} onChoose={choose} />\n                    ))}"],
]);

// ---------------- src/styles.css ----------------
const R_css0 = apply('styles.css', orig.css, [
  [".concept h3{font-size:19px;margin:16px 0 7px}.concept p{font-size:13px;color:#6a736b;line-height:1.5;margin:0 0 14px}",
   ".concept .cTitle{display:block;font-size:19px;font-weight:700;margin:16px 0 7px}.concept .cSummary{display:block;font-size:13px;color:#6a736b;line-height:1.5;margin:0 0 14px}"],
  [".mobileBtn{display:none;border:0;background:none}", ".mobileBtn{display:none;border:0;background:none;color:#33463a;cursor:pointer}"],
  [".mobileBtn{color:#33463a}", ""],
  ["@media(max-width:1000px){", "@media(max-width:1180px){.contentGrid{grid-template-columns:1fr}.detail{position:relative;top:auto;max-height:none}}@media(max-width:1000px){"],
], [], [["#8b938a", "#666f66"], ["#778078", "#606a62"], ["#839078", "#5f6d56"], ["#808980", "#626b63"]]);
const CSS_ADD = `
.concept{font:inherit;color:#18201b}
.related .pending{border:1px dashed #415344;color:#a3ae9f;border-radius:999px;padding:7px 9px;font-size:11px}
button:focus-visible,.concept:focus-visible{outline:2px solid #244734;outline-offset:2px}
.detail button:focus-visible{outline-color:#b5c59e}
.topSearch:focus-within,.heroSearch:focus-within,.chatForm input:focus-visible{outline:2px solid #244734;outline-offset:2px}
@media(prefers-reduced-motion:reduce){*{transition:none!important;animation:none!important}}
`;
const cssEol = R_css0.out.includes('\r\n') ? '\r\n' : '\n';
const R_css = { out: R_css0.out + CSS_ADD.replace(/\n/g, cssEol), edits: R_css0.edits + 1 };

// ---------------- index.html ----------------
const R_html = apply('index.html', orig.html, [[
  /<title>[^<]*<\/title>/.source ? orig.html.match(/<title>[^<]*<\/title>/)?.[0] ?? '<title>' : '<title>',
  '<title>STRUCTIQ — Structural Engineering Knowledge</title>\n    <meta name="description" content="Understand structures. Think like an engineer." />\n    <meta name="theme-color" content="#244734" />',
]]);

// ---------------- validator (new file) ----------------
const VALIDATOR = String.raw`import { knowledge } from '../src/data/knowledge.js';

const REQUIRED = ['definition','physical','behaviour','loadPath','equation','analysis',
  'resultInterpretation','practice','designThinking','construction','failureReasoning','related'];
const ids = new Set(knowledge.map((k) => k.id));
const errors = [], warnings = [];

if (ids.size !== knowledge.length) errors.push('Duplicate concept ids');
for (const k of knowledge) {
  for (const f of REQUIRED) if (!k.sections?.[f]) errors.push(k.id + ': missing "' + f + '"');
  for (const r of k.sections?.related ?? [])
    if (!ids.has(r)) warnings.push(k.id + ': related "' + r + '" has no entry yet');
}
const stubs = [...new Set(warnings.map((w) => w.split('"')[1]))];
console.log(knowledge.length + ' concepts checked.');
errors.forEach((e) => console.error('ERROR  ', e));
console.log(stubs.length + ' related ids still unwritten:\n  ' + stubs.join(', '));
process.exit(errors.length ? 1 : 0);
`;

// ---------------- report / write ----------------
const plan = [
  [FILES.main, R_main], [FILES.data, R_data], [FILES.css, R_css], [FILES.html, R_html],
];
console.log(DRY ? '\nDRY RUN - these files WOULD be modified:\n' : '\nModifying:\n');
for (const [rel, r] of plan) console.log(`  ${rel}  (${r.edits} edits)`);
console.log('  scripts/validate-knowledge.mjs  (new file)');
console.log('\nNOT touched: package.json, package-lock.json, vite config, Knowledge/, src/components/, any other file.');
if (DRY) { console.log('\nRun again without --dry-run to apply.'); process.exit(0); }

for (const [rel] of plan) {
  const dest = path.join(BK, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (!fs.existsSync(dest)) fs.copyFileSync(path.join(root, rel), dest);
}
for (const [rel, r] of plan) fs.writeFileSync(path.join(root, rel), r.out);
fs.mkdirSync(path.join(root, 'scripts'), { recursive: true });
fs.writeFileSync(path.join(root, 'scripts/validate-knowledge.mjs'), VALIDATOR);
console.log('\nDone. Originals saved in .backup-phase0/ (undo with: node apply-phase0.mjs --undo)');
