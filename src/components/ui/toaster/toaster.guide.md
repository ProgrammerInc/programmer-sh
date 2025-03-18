# Toaster Component Guide

## Overview

The Toaster component is a container that renders toast notifications triggered by the useToast hook. It should be included once in your application, typically in a layout or root component.

## Best Practices

### Placement in Application

The Toaster component should be included at the root of your application to ensure toasts can be displayed regardless of which component triggers them:

```tsx
// In _app.tsx or your root layout
import { Toaster } from '@/components/ui/toaster';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
```

### Toast Content Guidelines

1. **Keep it brief**: Toast messages should be concise and to the point
2. **Provide context**: Include enough information to understand the notification
3. **Use appropriate titles**: Make titles descriptive and action-oriented
4. **Consider accessibility**: Ensure messages make sense when read by screen readers

### Toast Types

Use the appropriate toast type based on the nature of the message:

- **Default**: For general information or success messages
- **Destructive**: For errors or warnings

```tsx
// Success message
toast({
  title: "Success",
  description: "Your changes have been saved"
});

// Error message
toast({
  variant: "destructive",
  title: "Error",
  description: "Failed to save changes"
});
```

### Including Actions

When a toast requires user action, include an action button:

```tsx
toast({
  title: "New comment",
  description: "Someone commented on your post",
  action: (
    <ToastAction altText="View comment" onClick={() => navigateToComment()}>
      View
    </ToastAction>
  ),
});
```

### Managing Duration

Consider the appropriate duration for different types of messages:

- **Short (2-3 seconds)**: For simple confirmations
- **Medium (4-5 seconds)**: For messages that require more time to read (default)
- **Long (6+ seconds)**: For complex messages or those requiring user action

```tsx
// Quick confirmation
toast({
  title: "Copied to clipboard",
  duration: 2000, // 2 seconds
});

// Message requiring more attention
toast({
  title: "Update available",
  description: "A new version is available. Please refresh to update.",
  duration: 8000, // 8 seconds
});
```

## Accessibility Guidelines

### Screen Reader Support

The Toaster component is built with accessibility in mind:

- Toast notifications are announced to screen readers
- ToastAction components require an `altText` prop for screen readers

```tsx
<ToastAction altText="View all 5 new notifications in the notifications panel">
  View All
</ToastAction>
```

### Keyboard Navigation

Toasts can be navigated and dismissed using the keyboard:

- `Tab` to focus on interactive elements within toasts
- `Escape` to dismiss all visible toasts
- `Enter` or `Space` to activate toast actions

### Visual Appearance

Ensure toast messages have sufficient color contrast for readability:

- Text should have sufficient contrast with the toast background
- Toast background should contrast with the page background
- Action buttons should be easily distinguishable

## Performance Considerations

### Limiting Concurrent Toasts

The hook automatically limits the number of concurrent toasts to prevent overwhelming the UI (default is 5).

### Auto-dismissal

Toasts automatically dismiss after a timeout to prevent cluttering the UI. The default duration is 5 seconds.

### Component Memoization

The Toaster component is wrapped with React.memo to minimize unnecessary re-renders.

## Mobile Considerations

### Responsive Design

The Toaster viewport is responsive and adapts to different screen sizes:

- On mobile, toasts take up a larger portion of the screen for better readability
- Toast actions have appropriately sized touch targets for mobile interactions

### Swipe to Dismiss

On touch devices, users can swipe to dismiss toasts for a more natural interaction.

## Integration with Server Components

If you're using React Server Components (RSC), remember that the Toaster and toast hook contain client-side logic and should be used within Client Components:

```tsx
// In a layout file (server component)
import { Toaster } from '@/components/ui/toaster';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster /> {/* This is fine as Toaster has 'use client' */}
      </body>
    </html>
  );
}
```

```tsx
// In a client component
'use client';

import { useToast } from '@/hooks/use-toast.hook';

export function SubmitButton() {
  const { toast } = useToast();
  // Can use toast() here
}
```
