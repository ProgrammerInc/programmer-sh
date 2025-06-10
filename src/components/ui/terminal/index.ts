'use client';

/**
 * Terminal Component
 *
 * A customizable command-line interface for web applications that allows users
 * to execute commands and view outputs in a terminal-like environment.
 *
 * Features:
 * - Command history with local storage persistence
 * - Custom command registration
 * - Theme-aware styling (light/dark mode)
 * - Animated command output
 * - Keyboard navigation through command history
 * - Social links integration
 * - Accessibility support
 * - Custom styling through CSS modules
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Terminal />
 *
 * // With initial commands
 * <Terminal initialCommands={['help', 'about']} />
 *
 * // With custom prompt
 * <Terminal prompt="user@website:~$" />
 *
 * // With social links
 * <Terminal
 *   showSocialLinks={true}
 *   githubUrl="https://github.com/username"
 *   twitterUrl="https://twitter.com/username"
 *   linkedinUrl="https://linkedin.com/in/username"
 * />
 * ```
 */

import Terminal from './terminal.tsx';
import {
  loadCommandHistory,
  parseCommand,
  renderCommandOutput,
  sanitizeHtml,
  saveCommandHistory,
  scrollToBottom
} from './terminal.utils';

export * from './terminal.types';
export {
  loadCommandHistory,
  parseCommand,
  renderCommandOutput,
  // Rename sanitizeHtml to avoid naming conflicts with terminal-content
  sanitizeHtml as terminalSanitizeHtml,
  saveCommandHistory,
  // Rename scrollToBottom to avoid naming conflicts with terminal-content
  scrollToBottom as terminalScrollToBottom
};

export default Terminal;
