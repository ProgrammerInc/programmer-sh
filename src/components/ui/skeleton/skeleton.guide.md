# Skeleton Component Guide

## Overview

The Skeleton component is a UI placeholder used to indicate loading states. It displays a pulsing animation to signify that content is being loaded, providing users with visual feedback that the system is working.

## Features

- **Simple API**: Lightweight component that accepts standard HTML div attributes
- **Predefined Variants**: Built-in styles for common UI elements (avatar, text, button, etc.)
- **Polymorphic Rendering**: Can render as any HTML element using the `as` prop
- **Animation Control**: Ability to enable/disable the pulsing animation
- **Visibility Control**: Option to show or hide skeletons dynamically
- **Accessibility Features**: Proper ARIA attributes for screen readers
- **Customizable**: Easily adapt dimensions, shape, and layout to match your content
- **Composable**: Can be combined into various patterns for different UI elements

## Basic Usage

```tsx
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingState() {
  return <Skeleton className="h-12 w-full" />;
}
```

## Variants

The Skeleton component provides several built-in variants for common UI elements:

```tsx
// Default variant
<Skeleton className="h-12 w-full" />

// Circle variant
<Skeleton variant="circle" className="h-16 w-16" />

// Avatar variant (comes with predefined size and styling)
<Skeleton variant="avatar" />

// Text variant (for text placeholders)
<Skeleton variant="text" className="w-full" />

// Button variant (for button placeholders)
<Skeleton variant="button" className="w-32" />

// Card variant (for card placeholders)
<Skeleton variant="card" className="h-40" />
```

## Polymorphic Component

The Skeleton component can render as any HTML element using the `as` prop:

```tsx
// Render as a span
<Skeleton as="span" className="inline-block h-4 w-32" />

// Render as a list item
<ul>
  <Skeleton as="li" className="h-8" />
  <Skeleton as="li" className="h-8" />
</ul>
```

## Animation and Visibility Control

You can control the pulsing animation and visibility of the skeleton:

```tsx
// Disable animation
<Skeleton pulse={false} className="h-12 w-full" />

// Hide the skeleton
<Skeleton visible={false} className="h-12 w-full" />

// Dynamic control with state
function Example() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <Skeleton visible={isLoading} className="h-12 w-full" />
  );
}
```

## Customization

The Skeleton component is designed to be highly customizable through className props. You can adjust:

- **Width and height**: `w-{size}` and `h-{size}` to match content dimensions
- **Border radius**: `rounded-{size}` for different shapes (rounded corners, circles)
- **Margin and padding**: For appropriate spacing

## Accessibility Considerations

When using the Skeleton component:

1. Use the `loadingLabel` prop to provide descriptive text for screen readers
2. Consider adding `aria-busy="true"` to the parent container (already applied to the Skeleton component)
3. For longer loading times, provide alternative text information

```tsx
<Skeleton 
  loadingLabel="Loading user profile"
  className="h-12 w-12 rounded-full"
/>
```

## Best Practices

1. **Match dimensions**: Make skeletons closely match the expected dimensions of the actual content
2. **Use appropriate variants**: Choose the variant that best matches the content being loaded
3. **Use subtle animations**: The default animation is subtle by design to avoid visual strain
4. **Provide context**: Group related skeleton elements to reflect the actual layout
5. **Simplify**: Skeletons don't need to match content exactly - simplified versions work well
6. **Consistent usage**: Use skeletons consistently throughout your application for a cohesive experience
7. **Add accessibility labels**: Ensure screen readers can understand what's loading

## Common Patterns

### Text Blocks

```tsx
<div className="space-y-2">
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-3/4" />
</div>
```

### Images

```tsx
<Skeleton className="h-48 w-full rounded-md" />
```

### Avatars

```tsx
<Skeleton className="h-12 w-12 rounded-full" />
```

### Cards

```tsx
<div className="space-y-3">
  <Skeleton className="h-40 w-full rounded-lg" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-2/3" />
  <Skeleton className="h-4 w-1/2" />
</div>
