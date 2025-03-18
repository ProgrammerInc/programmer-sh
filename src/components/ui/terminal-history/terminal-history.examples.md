# Terminal History Examples

## Basic Usage

The most basic usage of the Terminal History component is to simply pass in an array of command history items:

```tsx
import { TerminalHistory } from '@/components/ui/terminal-history';

const commandHistory = [
  { command: 'help', timestamp: new Date() },
  { command: 'about', timestamp: new Date() },
];

<TerminalHistory history={commandHistory} />
```

## With Command Click Handler

You can add interactivity by providing a callback function for when command links are clicked within the output:

```tsx
import { TerminalHistory } from '@/components/ui/terminal-history';

const commandHistory = [
  { command: 'help', timestamp: new Date() },
  { command: 'ls -la', timestamp: new Date() },
];

const handleCommandClick = (command: string) => {
  console.log(`Clicked on command: ${command}`);
  // Execute the command or do something else
};

<TerminalHistory 
  history={commandHistory} 
  onCommandClick={handleCommandClick} 
/>
```

## Custom Prompt

You can customize the prompt displayed before each command:

```tsx
import { TerminalHistory } from '@/components/ui/terminal-history';

const commandHistory = [
  { command: 'help', timestamp: new Date() },
  { command: 'about', timestamp: new Date() },
];

<TerminalHistory 
  history={commandHistory}
  prompt="user@website:~$" 
/>
```

## Animated Output

Enable animation for the command outputs:

```tsx
import { TerminalHistory } from '@/components/ui/terminal-history';

const commandHistory = [
  { command: 'help', timestamp: new Date() },
  { command: 'about', timestamp: new Date() },
];

<TerminalHistory 
  history={commandHistory}
  animate={true}
/>
```

## With Ref for Controlling Scroll

You can use a ref to programmatically control the component:

```tsx
import { useRef } from 'react';
import { TerminalHistory, TerminalHistoryRef } from '@/components/ui/terminal-history';

const historyRef = useRef<TerminalHistoryRef>(null);
const commandHistory = [
  { command: 'help', timestamp: new Date() },
  { command: 'about', timestamp: new Date() },
];

<TerminalHistory 
  ref={historyRef}
  history={commandHistory} 
/>

// Later in your code:
const scrollToBottom = () => {
  historyRef.current?.scrollToBottom();
};

const focusLastItem = () => {
  historyRef.current?.focusLastItem();
};
```

## Pre-Generated Command Outputs

Instead of re-executing commands, you can directly provide the output:

```tsx
import { TerminalHistory } from '@/components/ui/terminal-history';

const commandHistory = [
  { 
    command: 'echo "Hello World"', 
    output: 'Hello World',
    timestamp: new Date() 
  },
  { 
    command: 'unknown-command', 
    output: 'Command not found: unknown-command',
    error: true,
    timestamp: new Date() 
  },
  { 
    command: 'help', 
    output: '<div><h3>Available Commands</h3><ul><li>help - Display this help message</li></ul></div>',
    html: true,
    timestamp: new Date() 
  },
];

<TerminalHistory history={commandHistory} />
```

## Styling

You can apply custom styles to the terminal history:

```tsx
import { TerminalHistory } from '@/components/ui/terminal-history';
import styles from './custom-styles.module.css';

const commandHistory = [
  { command: 'help', timestamp: new Date() },
  { command: 'about', timestamp: new Date() },
];

<TerminalHistory 
  history={commandHistory}
  className={styles.customTerminalHistory}
/>
```
