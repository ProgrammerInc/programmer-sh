# Toggle Component Examples

## Basic Usage

The simplest implementation of a toggle button:

```tsx
import { Toggle } from '@/components/ui/toggle';
import { Bold } from 'lucide-react';

export function BasicToggleExample() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
```

## Toggle Variants

Toggle with different visual styles:

```tsx
import { Toggle } from '@/components/ui/toggle';
import { Bold, Italic, Underline } from 'lucide-react';

export function ToggleVariantsExample() {
  return (
    <div className="flex gap-2">
      <Toggle aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle variant="outline" aria-label="Toggle italic">
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
```

## Toggle Sizes

Toggle with different size options:

```tsx
import { Toggle } from '@/components/ui/toggle';
import { Bold } from 'lucide-react';

export function ToggleSizesExample() {
  return (
    <div className="flex items-center gap-2">
      <Toggle size="sm" aria-label="Toggle small">
        <Bold className="h-3 w-3" />
      </Toggle>

      <Toggle size="default" aria-label="Toggle default">
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle size="lg" aria-label="Toggle large">
        <Bold className="h-5 w-5" />
      </Toggle>
    </div>
  );
}
```

## Controlled Toggle

Toggle with controlled state:

```tsx
import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Bold } from 'lucide-react';

export function ControlledToggleExample() {
  const [isBold, setIsBold] = useState(false);

  return (
    <div className="space-y-4">
      <Toggle pressed={isBold} onPressedChange={setIsBold} aria-label="Toggle bold">
        <Bold className="h-4 w-4" />
      </Toggle>

      <p className={isBold ? 'font-bold' : ''}>
        This text will become bold when you press the toggle.
      </p>
    </div>
  );
}
```

## Group of Toggles

Implementing a group of related toggles:

```tsx
import { useState } from 'react';
import { Toggle } from '@/components/ui/toggle';
import { Bold, Italic, Underline } from 'lucide-react';

export function ToggleGroupExample() {
  const [formats, setFormats] = useState({
    bold: false,
    italic: false,
    underline: false
  });

  return (
    <div className="flex gap-2">
      <Toggle
        variant="outline"
        pressed={formats.bold}
        onPressedChange={pressed => setFormats(prev => ({ ...prev, bold: pressed }))}
        aria-label="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle
        variant="outline"
        pressed={formats.italic}
        onPressedChange={pressed => setFormats(prev => ({ ...prev, italic: pressed }))}
        aria-label="Toggle italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <Toggle
        variant="outline"
        pressed={formats.underline}
        onPressedChange={pressed => setFormats(prev => ({ ...prev, underline: pressed }))}
        aria-label="Toggle underline"
      >
        <Underline className="h-4 w-4" />
      </Toggle>

      <div className="ml-4 p-2 border rounded">
        <p
          className={`
          ${formats.bold ? 'font-bold' : ''}
          ${formats.italic ? 'italic' : ''}
          ${formats.underline ? 'underline' : ''}
        `}
        >
          Formatted text preview
        </p>
      </div>
    </div>
  );
}
```

## Custom Styling with CSS Modules

Using CSS Modules for custom styling:

```tsx
import { Toggle } from '@/components/ui/toggle';
import { Bold } from 'lucide-react';
import styles from './toggle.module.css';

export function CustomStyledToggleExample() {
  return (
    <Toggle
      className={`${styles.toggle} ${styles.outline} ${styles['size-lg']}`}
      aria-label="Toggle bold"
    >
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
```

## Disabled Toggle

A toggle in a disabled state:

```tsx
import { Toggle } from '@/components/ui/toggle';
import { Bold } from 'lucide-react';

export function DisabledToggleExample() {
  return (
    <Toggle disabled aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
```
