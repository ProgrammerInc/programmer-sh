import * as TerminalUtils from '../../../utils/terminal.utils';
import Terminal from './terminal';

// Named exports with alias to avoid ambiguity
export { Terminal, TerminalUtils };

// Export everything from component files
export * from '../../../utils/terminal.utils';
export * from './terminal';

// Default export
export default Terminal;
