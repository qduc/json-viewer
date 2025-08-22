# Epic 2: Editor Area Simplification (Phase 1)

**Goal:** Inline validation, first-error banner, format actions unified.

**Estimate:** 5–7 dev-days

## User Stories
- As a user, I see errors inline with gutter markers and the first error summarized at the top of the editor
- As a user, I can Validate (Ctrl/Cmd+Enter) and jump to first error
- As a user, I can Beautify/Minify/Escape/Unescape from one Format dropdown

## Key Tasks
- [ ] **Validation service**
  - [ ] Hook to parse JSON (main thread for small, worker for large) and emit {valid, errors[], firstError}
  - [ ] Gutter/inline decorations API for Monaco/CodeMirror
- [ ] **InlineErrorBanner component** (sticky in editor area until resolved)
- [ ] **FormatMenu**
  - [ ] Actions: Beautify (indent 2/4/tab), Minify, Escape, Unescape; show toast feedback
  - [ ] Auto-detect indentation; override stored preference
- [ ] **Keyboard shortcuts:** validate and formatting

## Acceptance Criteria
- [ ] Invalid JSON shows gutter markers and a small banner; clicking status pill scrolls to error
- [ ] Format actions mutate editor content and are undoable

## Dependencies
- Workers for big files (Epic 8) optional for first pass; can stub

## Risks
- Editor API differences (Monaco vs CodeMirror). Mitigate with an EditorAdapter interface

## Related Issues (from backlog)
6. FormatMenu: Beautify/Minify/Escape/Unescape, indent options (3)
7. Validation hook: parse + decorate editor, first-error banner (3)
8. EditorAdapter: unify Monaco/CodeMirror APIs (3)

## Files to Create/Modify
- `src/components/Editor/`: Editor.tsx (adapter), InlineErrorBanner.tsx
- `src/components/Toolbar/`: FormatMenu.tsx
- `src/hooks/`: useValidation.ts
- `src/utils/`: json.ts (parse/format), indent.ts

## EditorAdapter Interface Contract
```typescript
interface EditorAdapter {
  getValue(): string;
  setValue(value: string): void;
  decorateErrors(errors: Array<{line: number, col: number, message: string}>): void;
  clearDecorations(): void;
  revealPosition(line: number, col: number): void;
  findNext(term: string, options: SearchOptions): void;
  onChange(callback: (value: string) => void): void;
}
```

## Validation Result Shape
```typescript
interface ValidationResult {
  valid: boolean;
  errors: Array<{line: number, column: number, message: string}>;
  sizeBytes: number;
  lineCount: number;
}
```