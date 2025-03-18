# Sheet Component Guide

## Overview

The Sheet component is a modal dialog that slides in from the edge of the screen. It's based on Radix UI's Dialog primitive and provides a fully accessible, animated interface for displaying content that doesn't need to be directly embedded in the page layout.

## Components

The Sheet component is composed of several sub-components that work together:

- `Sheet`: The root component that manages the modal state
- `SheetTrigger`: The button that opens the sheet
- `SheetContent`: The container for sheet content, which can slide in from different edges
- `SheetClose`: The button that closes the sheet
- `SheetHeader`: A layout component for organizing content at the top of the sheet
- `SheetFooter`: A layout component for organizing content at the bottom of the sheet
- `SheetTitle`: The accessible title of the sheet
- `SheetDescription`: The accessible description of the sheet

## Features

- **Direction Control**: Can slide in from top, right, bottom, or left edges
- **Responsive Design**: Adapts to different screen sizes
- **Keyboard Accessibility**: Fully navigable with keyboard
- **Screen Reader Support**: Properly announced to assistive technologies
- **Focus Management**: Automatically manages focus when opened/closed
- **Animation**: Smooth entrance and exit animations
- **Customizable Styling**: Style each part separately with CSS modules

## Basic Usage

```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';

export function BasicSheet() {
  return (
    <Sheet>
      <SheetTrigger>Open Sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>This is a description of the sheet.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {/* Your content goes here */}
          <p>Sheet body content</p>
        </div>
        <SheetFooter>
          <SheetClose>Close</SheetClose>
          <button>Save Changes</button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## Controlling Sheet Position

Use the `side` prop on `SheetContent` to control which edge the sheet appears from:

```tsx
// Right edge (default)
<SheetContent>
  Content here
</SheetContent>

// Left edge
<SheetContent side="left">
  Content here
</SheetContent>

// Top edge
<SheetContent side="top">
  Content here
</SheetContent>

// Bottom edge
<SheetContent side="bottom">
  Content here
</SheetContent>
```

## Customizing the Sheet

You can customize the appearance of the Sheet using standard React props:

```tsx
// Custom width for the sheet
<SheetContent className="max-w-lg">
  Wider content here
</SheetContent>

// Custom header styling
<SheetHeader className="border-b pb-4">
  <SheetTitle>Custom Header</SheetTitle>
</SheetHeader>

// Custom trigger button
<SheetTrigger asChild>
  <Button variant="outline" size="sm">
    <Settings className="mr-2 h-4 w-4" />
    Settings
  </Button>
</SheetTrigger>
```

## Accessibility

The Sheet component follows WAI-ARIA guidelines for dialog accessibility:

- The dialog is properly labeled using `SheetTitle`
- Additional context is provided using `SheetDescription`
- Focus is trapped inside the dialog when open
- Escape key closes the dialog
- Screen readers announce the dialog appropriately

## Controlled Usage

For more control, you can manage the Sheet state yourself:

```tsx
import { useState } from 'react';

export function ControlledSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>Open Controlled Sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Controlled Sheet</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <p>This sheet's state is controlled externally.</p>
        </div>
        <SheetFooter>
          <button onClick={() => setOpen(false)}>Custom Close</button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## Best Practices

1. Always include a `SheetTitle` for accessibility
2. Consider using `SheetDescription` to provide additional context
3. Use `SheetHeader` and `SheetFooter` for consistent layout
4. Keep content focused and not too lengthy
5. Consider the appropriate edge for your use case
6. Test keyboard navigation and screen reader announcements
7. For forms, include clear submission and cancellation options
