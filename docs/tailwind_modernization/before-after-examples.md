# Before & After Code Examples

## Overview

This document provides concrete before/after code examples showing the transformation from CSS variable-based styling to modern Tailwind utilities.

## Main App Layout

### Before: App.tsx
```tsx
function App() {
  return (
    &lt;div className="h-screen flex flex-col bg-[var(--bg-primary)]"&gt;
      {/* App Header */}
      &lt;header className="sticky top-0 z-30 border-b [background:linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0)),var(--bg-secondary)] [box-shadow:var(--shadow)]"&gt;
        &lt;div className="max-w-7xl mx-auto w-full px-6 py-2 min-h-[48px] grid grid-cols-[1fr_auto_1fr] items-center gap-4"&gt;
          &lt;h1 className="m-0 text-xl font-semibold leading-tight"&gt;🧩 JSON Viewer&lt;/h1&gt;
          
          {/* View switcher */}
          &lt;div className="flex items-center justify-center gap-2"&gt;
            &lt;span className="text-xs tracking-wide uppercase text-[var(--text-secondary)]"&gt;View&lt;/span&gt;
            &lt;ViewSwitcher value={viewMode} onChange={setViewMode} /&gt;
          &lt;/div&gt;
          
          {/* Status and theme */}
          &lt;div className="flex items-center gap-3 justify-end"&gt;
            &lt;StatusPill validation={validation.result} /&gt;
            &lt;ThemeToggle ... /&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/header&gt;
      
      &lt;main className="flex-1 flex flex-col overflow-hidden"&gt;
        &lt;div className="max-w-7xl mx-auto w-full p-3 h-full"&gt;
          {/* Content */}
        &lt;/div&gt;
      &lt;/main&gt;
    &lt;/div&gt;
  );
}
```

### After: Enhanced App.tsx
```tsx
function App() {
  return (
    &lt;div className="
      h-screen flex flex-col
      bg-gradient-to-br from-white via-gray-50/50 to-gray-100/50
      dark:from-gray-900 dark:via-gray-900/90 dark:to-gray-800/50
    "&gt;
      {/* App Header */}
      &lt;header className="
        sticky top-0 z-30 
        backdrop-blur-md bg-white/80 dark:bg-gray-900/80
        border-b border-gray-200/50 dark:border-gray-700/50
        shadow-sm
        supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:dark:bg-gray-900/60
      "&gt;
        &lt;div className="
          max-w-7xl mx-auto w-full px-6 py-3 
          min-h-[56px] 
          grid grid-cols-[1fr_auto_1fr] 
          items-center gap-4 sm:gap-6
        "&gt;
          &lt;h1 className="
            m-0 text-2xl font-bold tracking-tight 
            bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
            dark:from-blue-400 dark:to-purple-400
            leading-tight flex items-center gap-2
          "&gt;
            &lt;span className="text-2xl" role="img" aria-label="JSON Viewer"&gt;🧩&lt;/span&gt;
            &lt;span className="hidden sm:inline"&gt;JSON Viewer&lt;/span&gt;
            &lt;span className="sm:hidden"&gt;JSON&lt;/span&gt;
          &lt;/h1&gt;
          
          {/* View switcher */}
          &lt;div className="
            flex items-center justify-center gap-3
            bg-white/80 dark:bg-gray-800/80
            px-4 py-2 rounded-full
            border border-gray-200/80 dark:border-gray-700/80
            shadow-sm backdrop-blur-sm
            ring-1 ring-gray-100/50 dark:ring-gray-700/50
          "&gt;
            &lt;span className="
              text-xs font-medium tracking-wider uppercase 
              text-gray-500 dark:text-gray-400
              hidden sm:inline
            "&gt;
              View
            &lt;/span&gt;
            &lt;ViewSwitcher value={viewMode} onChange={setViewMode} /&gt;
          &lt;/div&gt;
          
          {/* Status and theme */}
          &lt;div className="flex items-center gap-4 justify-end"&gt;
            &lt;div className="hidden md:flex items-center"&gt;
              &lt;StatusPill validation={validation.result} compact /&gt;
            &lt;/div&gt;
            &lt;ThemeToggle ... /&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/header&gt;
      
      &lt;main className="flex-1 flex flex-col overflow-hidden bg-gray-50/30 dark:bg-gray-900/30"&gt;
        &lt;div className="max-w-7xl mx-auto w-full p-6 h-full"&gt;
          &lt;div className="
            h-full 
            bg-white/50 dark:bg-gray-800/30 
            rounded-2xl border border-gray-200/50 dark:border-gray-700/50 
            overflow-hidden shadow-sm
          "&gt;
            {/* Content with enhanced background */}
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/main&gt;
    &lt;/div&gt;
  );
}
```

