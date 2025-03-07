
import Terminal from './terminal';
import TerminalContent from './terminal-content';
import TerminalFooter from './terminal-footer';
import * as TerminalUtils from './terminal-utils';

// Export components individually
export { Terminal };
export { TerminalContent };
export { TerminalFooter };
export { TerminalUtils };

// Export named exports from each file
export * from './terminal';
export * from './terminal-content';
export * from './terminal-footer';
export * from './terminal-utils';

// Default export
export default Terminal;
