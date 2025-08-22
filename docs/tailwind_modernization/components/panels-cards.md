# Panels and Cards Component Improvements

## Current State Analysis

The app uses various panel and card-like containers that currently rely on CSS variables and basic styling. These components need modernization with Tailwind utilities.

### Current Panel Elements
1. **Split Pane sections** - Left/right main content areas
2. **Output tabs container** - Tabbed content panel
3. **Tree view container** - Hierarchical data display
4. **Editor pane** - Monaco editor wrapper
5. **Status pills** - Small status indicators

## Modernization Plan

### 1. Base Card Component

Create a reusable Card component with variants:

```tsx
import React from 'react';
import { cn } from '@/utils/cn';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'ghost';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

const cardVariants = {
  default: `
    bg-white dark:bg-gray-900 
    border border-gray-200 dark:border-gray-700
    shadow-sm
  `,
  elevated: `
    bg-white dark:bg-gray-900
    border border-gray-200 dark:border-gray-700 
    shadow-lg
  `,
  outlined: `
    bg-transparent
    border-2 border-gray-200 dark:border-gray-700
  `,
  ghost: `
    bg-gray-50/50 dark:bg-gray-800/50
    border border-gray-100 dark:border-gray-800
  `,
};

const cardPadding = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-6', 
  lg: 'p-6 sm:p-8',
};

export function Card({ 
  children, 
  variant = 'default',
  padding = 'md',
  className 
}: CardProps) {
  return (
    &lt;div className={cn(
      'rounded-lg transition-all duration-200',
      cardVariants[variant],
      cardPadding[padding],
      className
    )}&gt;
      {children}
    &lt;/div&gt;
  );
}
```

### 2. Panel Container Component

```tsx
interface PanelProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

export function Panel({ 
  children, 
  title, 
  subtitle, 
  actions, 
  className,
  contentClassName 
}: PanelProps) {
  return (
    &lt;div className={cn(
      'flex flex-col h-full',
      className
    )}&gt;
      {(title || subtitle || actions) && (
        &lt;div className="flex items-start justify-between gap-4 mb-4"&gt;
          &lt;div className="flex-1 min-w-0"&gt;
            {title && (
              &lt;h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wide uppercase"&gt;
                {title}
              &lt;/h3&gt;
            )}
            {subtitle && (
              &lt;p className="mt-1 text-sm text-gray-500 dark:text-gray-400"&gt;
                {subtitle}
              &lt;/p&gt;
            )}
          &lt;/div&gt;
          {actions && (
            &lt;div className="flex items-center gap-2 flex-shrink-0"&gt;
              {actions}
            &lt;/div&gt;
          )}
        &lt;/div&gt;
      )}
      
      &lt;div className={cn(
        'flex-1 min-h-0',
        contentClassName
      )}&gt;
        {children}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}
```

### 3. Enhanced Split Pane Sections

Update the main content areas:

```tsx
// In App.tsx - Left Editor Section
&lt;Panel 
  title="Editor"
  actions={
    &lt;Toolbar variant="minimal"&gt;
      &lt;FormatMenu value={formatType} onChange={setFormatType} onFormat={handleFormat} /&gt;
      &lt;CopyButton value={formattedForCopy} disabled={copyDisabled} /&gt;
      &lt;DownloadButton value={formattedForCopy} disabled={copyDisabled} /&gt;
    &lt;/Toolbar&gt;
  }
  className="px-3 py-4"
  contentClassName="space-y-4"
&gt;
  &lt;Card variant="default" padding="none" className="flex-1 overflow-hidden"&gt;
    &lt;EditorPane
      value={text}
      onChange={setText}
      validation={validation.result}
      theme={effectiveTheme}
      fontSize={14}
    /&gt;
  &lt;/Card&gt;
  
  {/* Status footer */}
  &lt;div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400"&gt;
    &lt;span&gt;
      {validation.valid ? 'Valid JSON' : 'Invalid JSON'} • {validation.lineCount} lines
    &lt;/span&gt;
    {!validation.valid && (
      &lt;span className="text-red-500 dark:text-red-400"&gt;
        {validation.errors.length} error{validation.errors.length !== 1 ? 's' : ''}
      &lt;/span&gt;
    )}
  &lt;/div&gt;
  
  {/* Validation errors */}
  {!validation.valid && validation.errors.length &gt; 0 && (
    &lt;Card variant="outlined" padding="sm" className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/20"&gt;
      &lt;ValidationErrors errors={validation.errors} /&gt;
    &lt;/Card&gt;
  )}
&lt;/Panel&gt;
```

