# Sonner Toast Guide

## Overview

The Sonner Toast component provides a modern, accessible way to display toast notifications in your application. This guide covers best practices for using the component effectively.

## Features

- **Multiple Positions**: Toasts can be displayed in different positions (top, bottom, left, right, center)
- **Toast Types**: Support for success, error, info, and warning toasts
- **Rich Colors**: Optional rich color mode for better visual differentiation
- **Actions**: Add action and cancel buttons to toasts
- **Promise Handling**: Display loading, success, and error states for promises
- **Accessibility**: Built with accessibility in mind, including keyboard navigation
- **Customization**: Extensive styling options via themes and CSS variables

## Best Practices

### Implementation

1. **Single Instance**: Add the `<Toaster />` component only once in your application, typically in the root layout.

2. **Toast Content**: Keep toast messages concise and informative. Use descriptions for additional context.

3. **Appropriate Duration**: Set appropriate durations based on content importance and length:
   - Brief notifications: 3-5 seconds
   - Important notifications: 5-8 seconds
   - Notifications with actions: 8-10 seconds

4. **Use the Right Type**: Choose the appropriate toast type based on the message content:
   - `toast.success()`: For successful operations
   - `toast.error()`: For errors and failures
   - `toast.info()`: For informational messages
   - `toast.warning()`: For warnings and cautions

5. **Include Actions When Appropriate**: For toasts that require user action, include action buttons rather than forcing users to navigate elsewhere.

### UX Guidelines

1. **Don't Overuse**: Avoid flooding users with too many toast notifications at once, which can be distracting.

2. **Position Matters**: Choose positions that don't obscure important content. Bottom positions are often less intrusive.

3. **Provide Alternatives**: For critical information, don't rely solely on toasts as they are ephemeral.

4. **Dismissal Options**: Make sure users can dismiss toasts manually if needed.

5. **Visual Hierarchy**: Use different toast types to establish visual hierarchy for different message levels.

## Accessibility Considerations

1. **Screen Readers**: Toasts are announced to screen readers appropriately.

2. **Keyboard Navigation**: Users can navigate and interact with toasts using the keyboard.

3. **Sufficient Contrast**: Ensure text and background colors have sufficient contrast.

4. **Auto-dismiss Timing**: Provide enough time for users to read the content before auto-dismissal.

5. **Focus Management**: Focus is handled properly when toasts appear with interactive elements.

## API Details

### Toaster Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `enum` | `'top-right'` | Position of the toaster on the screen |
| `theme` | `enum` | `'dark'` | Theme for the toaster (light, dark, system) |
| `richColors` | `boolean` | `false` | Use rich colors for different toast types |
| `expand` | `boolean` | `false` | Expand toasts to fill the available width |
| `duration` | `number` | `4000` | Default duration for toasts in milliseconds |
| `visibleToasts` | `number` | `3` | Maximum number of toasts visible at once |
| `closeButton` | `boolean` | `false` | Show close button on toasts |
| `offset` | `string | number` | `'32px'` | Distance from the viewport edge |
| `className` | `string` | - | Additional classes for the toaster |
| `toastOptions` | `object` | - | Default options for all toasts |

### Toast Function Options

| Option | Type | Description |
|--------|------|-------------|
| `id` | `string` | Unique identifier for the toast |
| `icon` | `ReactNode` | Custom icon to display |
| `description` | `string | ReactNode` | Secondary text for the toast |
| `action` | `{ label: string, onClick: () => void }` | Action button configuration |
| `cancel` | `{ label: string, onClick: () => void }` | Cancel button configuration |
| `duration` | `number` | Duration in milliseconds |
| `position` | `enum` | Override default position |
| `important` | `boolean` | Whether the toast should not be automatically dismissed |
| `onDismiss` | `() => void` | Callback when toast is dismissed |
| `onAutoClose` | `() => void` | Callback when toast is automatically closed |

## Advanced Tips

### Custom Styling

You can further customize the styling by modifying the CSS module or adding custom CSS variables.

### Toast Management

For advanced use cases, you can programmatically manage toasts:

```tsx
// Create a toast and get its ID
const toastId = toast('Processing...');

// Update an existing toast
toast.success('Completed!', { id: toastId });

// Dismiss a specific toast
toast.dismiss(toastId);

// Dismiss all toasts
toast.dismiss();
```

### Integration with Forms

Integrate toasts with form submissions for better user feedback:

```tsx
import { toast } from 'sonner';
import { useForm } from 'some-form-library';

function ContactForm() {
  const { handleSubmit } = useForm();
  
  const onSubmit = async (data) => {
    toast.promise(
      submitForm(data),
      {
        loading: 'Sending message...',
        success: 'Message sent successfully!',
        error: (err) => `Error: ${err.message}`
      }
    );
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
      <button type="submit">Send Message</button>
    </form>
  );
}
```

### Global Error Handling

You can use Sonner for global error handling:

```tsx
window.addEventListener('error', (event) => {
  toast.error(`Unhandled error: ${event.message}`);
});

// For promise rejections
window.addEventListener('unhandledrejection', (event) => {
  toast.error(`Unhandled promise rejection: ${event.reason}`);
});
```
