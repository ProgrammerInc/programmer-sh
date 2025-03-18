/**
 * Terminal Header Component
 * 
 * A component that displays window controls, terminal title with animated cursor,
 * last command indicator, and user authentication menu for the terminal interface.
 * 
 * Features:
 * - Window control buttons (close, minimize, maximize) with hover effects
 * - Title display with animated cursor and last command path
 * - User authentication dropdown with login/signup or profile/logout options
 * - Responsive design that works in various terminal sizes
 * - Keyboard accessibility support
 * 
 * @example
 * ```tsx
 * <TerminalHeader 
 *   lastCommand="ls -la" 
 *   socialLinks={[
 *     { name: 'GitHub', url: 'https://github.com/username' },
 *     { name: 'Twitter', url: 'https://twitter.com/username' }
 *   ]} 
 * />
 * ```
 */

import { TerminalHeader } from './terminal-header';
import { TerminalHeaderProps, TerminalHeaderRef } from './terminal-header.types';

export { TerminalHeader };
export type { TerminalHeaderProps, TerminalHeaderRef };
export default TerminalHeader;
