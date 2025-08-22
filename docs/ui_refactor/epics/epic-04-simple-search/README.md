# Epic 4: Simple Search (Phase 2)

**Goal:** Basic search functionality without complexity.

**Estimate:** 2–3 dev-days

## User Stories
- As a user, I can search for text in the editor using Ctrl/Cmd+F
- As a user, I can filter tree nodes by typing in a simple search box

## Key Tasks
- [ ] **Simple search input** for tree filtering
- [ ] **Editor search integration** (use native editor find)
- [ ] **Basic tree filter** (simple string matching, no regex)

## Acceptance Criteria
- [ ] Simple search input filters tree nodes by key/value text
- [ ] Editor uses native browser search (Ctrl/Cmd+F)
- [ ] Clear search removes filter

## Dependencies
- Basic tree filter utility

## Files to Create/Modify
- `src/components/Tree/`: SimpleSearch.tsx
- `src/utils/`: filter.ts (basic string matching only)