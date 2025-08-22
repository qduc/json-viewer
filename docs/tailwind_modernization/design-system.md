# Design System Reference

## Overview

This document defines the design system for the modernized JSON Viewer, providing consistent guidelines for colors, typography, spacing, and component patterns.

## Color Palette

### Primary Colors
```tsx
// Light Mode
bg-white           // #ffffff - Primary background
bg-gray-50         // #f9fafb - Secondary background  
bg-gray-100        // #f3f4f6 - Tertiary background

// Dark Mode
bg-gray-900        // #111827 - Primary background
bg-gray-800        // #1f2937 - Secondary background
bg-gray-700        // #374151 - Tertiary background
```

### Text Colors
```tsx
// Light Mode
text-gray-900      // #111827 - Primary text
text-gray-600      // #4b5563 - Secondary text
text-gray-500      // #6b7280 - Muted text

// Dark Mode  
text-gray-100      // #f3f4f6 - Primary text
text-gray-400      // #9ca3af - Secondary text
text-gray-500      // #6b7280 - Muted text
```

### Accent Colors
```tsx
// Blue (Primary)
text-blue-600      // #2563eb - Light mode accent
text-blue-400      // #60a5fa - Dark mode accent
bg-blue-600        // #2563eb - Primary buttons
bg-blue-50         // #eff6ff - Blue backgrounds

// Success (Green)
text-green-600     // #16a34a
text-green-400     // #4ade80
bg-green-50        // #f0fdf4

// Error (Red)
text-red-600       // #dc2626
text-red-400       // #f87171
bg-red-50          // #fef2f2

// Warning (Yellow)
text-yellow-600    // #ca8a04
text-yellow-400    // #facc15
bg-yellow-50       // #fefce8
```

### Border Colors
```tsx
border-gray-200    // #e5e7eb - Light mode
border-gray-700    // #374151 - Dark mode
border-gray-100    // #f3f4f6 - Subtle borders (light)
border-gray-800    // #1f2937 - Subtle borders (dark)
```

## Typography Scale

### Font Families
```tsx
font-sans          // -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif
font-mono          // 'Monaco', 'Menlo', 'Ubuntu Mono', monospace
```

### Font Sizes
```tsx
text-xs            // 12px - Small labels, captions
text-sm            // 14px - Body text, buttons
text-base          // 16px - Default body text
text-lg            // 18px - Large body text
text-xl            // 20px - Small headings
text-2xl           // 24px - Main headings
```

### Font Weights
```tsx
font-normal        // 400 - Regular text
font-medium        // 500 - Emphasized text
font-semibold      // 600 - Button text, labels
font-bold          // 700 - Headings, important text
```

### Line Heights & Spacing
```tsx
leading-tight      // 1.25 - Headings
leading-normal     // 1.5 - Body text
leading-relaxed    // 1.625 - Large text blocks

tracking-tight     // -0.025em - Large headings
tracking-wide      // 0.025em - Buttons, labels
tracking-wider     // 0.05em - Uppercase text
```

## Spacing Scale

### Padding & Margins
```tsx
p-1               // 4px
p-2               // 8px
p-3               // 12px
p-4               // 16px
p-6               // 24px
p-8               // 32px

// Responsive spacing
p-4 sm:p-6        // 16px → 24px
p-6 sm:p-8        // 24px → 32px
```

### Gaps
```tsx
gap-1             // 4px - Tight spacing
gap-2             // 8px - Small components
gap-3             // 12px - Default gap
gap-4             // 16px - Medium spacing
gap-6             // 24px - Large spacing
```

## Component Patterns

### Button Variants
```tsx
// Primary Button
className="
  bg-blue-600 hover:bg-blue-700 active:bg-blue-800
  text-white border-blue-600
  px-4 py-2 rounded-lg font-semibold text-sm
  shadow-sm hover:shadow-md
  transition-all duration-200
  focus-visible:ring-2 focus-visible:ring-blue-500
"

// Secondary Button
className="
  bg-white hover:bg-gray-50 active:bg-gray-100
  text-gray-900 border-gray-300
  px-4 py-2 rounded-lg font-semibold text-sm
  shadow-sm hover:shadow
  transition-all duration-200
  dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100
"
```

### Card Variants
```tsx
// Default Card
className="
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-700
  rounded-lg shadow-sm
  p-4 sm:p-6
"

// Elevated Card
className="
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-700
  rounded-xl shadow-lg
  p-6 sm:p-8
"

// Interactive Card
className="
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-700
  rounded-lg shadow-sm hover:shadow-md
  p-4 sm:p-6
  transition-all duration-200
  hover:-translate-y-0.5 hover:scale-[1.01]
"
```

### Input Patterns
```tsx
// Standard Input
className="
  w-full px-3 py-2 border rounded-lg
  bg-white dark:bg-gray-900
  border-gray-300 dark:border-gray-600
  text-gray-900 dark:text-gray-100
  focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
  transition-all duration-200
"

// Search Input with Icon
&lt;div className="relative"&gt;
  &lt;SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" /&gt;
  &lt;input className="pl-10 pr-4 py-2 ..." /&gt;
&lt;/div&gt;
```

