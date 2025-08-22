# UI Refactor Plan

### Goal
Reduce visual and cognitive load while preserving all current capabilities: validation, formatting, tree exploration, filtering/search, clipboard/download, themes, big-file performance, and persistence.

### Principles to guide simplification
- One primary task per area: “Edit JSON” and “Explore JSON”
- Progressive disclosure: hide advanced options behind popovers/menus
- Contextual actions: show commands where/when they are relevant
- Reduce chrome: fewer persistent controls; lean on shortcuts and a command palette
- Keep orientation: always show where errors, filters, and navigation apply

---
### Overview
Below is a pragmatic breakdown of the large refactor into epics, user stories, tasks, acceptance criteria, dependencies, estimates, risks, and rollout. It maps to your current stack (React + TypeScript + Vite) and directory layout (src/components, utils, workers, hooks, App.tsx).

---

### Global assumptions and conventions
- Tech: React + TypeScript, Vite, Monaco/CodeMirror, Web Workers.
- Feature flags: use a simple runtime config (e.g., localStorage or a config object) to gate new UI per-area.
- State management: React Context + hooks; avoid introducing new global state libs unless needed.
- Accessibility: ARIA roles for tree, keyboard navigation for all controls.
- Telemetry (optional): lightweight event logger with noop prod fallback.

---

### Epic 1: AppShell & Layout Refactor (Phase 1)
Goal: Introduce simplified layout, contextual toolbar, status pill, and view modes.

User stories
- As a user, I can switch between Editor | Both | Tree via a segmented control.
- As a user, I can see validation/size status in a compact pill in the top bar.
- As a user, I can resize the split panes and the app remembers my last layout.

Key tasks
- AppShell frame
  - Create TopBar component (title, global search input placeholder, palette button, theme toggle, StatusPill).
  - Create Workspace with SplitPane.
  - Create ViewSwitcher (segmented control) and wire to layout.
- Contextual Toolbar (single row)
  - Implement Toolbar container that renders groups based on active view(s).
  - Group: Primary actions (Validate, Format dropdown), Copy split-button, Export split-button, ViewSwitcher.
- StatusPill
  - Shows Valid/Invalid, error count, size, lines.
- Persistence
  - Persist view mode and pane sizes to localStorage.

Acceptance criteria
- Three view modes work, persist across reloads.
- Toolbar shows only relevant controls for current view.
- Status pill updates based on editor validation state and file metadata.

Dependencies
- Minimal editor validation event(s) to feed StatusPill.

Estimate
- 6–8 dev-days.

Risks
- Layout regressions on small viewports. Mitigate with responsive checks and snapshot tests.

---

### Epic 2: Editor Area Simplification (Phase 1)
Goal: Inline validation, first-error banner, format actions unified.

User stories
- As a user, I see errors inline with gutter markers and the first error summarized at the top of the editor.
- As a user, I can Validate (Ctrl/Cmd+Enter) and jump to first error.
- As a user, I can Beautify/Minify/Escape/Unescape from one Format dropdown.

Key tasks
- Validation service
  - Hook to parse JSON (main thread for small, worker for large) and emit {valid, errors[], firstError}.
  - Gutter/inline decorations API for Monaco/CodeMirror.
- InlineErrorBanner component (sticky in editor area until resolved).
- FormatMenu
  - Actions: Beautify (indent 2/4/tab), Minify, Escape, Unescape; show toast feedback.
  - Auto-detect indentation; override stored preference.
- Keyboard shortcuts: validate and formatting.

Acceptance criteria
- Invalid JSON shows gutter markers and a small banner; clicking status pill scrolls to error.
- Format actions mutate editor content and are undoable.

Dependencies
- Workers for big files (Epic 8) optional for first pass; can stub.

Estimate
- 5–7 dev-days.

Risks
- Editor API differences (Monaco vs CodeMirror). Mitigate with an EditorAdapter interface.

---

### Epic 3: Tree Explorer Simplification (Phase 1)
Goal: Single-row toolbar, depth controls, contextual node actions.

User stories
- As a user, I can expand/collapse all and expand to depth N quickly.
- As a user, I can copy key/value/JSONPath from a node via hover menu.
- As a user, I see breadcrumbs only when a node is selected.

