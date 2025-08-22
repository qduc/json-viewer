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
 (Follow priority order defined in project backlog)
```

## Key Principles
- **Keep it simple** - focus on core functionality over complexity
- **Follow existing patterns** - check existing codebase for current style
- **Mobile-first** - ensure responsive design (if applicable)
- **No over-engineering** - if it feels complex, simplify

## Before You Start
1. **Examine existing codebase:**
   ```bash
   # Check current components/modules
   find src -name "*.tsx" -o -name "*.ts" -o -name "*.js" | head -10
   
   # Check package.json for available libraries
   cat package.json
   
   # Look at current styling approach
   find src -name "*.css" -o -name "*.scss" -o -name "*.module.*" | head -5
   ```

2. **Understand current architecture:**
    - How is state managed? (Context, Redux, local state, etc.)
    - What UI framework/library is used?
    - What are the existing patterns and conventions?
    - How is data fetched and processed?

## Component Interface Planning

### Define Clear Contracts
```typescript
// Example: Always define interfaces for major components
interface ComponentProps {
  // Required props
  data: DataType;
  onAction: (param: ParamType) => void;
  
  // Optional props
  className?: string;
  variant?: 'primary' | 'secondary';
}

// Example: Define state shape for complex components  
interface ComponentState {
  loading: boolean;
  error: string | null;
  data: DataType | null;
}
```

## File Creation Strategy
- **Always check if file exists first** - prefer editing over creating new files
- **Follow existing directory structure** - don't create new organizational patterns
- **Import existing utilities** - don't reinvent functionality that already exists
- **Match naming conventions** - follow established file and component naming

## Testing Approach
- **Manual testing focus** - verify functionality in the actual environment
- **Core scenarios only** - test the primary user workflows
- **Essential paths:**
    - Main user workflow works end-to-end
    - Error states display appropriately
    - Responsive design functions on different screen sizes
    - Key interactions work as expected

## Common Pitfalls to Avoid
❌ Don't create new architectural patterns  
❌ Don't add complex animations or transitions initially  
❌ Don't implement features not in the current scope  
❌ Don't create comprehensive test suites on first pass  
❌ Don't worry about edge cases initially

✅ Do use existing patterns and conventions  
✅ Do keep components simple and focused  
✅ Do focus on core user workflows  
✅ Do ensure cross-platform compatibility where needed

## When You Get Stuck
1. **Check existing codebase** - copy patterns that work
2. **Simplify the requirement** - reduce scope if needed
3. **Ask for clarification** - if requirements are unclear
4. **Focus on core value** - what's the primary user benefit?

## Success Definition
The implementation is complete when:
1. Core user workflow functions end-to-end
2. UI is responsive and accessible
3. Error states are handled gracefully
4. Performance is acceptable for the use case
5. Code follows existing project patterns

Everything else is enhancement for future iterations.

## Epic Priorities
**Must Have:** Core functionality epics (typically 1-3)  
**Should Have:** User experience improvements (typically 4-5)  
**Nice to Have:** Any additional features not in current backlog

## Handoff Checklist
- [ ] PROGRESS.md updated with completed work
- [ ] Any new patterns documented
- [ ] Breaking changes noted
- [ ] Next steps clearly identified
- [ ] Code follows project conventions