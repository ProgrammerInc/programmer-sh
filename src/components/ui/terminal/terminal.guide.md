# Terminal Component Guide

This guide provides best practices, accessibility information, and implementation details for the Terminal component.

## Best Practices

### Component Structure

The Terminal component consists of several parts working together:

1. **Terminal Container**: The main container holding all terminal elements
2. **Terminal Header**: Displays the terminal title and optional social links
3. **Terminal Content**: The main area where command output is displayed
4. **Terminal Footer**: Contains the command input form

These parts should be used together for the complete terminal experience.

### Command Implementation

- Define all commands in separate files organized by functionality
- Keep command handlers small and focused on a single responsibility
- Use asynchronous command handling to prevent blocking the UI
- Return standardized CommandResult objects from all command handlers
- Provide meaningful error messages when commands fail
- Add help text for all commands to improve discoverability

### State Management

- Store command history in localStorage for persistence between sessions
- Limit history size to prevent excessive memory usage
- Implement keyboard navigation for command history
- Maintain separate state for input, history navigation, and output

### Performance

- Memoize complex rendering operations
- Use virtualization techniques for long command outputs
- Implement lazy loading for command handlers
- Throttle/debounce high-frequency events like scrolling
- Consider implementing command output pagination for very large outputs

### Customization

- Allow for theme customization (light/dark mode)
- Provide CSS variables for styling flexibility
- Support custom command implementation
- Allow for component extensions through composition

## Accessibility Guidelines

### Keyboard Navigation

The Terminal component provides extensive keyboard support:

- **Tab**: Moves focus to the command input (when in container)
- **Up/Down Arrow**: Navigate through command history
- **Enter**: Execute the current command
- **Ctrl+L** or **clear command**: Clear the terminal output
- **Ctrl+C**: Cancel the current command input

### ARIA Attributes

- Terminal container has `role="region"` and `aria-label="Terminal interface"`
- Command input has appropriate ARIA labels and descriptions
- Command output has appropriate ARIA live regions for updates

### Focus Management

- Focus is maintained on the command input during interaction
- Focus is trapped within the terminal when modal mode is active
- Focus indicators are clearly visible for keyboard navigation

### Screen Reader Considerations

- Command outputs are properly announced to screen readers
- Error messages are announced with appropriate urgency
- Interactive elements within command outputs are properly labeled
- Command execution feedback is provided through appropriate ARIA live regions

## Implementation Details

### Component Architecture

The Terminal component is built with these key files:

- `terminal.tsx`: Main component implementation
- `terminal.types.ts`: TypeScript interfaces and types
- `terminal.module.css`: CSS modules for styling
- `terminal.utils.ts`: Utility functions for terminal operations
- `index.ts`: Export manager for the component

### Utility Functions

Key utility functions included with the Terminal component:

- `renderCommandOutput`: Formats command and its output for display
- `scrollToBottom`: Scrolls terminal content to bottom
- `parseCommand`: Parses command string into command name and arguments
- `formatCommand`: Formats command for display
- `saveCommandHistory`/`loadCommandHistory`: Persist command history to localStorage

### CSS Module Structure

The CSS module organizes styles with these key classes:

- `.terminal`: Base container styles
- `.terminal-dark`/`.terminal-light`: Theme-specific styles
- `.terminal-content`: Styles for the main output area
- `.terminal-footer`: Styles for the command input area
- `.terminal-header`: Styles for the terminal header

Theme-specific variables are included for dark and light modes.

### Command Execution Flow

1. User enters command in input field
2. Command is parsed into command name and arguments
3. Command handler is looked up from registered commands
4. Command handler is executed with arguments
5. Result is rendered to the terminal output
6. Command is added to history
7. Terminal scrolls to bottom to show latest output

## Common Patterns

### Custom Command Registration

```typescript
import { registerCommand } from '@/hooks/use-command-execution.hook';

// Register a custom command
registerCommand('custom', async (args) => {
  const result = await someAsyncOperation(args);
  
  return {
    content: `Operation completed with result: ${result}`,
    isError: false
  };
});
```

### Programmatic Command Execution

```typescript
import { executeCommand } from '@/hooks/use-command-execution.hook';

// Execute a command programmatically
const result = await executeCommand('echo "Hello from code"');

// Access the result
console.log(result.content); // Output: Hello from code
console.log(result.isError); // Output: false
```