## Button Component

### Before: Basic Button
```tsx
const variants: Record&lt;Variant, string&gt; = {
  primary: 'bg-[var(--accent-color)] border-[var(--accent-color)] text-white hover:opacity-90 hover:-translate-y-px [box-shadow:var(--shadow)]',
  secondary: 'bg-[var(--bg-primary)] border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] hover:-translate-y-px [box-shadow:var(--shadow)]',
  success: 'bg-[var(--success-color)] border-[var(--success-color)] text-white',
  ghost: 'bg-transparent border-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]',
};

const base = cx(
  'inline-flex items-center justify-center gap-2 rounded-md border transition-all duration-150 select-none',
  'font-medium whitespace-nowrap',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] focus-visible:ring-offset-2',
  'focus-visible:ring-offset-[var(--bg-primary)]',
  'disabled:opacity-60 disabled:cursor-not-allowed',
);
```

### After: Enhanced Button
```tsx
const variants: Record&lt;Variant, string&gt; = {
  primary: `
    bg-blue-600 hover:bg-blue-700 active:bg-blue-800
    border-blue-600 hover:border-blue-700 active:border-blue-800
    text-white shadow-sm hover:shadow-md active:shadow-sm
    transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]
    hover:ring-2 hover:ring-blue-500/20
    dark:bg-blue-600 dark:hover:bg-blue-700 dark:active:bg-blue-800
  `,
  secondary: `
    bg-white hover:bg-gray-50 active:bg-gray-100
    border-gray-300 hover:border-gray-400 active:border-gray-400
    text-gray-900 shadow-sm hover:shadow active:shadow-sm
    transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]
    hover:ring-2 hover:ring-gray-300/20
    dark:bg-gray-800 dark:hover:bg-gray-700 dark:active:bg-gray-600
    dark:border-gray-600 dark:hover:border-gray-500
    dark:text-gray-100
  `,
  success: `
    bg-green-600 hover:bg-green-700 active:bg-green-800
    border-green-600 hover:border-green-700
    text-white shadow-sm hover:shadow-md
    transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]
  `,
  ghost: `
    bg-transparent hover:bg-gray-100 active:bg-gray-200
    border-transparent text-gray-600
    dark:hover:bg-gray-800 dark:active:bg-gray-700
    dark:text-gray-400 dark:hover:text-gray-300
    transform hover:scale-[1.02] active:scale-[0.98]
  `,
};

const base = cx(
  // Layout and spacing
  'inline-flex items-center justify-center gap-2',
  // Visual design
  'rounded-lg border font-semibold text-sm leading-5',
  // Interactive states
  'transition-all duration-200 select-none ease-out',
  // Focus accessibility
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
  'focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
  'focus-visible:scale-[1.02]',
  // Disabled state
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
  'disabled:hover:translate-y-0 disabled:shadow-none disabled:scale-100',
);
```

## StatusPill Component

