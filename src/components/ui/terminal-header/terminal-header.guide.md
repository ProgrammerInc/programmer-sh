# Terminal Header Component Guide

## Overview

The Terminal Header component provides the top navigation bar for the terminal interface, displaying window controls, a title with an animated cursor, the last executed command, and a user authentication menu.

## Key Features

- **Window Controls**: Visual representation of close, minimize, and maximize buttons
- **Animated Title**: Terminal title with blinking cursor animation
- **Command Path Display**: Shows the most recently executed command
- **User Authentication Menu**: Dropdown menu with login/signup or profile/logout options
- **Incognito Detection**: Detects and displays if user is in incognito mode
- **Keyboard Accessibility**: Support for keyboard navigation in dropdown menu

## Usage Best Practices

### Displaying Last Command

Keep the terminal header updated with the most recent command:

```tsx
const [lastCommand, setLastCommand] = useState('');

const handleCommandSubmit = (command: string) => {
  setLastCommand(command);
  // Process the command...
};

// In render:
<TerminalHeader lastCommand={lastCommand} />
```

### User Authentication Integration

The terminal header integrates with the authentication hooks:

```tsx
// The component uses these hooks internally
import { useAuthModal } from '@/hooks/use-auth-modal.hook';
import { useTerminalAuth } from '@/hooks/use-terminal-auth.hook';
```

Make sure these hooks are available in your application for proper functionality.

### Command Execution from User Menu

The user menu dispatches custom events for command execution. To listen for these events:

```tsx
useEffect(() => {
  const handleExecuteCommand = (e: CustomEvent) => {
    const { command } = e.detail;
    // Execute the command
    processCommand(command);
  };

  document.addEventListener('executeCommand', handleExecuteCommand as EventListener);

  return () => {
    document.removeEventListener('executeCommand', handleExecuteCommand as EventListener);
  };
}, []);
```

### Accessibility Considerations

- All window controls have proper `aria-label` attributes
- The dropdown menu uses appropriate ARIA roles (`menu`, `menuitem`)
- Keyboard navigation support for the dropdown menu (Escape key closes menu)
- Focus management for the user menu button

### Custom Styling

The component uses CSS modules for styling, which can be extended by adding a custom `className` prop:

```tsx
<TerminalHeader className="my-custom-header" />
```

### Programmatic Control

To programmatically control the header menu from a parent component, use the ref:

```tsx
const terminalHeaderRef = useRef<TerminalHeaderRef>(null);

// To focus the user menu button
terminalHeaderRef.current?.focusUserMenu();

// To close the user menu dropdown
terminalHeaderRef.current?.closeUserMenu();

// Usage
<TerminalHeader ref={terminalHeaderRef} />
```

## Common Issues and Solutions

### Issue: Header not showing the last command

**Solution**: Make sure you're setting the `lastCommand` prop with the most recent command.

### Issue: User menu not working

**Solution**: Ensure that the authentication hooks (useAuthModal and useTerminalAuth) are properly set up in your application.

### Issue: Window controls don't actually perform their functions

**Solution**: The window controls are visual elements by default. To add actual functionality to close, minimize, or maximize, add event handlers to the window control elements.

```tsx
const handleClose = () => {
  // Handle window close logic
};

// Then update the JSX for the close button:
<div 
  className={`${styles['window-control']} ${styles.close}`}
  role="button"
  aria-label="Close window"
  tabIndex={0}
  onClick={handleClose}
  onKeyDown={(e) => e.key === 'Enter' && handleClose()}
>
  <X className={styles['control-icon']} strokeWidth={3} />
</div>
```
