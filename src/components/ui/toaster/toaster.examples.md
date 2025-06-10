# Toaster Component Examples

## Basic Implementation

The simplest way to add toast capabilities to your application is to include the Toaster component in your layout and use the useToast hook in your components:

```tsx
// In your layout component
import { Toaster } from '@/components/ui/toaster';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

```tsx
// In any component where you want to show a toast
import { useToast } from '@/hooks/use-toast.hook';

export function SubmitButton() {
  const { toast } = useToast();

  return (
    <button
      onClick={() => {
        toast({
          title: 'Form submitted',
          description: "We've received your submission"
        });
      }}
    >
      Submit
    </button>
  );
}
```

## Success Toast

Show a success message after completing an operation:

```tsx
import { useToast } from '@/hooks/use-toast.hook';

export function SaveButton() {
  const { toast } = useToast();

  const handleSave = async () => {
    try {
      // Save data logic here
      await saveData();

      toast({
        title: 'Saved successfully',
        description: 'Your changes have been saved'
      });
    } catch (error) {
      // Error handling
    }
  };

  return <button onClick={handleSave}>Save Changes</button>;
}
```

## Error Toast

Show an error message when something goes wrong:

```tsx
import { useToast } from '@/hooks/use-toast.hook';

export function SubmitForm() {
  const { toast } = useToast();

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      // Form submission logic
      const response = await submitForm();

      // Success handling
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Something went wrong'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Toast with Action

Show a toast with an action button:

```tsx
import { useToast } from '@/hooks/use-toast.hook';
import { ToastAction } from '@/components/ui/toast/toast';

export function NotificationExample() {
  const { toast } = useToast();

  const showNotification = () => {
    toast({
      title: 'New message',
      description: 'You have 3 unread messages',
      action: (
        <ToastAction altText="View messages" onClick={() => (window.location.href = '/messages')}>
          View
        </ToastAction>
      )
    });
  };

  return <button onClick={showNotification}>Show Notification</button>;
}
```

## Custom Duration Toast

Show a toast with a custom duration:

```tsx
import { useToast } from '@/hooks/use-toast.hook';

export function QuickNotification() {
  const { toast } = useToast();

  const showQuickNotification = () => {
    toast({
      title: 'Quick update',
      description: 'This will disappear in 2 seconds',
      duration: 2000 // 2 seconds
    });
  };

  return <button onClick={showQuickNotification}>Quick Notification</button>;
}
```

## Toast with Custom Styling

Show a toast with custom styling:

```tsx
import { useToast } from '@/hooks/use-toast.hook';
import styles from './custom-styles.module.css';

export function CustomStyledToast() {
  const { toast } = useToast();

  const showCustomStyledToast = () => {
    toast({
      title: 'Custom styled toast',
      description: 'This toast has custom styling',
      className: styles.customToast
    });
  };

  return <button onClick={showCustomStyledToast}>Custom Styled Toast</button>;
}
```
