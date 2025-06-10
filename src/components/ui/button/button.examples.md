# Button Component Examples

This document provides various examples of how to use the Button component in different scenarios.

## Basic Usage

The most basic usage is to create a button with default styling:

```tsx
import { Button } from '@/components/ui/button';

export function ButtonExample() {
  return <Button>Click me</Button>;
}
```

## Button Variants

The Button component supports different visual variants:

```tsx
import { Button } from '@/components/ui/button';

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
```

## Button Sizes

The Button component supports different sizes:

```tsx
import { Button } from '@/components/ui/button';

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="lg">Large</Button>
      <Button size="default">Default</Button>
      <Button size="sm">Small</Button>
      <Button size="icon">🔍</Button>
    </div>
  );
}
```

## Icon Buttons

You can create buttons that only display icons:

```tsx
import { Button } from '@/components/ui/button';
import { Plus, Trash, Pencil, Save } from 'lucide-react';

export function IconButtons() {
  return (
    <div className="flex gap-2">
      <Button size="icon" aria-label="Add item">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="destructive" aria-label="Delete item">
        <Trash className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="outline" aria-label="Edit item">
        <Pencil className="h-4 w-4" />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Save changes">
        <Save className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

## Buttons with Icons

You can include icons alongside text in buttons:

```tsx
import { Button } from '@/components/ui/button';
import { Send, Loader2, Trash, Save } from 'lucide-react';

export function ButtonsWithIcons() {
  return (
    <div className="flex flex-col gap-4">
      <Button>
        <Send className="mr-2 h-4 w-4" /> Send Message
      </Button>
      <Button variant="outline">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...
      </Button>
      <Button variant="destructive">
        <Trash className="mr-2 h-4 w-4" /> Delete Item
      </Button>
      <Button variant="secondary">
        <Save className="mr-2 h-4 w-4" /> Save Changes
      </Button>
    </div>
  );
}
```

## Button with Link

Using the `asChild` prop, you can render the Button as another element, like a link:

```tsx
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function ButtonAsLink() {
  return (
    <Button asChild>
      <Link href="/dashboard">Go to Dashboard</Link>
    </Button>
  );
}
```

## Button States

Buttons can be disabled or show loading states:

```tsx
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export function ButtonStates() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      <Button disabled>Disabled Button</Button>
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </>
        ) : (
          'Click me'
        )}
      </Button>
    </div>
  );
}
```

## Button Groups

You can group related buttons together:

```tsx
import { Button } from '@/components/ui/button';

export function ButtonGroup() {
  return (
    <div className="flex space-x-2">
      <Button variant="outline">Cancel</Button>
      <Button>Submit</Button>
    </div>
  );
}
```

## Full Width Button

You can make a button take the full width of its container:

```tsx
import { Button } from '@/components/ui/button';

export function FullWidthButton() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <p>This button takes up the full width:</p>
      <Button className="w-full">Full Width Button</Button>
    </div>
  );
}
```

## Form Submission Button

Using a button to submit a form:

```tsx
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function FormSubmissionButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="rounded-md border p-2"
          placeholder="Enter your email"
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
```