### Before: Invalid Classes
```tsx
export function StatusPill({ validation, compact = false }: StatusPillProps) {
  const containerClasses = `
    flex gap-2 text-sm px-2 py-1 rounded-full border bg-bg-primary
    ${compact ? 'items-center' : 'items-baseline'}
    ${isValid ? 'border-success-color' : ''}
    ${isInvalid ? 'border-error-color' : ''}
    ${isPending ? 'border-border-color' : ''}
  `.trim();

  const indicatorClasses = `
    w-2 h-2 rounded-full shrink-0
    ${isValid ? 'bg-success-color' : ''}
    ${isInvalid ? 'bg-error-color' : ''}
    ${isPending ? 'bg-text-secondary' : ''}
  `.trim();

  return (
    &lt;div className={containerClasses}&gt;
      &lt;span className={indicatorClasses} /&gt;
      {!compact && &lt;span className="text-text-primary"&gt;{message}&lt;/span&gt;}
    &lt;/div&gt;
  );
}
```

### After: Proper Tailwind Classes
```tsx
export function StatusPill({ validation, compact = false, className }: StatusPillProps) {
  const statusStyles = {
    valid: `
      bg-gradient-to-r from-green-50 to-emerald-50 
      dark:from-green-900/20 dark:to-emerald-900/20
      border-green-200 dark:border-green-800
      text-green-800 dark:text-green-200
    `,
    invalid: `
      bg-gradient-to-r from-red-50 to-rose-50
      dark:from-red-900/20 dark:to-rose-900/20  
      border-red-200 dark:border-red-800
      text-red-800 dark:text-red-200
    `,
    pending: `
      bg-gradient-to-r from-gray-50 to-slate-50
      dark:from-gray-800 dark:to-slate-800
      border-gray-200 dark:border-gray-600
      text-gray-600 dark:text-gray-400
    `,
  };

  const dotStyles = {
    valid: 'bg-green-500',
    invalid: 'bg-red-500', 
    pending: 'bg-gray-400',
  };

  const status = isValid ? 'valid' : isInvalid ? 'invalid' : 'pending';

  return (
    &lt;div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5',
      'rounded-full border font-medium text-sm',
      'shadow-sm transition-all duration-200 hover:scale-105',
      statusStyles[status],
      compact && 'px-2 py-1 text-xs',
      className
    )} aria-live="polite"&gt;
      &lt;span className={cn(
        'w-2 h-2 rounded-full flex-shrink-0',
        'ring-2 ring-white dark:ring-gray-900',
        dotStyles[status],
        compact && 'w-1.5 h-1.5'
      )} /&gt;
      {!compact && (
        &lt;span className="truncate"&gt;{message}&lt;/span&gt;
      )}
    &lt;/div&gt;
  );
}
```

## Toolbar Component

### Before: CSS Variable Styling
```tsx
export function Toolbar({ children, className = '' }: ToolbarProps) {
  return (
    &lt;div
      className={[
        'flex items-center gap-4 p-2 px-6',
        'bg-[var(--bg-secondary)] border-b border-[var(--border-color)]',
        'flex-wrap min-h-[48px]',
        className,
      ].join(' ').trim()}
    &gt;
      {children}
    &lt;/div&gt;
  );
}
```

### After: Modern Tailwind with Variants
```tsx
interface ToolbarProps {
  children?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'floating' | 'minimal';
  className?: string;
}

const toolbarVariants = {
  default: `
    bg-gray-50/80 dark:bg-gray-800/80
    border-b border-gray-200 dark:border-gray-700
    backdrop-blur-sm
  `,
  elevated: `
    bg-white dark:bg-gray-900
    border border-gray-200 dark:border-gray-700
    shadow-md rounded-lg mx-4 mb-4
  `,
  floating: `
    bg-white/90 dark:bg-gray-900/90
    border border-gray-200/50 dark:border-gray-700/50
    shadow-lg rounded-full mx-4 mb-4 px-8
    backdrop-blur-md
  `,
  minimal: `
    bg-transparent
    border-b border-gray-100 dark:border-gray-800
  `,
};

export function Toolbar({ 
  children, 
  variant = 'default',
  className = '' 
}: ToolbarProps) {
  return (
    &lt;div className={cn(
      // Base layout
      'flex items-center gap-4 px-6 py-3 flex-wrap',
      'min-h-[52px] sm:min-h-[56px]',
      'transition-all duration-200',
      // Responsive
      'sm:gap-6 sm:px-8',
      // Variant styles
      toolbarVariants[variant],
      className,
    )}&gt;
      {children}
    &lt;/div&gt;
  );
}
```

