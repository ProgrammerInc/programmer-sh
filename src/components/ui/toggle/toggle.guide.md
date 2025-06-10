# Toggle Component Guide

## Overview

The Toggle component is a two-state button that can be either on or off, built on Radix UI's Toggle primitive. It's commonly used for toggling a single option on or off, like formatting options in a text editor.

## Best Practices

### Accessibility

1. **Always provide an aria-label**

When using icon-only toggles, always provide an `aria-label` to describe the action:

```tsx
<Toggle aria-label="Toggle bold">
  <Bold className="h-4 w-4" />
</Toggle>
```

2. **Use appropriate ARIA states**

The Toggle component automatically handles ARIA states through the Radix UI primitive:

- `aria-pressed`: Indicates whether the toggle is currently pressed

### Visual Design

1. **Icon Sizing**

Match icon sizes to the toggle size for proper proportions:

- Small toggle: 12px-14px icons
- Default toggle: 16px icons
- Large toggle: 18px-20px icons

```tsx
<Toggle size="sm">
  <Icon className="h-3 w-3" /> {/* 12px */}
</Toggle>

<Toggle size="default">
  <Icon className="h-4 w-4" /> {/* 16px */}
</Toggle>

<Toggle size="lg">
  <Icon className="h-5 w-5" /> {/* 20px */}
</Toggle>
```

2. **Toggle Groups**

When using multiple toggles in a group, use consistent sizing and variants:

```tsx
<div className="flex gap-2">
  <Toggle variant="outline" aria-label="Bold">
    <Bold className="h-4 w-4" />
  </Toggle>

  <Toggle variant="outline" aria-label="Italic">
    <Italic className="h-4 w-4" />
  </Toggle>
</div>
```

### States

1. **Pressed State**

The pressed state should have a visual indicator that distinguishes it from the unpressed state. The Toggle component handles this automatically with styling.

2. **Disabled State**

Use the disabled state for toggles that are not currently available:

```tsx
<Toggle disabled aria-label="Feature unavailable">
  <Icon className="h-4 w-4" />
</Toggle>
```

### Controlled vs. Uncontrolled

1. **Uncontrolled (Simple Cases)**

For simple use cases where you don't need to track the state:

```tsx
<Toggle defaultPressed={true} aria-label="Toggle option">
  Option
</Toggle>
```

2. **Controlled (Complex Cases)**

For cases where you need to control or react to the state:

```tsx
const [isPressed, setIsPressed] = useState(false);

<Toggle pressed={isPressed} onPressedChange={setIsPressed} aria-label="Toggle option">
  Option
</Toggle>;

// Do something with isPressed state
```

## Performance Considerations

### Component Memoization

The Toggle component is wrapped with React.memo to minimize unnecessary re-renders. However, for optimal performance in lists or complex UIs, consider memoizing the toggled state as well:

```tsx
// Good: memoized callback avoids unnecessary re-renders
const handlePressedChange = useCallback(pressed => {
  setIsPressed(pressed);
}, []);

<Toggle onPressedChange={handlePressedChange}>Option</Toggle>;
```

## Mobile Considerations

1. **Touch Targets**

Ensure toggle buttons have an adequate touch target size for mobile devices. The default sizing is designed to be touch-friendly, but consider using the "lg" size on mobile interfaces:

```tsx
<Toggle
  size="lg" // Larger touch target for mobile
  aria-label="Toggle option"
>
  Option
</Toggle>
```

2. **Hover States**

Keep in mind that hover states are not available on touch devices. Ensure that the pressed state has adequate visual contrast.

## Integration with Forms

When using Toggle within forms, you can integrate it with form libraries like React Hook Form:

```tsx
import { useForm, Controller } from 'react-hook-form';
import { Toggle } from '@/components/ui/toggle';

function ToggleForm() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      isBold: false
    }
  });

  const onSubmit = data => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="isBold"
        control={control}
        render={({ field }) => (
          <Toggle pressed={field.value} onPressedChange={field.onChange} aria-label="Toggle bold">
            Bold
          </Toggle>
        )}
      />

      <button type="submit">Submit</button>
    </form>
  );
}
```

## Customization

### CSS Module Styling

For custom styling, use the CSS module approach:

```tsx
import styles from './custom-toggle.module.css';

<Toggle className={`${styles.customToggle} ${styles.rounded}`} aria-label="Custom toggle">
  Custom
</Toggle>;
```

Custom CSS module example:

```css
/* custom-toggle.module.css */
.customToggle {
  background-color: var(--custom-bg);
  color: var(--custom-text);
}

.customToggle[data-state='on'] {
  background-color: var(--custom-active-bg);
  color: var(--custom-active-text);
}

.rounded {
  border-radius: 9999px;
}
```
