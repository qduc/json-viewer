# Simplified UI Refactor Backlog

## Overview
Focused refactor that delivers core JSON viewer functionality without over-engineering. Total scope reduced from 70+ to ~20 story points.

## Core Philosophy
- Paste JSON → See it formatted → Copy what you need
- Keep it simple, fast, and reliable
- No enterprise features for a utility app

## Simplified Epic Structure

### Epic 1: AppShell & Layout (Phase 1)
Basic layout with Editor | Tree view switching
**Estimate:** 6-8 dev-days

### Epic 2: Editor Simplification (Phase 1)  
Inline validation + basic formatting
**Estimate:** 5-7 dev-days

### Epic 3: Tree Explorer (Phase 1)
Tree with expand/collapse + node actions
**Estimate:** 5-7 dev-days

### Epic 4: Simple Search (Phase 2)
Basic tree filtering + native editor search
**Estimate:** 2-3 dev-days

### Epic 5: Copy & Export (Phase 2)
Simple copy/download buttons
**Estimate:** 1-2 dev-days

## Phase Breakdown

### Phase 1: Core Functionality (~3 weeks)
**Goal:** Working JSON viewer with layout, validation, and tree

### Phase 2: Polish (~1 week)  
**Goal:** Search and copy/export functionality

## Simplified Task List

### Phase 1 Tasks (16 story points)
1. **AppShell: Feature flag + skeleton layout** (3 pts)
   - Epic: 1 | Create basic layout structure

2. **SplitPane: Resizable layout** (2 pts)
   - Epic: 1 | Simple resizable panes (no persistence needed)

3. **ViewSwitcher: Editor | Tree** (2 pts)
   - Epic: 1 | Toggle between Editor and Tree views

4. **StatusPill: Valid/Invalid indicator** (1 pt)
   - Epic: 1 | Simple validation status display

5. **Toolbar: Basic container** (2 pts)
   - Epic: 1 | Simple toolbar with format + copy buttons

6. **FormatMenu: Beautify/Minify** (2 pts)
   - Epic: 2 | Basic formatting dropdown (2/4 space, tabs, minify)

7. **Validation: Inline errors** (2 pts)
   - Epic: 2 | Show JSON errors inline, no complex banners

8. **TreeView: Basic tree display** (2 pts)
   - Epic: 3 | Expandable tree with JSON data

### Phase 2 Tasks (6 story points)
9. **Tree Controls: Expand/Collapse All** (1 pt)
   - Epic: 3 | Simple expand/collapse buttons

10. **Node Actions: Copy value** (1 pt)
    - Epic: 3 | Right-click or hover to copy node value

11. **Tree Search: Simple filter** (2 pts)
    - Epic: 4 | Basic text search that filters tree nodes

12. **Copy Button: Copy JSON** (1 pt)
    - Epic: 5 | Copy formatted JSON to clipboard

13. **Download Button: Save file** (1 pt)
    - Epic: 5 | Download JSON as .json file

## Removed Complexity
❌ Command palette (Ctrl+K)  
❌ Toast notifications  
❌ Web workers for large files  
❌ Accessibility audit passes  
❌ Settings persistence  
❌ Telemetry/metrics  
❌ Split buttons with memory  
❌ Advanced search options  
❌ Comprehensive test suite  

## Dependencies (Simplified)
```
1 → 2, 3, 5
6, 7 → 1
8 → 1
9, 10 → 8
11 → 8
12, 13 → 1
```

## File Structure (Simplified)
```
src/
├── App.tsx (AppShell)
├── components/
│   ├── Layout/ (SplitPane, ViewSwitcher)
│   ├── Toolbar/ (Toolbar, FormatMenu, CopyButton, DownloadButton)
│   ├── Editor/ (validation display)
│   └── Tree/ (TreeView, SimpleSearch)
└── utils/ (basic JSON, clipboard, download)
```

## Getting Started
1. Create branch: `git checkout -b feature/simplified-ui`
2. Start with Issue #1: AppShell skeleton
3. Work through Phase 1 issues 1-8
4. Add Phase 2 polish with issues 9-13
5. No feature flags needed - this is simple enough to ship directly

## Success Metrics
- Can paste JSON and see it formatted ✅
- Can toggle between editor and tree views ✅  
- Can copy formatted JSON ✅
- Can download as file ✅
- Can search/filter tree ✅
- Works on mobile ✅

**Total Estimate:** ~22 story points (4-5 weeks for 1 developer)