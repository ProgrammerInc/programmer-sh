# Skeleton Component Usage Examples

## Basic Usage

```tsx
<Skeleton className="h-12 w-full" />
```

## Skeleton Variants

### Default Variant

```tsx
<Skeleton className="h-12 w-full" />
// or
<Skeleton variant="default" className="h-12 w-full" />
```

### Circle Variant

```tsx
<Skeleton variant="circle" className="h-16 w-16" />
```

### Avatar Variant

The avatar variant comes with pre-defined sizes and styles:

```tsx
<Skeleton variant="avatar" />
// Customize size if needed
<Skeleton variant="avatar" className="h-20 w-20" />
```

### Text Variant

```tsx
<Skeleton variant="text" />
<Skeleton variant="text" className="w-3/4" />
<Skeleton variant="text" className="w-1/2" />
```

### Button Variant

```tsx
<Skeleton variant="button" className="w-32" />
```

### Card Variant

```tsx
<Skeleton variant="card" className="h-40" />
```

## Polymorphic Component (Custom Element Type)

```tsx
// Render as a span
<Skeleton as="span" className="inline-block h-4 w-32" />

// Render as a list item
<ul>
  <Skeleton as="li" className="h-8" />
  <Skeleton as="li" className="h-8" />
</ul>

// Render as a button
<Skeleton as="button" className="h-10 w-24 rounded-md" disabled />
```

## Animation Control

```tsx
// Disable the pulse animation
<Skeleton pulse={false} className="h-12 w-full" />
```

## Visibility Control

```tsx
// Hide the skeleton
<Skeleton visible={false} className="h-12 w-full" />;

// Dynamic control
const [isLoading, setIsLoading] = useState(true);

<Skeleton visible={isLoading} className="h-12 w-full" />;
```

## Accessibility

```tsx
// Add a descriptive label for screen readers
<Skeleton
  loadingLabel="Loading user profile"
  className="h-12 w-12 rounded-full"
/>

// Complex component with accessible label
<div>
  <Skeleton
    variant="avatar"
    loadingLabel="Loading user avatar"
  />
  <div>
    <Skeleton
      variant="text"
      loadingLabel="Loading user name"
      className="w-32"
    />
    <Skeleton
      variant="text"
      loadingLabel="Loading user bio"
      className="w-64"
    />
  </div>
</div>
```

## Common Skeleton Patterns

### Text Line Skeletons

```tsx
<div className="space-y-2">
  <Skeleton variant="text" className="w-full" />
  <Skeleton variant="text" className="w-full" />
  <Skeleton variant="text" className="w-3/4" />
</div>
```

### Card Skeleton

```tsx
<div className="space-y-4 rounded-lg border p-4">
  <Skeleton className="h-40 w-full rounded-lg" />
  <div className="space-y-2">
    <Skeleton variant="text" className="w-full" />
    <Skeleton variant="text" className="w-3/4" />
    <Skeleton variant="text" className="w-1/2" />
  </div>
  <div className="flex justify-between pt-4">
    <Skeleton variant="button" className="w-24" />
    <Skeleton variant="button" className="w-24" />
  </div>
</div>
```

### Profile Skeleton

```tsx
<div className="flex items-center space-x-4">
  <Skeleton variant="avatar" loadingLabel="Loading user avatar" />
  <div className="space-y-2">
    <Skeleton variant="text" className="w-[250px]" />
    <Skeleton variant="text" className="w-[200px]" />
  </div>
</div>
```

### Table Skeleton

```tsx
<div className="w-full">
  {/* Table header */}
  <div className="flex border-b pb-2">
    <div className="w-[30%] pr-4">
      <Skeleton variant="text" className="w-full" />
    </div>
    <div className="w-[50%] px-4">
      <Skeleton variant="text" className="w-full" />
    </div>
    <div className="w-[20%] pl-4">
      <Skeleton variant="text" className="w-full" />
    </div>
  </div>

  {/* Table rows */}
  {Array(5)
    .fill(null)
    .map((_, i) => (
      <div key={i} className="flex border-b py-4">
        <div className="w-[30%] pr-4">
          <Skeleton variant="text" className="w-full" />
        </div>
        <div className="w-[50%] px-4">
          <Skeleton variant="text" className="w-full" />
        </div>
        <div className="w-[20%] pl-4">
          <Skeleton variant="text" className="w-2/3" />
        </div>
      </div>
    ))}
</div>
```

### Form Skeleton

```tsx
<div className="space-y-6">
  <div className="space-y-2">
    <Skeleton variant="text" className="w-24" />
    <Skeleton variant="button" className="h-10 w-full" />
  </div>
  <div className="space-y-2">
    <Skeleton variant="text" className="w-24" />
    <Skeleton variant="button" className="h-10 w-full" />
  </div>
  <div className="space-y-2">
    <Skeleton variant="text" className="w-24" />
    <Skeleton className="h-20 w-full rounded-md" />
  </div>
  <Skeleton variant="button" className="w-28" />
</div>
```

### Dashboard Widget Skeleton

```tsx
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {Array(4)
    .fill(null)
    .map((_, i) => (
      <div key={i} className="rounded-lg border p-4">
        <div className="flex justify-between">
          <Skeleton variant="text" className="w-20" />
          <Skeleton variant="circle" className="h-6 w-6" />
        </div>
        <div className="mt-3">
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="mt-4">
          <Skeleton variant="text" className="w-full" />
        </div>
      </div>
    ))}
</div>
```

### Image Gallery Skeleton

```tsx
<div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {Array(8)
    .fill(null)
    .map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="aspect-square w-full rounded-lg" />
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
    ))}
</div>
```
