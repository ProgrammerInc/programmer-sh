
import Terminal from './terminal';
import TerminalContent from './terminal-content';
import TerminalFooter from './terminal-footer';
import * as TerminalUtils from './terminal-utils';

// Named exports with alias to avoid ambiguity
export { Terminal };
export { TerminalContent as TerminalContentComponent };
export { TerminalFooter };
export { TerminalUtils };

// Export everything from component files
export * from './terminal';
export * from './terminal-content';
export * from './terminal-footer';
export * from './terminal-utils';

// Default export
export default Terminal;
