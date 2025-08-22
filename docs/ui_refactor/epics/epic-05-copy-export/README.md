# Epic 5: Basic Copy & Export (Phase 2)

**Goal:** Simple copy and download functionality.

**Estimate:** 1–2 dev-days

## User Stories
- As a user, I can copy the formatted JSON
- As a user, I can download the JSON as a file

## Key Tasks
- [ ] **Copy button** (copies current JSON content)
- [ ] **Download button** (downloads as .json file)
- [ ] **Basic clipboard and download utilities**

## Acceptance Criteria
- [ ] Copy button copies formatted JSON to clipboard
- [ ] Download button saves JSON as file
- [ ] Visual feedback on copy success (brief highlight or browser notification)

## Files to Create/Modify
- `src/components/Toolbar/`: CopyButton.tsx, DownloadButton.tsx
- `src/utils/`: clipboard.ts, download.ts