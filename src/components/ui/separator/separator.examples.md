# Separator Component Usage Examples

## Basic Usage

```tsx
// Horizontal separator (default)
<Separator />
```

## Vertical Orientation

```tsx
// Vertical separator
<Separator orientation="vertical" />
```

## Custom Spacing

```tsx
// With custom margin spacing
<Separator className="my-4" />

// With custom padding spacing
<div className="px-4">
  <Separator />
</div>
```

## Within Flex Container

```tsx
// Horizontal separator in a column layout
<div className="flex flex-col space-y-4">
  <div>Content above</div>
  <Separator />
  <div>Content below</div>
</div>

// Vertical separator in a row layout
<div className="flex h-10 items-center space-x-4">
  <div>Left content</div>
  <Separator orientation="vertical" />
  <div>Right content</div>
</div>
```

## Semantic Separator

```tsx
// Non-decorative separator (semantic separator for screen readers)
// This will be announced as a thematic break by screen readers
<Separator decorative={false} />
```

## With Content Sections

```tsx
<div className="space-y-4">
  <div>
    <h3 className="text-lg font-medium">Profile</h3>
    <p className="text-sm text-muted-foreground">
      Update your personal information.
    </p>
  </div>
  <Separator />
  <div className="space-y-2">
    {/* Form fields */}
  </div>
</div>
```

## Within Cards

```tsx
<div className="rounded-lg border p-4 shadow-sm">
  <div className="font-medium">Card Title</div>
  <Separator className="my-2" />
  <div className="text-sm">Card content goes here</div>
</div>
```

## Within Navigation

```tsx
<nav className="space-y-2">
  <a href="#">Home</a>
  <Separator />
  <a href="#">Products</a>
  <Separator />
  <a href="#">About</a>
  <Separator />
  <a href="#">Contact</a>
</nav>
```
