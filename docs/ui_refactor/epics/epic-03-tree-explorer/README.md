# Epic 3: Tree Explorer Simplification (Phase 1)

**Goal:** Single-row toolbar, depth controls, contextual node actions.

**Estimate:** 5–7 dev-days

## User Stories
- As a user, I can expand/collapse all and expand to depth N quickly
- As a user, I can copy key/value/JSONPath from a node via hover menu
- As a user, I see breadcrumbs only when a node is selected

## Key Tasks
- [ ] **TreeToolbar** with controls: Search mirror slot, Expand All, Collapse All, Depth slider (1–5)
- [ ] **NodeRow actions** (hover three-dot menu): Copy key/value/jsonpath
- [ ] **Breadcrumbs** (conditional render when selection exists)
- [ ] **Keyboard navigation** (left/collapse, right/expand, enter/select)

## Acceptance Criteria
- [ ] Depth expansion works for nested structures; performance acceptable for big trees (lazy render)
- [ ] Hover menu appears on focus/hover with keyboard support

## Dependencies
- Tree data model and selection store

## Risks
- Performance for large objects; ensure virtualization or incremental expansion

## Related Issues (from backlog)
9. TreeToolbar: expand/collapse/depth slider (3)
10. Node hover actions: copy key/value/jsonpath (2)
11. Breadcrumbs: conditional render on selection (2)

## Files to Create/Modify
- `src/components/Tree/`: TreeView.tsx, TreeToolbar.tsx, NodeRow.tsx (hover menu), Breadcrumbs.tsx
- `src/utils/`: jsonpath.ts, clipboard.ts

## Tree Node Copy Actions Contract
- `copyValue` uses `JSON.stringify(value)`
- `copyKey` uses raw key
- `copyPath` uses jsonpath util

## Component Hierarchy
```
TreeView
├── TreeToolbar
│   ├── SearchMirrorSlot
│   ├── ExpandAllButton
│   ├── CollapseAllButton
│   └── DepthSlider (1-5)
├── TreeNodes (virtualized)
│   └── NodeRow
│       ├── ExpandToggle
│       ├── KeyValue
│       └── HoverMenu
│           ├── CopyKey
│           ├── CopyValue
│           └── CopyJSONPath
└── Breadcrumbs (conditional)
```