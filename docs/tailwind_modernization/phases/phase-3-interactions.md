# Phase 3: Interactive States and Animations

## Overview

This phase focuses on enhancing user interactions with smooth transitions, hover effects, focus states, and subtle micro-animations that provide feedback and improve the user experience.

## Priority: MEDIUM-HIGH
Complete after Phase 1 & 2 to add polish and interactivity to the solid visual foundation.

## Objectives

1. ✅ Add smooth transitions to all interactive elements
2. ✅ Implement consistent hover and focus states
3. ✅ Create micro-animations for state changes
4. ✅ Add loading and feedback animations
5. ✅ Ensure accessibility compliance

## Step-by-Step Implementation

### Step 1: Enhanced Button Interactions

#### 1.1 Advanced Hover States
```tsx
// Current button variants
variants: {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white',
  secondary: 'bg-white hover:bg-gray-50 text-gray-900'
}

// Enhanced with smooth transitions and transforms
variants: {
  primary: `
    bg-blue-600 hover:bg-blue-700 active:bg-blue-800
    text-white border-blue-600
    shadow-sm hover:shadow-md active:shadow-sm
    transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]
    transition-all duration-200 ease-out
    hover:ring-2 hover:ring-blue-500/20
  `,
  secondary: `
    bg-white hover:bg-gray-50 active:bg-gray-100
    text-gray-900 border-gray-300
    shadow-sm hover:shadow active:shadow-sm  
    transform hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]
    transition-all duration-200 ease-out
    hover:ring-2 hover:ring-gray-300/20
    dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100
  `,
}
```

#### 1.2 Loading State Animation Enhancement
```tsx
// Enhanced loading spinner with pulse effect
{loading && (
  &lt;div className="flex items-center gap-2"&gt;
    &lt;svg
      className="animate-spin h-4 w-4 text-current"
      viewBox="0 0 24 24"
      fill="none"
    &gt;
      &lt;circle 
        className="opacity-25" 
        cx="12" cy="12" r="10" 
        stroke="currentColor" strokeWidth="4" 
      /&gt;
      &lt;path 
        className="opacity-75" 
        fill="currentColor" 
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" 
      /&gt;
    &lt;/svg&gt;
    &lt;span className="animate-pulse"&gt;{children}&lt;/span&gt;
  &lt;/div&gt;
)}
```

#### 1.3 Focus State Improvements
```tsx
// Enhanced focus states with better visibility
const baseFocus = `
  focus-visible:outline-none 
  focus-visible:ring-2 focus-visible:ring-blue-500 
  focus-visible:ring-offset-2 focus-visible:ring-offset-white
  dark:focus-visible:ring-offset-gray-900
  focus-visible:scale-[1.02]
  transition-all duration-200
`;
```

### Step 2: Form Input Enhancements

#### 2.1 Enhanced Input States
```tsx
// Create enhanced input component
interface InputProps extends React.InputHTMLAttributes&lt;HTMLInputElement&gt; {
  error?: boolean;
  success?: boolean;
}

export function Input({ error, success, className, ...props }: InputProps) {
  return (
    &lt;input
      className={cn(
        // Base styles
        'w-full px-3 py-2 border rounded-lg',
        'bg-white dark:bg-gray-900',
        'text-gray-900 dark:text-gray-100',
        'placeholder-gray-500 dark:placeholder-gray-400',
        
        // Default state
        'border-gray-300 dark:border-gray-600',
        
        // Focus state
        'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
        'focus:outline-none',
        
        // Hover state
        'hover:border-gray-400 dark:hover:border-gray-500',
        
        // Transitions
        'transition-all duration-200 ease-out',
        
        // Error state
        error && `
          border-red-300 dark:border-red-600
          focus:ring-red-500/20 focus:border-red-500
          bg-red-50/50 dark:bg-red-900/10
        `,
        
        // Success state
        success && `
          border-green-300 dark:border-green-600
          focus:ring-green-500/20 focus:border-green-500
          bg-green-50/50 dark:bg-green-900/10
        `,
        
        className
      )}
      {...props}
    /&gt;
  );
}
```

