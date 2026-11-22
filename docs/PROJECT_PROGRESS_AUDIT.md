# StructIQ project progress audit

Date: 14 November 2026  
Source compared: `StructIQ_Foundation_Roadmap_and_Research_Guide_Updated(1).pdf` (27 pages, including the Code Learning addendum).  
`docs/StructIQ_Roadmap.pdf` is not in the repository. Application code was not changed for this audit.

Statuses: **COMPLETED**, **PARTIALLY COMPLETED**, **NOT STARTED**, **NEEDS VERIFICATION**.

## 1. Current architecture

React  + Vite single-page app. Hash router in `src/main.jsx`. No separate page per structural element.

| Route | Screen | Gate |
|---|---|---|
| `#/` | `src/pages/Home.jsx` | login required |
| `#/explore` and `#/explore/:id` | `src/pages/Explore.jsx` | login required |
| `#/codes` | `src/pages/Codes.jsx` | login required |
| no session | `src/pages/Auth.jsx` | localStorage accounts |

Knowledge lives in `src/data/knowledge.js` (54 concepts). Calculations live in `src/calculations/rcBeam.js`. Shared nav is `src/components/Nav.jsx` on Home and Codes only. Explore keeps its own header. `Knowledge/**/*.json` is not imported by the app.

## 2. Existing working features

- Production build succeeds (`npm run build`, Vite 8.3.5).
- Knowledge validation succeeds: 54 concepts, required sections present, every related id resolves (`npm run validate`).
- RC beam unit tests pass when the test file is run directly: 10/10 (`node --test src/calculations/rcBeam.test.js`).
- Home: engineering drawing, domain list, element table linked by real ids (`beam`, `column`, `slab`, `shear-wall`, `foundation`, `diaphragm`, `load-path`). Planned items have no fake links.
- Explore: category filter, title/summary search, data-driven detail (definition through failure, questions, related chips), keyword mentor.
- Codes: one simply supported RC beam compared across ACI 318, IS 456:2000 and Eurocode 2. Shows steps, a schematic section, a parabolic moment sketch, and an explicit “educational / not reviewed / not for design” notice.
- Auth prototype stores a salted SHA-256 hash in `localStorage` and warns it is not real security.

## 3. Incomplete features

- Search uses title and summary only. `searchKnowledge`, `getPrerequisites` and `getUnlockedBy` exist in data and are unused in the UI.
- Mentor returns one concept blurb. It does not use code, analysis results, or skill level.
- Code page covers flexure of one beam. No shear, deflection, cracking, anchorage, code registry, edition metadata, or reviewer record.
- Bar layout and moment diagram are teaching sketches, not a detailing or analysis engine.
- Homepage “Codes & Standards” is still marked planned even though `#/codes` exists.
- Explore and the rest of the app do not share one navigation component.

## 4. Missing features

- Learning paths, practice questions with feedback, and worked-example lessons (Phase 3).
- Roadmap’s first calculators: unit conversion, section properties, determinate-beam reactions / SFD / BMD / deflection (Phase 4).
- Code registry, jurisdiction/edition tracking, citation metadata, NBC and other families (Phase 5 and code-addendum Phase 1).
- Matrix analysis, software import, result normalisation (Phase 6).
- Cross-device accounts, project workspaces, collaboration, PWA (Phase 7).
- CI workflow. `npm run check` is defined but not run in GitHub Actions.
- Content authoring guide and visible source/review status on concepts.

## 5. Bugs and technical risks

- **`npm test` fails.** Script is `node --test src/calculations/`. On Node 24 that path is treated as a module and throws `MODULE_NOT_FOUND`. The tests themselves pass.
- **Mentor links use two hashes** (`#/explore#mentor` in `Nav.jsx` and `Home.jsx`). The browser keeps one hash, so the Mentor section is not a reliable target.
- **Login wall.** Unauthenticated visitors never see the homepage. Roadmap acceptance says `/` is the product homepage.
- **Calculator status.** Tests check internal equilibrium of the same formulas. They are not independent textbook or code-clause benchmarks. The UI already says clauses are not independently reviewed. Do not call this verified.
- **Duplicate knowledge.** `Knowledge/**/*.json` is unused and can drift from `knowledge.js`.
- **Auth.** Passwords and sessions are readable in the browser. Fine only as a local prototype.
- **Bundle.** Main JS chunk is about 569 kB (warning only).
- **Deployment.** `.vercel` is gitignored. No `vercel.json` in the repo. Live deploy was not checked.
- **Accessibility.** Labels and reduced-motion exist. No keyboard/screen-reader pass was run. **NEEDS VERIFICATION.**
- **Responsive layout.** CSS breakpoints exist in `home.css`, `auth.css` and `styles.css`. Not checked in a browser this pass. **NEEDS VERIFICATION.**

