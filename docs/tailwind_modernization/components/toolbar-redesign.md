# Toolbar Component Redesign

## Current State Analysis

The Toolbar component has a simple, functional design but lacks visual hierarchy and modern styling.

### Current Implementation
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

### Issues Identified
1. Uses CSS variables instead of Tailwind utilities
2. Basic styling without visual depth
3. No responsive design considerations
4. Missing hover states and interactions

## Modernization Plan

### 1. Enhanced Base Styling

```tsx
// Before
className={[
  'flex items-center gap-4 p-2 px-6',
  'bg-[var(--bg-secondary)] border-b border-[var(--border-color)]',
  'flex-wrap min-h-[48px]',
  className,
].join(' ').trim()}

// After - Modern Tailwind approach
className={cn(
  // Layout
  'flex items-center gap-4 px-6 py-3 flex-wrap',
  'min-h-[52px] sm:min-h-[56px]',
  
  // Visual design
  'bg-gray-50/80 dark:bg-gray-800/80',
  'border-b border-gray-200 dark:border-gray-700',
  'backdrop-blur-sm',
  
  // Responsive
  'sm:gap-6 sm:px-8',
  
  className,
)}
```

### 2. Toolbar Variants

Create different toolbar styles for different contexts:

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
    shadow-lg rounded-full mx-4 mb-4
    backdrop-blur-md
  `,
  minimal: `
    bg-transparent
    border-b border-gray-100 dark:border-gray-800
  `,
};
```

### 3. Enhanced Toolbar Component

```tsx
import React from 'react';
import { cn } from '@/utils/cn'; // utility function for class merging

interface ToolbarProps {
  children?: React.ReactNode;
  variant?: 'default' | 'elevated' | 'floating' | 'minimal';
  className?: string;
  sticky?: boolean;
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
  sticky = false,
  className = '' 
}: ToolbarProps) {
  return (
    &lt;div
      className={cn(
        // Base layout
        'flex items-center gap-4 px-6 py-3 flex-wrap',
        'min-h-[52px] sm:min-h-[56px]',
        'transition-all duration-200',
        
        // Responsive
        'sm:gap-6 sm:px-8',
        
        // Variant styles
        toolbarVariants[variant],
        
        // Sticky positioning
        sticky && 'sticky top-0 z-20',
        
        className,
      )}
    &gt;
      {children}
    &lt;/div&gt;
  );
}

export default Toolbar;
```

### 4. Toolbar Groups for Better Organization

```tsx
interface ToolbarGroupProps {
  children: React.ReactNode;
  className?: string;
  label?: string; // for accessibility
}

export function ToolbarGroup({ children, className, label }: ToolbarGroupProps) {
  return (
    &lt;div 
      className={cn(
        'flex items-center gap-2',
        'relative',
        // Add separator line after each group (except last)
        'after:content-[""] after:absolute after:-right-2 after:top-1/2 after:-translate-y-1/2',
        'after:w-px after:h-4 after:bg-gray-300 dark:after:bg-gray-600',
        'last:after:hidden',
        className
      )}
      aria-label={label}
    &gt;
      {children}
    &lt;/div&gt;
  );
}

// Usage example
&lt;Toolbar variant="elevated"&gt;
  &lt;ToolbarGroup label="Format options"&gt;
    &lt;FormatMenu ... /&gt;
  &lt;/ToolbarGroup&gt;
  
  &lt;ToolbarGroup label="Actions"&gt;
    &lt;CopyButton ... /&gt;
    &lt;DownloadButton ... /&gt;
  &lt;/ToolbarGroup&gt;
  
  &lt;ToolbarGroup label="View options"&gt;
    &lt;ViewToggle ... /&gt;
  &lt;/ToolbarGroup&gt;
&lt;/Toolbar&gt;
```

### 5. Responsive Toolbar Behavior