### 4. Enhanced Output Panel

```tsx
// Right panel - Output or Tree View
&lt;Panel
  title={viewMode === 'editor' ? 'Output' : 'Tree View'}
  actions={
    viewMode === 'tree' && (
      &lt;Toolbar variant="minimal"&gt;
        &lt;TreeControls onExpandAll={handleExpandAll} onCollapseAll={handleCollapseAll} /&gt;
        &lt;SimpleSearch value={searchText} onChange={setSearchText} /&gt;
      &lt;/Toolbar&gt;
    )
  }
  className="px-3 py-4"
&gt;
  &lt;Card variant="default" padding="none" className="flex-1 flex flex-col min-h-0"&gt;
    {viewMode === 'editor' ? (
      &lt;OutputTabs 
        inputText={text} 
        indentSize={formatType === 'tabs' ? '\t' : formatType === '4-spaces' ? 4 : 2} 
      /&gt;
    ) : (
      &lt;div className="flex-1 flex flex-col min-h-0 p-4"&gt;
        &lt;TreeView
          tree={filteredTree}
          onToggleExpand={handleToggleExpand}
        /&gt;
      &lt;/div&gt;
    )}
  &lt;/Card&gt;
&lt;/Panel&gt;
```

### 5. Enhanced Status Pills

```tsx
// Update StatusPill component
interface StatusPillProps {
  validation?: ValidationResult;
  compact?: boolean;
  className?: string;
}

export function StatusPill({ validation, compact = false, className }: StatusPillProps) {
  const isValid = validation?.isValid;
  const isPending = !validation;
  const isInvalid = validation && !validation.isValid;

  const message = (() => {
    if (!validation) return 'Not validated';
    if (validation.isValid) return 'Valid JSON';
    return validation.error?.message ?? 'Invalid JSON';
  })();

  const statusConfig = {
    valid: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-800 dark:text-green-200',
      dot: 'bg-green-500',
    },
    invalid: {
      bg: 'bg-red-50 dark:bg-red-900/20', 
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      dot: 'bg-red-500',
    },
    pending: {
      bg: 'bg-gray-50 dark:bg-gray-800',
      border: 'border-gray-200 dark:border-gray-600',
      text: 'text-gray-600 dark:text-gray-400',
      dot: 'bg-gray-400',
    },
  };

  const config = isValid ? statusConfig.valid : 
                 isInvalid ? statusConfig.invalid : 
                 statusConfig.pending;

  return (
    &lt;div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-sm font-medium',
      'transition-all duration-200',
      config.bg,
      config.border, 
      config.text,
      compact && 'px-2 py-1 text-xs',
      className
    )} aria-live="polite"&gt;
      &lt;span className={cn(
        'w-2 h-2 rounded-full flex-shrink-0',
        config.dot,
        compact && 'w-1.5 h-1.5'
      )} /&gt;
      {!compact && (
        &lt;span className="truncate" title={message}&gt;
          {message}
        &lt;/span&gt;
      )}
    &lt;/div&gt;
  );
}
```

### 6. Tree View Container Enhancement

