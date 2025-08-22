# Button Component Modernization

## Current State Analysis

The current Button component has a good TypeScript foundation but uses CSS variables instead of Tailwind's design system.

### Current Implementation Issues
1. Uses `var(--accent-color)` instead of semantic Tailwind colors
2. Limited visual hierarchy and states
3. Missing modern button variants
4. Inconsistent focus states

## Modernization Plan

### 1. Color System Update

```tsx
// Before
const variants: Record&lt;Variant, string&gt; = {
  primary: 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white hover:opacity-90',
  secondary: 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)]',
  success: 'bg-[var(--success-color)] border-[var(--success-color)] text-white',
  ghost: 'bg-transparent border-transparent text-[var(--text-secondary)]',
}

// After - Modern Tailwind approach
const variants: Record&lt;Variant, string&gt; = {
  primary: `
    bg-blue-600 hover:bg-blue-700 active:bg-blue-800
    border-blue-600 hover:border-blue-700 active:border-blue-800
    text-white shadow-sm hover:shadow
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800
  `,
  secondary: `
    bg-white hover:bg-gray-50 active:bg-gray-100
    border-gray-300 hover:border-gray-400 active:border-gray-400
    text-gray-900 shadow-sm hover:shadow
    dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600
    dark:border-gray-600 dark:hover:border-gray-500
    dark:text-gray-100
  `,
  success: `
    bg-green-600 hover:bg-green-700 active:bg-green-800
    border-green-600 hover:border-green-700
    text-white shadow-sm hover:shadow
  `,
  ghost: `
    bg-transparent hover:bg-gray-100 active:bg-gray-200
    border-transparent text-gray-600
    dark:hover:bg-gray-800 dark:active:bg-gray-700
    dark:text-gray-400 dark:hover:text-gray-300
  `,
}
```

### 2. Enhanced Base Styles

```tsx
// Current base
const base = cx(
  'inline-flex items-center justify-center gap-2 rounded-md border transition-all duration-150 select-none',
  'font-medium whitespace-nowrap',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]',
  'disabled:opacity-60 disabled:cursor-not-allowed',
);

// Enhanced base with better Tailwind utilities
const base = cx(
  // Layout and spacing
  'inline-flex items-center justify-center gap-2',
  // Visual design
  'rounded-md border font-medium text-sm leading-5',
  // Interactive states
  'transition-all duration-200 select-none',
  'transform hover:-translate-y-0.5 active:translate-y-0',
  // Focus accessibility
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
  'focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
  // Disabled state
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
  'disabled:hover:translate-y-0 disabled:shadow-none',
);
```

### 3. Improved Size Variants

```tsx
// Current sizes
const sizes: Record&lt;Size, string&gt; = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
};

// Enhanced sizes with better typography scale
const sizes: Record&lt;Size, string&gt; = {
  xs: 'px-2.5 py-1 text-xs font-medium',
  sm: 'px-3 py-1.5 text-sm font-medium',
  md: 'px-4 py-2 text-sm font-semibold',
  lg: 'px-6 py-3 text-base font-semibold',
  xl: 'px-8 py-4 text-lg font-semibold',
};
```

### 4. Loading State Enhancement

```tsx
// Current loading spinner (good, keep similar)
{loading && (
  &lt;svg
    className="animate-spin h-4 w-4 opacity-80"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  &gt;
    &lt;circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /&gt;
    &lt;path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /&gt;
  &lt;/svg&gt;
)}

// Enhanced with size-responsive spinner
{loading && (
  &lt;svg
    className={cx(
      'animate-spin opacity-80',
      size === 'xs' ? 'h-3 w-3' : size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5'
    )}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  &gt;
    &lt;circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /&gt;
    &lt;path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /&gt;
  &lt;/svg&gt;
)}
```

## New Button Variants to Add

### 1. Destructive Variant
```tsx
destructive: `
  bg-red-600 hover:bg-red-700 active:bg-red-800
  border-red-600 hover:border-red-700
  text-white shadow-sm hover:shadow
  dark:bg-red-600 dark:hover:bg-red-700
`,
```

### 2. Outline Variant
```tsx
outline: `
  bg-transparent hover:bg-gray-50 active:bg-gray-100
  border-gray-300 hover:border-gray-400
  text-gray-700 hover:text-gray-900
  dark:hover:bg-gray-800 dark:active:bg-gray-700
  dark:border-gray-600 dark:text-gray-300 dark:hover:text-gray-100
`,
```

### 3. Icon-Only Variant
```tsx
// For toolbar buttons with only icons
iconOnly: `
  p-2 aspect-square
  bg-transparent hover:bg-gray-100 active:bg-gray-200
  border-transparent text-gray-600
  dark:hover:bg-gray-800 dark:active:bg-gray-700
  dark:text-gray-400
`,
```

## Implementation Steps

1. **Update variants object** with new Tailwind color classes
2. **Enhance base styles** with better transitions and states  
3. **Add new size options** (xs, lg, xl)
4. **Implement new variants** (destructive, outline, iconOnly)
5. **Update focus states** with proper ring colors
6. **Test dark mode** across all variants
7. **Update component usage** across the app

## Usage Examples

```tsx
// Primary action
&lt;Button variant="primary" size="md"&gt;
  Save Changes
&lt;/Button&gt;

// Secondary action  
&lt;Button variant="secondary" size="sm"&gt;
  Cancel
&lt;/Button&gt;

// Destructive action
&lt;Button variant="destructive" size="md"&gt;
  Delete Item
&lt;/Button&gt;

// Icon-only toolbar button
&lt;Button variant="iconOnly" size="sm"&gt;
  &lt;PlusIcon className="h-4 w-4" /&gt;
&lt;/Button&gt;

// Loading state
&lt;Button variant="primary" loading&gt;
  Processing...
&lt;/Button&gt;
```

## Testing Checklist

- [ ] All variants work in light mode
- [ ] All variants work in dark mode  
- [ ] Hover states are smooth and consistent
- [ ] Focus states meet accessibility standards
- [ ] Loading states work with all sizes
- [ ] Disabled states prevent interaction
- [ ] Button scales properly with text size
- [ ] Icons align correctly in all sizes