```tsx
// Enhanced responsive design
export function Toolbar({ children, variant = 'default', className = '' }: ToolbarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  
  return (
    &lt;&gt;
      &lt;div className={cn(
        // Base layout
        'flex items-center justify-between px-6 py-3',
        'min-h-[52px] sm:min-h-[56px]',
        
        // Show/hide based on screen size
        'sm:justify-start sm:gap-6',
        
        // Variant styles
        toolbarVariants[variant],
        className,
      )}&gt;
        {/* Desktop: show all tools */}
        &lt;div className="hidden sm:flex items-center gap-6 flex-wrap"&gt;
          {children}
        &lt;/div&gt;
        
        {/* Mobile: show collapsed version */}
        &lt;div className="flex sm:hidden items-center gap-3 flex-1"&gt;
          {/* Show only essential tools */}
          {React.Children.toArray(children).slice(0, 2)}
          
          {/* Overflow menu button */}
          {React.Children.count(children) &gt; 2 && (
            &lt;Button
              variant="ghost"
              size="sm"
              onClick={() =&gt; setIsCollapsed(!isCollapsed)}
              aria-label="More options"
            &gt;
              &lt;MoreHorizontalIcon className="h-4 w-4" /&gt;
            &lt;/Button&gt;
          )}
        &lt;/div&gt;
      &lt;/div&gt;
      
      {/* Mobile overflow menu */}
      {isCollapsed && (
        &lt;div className="sm:hidden border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-3"&gt;
          &lt;div className="flex items-center gap-3 flex-wrap"&gt;
            {React.Children.toArray(children).slice(2)}
          &lt;/div&gt;
        &lt;/div&gt;
      )}
    &lt;/&gt;
  );
}
```

## Usage Examples

### Basic Toolbar
```tsx
&lt;Toolbar&gt;
  &lt;FormatMenu value={formatType} onChange={setFormatType} onFormat={handleFormat} /&gt;
  &lt;CopyButton value={formattedForCopy} disabled={copyDisabled} /&gt;
  &lt;DownloadButton value={formattedForCopy} disabled={copyDisabled} /&gt;
&lt;/Toolbar&gt;
```

### Elevated Toolbar with Groups
```tsx
&lt;Toolbar variant="elevated"&gt;
  &lt;ToolbarGroup label="Format options"&gt;
    &lt;FormatMenu value={formatType} onChange={setFormatType} onFormat={handleFormat} /&gt;
  &lt;/ToolbarGroup&gt;
  
  &lt;ToolbarGroup label="Actions"&gt;
    &lt;CopyButton value={formattedForCopy} disabled={copyDisabled} /&gt;
    &lt;DownloadButton value={formattedForCopy} disabled={copyDisabled} /&gt;
  &lt;/ToolbarGroup&gt;
&lt;/Toolbar&gt;
```

### Floating Toolbar for Tree View
```tsx
&lt;Toolbar variant="floating"&gt;
  &lt;TreeControls onExpandAll={handleExpandAll} onCollapseAll={handleCollapseAll} /&gt;
  &lt;div className="flex-1"&gt;
    &lt;SimpleSearch value={searchText} onChange={setSearchText} /&gt;
  &lt;/div&gt;
&lt;/Toolbar&gt;
```

## CSS to Remove from App.css

With the new Toolbar component, you can remove these CSS rules:

```css
/* Remove these from App.css */
.toolbar { /* ... */ }
.toolbar-group { /* ... */ }
.toolbar-group::after { /* ... */ }
.toolbar-group:last-child::after { /* ... */ }
.toolbar-group-primary { /* ... */ }
.toolbar-group-secondary { /* ... */ }
.toolbar-section { /* ... */ }

/* Keep button styles for now until Button component is updated */
```

## Implementation Steps

1. **Update Toolbar component** with new variant system
2. **Create ToolbarGroup component** for better organization
3. **Add responsive behavior** with mobile overflow menu
4. **Update all Toolbar usage** across the app
5. **Test on different screen sizes**
6. **Remove old CSS** from App.css
7. **Add accessibility improvements**

## Testing Checklist

- [ ] All toolbar variants render correctly
- [ ] Mobile responsive behavior works
- [ ] Overflow menu functions properly on small screens
- [ ] Dark mode styling is consistent
- [ ] Keyboard navigation works
- [ ] Screen readers announce groups properly
- [ ] Visual hierarchy is clear and attractive