Key tasks
- TreeToolbar with controls: Search mirror slot, Expand All, Collapse All, Depth slider (1–5).
- NodeRow actions (hover three-dot menu): Copy key/value/jsonpath.
- Breadcrumbs (conditional render when selection exists).
- Keyboard navigation (left/collapse, right/expand, enter/select).

Acceptance criteria
- Depth expansion works for nested structures; performance acceptable for big trees (lazy render).
- Hover menu appears on focus/hover with keyboard support.

Dependencies
- Tree data model and selection store.

Estimate
- 5–7 dev-days.

Risks
- Performance for large objects; ensure virtualization or incremental expansion.

---

### Epic 4: Unified Search/Filter (Phase 2)
Goal: One input that adapts to context; options popover.

User stories
- As a user, I press Ctrl/Cmd+F to search; in Editor-only it searches text; in Tree/Both it filters nodes by key/value.
- As a user, I can toggle Keys/Values/Regex/Case options via a popover.

Key tasks
- GlobalSearch component (lives in TopBar, controlled state; focus on Ctrl/Cmd+F).
- SearchOptionsPopover (checkboxes; persists last settings).
- Editor search integration (native editor find or custom wrapper).
- Tree filter integration (existing utils with highlighting and match count chips).

Acceptance criteria
- Single input controls both contexts; keyboard navigation cycles matches with Enter.
- Escape clears search and removes highlights.

Dependencies
- Tree filter utils; editor adapter API.

Estimate
- 4–6 dev-days.

Risks
- Regex edge cases; add tests for escaping and performance.

---

### Epic 5: Command Palette (Phase 3)
Goal: Reduce visible chrome; expose all commands via palette.

User stories
- As a power user, I can invoke commands via Ctrl/Cmd+K and fuzzy search.

Key tasks
- CommandRegistry: definitions, shortcuts, enablement predicates, and handlers.
- Palette UI with typeahead, sections, and shortcut hints.
- Wire commands: validate, format modes, view toggles, tree expand/collapse/depth, copy variants, export variants, theme toggle.

Acceptance criteria
- All toolbar actions discoverable and runnable from palette.
- Palette respects enablement (e.g., JSONPath actions only when node selected).

Dependencies
- All command handlers from other epics in place.

Estimate
- 4–6 dev-days.

Risks
- Keyboard focus traps; test with screen readers.

---

### Epic 6: Copy & Export Split Buttons (Phase 3)
Goal: Consolidate copy/export into two split controls.

User stories
- As a user, I can copy JSON or minified JSON; copy JSONPath (if node selected).
- As a user, I can download as .json or .txt.

Key tasks
- CopySplitButton, ExportSplitButton components.
- Clipboard utils, download helpers.
- Toasts for success.

Acceptance criteria
- Split buttons remember last action as primary; secondary in dropdown.

Dependencies
- Tree selection; formatting utils.

Estimate
- 2–3 dev-days.

---

### Epic 7: Notifications & Feedback (Phase 3–4)
Goal: Non-blocking toasts; validation feedback in place.

User stories
- As a user, I see a small toast after actions like format/copy/export.

Key tasks
- ToastProvider and useToast hook.
- Standard messages for all actions.

Acceptance criteria
- Toasts are accessible and auto-dismiss.

Estimate
- 1–2 dev-days.

---

### Epic 8: Performance & Large File Indicators (Phase 1/4)
Goal: Keep app responsive with multi-MB JSON.

User stories
- As a user, I see a subtle Working overlay with cancel during long operations.
- As a user, I see a large file indicator in StatusPill when input is big.

Key tasks
- Workerization of parse/format paths.
- Size detection and threshold heuristics.
- Cancellation tokens for operations.

Acceptance criteria
- UI stays responsive while parsing/formatting large files; can cancel operations.

Dependencies
- Workers and messaging contract.

Estimate
- 5–8 dev-days.

Risks
- Worker transfer costs; chunking strategy may be needed.

---

### Epic 9: Accessibility & Keyboard Coverage (Phase 4)
Goal: Full keyboard operation and ARIA compliance.

User stories
- As a keyboard user, I can operate all controls and navigate the tree.

Key tasks
- Audit focus states, ARIA roles (aria-tree, aria-expanded, aria-level), labels.
- Provide focus outlines and roving tabindex in tree.