```tsx
// Enhanced TreeView wrapper
interface TreeViewContainerProps {
  tree: TreeNode | null;
  searchText: string;
  onToggleExpand: (path: string[]) =&gt; void;
  onExpandAll: () =&gt; void;
  onCollapseAll: () =&gt; void;
  onSearchChange: (search: string) =&gt; void;
}

export function TreeViewContainer({ 
  tree, 
  searchText, 
  onToggleExpand,
  onExpandAll,
  onCollapseAll,
  onSearchChange 
}: TreeViewContainerProps) {
  return (
    &lt;div className="flex flex-col h-full gap-4"&gt;
      {/* Tree Controls */}
      &lt;Card variant="ghost" padding="sm"&gt;
        &lt;div className="flex items-center gap-3"&gt;
          &lt;div className="flex items-center gap-2"&gt;
            &lt;Button variant="outline" size="sm" onClick={onExpandAll}&gt;
              Expand All
            &lt;/Button&gt;
            &lt;Button variant="outline" size="sm" onClick={onCollapseAll}&gt;
              Collapse All  
            &lt;/Button&gt;
          &lt;/div&gt;
          
          &lt;div className="flex-1"&gt;
            &lt;SimpleSearch value={searchText} onChange={onSearchChange} /&gt;
          &lt;/div&gt;
        &lt;/div&gt;
      &lt;/Card&gt;
      
      {/* Tree Content */}
      &lt;Card variant="default" padding="none" className="flex-1 flex flex-col min-h-0"&gt;
        {tree ? (
          &lt;div className="flex-1 overflow-auto p-3"&gt;
            &lt;TreeView tree={tree} onToggleExpand={onToggleExpand} /&gt;
          &lt;/div&gt;
        ) : (
          &lt;div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400"&gt;
            &lt;div className="text-center space-y-2"&gt;
              &lt;div className="text-4xl"&gt;📄&lt;/div&gt;
              &lt;p className="text-sm"&gt;Enter valid JSON to view tree structure&lt;/p&gt;
            &lt;/div&gt;
          &lt;/div&gt;
        )}
      &lt;/Card&gt;
    &lt;/div&gt;
  );
}
```

## Usage Examples

### Main App Layout
```tsx
&lt;main className="flex-1 flex flex-col overflow-hidden"&gt;
  &lt;div className="max-w-7xl mx-auto w-full p-6 h-full"&gt;
    &lt;SplitPane&gt;
      {/* Left: Editor */}
      &lt;Panel title="Editor" /* ... props */ &gt;
        {/* Editor content */}
      &lt;/Panel&gt;

      {/* Right: Output or Tree */}
      &lt;Panel title={viewMode === 'editor' ? 'Output' : 'Tree View'} /* ... props */ &gt;
        {/* Output/Tree content */}
      &lt;/Panel&gt;
    &lt;/SplitPane&gt;
  &lt;/div&gt;
&lt;/main&gt;
```

## CSS to Remove from App.css

With the new Panel and Card components, you can remove:

```css
/* Remove these sections from App.css */
.editor-panel { /* ... */ }
.output-panel { /* ... */ }
.tree-container { /* ... */ }
.panel-header { /* ... */ }
.validation-status { /* ... */ }
.tree-empty-state { /* ... */ }
```

## Implementation Steps

1. **Create Card component** with variants and padding options
2. **Create Panel component** with header and content sections
3. **Update StatusPill** with modern Tailwind styling
4. **Refactor main layout** to use new Panel components
5. **Create TreeViewContainer** wrapper component
6. **Update all panel usage** throughout the app
7. **Remove deprecated CSS** from App.css
8. **Test responsive behavior** on all screen sizes

## Testing Checklist

- [ ] Cards render correctly in all variants
- [ ] Panels have proper titles and actions
- [ ] Status pills show correct states and colors
- [ ] Dark mode works across all panel components
- [ ] Responsive behavior is maintained
- [ ] Accessibility features work properly
- [ ] Performance is not degraded
- [ ] Visual hierarchy is clear and attractive