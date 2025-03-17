import * as React from 'react';

/**
 * Textarea component props
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Ref forwarded to the textarea element
   */
  ref?: React.Ref<HTMLTextAreaElement>;
}
