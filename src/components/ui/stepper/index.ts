/* eslint-disable no-secrets/no-secrets */
'use client';

/**
 * Stepper Component
 *
 * Features:
 * - Multi-step wizard with configurable step count
 * - Interactive step indicators that can be clicked to navigate
 * - Optional step indicators that can be disabled
 * - Smooth animations between steps
 * - Customizable back and next buttons
 * - Support for custom step indicator rendering
 * - Callbacks for step changes and completion
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Stepper>
 *   <Step>Step 1 content</Step>
 *   <Step>Step 2 content</Step>
 *   <Step>Step 3 content</Step>
 * </Stepper>
 *
 * // With custom configuration
 * <Stepper
 *   initialStep={2}
 *   onStepChange={(step) => console.log(`Step ${step} active`)}
 *   onFinalStepCompleted={() => console.log('All steps completed')}
 *   backButtonText="Previous"
 *   nextButtonText="Next"
 * >
 *   <Step>Step 1 content</Step>
 *   <Step>Step 2 content</Step>
 *   <Step>Step 3 content</Step>
 * </Stepper>
 * ```
 */
import { Step, Stepper } from './stepper';
import type {
  CheckIconProps,
  SlideTransitionProps,
  StepConnectorProps,
  StepContentWrapperProps,
  StepIndicatorProps,
  StepIndicatorRendererProps,
  StepperProps,
  StepProps
} from './stepper.types';

export {
  CheckIconProps,
  SlideTransitionProps,
  Step,
  StepConnectorProps,
  StepContentWrapperProps,
  StepIndicatorProps,
  StepIndicatorRendererProps,
  Stepper,
  // Types
  StepperProps,
  StepProps
};

export default Stepper;
