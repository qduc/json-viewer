# Phase 1: Core Functionality

**Duration:** 3 weeks  
**Epics:** 1, 2, 3

## Goal
Build the essential JSON viewer functionality: layout, validation, formatting, and tree display.

## Success Criteria
- [ ] Editor | Tree view toggle works
- [ ] JSON validation shows errors inline
- [ ] Format dropdown (beautify/minify) works
- [ ] Tree displays JSON with expand/collapse
- [ ] Basic responsive layout

## Issues in This Phase (16 story points)
1. AppShell: Feature flag + skeleton layout (3)
2. SplitPane: Resizable layout (2)
3. ViewSwitcher: Editor | Tree (2)
4. StatusPill: Valid/Invalid indicator (1)
5. Toolbar: Basic container (2)
6. FormatMenu: Beautify/Minify (2)
7. Validation: Inline errors (2)
8. TreeView: Basic tree display (2)

## Testing Focus
- Layout works on mobile/desktop
- JSON parsing handles common edge cases
- Tree performance with moderately nested objects (~100 nodes)

## Delivery
A working JSON viewer where users can:
- Paste JSON and see it formatted
- Toggle between editor and tree views
- See validation errors
- Format JSON (beautify/minify)