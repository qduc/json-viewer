# Epic 1: AppShell & Layout Refactor (Phase 1)

**Goal:** Introduce simplified layout, contextual toolbar, status pill, and view modes.

**Estimate:** 6–8 dev-days

## User Stories
- As a user, I can switch between Editor | Both | Tree via a segmented control
- As a user, I can see validation/size status in a compact pill in the top bar
- As a user, I can resize the split panes and the app remembers my last layout

## Key Tasks
- [ ] **AppShell frame**
  - [ ] Create TopBar component (title, global search input placeholder, palette button, theme toggle, StatusPill)
  - [ ] Create Workspace with SplitPane
  - [ ] Create ViewSwitcher (segmented control) and wire to layout
- [ ] **Contextual Toolbar (single row)**
  - [ ] Implement Toolbar container that renders groups based on active view(s)
  - [ ] Group: Primary actions (Validate, Format dropdown), Copy split-button, Export split-button, ViewSwitcher
- [ ] **StatusPill**
  - [ ] Shows Valid/Invalid, error count, size, lines
- [ ] **Persistence**
  - [ ] Persist view mode and pane sizes to localStorage

## Acceptance Criteria
- [ ] Three view modes work, persist across reloads
- [ ] Toolbar shows only relevant controls for current view
- [ ] Status pill updates based on editor validation state and file metadata

## Dependencies
- Minimal editor validation event(s) to feed StatusPill

## Risks
- Layout regressions on small viewports. Mitigate with responsive checks and snapshot tests

## Related Issues (from backlog)
1. AppShell: Introduce feature flag `uiV2` and skeleton layout (3)
2. SplitPane: Resizable with persisted sizes (2)
3. ViewSwitcher: Editor | Both | Tree (2)
4. StatusPill: Valid/Invalid, size, line count (2)
5. Toolbar container: contextual grouping (3)

## Files to Create/Modify
- `src/App.tsx`: AppShell wiring, feature flags, providers
- `src/components/TopBar/`: TopBar.tsx, StatusPill.tsx, ThemeToggle.tsx, PaletteButton.tsx
- `src/components/Toolbar/`: Toolbar.tsx
- `src/components/Layout/`: SplitPane.tsx, ViewSwitcher.tsx