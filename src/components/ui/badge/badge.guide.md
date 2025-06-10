# Badge Component Guide

This guide provides best practices, accessibility information, and implementation details for the Badge component.

## Best Practices

### When to Use

✅ **Do use badges for:**

- Status indicators for objects or tasks
- Category or tag labels
- Counters for notifications or items
- Version numbers
- Highlighting new features
- Indicating online/offline status

❌ **Don't use badges for:**

- Primary calls to action (use buttons instead)
- Complex interactive elements
- Long text content
- Critical information that requires prominent display

### Badge Variants

- **Default**: Use for primary or important status indicators
- **Secondary**: Use for less emphasized statuses or categories
- **Destructive**: Use for errors, warnings, or negative statuses
- **Outline**: Use for subtle indicators or tags

### Badge Content Guidelines

1. **Keep it short**: Badge text should be concise, ideally 1-2 words
2. **Be clear**: Use unambiguous labels that make sense out of context
3. **Be consistent**: Use the same badge styles for similar types of information
4. **Use icons sparingly**: Only add icons when they enhance understanding

## Accessibility Considerations

### Text Contrast

- Ensure sufficient contrast between badge text and background colors
- Maintain a minimum 4.5:1 contrast ratio for text
- Test badges in both light and dark themes

### Interactive Badges

If your badges are interactive (clickable):

- Add appropriate cursor styles (usually `cursor-pointer`)
- Ensure badges are keyboard focusable with visible focus states
- Add appropriate ARIA attributes if the badge conveys important state information
- Include descriptive text for screen readers if the badge contains only an icon or number

### Implementation Example

```tsx
import { Badge } from '@/components/ui/badge';

export function AccessibleBadge() {
  const count = 5;

  return (
    <div className="relative">
      <button className="p-2 rounded border" aria-label={`Notifications (${count} unread)`}>
        <span>Notifications</span>
      </button>
      <Badge
        className="absolute -top-2 -right-2"
        aria-hidden="true" // Screen readers will use the button's aria-label
      >
        {count}
      </Badge>
    </div>
  );
}
```

## Technical Details

### Component Structure

The Badge component is built with several key features:

1. **CSS Module Styling**: Uses modular CSS for consistent styling and theming
2. **Memoization**: Performance optimization for styling calculations with `useMemo`
3. **Variant Support**: Multiple predefined visual styles

### CSS Variables

The badge component relies on these CSS variables for theming:

- `--primary` and `--primary-foreground`: For default badges
- `--secondary` and `--secondary-foreground`: For secondary badges
- `--destructive` and `--destructive-foreground`: For destructive badges
- `--ring`: For focus states

### Performance Considerations

- The component uses `memo` to prevent unnecessary re-renders
- Badge elements should be kept simple to avoid performance issues
- Avoid using too many badges in a single view

### Integration Examples

#### Badge in Navigation

```tsx
import { Badge } from '@/components/ui/badge';

export function NavigationWithBadges() {
  return (
    <nav className="flex gap-4">
      <a href="/inbox" className="flex items-center gap-2">
        Inbox
        <Badge>New</Badge>
      </a>
      <a href="/tasks" className="flex items-center gap-2">
        Tasks
        <Badge variant="secondary">5</Badge>
      </a>
      <a href="/alerts" className="flex items-center gap-2">
        Alerts
        <Badge variant="destructive">3</Badge>
      </a>
    </nav>
  );
}
```

#### Badges in Data Tables

```tsx
import { Badge } from '@/components/ui/badge';

export function TableWithBadges() {
  const data = [
    { id: 1, name: 'Project Alpha', status: 'Active' },
    { id: 2, name: 'Project Beta', status: 'Completed' },
    { id: 3, name: 'Project Gamma', status: 'On Hold' },
    { id: 4, name: 'Project Delta', status: 'Cancelled' }
  ];

  const getBadgeVariant = status => {
    switch (status) {
      case 'Active':
        return 'default';
      case 'Completed':
        return 'secondary';
      case 'On Hold':
        return 'outline';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="text-left">ID</th>
          <th className="text-left">Name</th>
          <th className="text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>
              <Badge variant={getBadgeVariant(row.status)}>{row.status}</Badge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Custom Badge Styling

If you need to create custom badge variants beyond the provided options, you can do so by extending the CSS module or using custom class names:

```css
/* In your custom CSS module */
.custom-badge {
  background-color: linear-gradient(to right, #12c2e9, #c471ed, #f64f59);
  color: white;
  border: none;
}

.custom-badge:hover {
  opacity: 0.9;
}
```

Then use it in your component:

```tsx
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import customStyles from './custom-styles.module.css';

export function CustomBadge() {
  return <Badge className={cn(customStyles['custom-badge'])}>Premium</Badge>;
}
```

### Animation and Transitions

Badges can be animated for attention or to indicate changes:

```tsx
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function AnimatedBadge() {
  const [count, setCount] = useState(0);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    // Highlight the badge briefly when count changes
    if (count > 0) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 500);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(prev => prev + 1)} className="mr-2">
        Increment
      </button>

      <Badge className={cn('transition-all duration-300', highlight ? 'scale-125 bg-primary' : '')}>
        {count}
      </Badge>
    </div>
  );
}
```
