# Terminal Footer Examples

## Basic Usage

The most common usage of the TerminalFooter component:

```tsx
<TerminalFooter
  commandInput={commandInput}
  setCommandInput={setCommandInput}
  handleCommandSubmit={handleCommandSubmit}
  onHistoryNavigation={handleHistoryNavigation}
/>
```

## With Custom Prompt

You can customize the prompt text:

```tsx
<TerminalFooter
  commandInput={commandInput}
  setCommandInput={setCommandInput}
  handleCommandSubmit={handleCommandSubmit}
  onHistoryNavigation={handleHistoryNavigation}
  prompt="root@server:~#"
/>
```

## With Processing State

Show a loading indicator when a command is being processed:

```tsx
<TerminalFooter
  commandInput={commandInput}
  setCommandInput={setCommandInput}
  handleCommandSubmit={handleCommandSubmit}
  onHistoryNavigation={handleHistoryNavigation}
  isProcessing={true}
/>
```

## With Custom Styling

Add additional custom styling:

```tsx
<TerminalFooter
  commandInput={commandInput}
  setCommandInput={setCommandInput}
  handleCommandSubmit={handleCommandSubmit}
  onHistoryNavigation={handleHistoryNavigation}
  className="custom-footer-class"
/>
```

## Complete Terminal Integration

Using TerminalFooter as part of a complete terminal interface:

```tsx
const TerminalDemo = () => {
  const [commandInput, setCommandInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const footerRef = useRef<TerminalFooterRef>(null);

  // Command submission handler
  const handleCommandSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!commandInput.trim()) return;

    // Process the command
    console.log(`Executing command: ${commandInput}`);

    // Update history
    setCommandHistory(prev => [commandInput, ...prev]);
    setCommandInput('');
    setHistoryIndex(-1);
  };

  // History navigation handler
  const handleHistoryNavigation = (direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return;

    let newIndex = historyIndex;

    if (direction === 'up') {
      // Navigate backward through history
      newIndex =
        historyIndex >= commandHistory.length - 1 ? commandHistory.length - 1 : historyIndex + 1;
    } else {
      // Navigate forward through history
      newIndex = historyIndex <= 0 ? -1 : historyIndex - 1;
    }

    setHistoryIndex(newIndex);

    if (newIndex === -1) {
      // At the bottom of history, show empty input
      setCommandInput('');
    } else {
      // Show the command from history
      setCommandInput(commandHistory[newIndex]);
    }
  };

  return (
    <div className="terminal">
      <div className="terminal-content">{/* Terminal output content */}</div>

      <TerminalFooter
        ref={footerRef}
        commandInput={commandInput}
        setCommandInput={setCommandInput}
        handleCommandSubmit={handleCommandSubmit}
        onHistoryNavigation={handleHistoryNavigation}
        prompt="user@example:~$"
      />
    </div>
  );
};
```