## Shadow System

### Elevation Hierarchy
```tsx
shadow-sm          // Subtle elevation - Cards, buttons
shadow             // Default elevation - Hover states
shadow-md          // Medium elevation - Dropdowns, tooltips
shadow-lg          // High elevation - Modals, overlays
shadow-xl          // Maximum elevation - Important overlays
```

### Custom Shadows
```tsx
// Glass morphism
className="backdrop-blur-md bg-white/80 dark:bg-gray-900/80"

// Inset shadows (pressed states)
className="shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"
```

## Animation Guidelines

### Timing Functions
```tsx
duration-150       // 150ms - Quick interactions (hover, focus)
duration-200       // 200ms - Standard transitions  
duration-300       // 300ms - Longer state changes
duration-500       // 500ms - Complex animations

ease-out           // Default easing for most transitions
ease-in-out        // Smooth back-and-forth animations
```

### Transform Patterns
```tsx
// Hover effects
hover:-translate-y-0.5    // Subtle lift
hover:scale-[1.02]        // Slight grow
hover:scale-[1.05]        // Noticeable grow

// Active/pressed effects
active:translate-y-0      // Return to normal
active:scale-[0.98]       // Slight shrink
```

## Responsive Design

### Breakpoint Strategy
```tsx
// Mobile-first approach
className="text-sm sm:text-base lg:text-lg"

// Common patterns
className="px-4 sm:px-6 lg:px-8"        // Progressive spacing
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"  // Responsive grid
className="flex-col sm:flex-row"        // Layout changes
```

### Mobile Optimizations
```tsx
// Touch-friendly sizing
className="min-h-[44px] min-w-[44px]"   // Minimum tap target

// Responsive text
className="text-base sm:text-lg"        // Larger text on mobile

// Stack on mobile
className="flex flex-col sm:flex-row gap-4"
```

## Accessibility Standards

### Focus States
```tsx
// Standard focus ring
className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"

// Dark mode focus offset
className="focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900"

// High contrast focus
className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
```

### Color Contrast Requirements
- **Normal text**: 4.5:1 minimum (AA standard)
- **Large text**: 3:1 minimum (AA standard) 
- **Interactive elements**: 3:1 minimum for visual indicators

### Motion & Animation
```tsx
// Respect reduced motion preferences
className="transition-all duration-200 motion-reduce:transition-none"

// Alternative for essential animations
className="motion-reduce:animate-pulse motion-safe:animate-spin"
```

## Dark Mode Implementation

### Systematic Approach
```tsx
// Always pair light and dark variants
className="bg-white dark:bg-gray-900"
className="text-gray-900 dark:text-gray-100"
className="border-gray-200 dark:border-gray-700"
```

### Common Dark Mode Patterns
```tsx
// Backgrounds
"bg-white dark:bg-gray-900"              // Primary
"bg-gray-50 dark:bg-gray-800"            // Secondary
"bg-gray-100 dark:bg-gray-700"           // Tertiary

// Interactive states
"hover:bg-gray-50 dark:hover:bg-gray-800"
"focus:ring-blue-500 dark:focus:ring-blue-400"

// Borders and dividers
"border-gray-200 dark:border-gray-700"
"divide-gray-200 dark:divide-gray-700"
```

## Performance Considerations

### CSS Optimization
- Use consistent color values to improve CSS compression
- Leverage Tailwind's purge to remove unused styles
- Prefer transform/opacity animations over layout changes

### Bundle Size
- Use Tailwind's JIT mode for optimal bundle size
- Remove unused custom CSS once Tailwind migration is complete
- Consider splitting theme variants if bundle size becomes large

## Usage Examples

### Component Composition
```tsx
// Consistent card with proper spacing and interaction
&lt;div className="
  bg-white dark:bg-gray-900
  border border-gray-200 dark:border-gray-700  
  rounded-lg shadow-sm hover:shadow-md
  p-6 space-y-4
  transition-all duration-200
"&gt;
  &lt;h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100"&gt;
    Card Title
  &lt;/h3&gt;
  &lt;p className="text-gray-600 dark:text-gray-400"&gt;
    Card content with proper typography hierarchy.
  &lt;/p&gt;
  &lt;Button variant="primary"&gt;Action&lt;/Button&gt;
&lt;/div&gt;
```

### Form Components
```tsx
// Consistent form styling
&lt;div className="space-y-4"&gt;
  &lt;label className="block text-sm font-medium text-gray-700 dark:text-gray-300"&gt;
    Input Label
  &lt;/label&gt;
  &lt;input className="
    w-full px-3 py-2 border rounded-lg
    bg-white dark:bg-gray-900
    border-gray-300 dark:border-gray-600
    text-gray-900 dark:text-gray-100
    focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
    transition-all duration-200
  " /&gt;
  &lt;p className="text-sm text-gray-500 dark:text-gray-400"&gt;
    Helper text
  &lt;/p&gt;
&lt;/div&gt;
```

This design system ensures consistency across all components while providing flexibility for unique use cases.