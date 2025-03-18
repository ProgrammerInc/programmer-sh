import * as React from 'react';

/**
 * InputOTP Component Props
 * 
 * Props for the main OTP input component.
 * 
 * @example
 * const example = <InputOTP maxLength={6} containerClassName="custom-container" />;
 */
export interface InputOTPProps {
  /**
   * Optional class name for the main component
   */
  className?: string;

  /**
   * Optional class name for the container element
   */
  containerClassName?: string;

  /**
   * Maximum length of the OTP code
   */
  maxLength: number;

  /**
   * Current value of the OTP input
   */
  value?: string;

  /**
   * Callback when value changes
   */
  onChange?: (newValue: string) => unknown;

  /**
   * Callback when OTP is fully entered
   */
  onComplete?: (value: string) => unknown;

  /**
   * Text alignment within slots
   */
  textAlign?: 'left' | 'center' | 'right';

  /**
   * Strategy for password manager compatibility
   */
  pushPasswordManagerStrategy?: 'none' | 'increase-width';

  /**
   * Transform function for pasted text
   */
  pasteTransformer?: (pasted: string) => string;

  /**
   * CSS fallback for devices without JavaScript
   * 
   * This should be a string containing CSS styles
   */
  noScriptCSSFallback?: string;

  /**
   * Children components to render inside OTP input
   */
  children?: React.ReactNode;
}

/**
 * InputOTPGroup Component Props
 * 
 * Props for the container that groups OTP input slots.
 * 
 * @example
 * const example = <InputOTPGroup className="custom-group-class">...</InputOTPGroup>;
 */
export interface InputOTPGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
}

/**
 * InputOTPSlot Component Props
 * 
 * Props for individual OTP input slots, including the slot index.
 * 
 * @example
 * const example = <InputOTPSlot index={0} className="custom-slot-class" />;
 */
export interface InputOTPSlotProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The index of this slot in the OTP input
   * Required to correctly pull slot state from context
   */
  index: number;

  /**
   * Custom class name for styling
   */
  className?: string;
}

/**
 * InputOTPSeparator Component Props
 * 
 * Props for the separator element between OTP input slots.
 * 
 * @example
 * const example = <InputOTPSeparator className="custom-separator-class" />;
 */
export interface InputOTPSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Custom class name for styling
   */
  className?: string;
}

/**
 * OTPSlotState Interface
 * 
 * The state of an individual slot from the OTP context.
 */
export interface OTPSlotState {
  /** The character in this slot, or empty string if unset */
  char: string;
  /** Whether this slot should display a fake caret */
  hasFakeCaret: boolean;
  /** Whether this slot is currently active/focused */
  isActive: boolean;
}

// Export the OTPInputContext from input-otp for use in components
export { OTPInputContext } from 'input-otp';