#### 2.2 Search Input with Animation
```tsx
// Enhanced search input (for SimpleSearch component)
export function SimpleSearch({ value, onChange }: SimpleSearchProps) {
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
          placeholder="Search..."
          className={cn(
            'w-full pl-10 pr-4 py-2 border rounded-lg',
            'bg-white/80 dark:bg-gray-800/80',
            'backdrop-blur-sm',
            'border-gray-200 dark:border-gray-600',
            'focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
            'focus:bg-white dark:focus:bg-gray-800',
            'transition-all duration-200 ease-out',
            'placeholder-gray-400 dark:placeholder-gray-500'
          )}
        /&gt;
        
        {value && (
          &lt;button
            onClick={() =&gt; onChange('')}
            className={cn(
              'absolute right-2 p-1 rounded-full',
              'text-gray-400 hover:text-gray-600',
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              'transition-all duration-150',
              'animate-in fade-in zoom-in-95 duration-200'
            )}
          &gt;
            &lt;XIcon className="h-4 w-4" /&gt;
          &lt;/button&gt;
        )}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}
```

### Step 3: Panel and Card Interactions

#### 3.1 Enhanced Card Hover Effects
```tsx
// Interactive card component
export function InteractiveCard({ children, onClick, className }: CardProps) {
  return (
    &lt;div className={cn(
      'bg-white dark:bg-gray-900',
      'border border-gray-200 dark:border-gray-700',
      'rounded-lg shadow-sm',
      
      // Hover effects
      'hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600',
      'hover:-translate-y-0.5 hover:scale-[1.01]',
      
      // Click effects (if clickable)
      onClick && 'cursor-pointer active:scale-[0.99]',
      
      // Transitions
      'transition-all duration-200 ease-out',
      
      className
    )}
    onClick={onClick}
    &gt;
      {children}
    &lt;/div&gt;
  );
}
```

#### 3.2 Animated Panel Transitions
```tsx
// Enhanced panel with smooth transitions
export function Panel({ children, title, isVisible = true }: PanelProps) {
  return (
    &lt;div className={cn(
      'flex flex-col h-full',
      'transition-all duration-300 ease-out',
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    )}&gt;
      {title && (
        &lt;h3 className={cn(
          'text-sm font-bold tracking-wider uppercase mb-3',
          'text-gray-600 dark:text-gray-400',
          'animate-in slide-in-from-left-5 duration-300'
        )}&gt;
          {title}
        &lt;/h3&gt;
      )}
      
      &lt;div className={cn(
        'flex-1 min-h-0',
        'animate-in fade-in slide-in-from-bottom-3 duration-500'
      )}&gt;
        {children}
      &lt;/div&gt;
    &lt;/div&gt;
  );
}
```

### Step 4: Status and Feedback Animations

#### 4.1 Animated StatusPill
```tsx
export function StatusPill({ validation, compact = false }: StatusPillProps) {
  const [previousStatus, setPreviousStatus] = React.useState(validation?.isValid);
  const [showStatusChange, setShowStatusChange] = React.useState(false);
  
  React.useEffect(() =&gt; {
    if (previousStatus !== validation?.isValid) {
      setShowStatusChange(true);
      const timer = setTimeout(() =&gt; setShowStatusChange(false), 1000);
      setPreviousStatus(validation?.isValid);
      return () =&gt; clearTimeout(timer);
    }
  }, [validation?.isValid, previousStatus]);

  return (
    &lt;div className={cn(
      'inline-flex items-center gap-2 px-3 py-1.5',
      'rounded-full border font-medium text-sm',
      'transition-all duration-300 ease-out',
      
      // Status change animation
      showStatusChange && 'animate-pulse scale-110',
      
      // Status-specific styles
      validation?.isValid ? statusStyles.valid : 
      validation === null ? statusStyles.pending : statusStyles.invalid,
    )}&gt;
      &lt;span className={cn(
        'w-2 h-2 rounded-full flex-shrink-0',
        'transition-all duration-300',
        'ring-2 ring-white dark:ring-gray-900',
        
        // Pulsing animation for active states
        validation?.isValid && 'animate-pulse',
        
        dotColor
      )} /&gt;
      
      {!compact && (
        &lt;span className="transition-all duration-200"&gt;
          {message}
        &lt;/span&gt;
      )}
    &lt;/div&gt;
  );
}
```