## ThemeToggle Component

### Before: Mixed Approach
```tsx
export default function ThemeToggle({ theme, onThemeChange, effectiveTheme }: ThemeToggleProps) {
  return (
    &lt;button
      className={[
        'flex items-center gap-2',
        'px-4 py-2 border border-border-color rounded',
        'bg-bg-primary text-text-primary',
        'transition-all text-sm font-medium whitespace-nowrap',
        'hover:bg-bg-tertiary hover:-translate-y-px',
        '[box-shadow:var(--shadow)] hover:[box-shadow:var(--shadow)]',
      ].join(' ')}
      onClick={handleToggle}
    &gt;
      &lt;span&gt;{getIcon()}&lt;/span&gt;
      &lt;span&gt;{getLabel()}&lt;/span&gt;
    &lt;/button&gt;
  );
}
```

### After: Pure Tailwind
```tsx
export default function ThemeToggle({ theme, onThemeChange, effectiveTheme }: ThemeToggleProps) {
  return (
    &lt;button className={cn(
      // Layout
      'flex items-center gap-2 px-4 py-2',
      // Visual design
      'border border-gray-200 dark:border-gray-600 rounded-lg',
      'bg-white dark:bg-gray-800', 
      'text-gray-900 dark:text-gray-100',
      'shadow-sm hover:shadow-md',
      // Typography
      'text-sm font-medium whitespace-nowrap',
      // Interactive states
      'transition-all duration-200 ease-out',
      'hover:bg-gray-50 dark:hover:bg-gray-700',
      'hover:-translate-y-0.5 hover:scale-[1.02]',
      'active:translate-y-0 active:scale-[0.98]',
      // Focus state
      'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
      'focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900',
    )}
    onClick={handleToggle}
    title={`Current theme: ${getLabel()}. Click to cycle.`}
    &gt;
      &lt;span className="text-lg" aria-hidden="true"&gt;{getIcon()}&lt;/span&gt;
      &lt;span&gt;{getLabel()}&lt;/span&gt;
    &lt;/button&gt;
  );
}
```

## Tree View Node

### Before: Basic Hover
```tsx
&lt;div className={[
  'flex items-center gap-2 p-2 rounded-lg',
  'hover:bg-gray-50 dark:hover:bg-gray-800',
  'cursor-pointer',
].join(' ')}&gt;
  {node.children && (
    &lt;button onClick={handleToggle}&gt;
      &lt;ChevronRightIcon className={node.isExpanded ? 'rotate-90' : ''} /&gt;
    &lt;/button&gt;
  )}
  &lt;span className="font-medium text-blue-600"&gt;{node.key}&lt;/span&gt;
  &lt;span className="flex-1 truncate text-gray-600"&gt;{node.summary}&lt;/span&gt;
&lt;/div&gt;
```

