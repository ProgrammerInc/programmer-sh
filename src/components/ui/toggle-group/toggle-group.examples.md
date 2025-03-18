# ToggleGroup Component Examples

## Basic Single Selection

A basic toggle group with single selection behavior (like radio buttons):

```tsx
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export function TextAlignmentExample() {
  return (
    <ToggleGroup 
      type="single" 
      defaultValue="center" 
      aria-label="Text alignment"
    >
      <ToggleGroupItem value="left" aria-label="Left aligned">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center aligned">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right aligned">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

## Multiple Selection

A toggle group with multiple selection behavior (like checkboxes):

```tsx
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bold, Italic, Underline } from 'lucide-react';

export function TextFormattingExample() {
  return (
    <ToggleGroup 
      type="multiple" 
      aria-label="Text formatting"
    >
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" aria-label="Underline">
        <Underline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

## Vertical Orientation

A toggle group with vertical layout:

```tsx
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export function VerticalToggleGroupExample() {
  return (
    <ToggleGroup 
      type="single" 
      orientation="vertical"
      defaultValue="1" 
      aria-label="Sidebar position"
    >
      <ToggleGroupItem value="1">
        Option 1
      </ToggleGroupItem>
      <ToggleGroupItem value="2">
        Option 2
      </ToggleGroupItem>
      <ToggleGroupItem value="3">
        Option 3
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

## Controlled ToggleGroup

A toggle group with controlled state:

```tsx
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bold, Italic, Underline } from 'lucide-react';

export function ControlledToggleGroupExample() {
  const [value, setValue] = useState(['bold']);
  
  return (
    <div className="space-y-4">
      <ToggleGroup 
        type="multiple" 
        value={value}
        onValueChange={setValue}
        aria-label="Text formatting"
      >
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      
      <div className="p-4 border rounded">
        <p>
          Selected options: {value.join(', ')}
        </p>
        <p className={`
          ${value.includes('bold') ? 'font-bold' : ''}
          ${value.includes('italic') ? 'italic' : ''}
          ${value.includes('underline') ? 'underline' : ''}
        `}>
          Formatted text preview
        </p>
      </div>
    </div>
  );
}
```

## With Variant and Size

Customizing the appearance of toggle group items:

```tsx
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export function CustomizedToggleGroupExample() {
  return (
    <ToggleGroup 
      type="single" 
      defaultValue="center" 
      variant="outline"
      size="lg"
      aria-label="Text alignment"
    >
      <ToggleGroupItem value="left" aria-label="Left aligned">
        <AlignLeft className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center aligned">
        <AlignCenter className="h-5 w-5" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right aligned">
        <AlignRight className="h-5 w-5" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

## With Text and Icons

Toggle group with both text and icons:

```tsx
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

export function IconTextToggleGroupExample() {
  return (
    <ToggleGroup 
      type="single" 
      defaultValue="center" 
      aria-label="Text alignment"
    >
      <ToggleGroupItem value="left" aria-label="Left aligned">
        <AlignLeft className="h-4 w-4 mr-1" />
        <span>Left</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Center aligned">
        <AlignCenter className="h-4 w-4 mr-1" />
        <span>Center</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Right aligned">
        <AlignRight className="h-4 w-4 mr-1" />
        <span>Right</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

## Disabled Items

Toggle group with some disabled items:

```tsx
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bold, Italic, Underline, Strikethrough, Link } from 'lucide-react';

export function DisabledToggleGroupItemsExample() {
  return (
    <ToggleGroup type="multiple" aria-label="Text formatting">
      <ToggleGroupItem value="bold" aria-label="Bold">
        <Bold className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Italic">
        <Italic className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="strikethrough" 
        aria-label="Strikethrough"
        disabled
      >
        <Strikethrough className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="link" 
        aria-label="Link"
        disabled
      >
        <Link className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```
