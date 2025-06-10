# Terminal Component Examples

## Basic Terminal Usage

```tsx
import { Terminal } from '@/components/ui/terminal';

export default function TerminalDemo() {
  return (
    <div className="h-96 w-full">
      <Terminal />
    </div>
  );
}
```

## Terminal with Initial Commands

```tsx
import { Terminal } from '@/components/ui/terminal';

export default function TerminalWithInitialCommands() {
  return (
    <div className="h-96 w-full">
      <Terminal initialCommands={['help', 'echo Hello World']} />
    </div>
  );
}
```

## Terminal with Social Links

```tsx
import { Terminal } from '@/components/ui/terminal';
import { SocialLink } from '@/types/social-links.types';

export default function TerminalWithSocialLinks() {
  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: 'github'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: 'linkedin'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: 'twitter'
    }
  ];

  return (
    <div className="h-96 w-full">
      <Terminal socialLinks={socialLinks} />
    </div>
  );
}
```

## Terminal with Custom Refs

```tsx
import { Terminal } from '@/components/ui/terminal';
import { useRef } from 'react';

export default function TerminalWithRefs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLFormElement>(null);

  return (
    <div className="h-96 w-full">
      <Terminal
        containerRef={containerRef}
        contentRef={contentRef}
        headerRef={headerRef}
        footerRef={footerRef}
      />

      <div className="mt-4 flex gap-2">
        <button
          className="px-3 py-1 bg-blue-500 text-white rounded"
          onClick={() => {
            if (contentRef.current) {
              contentRef.current.scrollTop = 0;
            }
          }}
        >
          Scroll to Top
        </button>
      </div>
    </div>
  );
}
```

## Terminal with Custom Styling

```tsx
import { Terminal } from '@/components/ui/terminal';

export default function CustomStyledTerminal() {
  return (
    <div className="h-96 w-full">
      <Terminal className="border-2 border-blue-500 shadow-lg" />
    </div>
  );
}
```

## Custom Terminal Commands Implementation

```tsx
import { useEffect } from 'react';
import { Terminal } from '@/components/ui/terminal';

export default function CustomCommandsTerminal() {
  useEffect(() => {
    // Register custom commands - this would be done at application startup
    const registerCustomCommands = async () => {
      // Import the command registration function
      const { registerCommand } = await import('@/hooks/use-command-execution.hook');

      // Register a custom 'weather' command
      registerCommand('weather', async args => {
        const location = args[0] || 'current';

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
          content: `Weather for ${location}: 72°F and sunny`,
          isError: false
        };
      });
    };

    registerCustomCommands();
  }, []);

  return (
    <div className="h-96 w-full">
      <Terminal initialCommands={['help', 'weather Berlin']} />
    </div>
  );
}
```

## Terminal with Authentication Flow

```tsx
import { Terminal } from '@/components/ui/terminal';

export default function AuthTerminal() {
  return (
    <div className="h-96 w-full">
      <Terminal initialCommands={['whoami', 'help auth']} />
    </div>
  );
}
```

## Interactive Terminal Application

```tsx
import { Terminal } from '@/components/ui/terminal';
import { useState, useEffect } from 'react';

export default function InteractiveTerminal() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Example of external state affecting the terminal
    const timer = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString();
      setMessages(prev => [...prev, `System notification at ${timestamp}`]);
    }, 30000); // Every 30 seconds

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      // You would use a proper command execution here
      // This is simplified for the example
      const lastMessage = messages[messages.length - 1];
      document.querySelector('.terminal-input')?.dispatchEvent(
        new CustomEvent('terminal-command', {
          detail: { command: `echo "${lastMessage}"` }
        })
      );
    }
  }, [messages]);

  return (
    <div className="h-96 w-full">
      <Terminal initialCommands={['echo "Interactive terminal is running..."']} />
    </div>
  );
}
```

## Terminal with Custom Theme

```tsx
import { Terminal } from '@/components/ui/terminal';
import { useState } from 'react';

export default function ThemedTerminal() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          className={`px-3 py-1 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTheme('dark')}
        >
          Dark Theme
        </button>
        <button
          className={`px-3 py-1 rounded ${theme === 'light' ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => setTheme('light')}
        >
          Light Theme
        </button>
      </div>

      <div className="h-96 w-full">
        <Terminal initialCommands={[`theme ${theme}`, 'echo "Theme applied!"']} />
      </div>
    </div>
  );
}
```
