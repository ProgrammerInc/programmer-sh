'use client';

import { HTMLAttributes, ReactNode, ButtonHTMLAttributes, SVGProps } from 'react';

/**
 * Props for the step indicator renderer function
 * 
 * @property step - The step number
 * @property currentStep - The current active step
 * @property onStepClick - Callback when a step is clicked
 */
export interface StepIndicatorRendererProps {
  step: number;
  currentStep: number;
  onStepClick: (clicked: number) => void;
}

/**
 * Layout orientations for the Stepper component
 */
export type StepperOrientation = 'vertical' | 'horizontal';

/**
 * Props for the Stepper component
 * 
 * @property children - The step components to render inside the stepper
 * @property initialStep - The initial active step (default: 1)
 * @property onStepChange - Callback when step changes
 * @property onFinalStepCompleted - Callback when the final step is completed
 * @property stepCircleContainerClassName - Additional class for the step circle container
 * @property stepContainerClassName - Additional class for the step container
 * @property contentClassName - Additional class for the content area
 * @property footerClassName - Additional class for the footer area
 * @property backButtonProps - Additional props for the back button
 * @property nextButtonProps - Additional props for the next button
 * @property backButtonText - Text for the back button (default: 'Back')
 * @property nextButtonText - Text for the next button (default: 'Continue')
 * @property disableStepIndicators - Whether to disable step indicators (default: false)
 * @property renderStepIndicator - Custom renderer for step indicators
 * @property orientation - Layout orientation of the stepper (default: 'vertical')
 */
export interface StepperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onFinalStepCompleted?: () => void;
  stepCircleContainerClassName?: string;
  stepContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  nextButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
  backButtonText?: string;
  nextButtonText?: string;
  disableStepIndicators?: boolean;
  renderStepIndicator?: (props: StepIndicatorRendererProps) => ReactNode;
  orientation?: StepperOrientation;
}

/**
 * Props for the Step component
 * 
 * @property children - The content of the step
 */
export interface StepProps {
  children: ReactNode;
}

/**
 * Props for the internal StepContentWrapper component
 * 
 * @property isCompleted - Whether all steps are completed
 * @property currentStep - The current active step
 * @property direction - The direction of transition (-1 for backwards, 1 for forwards)
 * @property children - The content to render
 * @property className - Additional class name
 * @property orientation - Layout orientation of the stepper
 */
export interface StepContentWrapperProps {
  isCompleted: boolean;
  currentStep: number;
  direction: number;
  children: ReactNode;
  className?: string;
  orientation?: StepperOrientation;
}

/**
 * Props for the internal SlideTransition component
 * 
 * @property children - The content to render
 * @property direction - The direction of transition (-1 for backwards, 1 for forwards)
 * @property onHeightReady - Callback when height is determined
 * @property orientation - Layout orientation of the stepper
 */
export interface SlideTransitionProps {
  children: ReactNode;
  direction: number;
  onHeightReady: (height: number) => void;
  orientation?: StepperOrientation;
}

/**
 * Props for the internal StepIndicator component
 * 
 * @property step - The step number
 * @property currentStep - The current active step
 * @property onClickStep - Callback when a step is clicked
 * @property disableStepIndicators - Whether to disable step indicators
 * @property orientation - Layout orientation of the stepper
 */
export interface StepIndicatorProps {
  step: number;
  currentStep: number;
  onClickStep: (clicked: number) => void;
  disableStepIndicators?: boolean;
  orientation?: StepperOrientation;
}

/**
 * Props for the internal StepConnector component
 * 
 * @property isComplete - Whether the step is completed
 * @property orientation - Layout orientation of the stepper
 */
export interface StepConnectorProps {
  isComplete: boolean;
  orientation?: StepperOrientation;
}

/**
 * Type alias for the internal CheckIcon component props
 * Uses SVG props to allow passing all SVG attributes
 */
export type CheckIconProps = SVGProps<SVGSVGElement>;
