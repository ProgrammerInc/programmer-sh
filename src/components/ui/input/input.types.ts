import * as React from 'react';

/**
 * Input component props interface
 *
 * This interface extends the standard HTML input attributes and adds additional
 * type safety for React components. The Input component is designed to be flexible
 * while maintaining a consistent UI appearance.
 *
 * @example
 * ```tsx
 * // Simple text input
 * <Input type="text" placeholder="Enter your name" />
 *
 * // Email input with custom styling
 * <Input 
 *   type="email" 
 *   placeholder="Enter your email" 
 *   className="custom-class" 
 *   required 
 * />
 *
 * // Disabled input
 * <Input type="text" disabled value="Read only value" />
 *
 * // With event handling
 * <Input 
 *   type="search" 
 *   onChange={(e) => setSearchTerm(e.target.value)} 
 *   value={searchTerm} 
 * />
 * ```
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The type of input element to render
   * 
   * This can be any valid HTML input type like 'text', 'password',
   * 'email', 'number', etc.
   * 
   * @default 'text'
   */
  type?: React.HTMLInputTypeAttribute;
  
  /**
   * Ref forwarded to the input element
   * 
   * This allows direct DOM manipulation of the input element when needed.
   */
  ref?: React.Ref<HTMLInputElement>;
}
