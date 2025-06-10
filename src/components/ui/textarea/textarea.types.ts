import * as React from 'react';

/**
 * Textarea size variants
 *
 * @type {('sm' | 'md' | 'lg')}
 */
export type TextareaSize = 'sm' | 'md' | 'lg';

/**
 * Textarea status variants
 *
 * @type {('default' | 'error' | 'success')}
 */
export type TextareaStatus = 'default' | 'error' | 'success';

/**
 * Textarea resize options
 *
 * @type {('none' | 'vertical' | 'horizontal' | 'both')}
 */
export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

/**
 * Textarea component props
 *
 * The Textarea component provides a multi-line text input field with various size,
 * status, and resize options for enhanced user experience.
 *
 * @interface TextareaProps
 * @extends {React.TextareaHTMLAttributes<HTMLTextAreaElement>}
 * @property {TextareaSize} [size] - The size variant of the textarea ('sm', 'md', 'lg')
 * @property {TextareaStatus} [status] - The status variant of the textarea ('default', 'error', 'success')
 * @property {TextareaResize} [resize] - How the textarea can be resized ('none', 'vertical', 'horizontal', 'both')
 * @property {boolean} [autoFocus] - Whether the textarea should receive focus on mount
 * @property {number} [minRows] - Minimum number of rows to display
 * @property {number} [maxRows] - Maximum number of rows before scrolling
 * @property {React.Ref<HTMLTextAreaElement>} [ref] - Ref forwarded to the textarea element
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * The size variant of the textarea
   * @default 'md'
   */
  size?: TextareaSize;

  /**
   * The status variant of the textarea
   * @default 'default'
   */
  status?: TextareaStatus;

  /**
   * How the textarea can be resized
   * @default 'vertical'
   */
  resize?: TextareaResize;

  /**
   * Minimum number of rows to display
   */
  minRows?: number;

  /**
   * Maximum number of rows before scrolling
   */
  maxRows?: number;

  /**
   * Ref forwarded to the textarea element
   */
  ref?: React.Ref<HTMLTextAreaElement>;
}