### After: Enhanced Interactions
```tsx
&lt;div className={cn(
  'flex items-center gap-2 p-2 rounded-lg',
  'hover:bg-gray-50 dark:hover:bg-gray-800',
  'group cursor-pointer',
  'transition-all duration-150 ease-out',
  'hover:shadow-sm hover:-translate-y-0.5',
)}&gt;
  {node.children && (
    &lt;button
      onClick={handleToggle}
      className={cn(
        'flex items-center justify-center w-6 h-6',
        'rounded-md hover:bg-gray-200 dark:hover:bg-gray-600',
        'transition-all duration-200',
        'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
        isExpanding && 'animate-pulse'
      )}
    &gt;
      &lt;ChevronRightIcon className={cn(
        'h-4 w-4 transition-transform duration-200',
        node.isExpanded && 'rotate-90',
        'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
      )} /&gt;
    &lt;/button&gt;
  )}
  
  &lt;span className="font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-150"&gt;
    {node.key}
  &lt;/span&gt;
  
  &lt;span className={cn(
    'flex-1 truncate text-gray-600 dark:text-gray-300',
    'group-hover:text-gray-900 dark:group-hover:text-gray-100',
    'transition-colors duration-150'
  )}&gt;
    {node.summary}
  &lt;/span&gt;
  
  {/* Action buttons that appear on hover */}
  &lt;div className={cn(
    'flex items-center gap-1 opacity-0 group-hover:opacity-100',
    'transition-opacity duration-150'
  )}&gt;
    &lt;button className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"&gt;
      &lt;CopyIcon className="h-3 w-3" /&gt;
    &lt;/button&gt;
  &lt;/div&gt;
&lt;/div&gt;
```

## Search Input Enhancement

### Before: Basic Input
```tsx
&lt;input
  type="text"
  value={searchText}
  onChange={(e) =&gt; setSearchText(e.target.value)}
  placeholder="Search..."
  className="search-input"
/&gt;
```

### After: Enhanced Search
```tsx
export function EnhancedSearch({ value, onChange }: SearchProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  
  return (
    &lt;div className="relative"&gt;
      &lt;div className={cn(
        'relative flex items-center',
        'transition-all duration-300 ease-out',
        isFocused && 'scale-[1.02] drop-shadow-sm'
      )}&gt;
        &lt;SearchIcon className={cn(
          'absolute left-3 h-4 w-4 transition-colors duration-200',
          isFocused ? 'text-blue-500' : 'text-gray-400'
        )} /&gt;
        
        &lt;input
          type="text"
          value={value}
          onChange={(e) =&gt; onChange(e.target.value)}
          onFocus={() =&gt; setIsFocused(true)}
          onBlur={() =&gt; setIsFocused(false)}
          placeholder="Search JSON..."
          className={cn(
            'w-full pl-10 pr-10 py-2 border rounded-lg',
            'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
            'border-gray-200 dark:border-gray-600',
            'text-gray-900 dark:text-gray-100',
            'placeholder-gray-400 dark:placeholder-gray-500',
            'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
            'focus:bg-white dark:focus:bg-gray-800',
            'transition-all duration-200 ease-out',
          )}
        /&gt;
        
        {value && (
          &lt;button
            onClick={() =&gt; onChange('')}
            className={cn(
              'absolute right-2 p-1.5 rounded-full',
              'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300',
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              'transition-all duration-150',
              'animate-in fade-in zoom-in-95 duration-200'
            )}
            aria-label="Clear search"
          &gt;
            &lt;XIcon className="h-4 w-4" /&gt;
          &lt;/button&gt;
        )}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}
```

## Key Improvements Summary

### Visual Enhancements
- ✅ **Glass morphism** effects with backdrop-blur
- ✅ **Gradient backgrounds** for depth and interest
- ✅ **Enhanced shadows** with proper elevation hierarchy
- ✅ **Improved typography** with gradient text and better scales

### Interactive States
- ✅ **Smooth transitions** with proper timing functions
- ✅ **Transform effects** (translate, scale) for feedback
- ✅ **Enhanced hover states** with multiple visual cues
- ✅ **Consistent focus rings** with proper accessibility

### Color System
- ✅ **Semantic color naming** instead of generic variables
- ✅ **Proper dark mode** support with all variants
- ✅ **Status color consistency** across components
- ✅ **Accessible contrast ratios** maintained

### Layout & Spacing
- ✅ **Consistent spacing scale** using Tailwind's system
- ✅ **Responsive design patterns** with mobile-first approach
- ✅ **Improved component composition** with proper variants
- ✅ **Better visual hierarchy** through typography and spacing

These examples show the dramatic improvement possible by fully leveraging Tailwind's utility system while maintaining excellent functionality and accessibility.