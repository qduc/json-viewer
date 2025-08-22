# Tailwind Migration Strategy

## Overview

This document outlines the strategy for migrating from CSS variables and traditional CSS to Tailwind's utility-first approach.

## Migration Principles

### 1. Utility-First Over Component CSS
- Replace component CSS classes with Tailwind utilities
- Use component composition for reusable patterns
- Minimize custom CSS to &lt;200 lines

### 2. Semantic Color System
Replace CSS variables with Tailwind's semantic naming:

```tsx
// Before
className="bg-[var(--bg-primary)] text-[var(--text-primary)]"

// After  
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
```

### 3. Design Token Mapping

| CSS Variable | Light Mode | Dark Mode |
|-------------|------------|-----------|
| `--bg-primary` | `bg-white` | `dark:bg-gray-900` |
| `--bg-secondary` | `bg-gray-50` | `dark:bg-gray-800` |
| `--bg-tertiary` | `bg-gray-100` | `dark:bg-gray-700` |
| `--text-primary` | `text-gray-900` | `dark:text-gray-100` |
| `--text-secondary` | `text-gray-600` | `dark:text-gray-400` |
| `--border-color` | `border-gray-200` | `dark:border-gray-700` |
| `--accent-color` | `text-blue-600` | `dark:text-blue-400` |

## Migration Steps

### Step 1: Update Color System
1. Replace all `bg-[var(--*)]` with semantic Tailwind classes
2. Update text colors using `text-*` utilities
3. Replace border colors with `border-*` utilities

### Step 2: Replace Layout CSS
```css
/* Before - CSS */
.toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

/* After - Tailwind */
className="flex items-center gap-4 px-6 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
```

### Step 3: Modernize Typography
```tsx
// Before
className="text-xl font-semibold"

// After - with better hierarchy
className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
```

### Step 4: Add Visual Depth
```tsx
// Add shadows and borders for depth
className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 rounded-lg"
```

### Step 5: Interactive States
```tsx
// Enhanced hover and focus states
className="
  bg-white hover:bg-gray-50 
  dark:bg-gray-800 dark:hover:bg-gray-700
  transition-colors duration-200
  focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
"
```

## Component-Specific Migrations

### Button Component
```tsx
// Current
variants: Record&lt;Variant, string&gt; = {
  primary: 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white',
  secondary: 'bg-[var(--bg-primary)] border-[var(--border-color)]'
}

// Target  
variants: Record&lt;Variant, string&gt; = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600 shadow-sm',
  secondary: 'bg-white hover:bg-gray-50 text-gray-900 border-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-600'
}
```

### Header Component
```tsx
// Current
className="h-screen flex flex-col bg-[var(--bg-primary)]"

// Target
className="h-screen flex flex-col bg-white dark:bg-gray-900"
```

## Dark Mode Strategy

### Use Tailwind's Dark Mode Classes
```tsx
// Single utility for both modes
className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
```

### Maintain Existing Theme Toggle
- Keep current theme switching logic
- Update class applications to use Tailwind dark: variants
- Remove CSS variable dependencies

## Implementation Order

1. **Colors** - Highest impact, most visible changes
2. **Layout** - Spacing, flexbox utilities
3. **Typography** - Font weights, sizes, line heights  
4. **Shadows & Borders** - Visual depth
5. **Interactive States** - Hover, focus, active states
6. **Animations** - Transitions and micro-interactions

## Validation Checklist

- [ ] No `var(--*)` references remain
- [ ] All components use Tailwind utilities
- [ ] Dark mode works correctly
- [ ] Interactive states are consistent
- [ ] Custom CSS is minimal (&lt;200 lines)
- [ ] Performance is maintained or improved