Acceptance criteria
- Axe audit passes for critical flows; keyboard shortcuts documented in UI.

Estimate
- 2–4 dev-days.

---

### Epic 10: Persistence & Smart Defaults (Phase 4)
Goal: Remember preferences; detect intent on paste.

User stories
- As a user, my last view mode and format settings persist.
- On paste, if content looks like a JSON string literal vs raw JSON, I’m prompted to Escape/Unescape.

Key tasks
- Local storage service + schema versioning.
- Paste detector and subtle suggestion banner with actions.

Acceptance criteria
- Settings survive reloads; suggestion banner appears only when applicable.

Estimate
- 2–3 dev-days.

---

### Epic 11: QA, Metrics, and Error Reporting (Phase 1–4)
Goal: Confidence and observability.

Key tasks
- Unit tests for utils (validate, beautify, filter, escape/unescape).
- Component tests for Toolbar, Editor, Tree, Search, Palette.
- E2E happy-path scenarios (paste, validate, format, filter, copy, export).
- Optional telemetry events (command usage, search usage, expand depth), behind opt-in.

Acceptance criteria
- Test coverage on critical logic; green CI.

Estimate
- 4–6 dev-days (parallelizable).

---

### Epic 12: Docs, Demos, and Screenshots (Phase 4)
Goal: Keep README and demo aligned.

Key tasks
- Update README with simplified UI, shortcuts table, screenshots.
- Publish demo (GitHub Pages/Netlify) with new UI.

Acceptance criteria
- README matches shipped UI; demo deployed.

Estimate
- 1–2 dev-days.

---

### Component and file mapping (suggested)
- src/App.tsx: AppShell wiring, feature flags, providers (Toast, CommandRegistry).
- src/components/TopBar/: TopBar.tsx, StatusPill.tsx, GlobalSearch.tsx, ThemeToggle.tsx, PaletteButton.tsx.
- src/components/Toolbar/: Toolbar.tsx, FormatMenu.tsx, CopySplitButton.tsx, ExportSplitButton.tsx.
- src/components/Layout/: SplitPane.tsx, ViewSwitcher.tsx.
- src/components/Editor/: Editor.tsx (adapter), InlineErrorBanner.tsx.
- src/components/Tree/: TreeView.tsx, TreeToolbar.tsx, NodeRow.tsx (hover menu), Breadcrumbs.tsx.
- src/components/Palette/: CommandPalette.tsx.
- src/components/Toasts/: ToastProvider.tsx.
- src/hooks/: useValidation.ts, useSearch.ts, useCommands.ts, useLocalStorage.ts.
- src/utils/: json.ts (parse/format), filter.ts, clipboard.ts, download.ts, jsonpath.ts, indent.ts, detect.ts.
- src/workers/: jsonWorker.ts (parse/format), types.ts.

---

### Phase plan (ship in slices)
- Phase 1: IA + layout + inline errors + status pill + core tree simplification + large-file indicator
  - Epics: 1, 2, 3, 8 (subset), 11 (subset)
- Phase 2: Unified search/filter
  - Epics: 4, 11 (subset)
- Phase 3: Command palette + split-buttons + toasts
  - Epics: 5, 6, 7, 11 (subset)
- Phase 4: Polish, accessibility, persistence, docs & demo
  - Epics: 9, 10, 12, finalize 8, 11

---

### Backlog as granular tickets (sample JIRA/GitHub issues)
1. AppShell: Introduce feature flag `uiV2` and skeleton layout (3)
2. SplitPane: Resizable with persisted sizes (2)
3. ViewSwitcher: Editor | Both | Tree (2)
4. StatusPill: Valid/Invalid, size, line count (2)
5. Toolbar container: contextual grouping (3)
6. FormatMenu: Beautify/Minify/Escape/Unescape, indent options (3)
7. Validation hook: parse + decorate editor, first-error banner (3)
8. EditorAdapter: unify Monaco/CodeMirror APIs (3)
9. TreeToolbar: expand/collapse/depth slider (3)
10. Node hover actions: copy key/value/jsonpath (2)
11. Breadcrumbs: conditional render on selection (2)
12. Workerize parse/format for large JSON + cancel overlay (5)
13. GlobalSearch: Ctrl/Cmd+F focus + options popover (3)
14. Editor search integration (2)
15. Tree filter integration + match chips (3)
16. CommandRegistry + CommandPalette MVP (4)
17. Wire commands to palette (2)
18. CopySplitButton + ExportSplitButton + toasts (3)
19. ToastProvider + standard messages (2)
20. Accessibility pass for Tree (roles, keyboard) (3)
21. Persist view/format settings; paste detector suggestion (3)
22. Tests: utils unit tests (3)
23. Tests: component tests for Toolbar/Tree/Search (3)
24. E2E: key flows (3)
25. README update + screenshots + demo deploy (2)