#### 4.2 Validation Error Animations
```tsx
export function ValidationErrors({ errors }: ValidationErrorsProps) {
  return (
    &lt;div className="space-y-2"&gt;
      {errors.map((error, index) =&gt; (
        &lt;div
          key={`${error.message}-${error.line}`}
          className={cn(
            'bg-red-50 dark:bg-red-900/20',
            'border-l-4 border-red-500',
            'p-3 rounded-r-lg',
            'animate-in slide-in-from-left-5 duration-300',
            // Stagger animation for multiple errors
            `delay-[${index * 100}ms]`
          )}
        &gt;
          &lt;p className="text-red-800 dark:text-red-200 font-medium"&gt;
            {error.message}
          &lt;/p&gt;
          {error.line && (
            &lt;p className="text-red-600 dark:text-red-300 text-sm mt-1"&gt;
              Line {error.line}
            &lt;/p&gt;
          )}
        &lt;/div&gt;
      ))}
    &lt;/div&gt;
  );
}
```

### Step 5: Tree View Interactions

#### 5.1 Animated Tree Node Expansion
```tsx
// Enhanced tree node with smooth expand/collapse
export function TreeNode({ node, onToggleExpand }: TreeNodeProps) {
  const [isExpanding, setIsExpanding] = React.useState(false);
  
  const handleToggle = () =&gt; {
    setIsExpanding(true);
    onToggleExpand(node.path);
    setTimeout(() =&gt; setIsExpanding(false), 200);
  };
  
  return (
    &lt;div className="space-y-1"&gt;
      &lt;div className={cn(
        'flex items-center gap-2 p-2 rounded-lg',
        'hover:bg-gray-50 dark:hover:bg-gray-800',
        'group cursor-pointer',
        'transition-all duration-150 ease-out'
      )}&gt;
        {node.children && (
          &lt;button
            onClick={handleToggle}
            className={cn(
              'flex items-center justify-center w-4 h-4',
              'rounded hover:bg-gray-200 dark:hover:bg-gray-600',
              'transition-all duration-200',
              isExpanding && 'animate-spin'
            )}
          &gt;
            &lt;ChevronRightIcon className={cn(
              'h-3 w-3 transition-transform duration-200',
              node.isExpanded && 'rotate-90'
            )} /&gt;
          &lt;/button&gt;
        )}
        
        &lt;span className="font-medium text-blue-600 dark:text-blue-400"&gt;
          {node.key}
        &lt;/span&gt;
        
        &lt;span className={cn(
          'flex-1 truncate text-gray-600 dark:text-gray-300',
          'group-hover:text-gray-900 dark:group-hover:text-gray-100',
          'transition-colors duration-150'
        )}&gt;
          {node.summary}
        &lt;/span&gt;
      &lt;/div&gt;
      
      {node.isExpanded && node.children && (
        &lt;div className={cn(
          'ml-4 pl-2 border-l border-gray-200 dark:border-gray-700',
          'animate-in slide-in-from-top-2 fade-in duration-200'
        )}&gt;
          {node.children.map((child) =&gt; (
            &lt;TreeNode key={child.path.join('.')} node={child} onToggleExpand={onToggleExpand} /&gt;
          ))}
        &lt;/div&gt;
      )}
    &lt;/div&gt;
  );
}
```

### Step 6: Micro-Animations and Polish

