# Sonner Toast Examples

## Basic Usage

Add the Toaster component once in your application, typically in your root layout:

```tsx
// In root layout
import { Toaster } from '@/components/ui/sonner';

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

## Displaying Toast Notifications

Import the toast function from Sonner to display notifications:

```tsx
import { toast } from 'sonner';

export default function MyComponent() {
  return <button onClick={() => toast('Hello World')}>Show Toast</button>;
}
```

## Toast Variations

### Success Toast

```tsx
import { toast } from 'sonner';

function handleSuccess() {
  toast.success('Your profile has been updated successfully');
}
```

### Error Toast

```tsx
import { toast } from 'sonner';

function handleError() {
  toast.error('Failed to save changes. Please try again.');
}
```

### Info Toast

```tsx
import { toast } from 'sonner';

function showInfo() {
  toast.info('New features are available!');
}
```

### Warning Toast

```tsx
import { toast } from 'sonner';

function showWarning() {
  toast.warning('Your session will expire in 5 minutes.');
}
```

### Toast with Action

```tsx
import { toast } from 'sonner';

function showWithAction() {
  toast('Document created', {
    action: {
      label: 'Undo',
      onClick: () => console.log('Undo')
    }
  });
}
```

### Toast with Multiple Actions

```tsx
import { toast } from 'sonner';

function showWithMultipleActions() {
  toast('2 files uploaded', {
    description: 'Your files have been uploaded successfully',
    action: {
      label: 'View',
      onClick: () => console.log('View files')
    },
    cancel: {
      label: 'Dismiss',
      onClick: () => console.log('Dismissed')
    }
  });
}
```

### Toast with Custom Duration

```tsx
import { toast } from 'sonner';

function showLongToast() {
  toast('This will stay for 10 seconds', {
    duration: 10000 // 10 seconds
  });
}
```

## Customizing the Toaster

### Position

```tsx
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
```

### Rich Colors

```tsx
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
```

### Custom Theme

```tsx
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster theme="light" />
      </body>
    </html>
  );
}
```

### Expanded Mode

```tsx
import { Toaster } from '@/components/ui/sonner';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster expand />
      </body>
    </html>
  );
}
```

## Advanced Examples

### Toast with Component

```tsx
import { toast } from 'sonner';

function CustomToastComponent() {
  return (
    <div className="flex items-center gap-2">
      <img src="/avatar.jpg" alt="User" className="w-10 h-10 rounded-full" />
      <div>
        <h3 className="font-medium">John Doe</h3>
        <p className="text-sm opacity-90">Commented on your post</p>
      </div>
    </div>
  );
}

function showComponentToast() {
  toast(<CustomToastComponent />);
}
```

### Promise Handling

```tsx
import { toast } from 'sonner';

async function saveData() {
  toast.promise(fetchData(), {
    loading: 'Saving changes...',
    success: 'Changes saved successfully!',
    error: 'Failed to save changes'
  });
}

async function fetchData() {
  // Simulating API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful response 80% of the time
      if (Math.random() > 0.2) {
        resolve({ success: true });
      } else {
        reject(new Error('Network error'));
      }
    }, 2000);
  });
}
```

### Custom Toast ID

```tsx
import { toast } from 'sonner';

function showUniqueToast() {
  // Only one toast with ID 'unique-id' will be shown at a time
  toast('This is a unique toast', {
    id: 'unique-id'
  });
}

function updateUniqueToast() {
  // Updates the existing toast with the same ID
  toast('This toast has been updated', {
    id: 'unique-id'
  });
}
```

### Toast Dismissal

```tsx
import { toast } from 'sonner';

function showDismissibleToast() {
  const toastId = toast('This toast can be programmatically dismissed');

  setTimeout(() => {
    toast.dismiss(toastId);
  }, 3000);
}
```

### Dismissing All Toasts

```tsx
import { toast } from 'sonner';

function dismissAllToasts() {
  toast.dismiss();
}
```
