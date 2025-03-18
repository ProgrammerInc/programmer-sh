# Toast Component Examples

## Basic Usage

The simplest implementation of a toast notification with title and description:

```tsx
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast/toast';
import { useToast } from '@/hooks/use-toast';

export function BasicToastExample() {
  const { toast } = useToast();
  
  return (
    <ToastProvider>
      <button
        onClick={() => {
          toast({
            title: 'Success',
            description: 'Your action was completed successfully',
          });
        }}
      >
        Show Basic Toast
      </button>
      <ToastViewport />
    </ToastProvider>
  );
}
```

## Custom Toast with Action

A toast notification with a custom action button:

```tsx
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast/toast';
import { useToast } from '@/hooks/use-toast';

export function ToastWithActionExample() {
  const { toast } = useToast();
  
  return (
    <ToastProvider>
      <button
        onClick={() => {
          toast({
            title: 'New message',
            description: 'You have 3 unread messages',
            action: (
              <ToastAction altText="View messages">
                View
              </ToastAction>
            ),
          });
        }}
      >
        Show Toast with Action
      </button>
      <ToastViewport />
    </ToastProvider>
  );
}
```

## Destructive Toast

A toast notification with destructive styling for error messages:

```tsx
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast/toast';
import { useToast } from '@/hooks/use-toast';

export function DestructiveToastExample() {
  const { toast } = useToast();
  
  return (
    <ToastProvider>
      <button
        onClick={() => {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'There was a problem with your request',
          });
        }}
      >
        Show Error Toast
      </button>
      <ToastViewport />
    </ToastProvider>
  );
}
```

## Custom Toast Duration

A toast notification with a custom duration:

```tsx
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast/toast';
import { useToast } from '@/hooks/use-toast';

export function CustomDurationToastExample() {
  const { toast } = useToast();
  
  return (
    <ToastProvider>
      <button
        onClick={() => {
          toast({
            title: 'Quick notification',
            description: 'This toast will disappear after 2 seconds',
            duration: 2000, // 2 seconds
          });
        }}
      >
        Show Quick Toast
      </button>
      <ToastViewport />
    </ToastProvider>
  );
}
```

## Manually Building a Toast

Manually building a toast notification without using the toast function:

```tsx
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast/toast';
import { useState } from 'react';

export function ManualToastExample() {
  const [open, setOpen] = useState(false);
  
  return (
    <ToastProvider>
      <button onClick={() => setOpen(true)}>
        Show Manual Toast
      </button>
      
      <Toast open={open} onOpenChange={setOpen}>
        <ToastClose />
        <ToastTitle>Custom Built Toast</ToastTitle>
        <ToastDescription>
          This toast is manually built and controlled
        </ToastDescription>
      </Toast>
      
      <ToastViewport />
    </ToastProvider>
  );
}
```

## Toast with Custom Styling

A toast notification with custom styling using CSS modules:

```tsx
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport
} from '@/components/ui/toast/toast';
import { useToast } from '@/hooks/use-toast';
import styles from './custom-toast.module.css';

export function CustomStyledToastExample() {
  const { toast } = useToast();
  
  return (
    <ToastProvider>
      <button
        onClick={() => {
          toast({
            title: 'Custom styled toast',
            description: 'This toast has custom styling',
            className: styles.customToast,
          });
        }}
      >
        Show Custom Styled Toast
      </button>
      <ToastViewport />
    </ToastProvider>
  );
}
```