Numbers in parentheses are rough story points (1–5). Adjust to your team’s scale.

---

### Dependencies graph (high-level)
- 1 → 2, 3, 5
- 3 → 1
- 4 depends on 7
- 5 depends on 6, 18 partially
- 6 depends on utils
- 7 depends on EditorAdapter (8)
- 9–11 depend on TreeView being mountable and selection model
- 12 can begin early but wires into 7 and 6
- 13–15 depend on 1, 9
- 16–17 depend on most command handlers from 5–15
- 18–19 depend on 5 and utils
- 20 can run after 9–11
- 21 independent but improves UX
- 22–24 can parallelize after base APIs exist
- 25 last

---

### Acceptance test checklist (per phase)
- Phase 1
  - Switch views, refresh, persists.
  - Paste invalid JSON: gutter markers + inline banner; status pill is red with count.
  - Tree expand to depth N works on nested sample; hover menu copies JSONPath.
  - >5MB JSON shows large-file indicator; long format shows Working overlay with cancel.
- Phase 2
  - Ctrl/Cmd+F in Editor-only searches text; in Both/Tree filters nodes.
  - Options popover toggles Keys/Values/Regex/Case and persists.
- Phase 3
  - Ctrl/Cmd+K opens palette; all toolbar actions available and runnable.
  - Copy/Export split buttons remember last action; toasts appear.
- Phase 4
  - Keyboard-only flows succeed; Axe audit clean for key components.
  - Settings persist; paste suggestion appears for string-literal input.
  - README matches app; demo deploy loads.

---

### Engineering notes and contracts
- EditorAdapter interface
  - Methods: getValue, setValue, decorateErrors([{line, col, message}]), clearDecorations, revealPosition(line, col), findNext(term, options), onChange(cb).
- Validation result shape
  - { valid: boolean, errors: Array<{line:number, column:number, message:string}>, sizeBytes: number, lineCount: number }
- Tree node copy actions
  - copyValue uses JSON.stringify(value); copyKey uses raw key; copyPath uses jsonpath util.
- Search options
  - { inKeys:boolean, inValues:boolean, regex:boolean, caseSensitive:boolean }

---

### Risk register and mitigations
- Performance regressions on very large JSON
  - Mitigate with workerization, virtualization in Tree, and throttled filter.
- Editor portability (Monaco vs CodeMirror)
  - Abstract via EditorAdapter + test both in storybook/sandboxes if used.
- Scope creep for palette and search
  - Timebox MVP, move advanced features to follow-ups.
- Accessibility gaps
  - Schedule early audits on Tree and Palette.

---

### Rollout and flag plan
- Ship UI V2 behind `uiV2` flag.
- Dogfood with internal default-on; allow users to toggle in settings/dev menu.
- Collect telemetry (if opted-in) on command usage and search to confirm simplification goals.
- Gradually remove V1 code after parity checks.

---

### Suggested two-sprint plan (example)
- Sprint 1 (Epics 1, 2, 3 core + 11 partial)
  - Issues: 1–12, 22–23 (partial), 24 (basic), flagging and CI.
- Sprint 2 (Epics 4, 5, 6, 7 + polish)
  - Issues: 13–21, 18–19, finalize tests, docs and demo.
- Sprint 3 (buffer / hardening, accessibility, telemetry, docs)
  - Issues: 20–25 and perf tuning.

---

### What you can do next
- Copy the ticket list into your tracker and tag with Epic/Phase.
- Create a `feature/uiV2` branch; scaffold AppShell and TopBar with a static layout to start verifying the direction.
- Stand up minimal CommandRegistry and keybindings early to avoid rework.

If helpful, I can generate the initial code scaffolds (component files with props/contracts) or turn this into GitHub Issues via a script-ready CSV/JSON.
