/**
 * CommandLine component types
 */

import { type RefObject } from 'react';

/**
 * Props for the CommandLine component
 *
 * @interface CommandLineProps
 */
export interface CommandLineProps {
  /**
   * The command prompt to display before the input
   * @default "~$"
   */
  prompt?: string;

  /**
   * Callback function triggered when a command is submitted
   * @param command The command that was submitted
   */
  onSubmit: (command: string) => void;

  /**
   * Whether the command line is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the input should be focused automatically
   * @default true
   */
  autoFocus?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Whether to show the prompt before the input
   * @default true
   */
  showPrompt?: boolean;

  /**
   * Reference to the input element
   */
  inputRef?: RefObject<HTMLInputElement>;

  /**
   * Command history to navigate through using arrow keys
   * @default []
   */
  history?: string[];

  /**
   * Initial value for the command input
   * @default ""
   */
  initialValue?: string;

  /**
   * Callback function triggered when the input value changes
   * @param value The new input value
   */
  onInputChange?: (value: string) => void;
}
