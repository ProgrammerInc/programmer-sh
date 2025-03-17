import * as React from 'react';

/**
 * Input component props
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Custom type for the input element
   * @default 'text'
   */
  type?: React.HTMLInputTypeAttribute;
  
  /**
   * Ref forwarded to the input element
   */
  ref?: React.Ref<HTMLInputElement>;
}
