/* eslint-disable no-secrets/no-secrets */
'use client';

/**
 * Terminal Footer Props Interface
 *
 * @interface TerminalFooterProps
 * @property {string} commandInput - Current value of the command input
 * @property {(value: string) => void} setCommandInput - Function to update the command input value
 * @property {(e: React.FormEvent<HTMLFormElement> | string) => void} handleCommandSubmit - Function to handle command submission
 * @property {React.RefObject<HTMLInputElement>} [inputRef] - Reference to the input element
 * @property {string} [prompt] - Optional custom prompt text (default: 'guest@programmer.sh:~$')
 * @property {boolean} [isProcessing] - Whether the terminal is currently processing a command
 * @property {string} [className] - Optional additional CSS class name
 * @property {(e: React.KeyboardEvent<HTMLInputElement>) => void} [onKeyDown] - Optional keyboard event handler for history navigation
 * @property {(direction: 'up' | 'down') => void} [onHistoryNavigation] - Optional callback for navigating through command history with up/down arrows
 */
export interface TerminalFooterProps {
  /**
   * Current value of the command input.
   */
  commandInput: string;
  /**
   * Optional class name to apply to the component.
   */
  className?: string;
  /**
   * The prompt displayed before the command input.
   * Default is `guest@programmer.sh:~$`
   */
  prompt?: string;
  /**
   * Optional callback for keydown events.
   */
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  /**
   * Optional callback for navigating through command history with up/down arrows.
   */
  onHistoryNavigation?: (direction: 'up' | 'down') => void;
  /**
   * Function to update the command input value.
   */
  setCommandInput: React.Dispatch<React.SetStateAction<string>>;
  /**
   * Function to handle command form submission.
   */
  handleCommandSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  /**
   * Whether a command is currently being processed.
   */
  isProcessing?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
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
