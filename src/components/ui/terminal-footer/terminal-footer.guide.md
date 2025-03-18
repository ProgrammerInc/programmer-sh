# Terminal Footer Component Guide

## Overview

The Terminal Footer component provides the command input interface for the terminal, handling command submission and history navigation. It's designed to be used as part of a complete terminal interface, typically alongside TerminalContent and other terminal components.

## Key Features

- **Command Input**: Provides a text input field for entering commands
- **History Navigation**: Supports navigating through command history using arrow keys
- **Custom Prompt**: Allows customizing the prompt text shown before the command input
- **Processing State**: Shows a loading indicator when commands are being processed
- **Accessibility**: Includes proper ARIA attributes for improved accessibility
- **Auto-focus**: Automatically focuses the input after command submission
- **Keyboard Shortcuts**: Supports keyboard navigation using arrow keys

## Usage Best Practices

### Command History Navigation

Implement proper command history navigation in the parent component:

```tsx
const handleHistoryNavigation = (direction: 'up' | 'down') => {
  if (commandHistory.length === 0) return;
  
  let newIndex = historyIndex;
  
  if (direction === 'up') {
    // Navigate backward through history (newer to older)
    newIndex = historyIndex >= commandHistory.length - 1 
      ? commandHistory.length - 1 
      : historyIndex + 1;
  } else {
    // Navigate forward through history (older to newer)
    newIndex = historyIndex <= 0 ? -1 : historyIndex - 1;
  }
  
  setHistoryIndex(newIndex);
  
  if (newIndex === -1) {
    // At the "bottom" of history, show empty input
    setCommandInput('');
  } else {
    // Show the command from history
    setCommandInput(commandHistory[commandHistory.length - 1 - newIndex]);
  }
};
```

### Form Submission

Handling form submission efficiently:

```tsx
const handleCommandSubmit = (e: React.FormEvent<HTMLFormElement> | string) => {
  let commandString = '';
  
  if (typeof e === 'string') {
    commandString = e;
  } else {
    e.preventDefault();
    commandString = commandInput;
    setCommandInput('');
  }
  
  if (!commandString.trim()) return;
  
  // Process the command
  processCommand(commandString);
  
  // Reset history index
  setHistoryIndex(-1);
};
```

### Accessibility Considerations

- Always provide descriptive `aria-label` attributes for interactive elements
- Ensure keyboard navigation is fully functional
- Make sure focus states are visible
- Provide visual indicators for processing states
- Use proper color contrast for text and background

### Custom Styling

The component uses CSS modules for styling, which can be extended by adding a custom `className` prop:

```tsx
<TerminalFooter
  // other props
  className="my-custom-terminal-footer"
/>
```

### Input Focus Management

To programmatically focus the input field from a parent component, use the ref:

```tsx
const terminalFooterRef = useRef<TerminalFooterRef>(null);

// To focus the input
terminalFooterRef.current?.focus();

// Usage
<TerminalFooter
  ref={terminalFooterRef}
  // other props
/>
```

## Common Issues and Solutions

### Issue: History navigation not working

**Solution**: Ensure the `onHistoryNavigation` callback is properly implemented in the parent component and that the command history state is being maintained.

### Issue: Command input not clearing after submission

**Solution**: Make sure you're calling `setCommandInput('')` after processing the command.

### Issue: Terminal not focusing when clicking

**Solution**: Implement a click handler in the parent terminal container:

```tsx
const handleTerminalClick = (e: React.MouseEvent) => {
  // Don't focus if clicking on a link or input
  if (
    e.target instanceof HTMLAnchorElement ||
    e.target instanceof HTMLInputElement ||
    e.target instanceof HTMLButtonElement
  ) {
    return;
  }
  
  // Focus the input
  terminalFooterRef.current?.focus();
};

// Usage
<div onClick={handleTerminalClick}>
  {/* Terminal content */}
  <TerminalFooter ref={terminalFooterRef} />
</div>
```
