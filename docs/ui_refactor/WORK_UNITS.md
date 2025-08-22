# AI Work Unit Definition

## Work Unit Scope
**One AI session should complete exactly ONE task from the backlog.**

Each task is designed to be:
- **Completable in 1-2 hours** of focused work
- **Self-contained** with clear start/end boundaries  
- **Testable** in isolation
- **1-3 story points maximum**

## Work Unit Boundaries

### ✅ Good Work Unit (Complete 1 Task)
**Example: "Task 1: AppShell skeleton layout"**
- Create basic App.tsx structure
- Add ViewSwitcher placeholder  
- Create basic CSS layout
- Test that it renders
- Update PROGRESS.md
- Handoff with working skeleton

### ❌ Bad Work Unit (Too Much Scope)
**Example: "Complete Epic 1"**
- Would involve 5 different components
- Multiple files and concerns
- Hard to test incrementally
- Context becomes overwhelming
- Difficult to hand off cleanly

## Task Work Unit Rules

### Single Responsibility
Each work unit should have **ONE clear objective:**
- "Create the SplitPane component"
- "Add validation error display"  
- "Implement tree expand/collapse"

### Clear Entry/Exit Criteria

**Entry Criteria (Start of Session):**
- [ ] Read PROGRESS.md to understand current state
- [ ] Identify the specific task to work on
- [ ] Understand dependencies (what must exist first)

**Exit Criteria (End of Session):**
- [ ] Task is functionally complete and testable
- [ ] Files are created/modified as specified
- [ ] Basic manual testing shows it works
- [ ] PROGRESS.md is updated with completion status
- [ ] Next task is identified for the following AI

### File Organization Per Task
Each task should touch a **limited set of files:**
- **1-3 main files** (the component being built)
- **1-2 utility files** (helpers, types)
- **1 test/integration point** (manual verification)

## Task Size Guidelines

### 1 Story Point (Simple, 30-60 min)
- Single component with basic props
- Simple utility function
- Basic integration between existing components
- **Examples:** StatusPill, CopyButton, DownloadButton

### 2 Story Points (Medium, 1-2 hours)  
- Component with moderate logic
- Integration with state management
- Basic layout with multiple sub-components
- **Examples:** FormatMenu, TreeView, SimpleSearch

### 3 Story Points (Complex, 2-3 hours)
- Complex component with multiple responsibilities  
- New architectural patterns
- Integration across multiple systems
- **Examples:** AppShell skeleton, Validation system

### ⚠️ 4+ Story Points = Split the Task
If a task feels larger than 3 points, it should be broken down into smaller units.

## Context Management

### Keep Session Focused
- **Don't explore unrelated code** - only look at files needed for current task
- **Don't optimize existing code** - unless it's blocking current task
- **Don't add extra features** - stick to the task definition
- **Don't refactor** - build the minimum viable implementation

### Information Diet
**Only examine:**
- Files directly related to current task
- Dependencies needed for current task
- Existing patterns to copy for current task

**Avoid examining:**
- Entire codebase exploration
- Unrelated components
- Future tasks or epics
- Complex optimization opportunities

## Handoff Protocol

### Clean Handoff Checklist
- [ ] Current task is **complete and working**
- [ ] No **broken builds or errors**
- [ ] **PROGRESS.md updated** with current status
- [ ] **Next task identified** and marked in PROGRESS.md
- [ ] **Brief handoff note** with any important context

### Incomplete Task Protocol
If you can't complete a task in one session:
- [ ] Mark task as "⏳ In Progress" in PROGRESS.md
- [ ] Document **exactly what was completed**
- [ ] Document **specific next steps** needed
- [ ] **Don't start a new task** - let next AI finish this one

## Example Work Session

**Session Goal:** Complete Task 1 - AppShell skeleton layout

**Session Flow:**
1. Read PROGRESS.md → see Task 1 is next
2. Read Task 1 requirements in Epic 1 README
3. Examine existing App.tsx to understand current structure  
4. Create basic layout with ViewSwitcher placeholder
5. Test that it renders without errors
6. Update PROGRESS.md: Task 1 ✅ Complete, Next: Task 2
7. Brief handoff note about approach taken

**Context Stayed Focused On:**
- App.tsx structure
- Basic layout components
- ViewSwitcher interface

**Context Avoided:**
- Detailed tree component logic
- Search functionality
- Copy/export features
- Performance optimization

## Work Unit Success Metrics
- **Task completed** in single AI session
- **Working code** that can be manually tested
- **Clear handoff** for next AI
- **No context pollution** from unrelated exploration
- **Progress momentum** maintained across sessions