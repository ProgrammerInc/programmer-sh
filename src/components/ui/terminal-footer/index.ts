'use client';

/**
 * Terminal Footer Component
 *
 * Provides the command input interface for the terminal, handling command
 * submission and history navigation via keyboard shortcuts.
 *
 * Features:
 * - Command input with history navigation (up/down arrows)
 * - Custom prompt support
 * - Accessibility enhancements
 * - Loading state indication
 * - Keyboard navigation
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TerminalFooter
 *   commandInput={commandInput}
 *   setCommandInput={setCommandInput}
 *   handleCommandSubmit={handleCommandSubmit}
 *   onHistoryNavigation={handleHistoryNavigation}
 * />
 *
 * // With custom prompt
 * <TerminalFooter
 *   commandInput={commandInput}
 *   setCommandInput={setCommandInput}
 *   handleCommandSubmit={handleCommandSubmit}
 *   onHistoryNavigation={handleHistoryNavigation}
 *   prompt="root@server:~#"
 * />
 * ```
 */

import { TerminalFooter } from './terminal-footer';

export * from './terminal-footer';
export * from './terminal-footer.types';

export default TerminalFooter;
