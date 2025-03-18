'use client';

/**
 * Terminal Footer Props Interface
 * 
 * @interface TerminalFooterProps
 * @property {string} commandInput - Current value of the command input
 * @property {(value: string) => void} setCommandInput - Function to update the command input value
 * @property {(e: React.FormEvent<HTMLFormElement> | string) => void} handleCommandSubmit - Function to handle command submission
 * @property {(direction: 'up' | 'down') => void} onHistoryNavigation - Function to navigate through command history
 * @property {string} [prompt] - Optional custom prompt text (default: 'guest@programmer.sh:~$')
 * @property {boolean} [isProcessing] - Whether the terminal is currently processing a command
 * @property {string} [className] - Optional additional CSS class name
 */
export interface TerminalFooterProps {
  commandInput: string;
  setCommandInput: (value: string) => void;
  handleCommandSubmit: (e: React.FormEvent<HTMLFormElement> | string) => void;
  onHistoryNavigation: (direction: 'up' | 'down') => void;
  prompt?: string;
  isProcessing?: boolean;
  className?: string;
}

/**
 * Terminal Footer Reference Interface
 * 
 * @interface TerminalFooterRef
 * @property {HTMLFormElement} form - Reference to the form element
 * @property {HTMLInputElement} input - Reference to the input element
 * @property {() => void} focus - Function to focus the input element
 */
export interface TerminalFooterRef {
  form: HTMLFormElement | null;
  input: HTMLInputElement | null;
  focus: () => void;
}
