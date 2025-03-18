import { OTPInput, OTPInputContext } from 'input-otp';
import * as React from 'react';
import { Dot } from 'lucide-react';

import { cn } from '@/utils/app.utils';
import styles from './input-otp.module.css';
import {
  InputOTPProps,
  InputOTPGroupProps,
  InputOTPSlotProps,
  InputOTPSeparatorProps
} from './input-otp.types';

/**
 * InputOTPGroup Component
 *
 * A container for grouping OTP input slots.
 *
 * @example
 * ```tsx
 * <InputOTPGroup>
 *   <InputOTPSlot index={0} />
 *   <InputOTPSlot index={1} />
 * </InputOTPGroup>
 * ```
 */
const InputOTPGroupComponent = React.memo(
  React.forwardRef<HTMLDivElement, InputOTPGroupProps>(({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles['input-otp-group'], className)}
      {...props}
    />
  ))
);

InputOTPGroupComponent.displayName = 'InputOTPGroup';

/**
 * InputOTPSlot Component
 *
 * An individual slot for entering a character in the OTP input.
 * Displays the character and a blinking caret when active.
 *
 * @example
 * ```tsx
 * <InputOTPSlot index={0} />
 * ```
 */
const InputOTPSlotComponent = React.memo(
  React.forwardRef<HTMLDivElement, InputOTPSlotProps>(
    ({ index, className, ...props }, ref) => {
      const inputOTPContext = React.useContext(OTPInputContext);
      const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

      return (
        <div
          ref={ref}
          className={cn(
            styles['input-otp-slot'],
            isActive && styles['input-otp-slot-active'],
            className
          )}
          {...props}
        >
          {char}
          {hasFakeCaret && (
            <div className={styles['input-otp-caret']}>
              <div className={styles['input-otp-caret-blink']} />
            </div>
          )}
        </div>
      );
    }
  )
);

InputOTPSlotComponent.displayName = 'InputOTPSlot';

/**
 * InputOTPSeparator Component
 *
 * A separator displayed between OTP input slots.
 *
 * @example
 * ```tsx
 * <InputOTPSeparator>
 *   <Dot />
 * </InputOTPSeparator>
 * ```
 */
const InputOTPSeparatorComponent = React.memo(
  React.forwardRef<HTMLDivElement, InputOTPSeparatorProps>(
    ({ className, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(styles['input-otp-separator'], className)}
        role="separator"
        {...props}
      >
        <Dot />
      </div>
    )
  )
);

InputOTPSeparatorComponent.displayName = 'InputOTPSeparator';

/**
 * InputOTP Component
 *
 * A custom OTP (One-Time Password) input field component based on input-otp.
 * This component provides a way to enter verification codes with a user-friendly interface.
 *
 * @example
 * ```tsx
 * <InputOTP maxLength={6} onComplete={(value) => console.log(value)} />
 * ```
 */
const InputOTPComponent = React.memo(
  React.forwardRef<React.ElementRef<typeof OTPInput>, InputOTPProps>(
    ({ className, containerClassName, children, ...props }, ref) => {
      // Create references to the components to avoid TypeScript errors
      const Group = InputOTPGroupComponent;
      const Slot = InputOTPSlotComponent;
      const Separator = InputOTPSeparatorComponent;

      return (
        <OTPInput
          ref={ref}
          containerClassName={cn(
            styles['input-otp-container'],
            containerClassName
          )}
          className={cn(styles['input-otp'], className)}
          maxLength={props.maxLength || 4}
          {...props}
        >
          {children || (
            <Group>
              {Array.from({ length: props.maxLength || 4 }).map((_, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <Separator />}
                  <Slot index={i} />
                </React.Fragment>
              ))}
            </Group>
          )}
        </OTPInput>
      );
    }
  )
);

InputOTPComponent.displayName = 'InputOTP';

// Export the components as a group
const InputOTP = Object.assign(InputOTPComponent, {
  Group: InputOTPGroupComponent,
  Slot: InputOTPSlotComponent,
  Separator: InputOTPSeparatorComponent,
});

export { InputOTP };
export type { InputOTPProps, InputOTPGroupProps, InputOTPSlotProps, InputOTPSeparatorProps };
