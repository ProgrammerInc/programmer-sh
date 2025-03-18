# ToggleGroup Component Guide

## Overview

The ToggleGroup component is a set of two-state buttons that can be toggled on or off, built on Radix UI's ToggleGroup primitive. It provides both single and multiple selection modes, similar to radio buttons and checkboxes but with a toggle button appearance.

## Best Practices

### Accessibility

1. **Always provide an aria-label for the group**

The ToggleGroup should have an `aria-label` that describes the purpose of the group:

```tsx
<ToggleGroup aria-label="Text alignment">
  {/* Items */}
</ToggleGroup>
```

2. **Provide aria-labels for icon-only items**

For icon-only ToggleGroupItems, provide an `aria-label` to describe the action:

```tsx
<ToggleGroupItem value="bold" aria-label="Bold">
  <Bold className="h-4 w-4" />
</ToggleGroupItem>
```

3. **Use appropriate type**

Use `type="single"` for mutually exclusive options (like radio buttons) and `type="multiple"` for independent options (like checkboxes):

```tsx
// For mutually exclusive options (like text alignment)
<ToggleGroup type="single">
  {/* Only one can be selected */}
</ToggleGroup>

// For independent options (like text formatting)
<ToggleGroup type="multiple">
  {/* Multiple can be selected */}
</ToggleGroup>
```

### Visual Design

1. **Icon Sizing**

Match icon sizes to the ToggleGroup size for proper proportions:

```tsx
<ToggleGroup size="sm">
  <ToggleGroupItem value="bold">
    <Icon className="h-3 w-3" /> {/* 12px */}
  </ToggleGroupItem>
</ToggleGroup>

<ToggleGroup size="default">
  <ToggleGroupItem value="bold">
    <Icon className="h-4 w-4" /> {/* 16px */}
  </ToggleGroupItem>
</ToggleGroup>

<ToggleGroup size="lg">
  <ToggleGroupItem value="bold">
    <Icon className="h-5 w-5" /> {/* 20px */}
  </ToggleGroupItem>
</ToggleGroup>
```

2. **Consistent Item Content**

Keep the content of all items in a group consistent - either all icons, all text, or all icon+text combinations:

```tsx
// Good: Consistent use of icons
<ToggleGroup>
  <ToggleGroupItem value="bold"><Bold /></ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic /></ToggleGroupItem>
</ToggleGroup>

// Good: Consistent use of icons with text
<ToggleGroup>
  <ToggleGroupItem value="bold"><Bold /> Bold</ToggleGroupItem>
  <ToggleGroupItem value="italic"><Italic /> Italic</ToggleGroupItem>
</ToggleGroup>
```

### States

1. **Default Values**

For single selection ToggleGroups, provide a sensible default:

```tsx
<ToggleGroup 
  type="single" 
  defaultValue="center" // Default selection
  aria-label="Text alignment"
>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>
```

2. **Disabled State**

Use the disabled state for items that are not currently available:

```tsx
<ToggleGroup type="multiple">
  <ToggleGroupItem value="bold">Bold</ToggleGroupItem>
  <ToggleGroupItem value="link" disabled>Link</ToggleGroupItem>
</ToggleGroup>
```

### Controlled vs. Uncontrolled

1. **Uncontrolled (Simple Cases)**

For simple use cases where you don't need to react to changes:

```tsx
<ToggleGroup 
  type="single" 
  defaultValue="center" 
  aria-label="Text alignment"
>
  {/* Items */}
</ToggleGroup>
```

2. **Controlled (Complex Cases)**

For cases where you need to control or react to the state:

```tsx
const [value, setValue] = useState('center');

<ToggleGroup 
  type="single"
  value={value}
  onValueChange={setValue}
  aria-label="Text alignment"
>
  {/* Items */}
</ToggleGroup>

// Do something with the value
```

## Performance Considerations

### Memoization

The ToggleGroup and ToggleGroupItem components are not wrapped with React.memo by default. For optimal performance in lists or complex UIs, consider memoizing your custom components that use ToggleGroup:

```tsx
// Memoizing a custom component that uses ToggleGroup
const TextFormatting = memo(function TextFormatting() {
  return (
    <ToggleGroup type="multiple">
      {/* Items */}
    </ToggleGroup>
  );
});
```

## Mobile Considerations

1. **Touch Targets**

Ensure ToggleGroupItems have an adequate touch target size for mobile devices. Consider using the "lg" size on mobile interfaces:

```tsx
<ToggleGroup 
  size="lg" // Larger touch target for mobile
  aria-label="Text formatting"
>
  {/* Items */}
</ToggleGroup>
```

2. **Orientation**

On mobile devices with limited horizontal space, consider using a vertical orientation:

```tsx
<ToggleGroup 
  orientation="vertical" 
  aria-label="Options"
>
  {/* Items */}
</ToggleGroup>
```

## Integration with Forms

When using ToggleGroup within forms, you can integrate it with form libraries like React Hook Form:

```tsx
import { useForm, Controller } from 'react-hook-form';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

function AlignmentForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      alignment: 'center',
    },
  });
  
  const onSubmit = (data) => console.log(data);
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="alignment"
        control={control}
        render={({ field }) => (
          <ToggleGroup
            type="single"
            value={field.value}
            onValueChange={field.onChange}
            aria-label="Text alignment"
          >
            <ToggleGroupItem value="left">Left</ToggleGroupItem>
            <ToggleGroupItem value="center">Center</ToggleGroupItem>
            <ToggleGroupItem value="right">Right</ToggleGroupItem>
          </ToggleGroup>
        )}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Common Patterns

### Toolbar-like Controls

ToggleGroup is ideal for creating toolbar-like controls:

```tsx
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

function TextEditor() {
  return (
    <div className="flex flex-col gap-2">
      <ToggleGroup type="multiple" aria-label="Text formatting">
        <ToggleGroupItem value="bold"><Bold className="h-4 w-4" /></ToggleGroupItem>
        <ToggleGroupItem value="italic"><Italic className="h-4 w-4" /></ToggleGroupItem>
        <ToggleGroupItem value="underline"><Underline className="h-4 w-4" /></ToggleGroupItem>
      </ToggleGroup>
      
      <ToggleGroup type="single" defaultValue="left" aria-label="Text alignment">
        <ToggleGroupItem value="left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
        <ToggleGroupItem value="center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
        <ToggleGroupItem value="right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
      </ToggleGroup>
      
      <textarea className="border p-2" placeholder="Type your text here" />
    </div>
  );
}
```

### View Switchers

ToggleGroup can be used for view mode selection:

```tsx
import { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { List, LayoutGrid } from 'lucide-react';

function ContentViewer() {
  const [viewMode, setViewMode] = useState('grid');
  
  return (
    <div>
      <div className="flex justify-end mb-4">
        <ToggleGroup 
          type="single" 
          value={viewMode} 
          onValueChange={setViewMode} 
          aria-label="View mode"
        >
          <ToggleGroupItem value="list" aria-label="List view">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="grid" aria-label="Grid view">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      
      <div className={viewMode === 'grid' ? 'grid grid-cols-3 gap-4' : 'space-y-2'}>
        {/* Content items */}
      </div>
    </div>
  );
}
```
