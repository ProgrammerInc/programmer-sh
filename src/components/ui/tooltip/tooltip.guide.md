# Tooltip Component Guide

This guide provides best practices, accessibility considerations, and implementation tips for using the Tooltip component.

## Best Practices

### When to Use Tooltips

✅ **Do use tooltips for:**

- Providing additional context for UI elements
- Explaining the purpose of buttons with only icons
- Displaying keyboard shortcuts
- Showing truncated text in full
- Providing help text for form inputs

❌ **Don't use tooltips for:**

- Critical information needed to complete a task
- Lengthy content that would be better in a modal or drawer
- Essential error messages (use inline validation instead)
- Information that should always be visible
- Interactive content (use a popover component instead)

### Content Guidelines

- Keep tooltip content concise and to the point
- Use simple language and avoid jargon
- Limit to 1-2 short sentences when possible
- Ensure content provides useful information, not just repeating what's visible
- Be consistent with tone and formatting across all tooltips

## Accessibility Considerations

### Keyboard Accessibility

The Tooltip component is built to be fully accessible for keyboard users:

- Tooltips appear on focus as well as hover
- Tab navigation works properly with tooltip triggers
- Escape key dismisses an open tooltip

### Screen Readers

- Use aria-label for icon-only buttons instead of relying solely on tooltips
- Tooltip content is properly announced by screen readers
- When using the `asChild` prop, ensure the child component has proper ARIA attributes

### Timing and Control

- The default delay (700ms) helps prevent tooltips from appearing too quickly during general navigation
- Use shorter delays for tooltips on critical UI elements that users need to access quickly
- Consider providing user settings to control tooltip delay or disable tooltips entirely

## Implementation Examples

### Basic Implementation

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button aria-label="Help">
        <InfoIcon className="h-4 w-4" />
      </button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Additional information to help the user</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Important Notes

1. **Provider Placement**: Place the `TooltipProvider` as high in the component tree as needed. All tooltips within a provider share the same delay settings.

2. **Using `asChild`**: When using `asChild` prop, you're replacing the default button element with your own component. Make sure your custom component can accept and forward refs correctly.

3. **Positioning**: Use the `side` and `align` props to position tooltips appropriately for the UI context. For example, use `side="top"` for elements at the bottom of the screen.

4. **Collision Handling**: The tooltip handles collisions with viewport edges by default. For special cases, adjust the `collisionPadding` prop.

5. **Performance**: Tooltips use React.memo to optimize rendering performance. For large applications with many tooltips, make sure to:
   - Memoize callback functions passed to tooltips
   - Use the controlled mode (`open` and `onOpenChange` props) efficiently
   - Consider lazy loading tooltip content for complex tooltips

## Common Patterns

### Form Input Tooltips

```tsx
<div className="form-field">
  <label htmlFor="username">
    Username
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon className="ml-1 h-3 w-3" aria-label="Username requirements" />
        </TooltipTrigger>
        <TooltipContent>
          <p>
            Username must be 3-20 characters and only contain letters, numbers, and underscores.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </label>
  <input id="username" type="text" />
</div>
```

### Truncated Text with Tooltip

```tsx
<div className="w-40 truncate">
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="block truncate">
          This is a very long text that will be truncated in the UI but shown fully in a tooltip.
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>
          This is a very long text that will be truncated in the UI but shown fully in a tooltip.
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>
```

### Icon Button Tooltips

```tsx
<TooltipProvider>
  <div className="flex gap-2">
    <Tooltip>
      <TooltipTrigger asChild>
        <button aria-label="Edit">
          <EditIcon className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Edit item</p>
      </TooltipContent>
    </Tooltip>

    <Tooltip>
      <TooltipTrigger asChild>
        <button aria-label="Delete">
          <TrashIcon className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Delete item</p>
      </TooltipContent>
    </Tooltip>
  </div>
</TooltipProvider>
```