#### 6.1 Page Transition Animations
```tsx
// Add smooth page/view transitions
export function ViewTransition({ children, viewMode }: ViewTransitionProps) {
  return (
    &lt;div className={cn(
      'animate-in fade-in slide-in-from-bottom-4 duration-300',
      'h-full'
    )}&gt;
      {children}
    &lt;/div&gt;
  );
}

// Usage in App.tsx
{viewMode === 'editor' ? (
  &lt;ViewTransition viewMode="editor"&gt;
    &lt;OutputTabs ... /&gt;
  &lt;/ViewTransition&gt;
) : (
  &lt;ViewTransition viewMode="tree"&gt;
    &lt;TreeView ... /&gt;
  &lt;/ViewTransition&gt;
)}
```

#### 6.2 Copy Success Animation
```tsx
export function CopyButton({ value, disabled }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);
  
  const handleCopy = async () =&gt; {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() =&gt; setCopied(false), 2000);
  };
  
  return (
    &lt;Button
      variant={copied ? "success" : "secondary"}
      size="sm"
      onClick={handleCopy}
      disabled={disabled}
      className={cn(
        copied && 'animate-in zoom-in-95 duration-200'
      )}
    &gt;
      {copied ? (
        &lt;&gt;
          &lt;CheckIcon className="h-4 w-4 animate-in zoom-in-75 duration-200" /&gt;
          Copied!
        &lt;/&gt;
      ) : (
        &lt;&gt;
          &lt;CopyIcon className="h-4 w-4" /&gt;
          Copy
        &lt;/&gt;
      )}
    &lt;/Button&gt;
  );
}
```

## Animation Performance Guidelines

### CSS vs JavaScript Animations
- **Use CSS transitions** for simple state changes (hover, focus)
- **Use CSS animations** for repeating animations (spin, pulse)  
- **Use JavaScript** only for complex timing or dynamic values

### Performance Best Practices
```tsx
// Prefer transforms and opacity (GPU accelerated)
'transform hover:-translate-y-0.5 hover:scale-[1.02]'
'opacity-0 hover:opacity-100'

// Avoid animating layout properties
// ❌ Don't animate: width, height, padding, margin
// ✅ Do animate: transform, opacity, filter
```

### Reduced Motion Support
```tsx
// Always respect user preferences
const baseTransition = `
  transition-all duration-200 ease-out
  motion-reduce:transition-none
  motion-reduce:animate-none
`;
```

## Accessibility Considerations

### Focus Management
- Enhanced focus indicators that are clearly visible
- Logical tab order maintained during animations  
- Focus doesn't get trapped by animated elements

### Screen Reader Support
- Animation doesn't interfere with screen reader announcements
- Status changes are properly announced
- Loading states have appropriate aria-live regions

### Motion Sensitivity
- Respect `prefers-reduced-motion` setting
- Provide alternatives for essential animated feedback
- Keep animations subtle and purposeful

## Implementation Checklist

### Core Interactions
- [ ] Button hover and click states enhanced
- [ ] Input focus and validation states
- [ ] Card hover effects added
- [ ] Panel transition animations

### Feedback Animations
- [ ] StatusPill state change animations
- [ ] Validation error slide-ins
- [ ] Copy success feedback
- [ ] Loading state improvements

### Navigation Animations
- [ ] View switching transitions
- [ ] Tree node expand/collapse
- [ ] Search result highlighting
- [ ] Tab switching effects

### Performance & Accessibility
- [ ] Reduced motion preferences respected
- [ ] Focus states clearly visible
- [ ] Animations don't break screen readers
- [ ] 60fps performance maintained

## Success Criteria

- [ ] All interactive elements have smooth transitions
- [ ] Hover states provide clear feedback
- [ ] Loading and status changes are visually communicated
- [ ] Animations enhance rather than distract from usability
- [ ] Performance remains smooth on mid-range devices
- [ ] Accessibility standards are maintained or improved
- [ ] Motion preferences are respected

## Next Phase

Once Phase 3 is complete, proceed to [Phase 4: Final Polish](./phase-4-polish.md) to add advanced features and finishing touches.