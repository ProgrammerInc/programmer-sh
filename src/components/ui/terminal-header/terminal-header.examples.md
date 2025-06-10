# Terminal Header Examples

## Basic Usage

The most common usage of the TerminalHeader component:

```tsx
<TerminalHeader />
```

## With Last Command

Show the most recently executed command in the header:

```tsx
<TerminalHeader lastCommand="cd projects" />
```

## With Custom Styling

Add custom styling to the terminal header:

```tsx
<TerminalHeader className="custom-header-styles" />
```

## With Social Links

Show social media links in the header:

```tsx
<TerminalHeader
  socialLinks={[
    { name: 'GitHub', url: 'https://github.com/username', icon: 'github' },
    { name: 'Twitter', url: 'https://twitter.com/username', icon: 'twitter' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/username', icon: 'linkedin' }
  ]}
/>
```

## With Ref for Programmatic Control

Use a ref to programmatically control the header:

```tsx
import { useRef } from 'react';
import { TerminalHeader, TerminalHeaderRef } from '@/components/ui/terminal-header';

const Demo = () => {
  const headerRef = useRef<TerminalHeaderRef>(null);

  const focusUserMenu = () => {
    headerRef.current?.focusUserMenu();
  };

  const closeUserMenu = () => {
    headerRef.current?.closeUserMenu();
  };

  return (
    <div>
      <TerminalHeader ref={headerRef} lastCommand="help" />
      <button onClick={focusUserMenu}>Focus User Menu</button>
      <button onClick={closeUserMenu}>Close User Menu</button>
    </div>
  );
};
```

## Complete Terminal Integration

Using the TerminalHeader as part of a complete terminal interface:

```tsx
const TerminalDemo = () => {
  const [lastCommand, setLastCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const headerRef = useRef<TerminalHeaderRef>(null);

  // Command submission handler
  const handleCommandSubmit = (command: string) => {
    if (!command.trim()) return;

    // Update last command for header display
    setLastCommand(command);

    // Update history
    setCommandHistory(prev => [command, ...prev]);
  };

  return (
    <div className="terminal">
      <TerminalHeader
        ref={headerRef}
        lastCommand={lastCommand}
        socialLinks={[{ name: 'GitHub', url: 'https://github.com/username', icon: 'github' }]}
      />

      <div className="terminal-content">{/* Terminal output content */}</div>

      <TerminalFooter onCommandSubmit={handleCommandSubmit} commandHistory={commandHistory} />
    </div>
  );
};
```