### Custom Terminal Extension

```tsx
import { Terminal } from '@/components/ui/terminal';
import { useTerminalAuth } from '@/hooks/use-terminal-auth.hook';

const EnhancedTerminal = () => {
  const { isAuthenticated, user } = useTerminalAuth();
  
  // Customize initial commands based on auth state
  const initialCommands = isAuthenticated 
    ? [`echo "Welcome back, ${user?.username}!"`] 
    : ['echo "Please log in with: login <username>"'];
  
  return (
    <Terminal 
      initialCommands={initialCommands}
      className="border border-blue-500"
    />
  );
};
```

## Troubleshooting

### Common Issues

1. **Command not found errors**
   - Ensure the command is properly registered in the command handler map
   - Check for typos in the command name
   - Verify that the module containing the command has been loaded

2. **Command output not displaying correctly**
   - Check that command result follows the expected format
   - Verify that HTML content is properly sanitized if using raw HTML
   - Ensure that the terminal content container is properly scrolling

3. **History navigation issues**
   - Verify that localStorage is available and not full
   - Check that history is being properly saved and loaded
   - Ensure keyboard events are properly handled

4. **Performance problems with large outputs**
   - Consider implementing virtualization for large outputs
   - Limit the number of commands stored in history
   - Implement pagination for command outputs

### Advanced Customization

For advanced customization beyond the provided API:

1. **Custom styling**:
   ```tsx
   <Terminal className="my-custom-terminal" />
   ```

2. **Theme customization through CSS variables**:
   ```css
   .my-theme-class {
     --terminal-background: rgba(30, 30, 40, 0.9);
     --terminal-text: rgba(220, 220, 220, 1);
     --terminal-prompt: rgba(100, 255, 100, 0.9);
   }
   ```

3. **Component composition**:
   ```tsx
   const CustomTerminal = () => {
     const terminalRef = useRef(null);
     
     return (
       <div className="relative">
         <Terminal ref={terminalRef} />
         <div className="absolute top-2 right-2">
           <button onClick={() => terminalRef.current?.clear()}>Clear</button>
         </div>
       </div>
     );
   };
   ```

## Integration with Other Components

The Terminal component can be integrated with various other components:

### File Explorer Integration

```tsx
import { Terminal } from '@/components/ui/terminal';
import { FileExplorer } from '@/components/ui/file-explorer';

const WorkspaceDemo = () => {
  const handleFileSelect = (file) => {
    // Execute cat command when a file is selected
    document.querySelector('.terminal-input')?.dispatchEvent(
      new CustomEvent('terminal-command', {
        detail: { command: `cat ${file.path}` }
      })
    );
  };
  
  return (
    <div className="grid grid-cols-2 gap-4 h-96">
      <FileExplorer onFileSelect={handleFileSelect} />
      <Terminal />
    </div>
  );
};
```

### Authentication Integration

```tsx
import { Terminal } from '@/components/ui/terminal';
import { AuthContext } from '@/contexts/auth.context';
import { useContext, useEffect, useRef } from 'react';

const AuthTerminal = () => {
  const { user, login, logout } = useContext(AuthContext);
  const hasInitialized = useRef(false);
  
  useEffect(() => {
    // Register auth commands
    const { registerCommand } = import('@/hooks/use-command-execution.hook');
    
    registerCommand('app-login', async (args) => {
      const [username, password] = args;
      
      try {
        await login(username, password);
        return { content: 'Login successful!', isError: false };
      } catch (error) {
        return { content: `Login failed: ${error.message}`, isError: true };
      }
    });
    
    registerCommand('app-logout', async () => {
      await logout();
      return { content: 'Logged out successfully', isError: false };
    });
  }, [login, logout]);
  
  useEffect(() => {
    if (!hasInitialized.current && user) {
      hasInitialized.current = true;
      // Execute initial command when user state is available
      document.querySelector('.terminal-input')?.dispatchEvent(
        new CustomEvent('terminal-command', {
          detail: { command: `echo "Welcome, ${user.username}!"` }
        })
      );
    }
  }, [user]);
  
  return <Terminal />;
};
```

These integration examples demonstrate how the Terminal component can be extended and integrated with other parts of your application.
