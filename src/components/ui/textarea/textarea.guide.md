# Textarea Component Guide

## Overview

The Textarea component is a customizable multi-line text input field designed for collecting larger amounts of text from users. It supports various size variants, status indicators, resize behaviors, and automatically adjusts its height based on content.

## Best Practices

### Form Integration

1. **Labels and Accessibility**
   - Always associate a label with your textarea using the `htmlFor` attribute
   - Add descriptive placeholder text as a supplement to labels, not a replacement
   - Use `aria-describedby` to link error or help text with the textarea

```tsx
<div>
  <label htmlFor="message" id="message-label">Your Message</label>
  <Textarea
    id="message"
    aria-labelledby="message-label"
    aria-describedby="message-help"
    placeholder="Type your message here..."
  />
  <p id="message-help">Please be concise and specific in your message.</p>
</div>
```

2. **Controlled vs. Uncontrolled**
   - For simple forms, uncontrolled textareas may be sufficient
   - For complex forms with validation, use controlled textareas with state management

```tsx
// Controlled textarea
const [value, setValue] = useState('');
<Textarea value={value} onChange={(e) => setValue(e.target.value)} />

// Uncontrolled textarea
<Textarea defaultValue="Initial text" />
```

### Resize Behavior

1. **Choose Appropriate Resize Option**
   - Use `resize="vertical"` (default) for most cases to let users adjust height
   - Use `resize="none"` when fixed size is important for layout
   - Use `resize="both"` when users might need to adjust width and height

2. **Auto-growing**
   - Set reasonable `minRows` and `maxRows` when using auto-growing feature
   - Be aware that frequent height changes might be distracting to users

### Validation and Feedback

1. **Status Indicators**
   - Use `status="error"` to indicate validation errors
   - Use `status="success"` to indicate successful validation
   - Always provide descriptive error messages alongside error states

2. **Character Limits**
   - Use `maxLength` attribute to enforce hard character limits
   - Add a character counter for textareas with limits

```tsx
<div>
  <Textarea
    maxLength={280}
    value={value}
    onChange={handleChange}
    status={value.length > 240 ? 'warning' : 'default'}
  />
  <p>{value.length}/280 characters</p>
</div>
```

## Accessibility Considerations

1. **Keyboard Navigation**
   - The textarea element naturally supports keyboard navigation
   - Ensure focus styling is visible for keyboard users

2. **Screen Readers**
   - Use appropriate `aria-*` attributes like `aria-invalid` for error states
   - Ensure error messages are linked to the textarea via `aria-describedby`

3. **High Contrast Mode**
   - The component is styled to work well in high contrast mode
   - Borders, focus rings, and status indicators maintain proper contrast

## Performance Considerations

1. **Auto-resize Performance**
   - Auto-growing textareas can impact performance with very large text
   - Consider using a fixed size with scrolling for editing very large text documents

2. **Controlled Component Updates**
   - Be aware that controlled textareas will re-render on every keystroke
   - Use debouncing for expensive operations triggered by textarea changes

## Styling Customization

1. **CSS Module Classes**
   - The component uses CSS modules with the following key classes:
     - `.textarea`: The main textarea element
     - `.textarea-sm`, `.textarea-md`, `.textarea-lg`: Size variants
     - `.textarea-error`, `.textarea-success`: Status variants
     - `.textarea-resize-none`, `.textarea-resize-vertical`, etc.: Resize variants

2. **Custom Styling**
   - Use the `className` prop to apply custom styles
   - Override specific CSS variables for consistent theming

## Troubleshooting

1. **Text Not Visible**
   - Check that text and background colors have sufficient contrast
   - Verify that value or defaultValue props are properly passed

2. **Auto-resize Not Working**
   - Ensure `minRows` and/or `maxRows` props are provided
   - Check that the textarea is not constrained by a parent element's dimensions

3. **Value Not Updating**
   - For controlled textareas, verify that both `value` and `onChange` are provided
   - Check that state updates are working correctly in the parent component
