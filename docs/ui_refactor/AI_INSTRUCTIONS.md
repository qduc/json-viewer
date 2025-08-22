# AI Implementation Instructions

## Quick Start
1. **Read this file first** - understand the approach
2. **Read WORK_UNITS.md** - understand session scope and boundaries
3. **Check PROGRESS.md** - see what's already done and what's next
4. **Complete ONE task only** - don't work on multiple tasks
5. **Update PROGRESS.md and handoff** - keep it current for the next AI

## Implementation Order
```
Epic 1 → Epic 2 → Epic 3 → Epic 4 → Epic 5
 (3 weeks)           (1 week polish)
```

## Key Principles
- **Keep it simple** - this is a utility app, not enterprise software
- **Follow existing patterns** - check src/components for current code style
- **Mobile-first** - ensure responsive design
- **No over-engineering** - if it feels complex, simplify

## Before You Start
1. **Examine existing codebase:**
   ```bash
   # Check current components
   find src/components -name "*.tsx" | head -10
   
   # Check package.json for available libraries
   cat package.json
   
   # Look at current styling approach
   find src -name "*.css" -o -name "*.scss" | head -5
   ```

2. **Understand current architecture:**
   - How is state managed? (Context, Redux, local state?)
   - What UI library is used? (styled-components, CSS modules, etc.)
   - What's the current JSON parsing approach?

## Component Interface Contracts

### AppShell (Epic 1)
```typescript
interface AppShellProps {
  children: React.ReactNode;
}

// State to manage
type ViewMode = 'editor' | 'tree';
type ValidationState = {
  valid: boolean;
  errors: Array<{line: number, message: string}>;
  lineCount: number;
};
```

### Tree Component (Epic 3)
```typescript
interface TreeNode {
  key: string;
  value: any;
  type: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null';
  path: string[];
  children?: TreeNode[];
  expanded?: boolean;
}

interface TreeViewProps {
  data: any;
  onNodeSelect?: (node: TreeNode) => void;
  searchTerm?: string;
}
```

### Validation Hook (Epic 2)
```typescript
interface UseValidationResult {
  validate: (jsonString: string) => ValidationResult;
  validationState: ValidationState;
  isValidating: boolean;
}
```

## File Creation Strategy
- **Always check if file exists first** - prefer editing over creating
- **Follow existing directory structure** - don't create new patterns
- **Import existing utilities** - don't reinvent JSON parsing if it exists

## Testing Approach
- **Manual testing focus** - open in browser and verify
- **Core scenarios only:**
  - Paste valid JSON → formats correctly
  - Paste invalid JSON → shows errors
  - Toggle views → layout changes
  - Search tree → filters nodes
  - Copy button → clipboard works

## Common Pitfalls to Avoid
❌ Don't create a new state management system  
❌ Don't add complex animations or transitions  
❌ Don't implement advanced features not in the backlog  
❌ Don't create comprehensive test suites  
❌ Don't worry about edge cases initially  

✅ Do use existing patterns  
✅ Do keep components simple  
✅ Do focus on core user workflows  
✅ Do make it work on mobile  

## When You Get Stuck
1. **Check existing components** - copy patterns that work
2. **Simplify the requirement** - cut scope if needed
3. **Ask for clarification** - if requirements are unclear
4. **Focus on core value** - paste → format → copy

## Success Definition
The refactor is done when a user can:
1. Paste JSON and see it formatted in the editor
2. Toggle to tree view and browse the structure  
3. Search/filter tree nodes
4. Copy the formatted JSON
5. Download as a file

Everything else is nice-to-have.

## Epic Priorities
**Must Have:** Epic 1, 2, 3 (core functionality)  
**Should Have:** Epic 4, 5 (polish)  
**Nice to Have:** Any additional features not in backlog