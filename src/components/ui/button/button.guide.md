# Button Component Guide

This guide provides best practices, accessibility information, and implementation details for the Button component.

## Best Practices

### When to Use

✅ **Do use buttons for:**
- Interactive actions that trigger immediate operations
- Form submissions
- Toggling UI states
- Primary and secondary calls to action
- Dialog confirmations and cancellations

❌ **Don't use buttons for:**
- Navigation between pages (use links instead)
- Text styling that doesn't represent an action
- Container elements that should use more semantic HTML

### Button Variants

- **Default**: Use for primary actions that are the main call to action on a page
- **Secondary**: Use for secondary actions that should be visible but less prominent
- **Outline**: Use when you need a button with lower visual hierarchy but still clearly identifiable
- **Destructive**: Use for actions that delete, remove or have destructive consequences
- **Ghost**: Use for actions in compact spaces or when minimal visual interference is needed
- **Link**: Use for actions that conceptually link to somewhere but behave like buttons

### Button Sizing

- **Small (sm)**: Use in tight spaces or for secondary actions
- **Default**: Use for most buttons
- **Large (lg)**: Use for primary actions or to emphasize importance
- **Icon**: Use for buttons that only contain an icon

## Accessibility Considerations

### Keyboard Interaction

- Ensure all buttons are focusable and actionable via keyboard
- Use `Enter` or `Space` to activate buttons
- Maintain visible focus states for all buttons

### Screen Readers

- Icon-only buttons **must** include an `aria-label` to describe their purpose
- Buttons with icons and text don't need `aria-label` as the text provides context
- Loading buttons should use `aria-busy="true"` when in a loading state

### Color and Contrast

- Maintain a minimum 4.5:1 contrast ratio between button text and background
- Don't rely solely on color to convey the purpose of buttons
- Ensure focus indicators have sufficient contrast against the page background

### Implementation Examples

#### Accessible Icon Button

```tsx
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function AccessibleIconButton() {
  return (
    <Button 
      size="icon" 
      aria-label="Add new item"
    >
      <Plus className="h-4 w-4" />
    </Button>
  );
}
```

#### Loading State with Accessibility

```tsx
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export function AccessibleLoadingButton() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };
  
  return (
    <Button 
      onClick={handleClick}
      disabled={isLoading}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> 
          Loading...
        </>
      ) : (
        'Save Changes'
      )}
    </Button>
  );
}
```

## Technical Details

### Component Structure

The Button component is built with several key features:

1. **Radix UI Slot Integration**: Enables composition with other elements via `asChild`
2. **CSS Module Styling**: Uses modular CSS for consistent styling and theming
3. **Memoization**: Performance optimization for styling calculations
4. **Forward Refs**: Allows passing refs to the underlying button element

### CSS Variables

The button component relies on these CSS variables for theming:

- `--background`: Button background color
- `--foreground`: Button text color
- `--ring`: Focus ring color
- `--ring-offset`: Focus ring offset color

### Performance Considerations

- The component uses `React.memo` to prevent unnecessary re-renders
- Class names are memoized using `useMemo` to avoid recalculations
- Avoid placing complex components or logic inside buttons when possible

### Integration Examples

#### Use with Form Libraries

```tsx
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

export function FormExample() {
  const { register, handleSubmit, formState } = useForm();
  const { isSubmitting } = formState;
  
  const onSubmit = async (data) => {
    // Form submission logic
    await new Promise(r => setTimeout(r, 2000));
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      <Button 
        type="submit" 
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </Button>
    </form>
  );
}
```

#### Button with Tooltip

```tsx
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

export function ButtonWithTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Info className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>More information about this action</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

### Custom Variants

If you need to create custom button variants beyond the provided options, you can do so by extending the CSS module:

```css
/* In your custom CSS module */
.button-custom {
  background-color: var(--custom-color);
  color: white;
  border: 2px dashed var(--custom-border);
}

.button-custom:hover {
  background-color: var(--custom-color-hover);
}
```

Then use it in your component:

```tsx
import { Button } from '@/components/ui/button';
import customStyles from './custom-button.module.css';
import { cn } from '@/lib/utils';

export function CustomButton() {
  return (
    <Button className={cn(customStyles['button-custom'])}>
      Custom Button
    </Button>
  );
}
```
