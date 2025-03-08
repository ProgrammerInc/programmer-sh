
import Terminal from './terminal';
import * as TerminalUtils from './terminal-utils';

// Named exports with alias to avoid ambiguity
export { Terminal, TerminalUtils };

// Export everything except Terminal from component files
export * from './terminal';
export * from './terminal-utils';

// Default export
export default Terminal;
