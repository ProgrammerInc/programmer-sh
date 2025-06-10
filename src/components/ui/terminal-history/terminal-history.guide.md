# Terminal History Component Guide

## Overview

The Terminal History component is designed to display a list of previously executed commands and their outputs in a terminal-like interface. It supports both re-executing commands on render or displaying pre-generated outputs.

## Best Practices

### Command History Management

1. **Store Timestamp Information**

   - Always include timestamp information with each history item for proper chronological display.
   - Timestamps can be provided as either Date objects or ISO strings.

2. **Pre-Generate Command Outputs when Possible**
   - For better performance with large history lists, pre-generate command outputs and store them with the history items.
   - This avoids re-executing commands on every render.

```tsx
// Pre-generate outputs
const historyItem = {
  command: 'help',
  output: 'Available commands: help, about, clear...',
  timestamp: new Date()
};
```

3. **Limit History Size**
   - Consider implementing pagination or limiting the number of history items to prevent performance issues.
   - For very long history, consider using virtualization.

### Accessibility

1. **Keyboard Navigation**

   - The component supports keyboard navigation with the `Tab` key.
   - Each history item can be focused.
   - Use the `focusLastItem` method to programmatically focus on the most recent command.

2. **Screen Readers**

   - The component includes proper ARIA roles and labels for screen reader support.
   - Command outputs have `aria-live="polite"` to announce new content.

3. **Color Contrast**
   - Ensure that your terminal colors provide sufficient contrast for readability.
   - Error messages use a distinct color for better visibility.

### Custom Styling

1. **CSS Module Classes**

   - The component uses CSS modules with the following key classes:
     - `.container`: The main container element
     - `.history-item`: Individual command history items
     - `.command-row`: Row containing the prompt, command, and timestamp
     - `.prompt`: Command prompt
     - `.command-text`: The actual command text
     - `.timestamp`: Command execution timestamp
     - `.command-output`: Container for command output
     - `.error`: Styling for error messages

2. **Responsive Design**
   - On small screens, timestamps are hidden to save space.
   - Consider adding more responsive adjustments for your specific use case.

## Performance Considerations

1. **Memoization**

   - The component is wrapped with `React.memo` to prevent unnecessary re-renders.
   - The commands list is memoized using `useMemo` for better performance.

2. **Virtualization for Large Lists**

   - If you have a very large command history, consider implementing virtualization using a library like `react-window` or `react-virtualized`.

3. **Lazy Loading**
   - For extensive command history, consider implementing lazy loading or pagination.

## API Integration

1. **Command Execution**

   - The component can re-execute commands using your command system.
   - Make sure your command system is properly imported and configured.

2. **Command Click Handling**
   - The `onCommandClick` prop allows handling clicks on command links within the output.
   - This can be used to implement command chaining or suggestions.

## Troubleshooting

1. **Command Not Found Errors**

   - If you're seeing "Command not found" errors, check that your command system is properly registered and imported.

2. **Invalid Date Errors**

   - If you're seeing date formatting errors, ensure that timestamp values are valid Date objects or ISO date strings.

3. **Performance Issues**
   - If the component is slow with large history, consider pre-generating outputs or implementing virtualization.
