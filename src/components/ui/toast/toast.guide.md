# Toast Component Guide

## Best Practices

### 1. Placement

Toasts should be placed in a consistent location throughout your application, typically in the top-right corner for desktop and top/bottom of the screen for mobile devices. The `ToastViewport` component handles this automatically with responsive styling.

```tsx
<ToastProvider>
  <YourApp />
  <ToastViewport />
</ToastProvider>
```

### 2. Duration

Choose appropriate durations for your toast notifications:

- **Short (2-3 seconds)**: For simple success messages or confirmations
- **Medium (4-5 seconds)**: For messages that may need more time to read (default)
- **Long (6+ seconds)**: For complex messages or those requiring user action

```tsx
toast({
  title: "Simple confirmation",
  description: "Action completed",
  duration: 3000, // 3 seconds
});
```

### 3. Content Guidelines

- **Keep content concise**: Toast messages should be brief and to the point
- **Use clear titles**: Make titles descriptive and action-oriented
- **Provide just enough detail**: Descriptions should provide context without being verbose

```tsx
// Good
toast({
  title: "File uploaded",
  description: "report.pdf has been uploaded successfully"
});

// Too verbose
toast({
  title: "File Upload Status Notification",
  description: "We are pleased to inform you that your file named report.pdf has been successfully uploaded to our servers and is now available for viewing and sharing with other users of the application."
});
```

### 4. Use Appropriate Variants

Choose the appropriate variant for your toast based on the context:

- **default**: For neutral or positive information
- **destructive**: For errors, warnings, or destructive actions

```tsx
// Success message
toast({
  title: "Success",
  description: "Your profile has been updated"
});

// Error message
toast({
  variant: "destructive",
  title: "Error",
  description: "Failed to update profile"
});
```

### 5. Include Actions When Appropriate

When a toast requires user action or offers a way to address the notification, include an action button:

```tsx
toast({
  title: "Friend request",
  description: "Jane Doe sent you a friend request",
  action: (
    <ToastAction altText="Accept friend request">
      Accept
    </ToastAction>
  ),
});
```

## Accessibility Guidelines

### 1. Use Descriptive ALT Text

Always provide descriptive `altText` for ToastAction components, which is essential for screen reader users:

```tsx
<ToastAction altText="View all notifications in your inbox">
  View All
</ToastAction>
```

### 2. Keyboard Navigation

Ensure that users can:

- Dismiss toasts using the `Escape` key
- Tab to and activate toast actions
- Access toast content via keyboard

The default implementation handles this automatically.

### 3. Screen Reader Considerations

- Toasts are announced by screen readers automatically
- Use appropriate ARIA labels when needed
- Ensure proper heading hierarchy (Toast title acts as a heading)

### 4. Color Contrast

Ensure sufficient color contrast between:

- Text and background colors
- Toast background and page background
- Action buttons and their backgrounds

### 5. Focus Management

- Ensure focus returns to the triggering element after a toast is dismissed
- For toasts with actions, consider whether focus should move to the toast when it appears

## Performance Considerations

### 1. Limit Concurrent Toasts

Too many toasts at once can overwhelm users. Consider limiting the number of concurrent toasts to 3-5 at most.

### 2. Toast Stacking

Use a stacking strategy that makes new toasts visible without hiding older ones that may still be relevant.

### 3. Component Memoization

All toast components are wrapped with React.memo to minimize unnecessary re-renders:

```tsx
const ToastTitle = memo(React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  ToastTitleProps
>(({ className, ...props }, ref) => {
  return (
    <ToastPrimitives.Title 
      className={className ? `${styles.title} ${className}` : styles.title}
      ref={ref} 
      {...props} 
    />
  );
}));
```

## Mobile Considerations

### 1. Responsive Placement

Our toast component is responsive by default:

- On mobile, toasts appear at the top of the screen in a column
- On tablets/desktop, toasts appear in the bottom-right corner

### 2. Touch Interactions

- Swipe to dismiss is supported for touch devices
- Touch targets (like close and action buttons) are sized appropriately for mobile