## 6. Roadmap comparison

### Main roadmap

| Phase | Status | What exists | What remains |
|---|---|---|---|
| 0 Prototype stabilisation | PARTIALLY COMPLETED | Build, `.gitignore`, knowledge validator, this audit | Fix `npm test` / `npm run check`; known-issues list was missing until this file; no baseline tag |
| 1 Homepage and architecture | PARTIALLY COMPLETED | Home, tokens, routing, real concept links, Knowledge and Mentor still work | Public homepage without login; one nav; fix Mentor hash; accessibility check not done |
| 2 Knowledge foundation | PARTIALLY COMPLETED | 54-concept schema, related graph, detail UI, validator | Prerequisites unused in UI; search is shallow; no sources/review status; validator not in CI; no authoring guide |
| 3 Learning paths and examples | NOT STARTED | Static path labels on the homepage only | A path a learner can finish, practice, and feedback |
| 4 Verified educational calculators | PARTIALLY COMPLETED | One RC flexure module with self-checks and limitations text | Unit conversion, section properties, beam SFD/BMD/deflection, independent benchmarks, engineering review record |
| 5 Loads, materials, codes, design | PARTIALLY COMPLETED | One scoped RC beam comparison with paraphrased refs | Registry, verified editions/clauses, loads system, full workflow beyond flexure |
| 6 Advanced analysis | NOT STARTED | — | Matrix methods, import/export, interpretation layer |
| 7 Personalisation and research | NOT STARTED | Local-only login prototype, which the roadmap says not to expand yet | Real accounts, workspaces, governance |

### Code Learning addendum

| Addendum phase | Status | What exists | What remains |
|---|---|---|---|
| 1 Code knowledge foundation | NOT STARTED | Hard-coded three codes inside the beam page | Registry, provenance, concept-to-code links |
| 2 Guided code lessons | PARTIALLY COMPLETED | One RC beam flexure page with steps | Lesson sequence tied to mechanics concepts |
| 3 Comparison workspace | PARTIALLY COMPLETED | Side-by-side ACI / IS 456 / EC2 numbers and philosophies | Valid comparison dimensions beyond flexure |
| 4 Detailing visualisation | PARTIALLY COMPLETED | Static section sketch and bar count | Annotated detail driven by provisions |
| 5 Verified calculators | PARTIALLY COMPLETED | Unit tests and on-screen “Draft” status | Independent review before any “verified” label |
| 6 Broader coverage | NOT STARTED | — | Steel, seismic, slabs, columns, more jurisdictions |
| 7 Professional workflows | NOT STARTED | — | Import, advanced analysis, AI |

## 7. Recommended implementation order

1. Make `npm test` and `npm run check` pass (close Phase 0).
2. Fix Mentor navigation and decide whether Home is public (close Phase 1).
3. Surface prerequisites and ranked search already in `knowledge.js` (Phase 2). No new content dump.
4. One beginner path using existing concept ids (Phase 3).
5. Only then add a determinate-beam educational calculator with benchmarks separate from the code-design page (Phase 4).
6. Keep the RC comparison, but add a small code-metadata record before adding clauses (Phase 5 / addendum Phase 1).

Do not rebuild Home, Explore, or the beam calculator. Do not add accounts, AI, or more codes in the next task.

## 8. Highest-priority next task

**Fix the test script so `npm test` runs `src/calculations/rcBeam.test.js`, then confirm `npm run check`.**

Phase 0 acceptance requires a working check of current behaviour. The suite already passes; the npm script does not.

**Files:** `package.json` only.
