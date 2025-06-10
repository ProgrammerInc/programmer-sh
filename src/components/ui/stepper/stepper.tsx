/* eslint-disable no-secrets/no-secrets */
'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { Children, memo, useLayoutEffect, useRef, useState } from 'react';

import styles from './stepper.module.css';
import {
  CheckIconProps,
  SlideTransitionProps,
  StepConnectorProps,
  StepContentWrapperProps,
  StepIndicatorProps,
  StepperProps,
  StepProps
} from './stepper.types';

/**
 * Stepper Component - A multi-step wizard with interactive step indicators
 *
 * Features:
 * - Multi-step wizard with configurable step count
 * - Interactive step indicators that can be clicked to navigate
 * - Optional step indicators that can be disabled
 * - Smooth animations between steps
 * - Customizable back and next buttons
 * - Support for custom step indicator rendering
 * - Callbacks for step changes and completion
 * - Support for vertical and horizontal layouts
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
 *   orientation="horizontal"
 * >
 *   <Step>Step 1 content</Step>
 *   <Step>Step 2 content</Step>
 *   <Step>Step 3 content</Step>
 * </Stepper>
 * ```
 */
const Stepper = memo(function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => {},
  onFinalStepCompleted = () => {},
  stepCircleContainerClassName = '',
  stepContainerClassName = '',
  contentClassName = '',
  footerClassName = '',
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = 'Back',
  nextButtonText = 'Continue',
  disableStepIndicators = false,
  renderStepIndicator,
  orientation = 'vertical',
  ...rest
}: StepperProps) {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);
  const [direction, setDirection] = useState<number>(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;

  // Get the appropriate container class based on orientation
  const containerClass =
    orientation === 'horizontal' ? styles['container-horizontal'] : styles.container;
  const circleContainerClass =
    orientation === 'horizontal'
      ? styles['circle-container-horizontal']
      : styles['circle-container'];
  const stepContainerClass =
    orientation === 'horizontal' ? styles['step-container-horizontal'] : styles['step-container'];

  const updateStep = (newStep: number) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className={containerClass} {...rest}>
      <div className={`${circleContainerClass} ${stepCircleContainerClassName}`}>
        <div className={`${stepContainerClass} ${stepContainerClassName}`}>
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={clicked => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                    orientation={orientation}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} orientation={orientation} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`${styles.content} ${contentClassName}`}
          orientation={orientation}
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div className={`${styles.footer} ${footerClassName}`}>
            <div
              className={`${styles['footer-buttons']} ${currentStep !== 1 ? styles['footer-buttons-between'] : styles['footer-buttons-end']}`}
            >
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={`${styles['back-button']} ${currentStep === 1 ? styles['back-button-disabled'] : ''}`}
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                onClick={isLastStep ? handleComplete : handleNext}
                className={styles['next-button']}
                {...nextButtonProps}
              >
                {isLastStep ? 'Complete' : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

Stepper.displayName = 'Stepper';

/**
 * StepContentWrapper - Handles animation and height calculations for step content
 *
 * @private Internal component for the Stepper
 */
const StepContentWrapper = memo(function StepContentWrapper({
  isCompleted,
  currentStep,
  direction,
  children,
  className = '',
  orientation = 'vertical'
}: StepContentWrapperProps) {
  const [parentHeight, setParentHeight] = useState<number>(0);

  return (
    <motion.div
      style={{ position: 'relative', overflow: 'hidden' }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: 'spring', duration: 0.4 }}
      className={`${styles['step-content-container']} ${className}`}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition
            key={currentStep}
            direction={direction}
            onHeightReady={h => setParentHeight(h)}
            orientation={orientation}
          >
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

StepContentWrapper.displayName = 'StepContentWrapper';

/**
 * SlideTransition - Handles the sliding animation between steps
 *
 * @private Internal component for the Stepper
 */
const SlideTransition = memo(function SlideTransition({
  children,
  direction,
  onHeightReady,
  orientation = 'vertical'
}: SlideTransitionProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (containerRef.current) {
      onHeightReady(containerRef.current.offsetHeight);
    }
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      className={
        orientation === 'horizontal'
          ? styles['slide-transition-horizontal']
          : styles['slide-transition']
      }
    >
      {children}
    </motion.div>
  );
});

SlideTransition.displayName = 'SlideTransition';

const stepVariants: Variants = {
  enter: (dir: number) => ({
    x: dir >= 0 ? '-100%' : '100%',
    opacity: 0
  }),
  center: {
    x: '0%',
    opacity: 1
  },
  exit: (dir: number) => ({
    x: dir >= 0 ? '50%' : '-50%',
    opacity: 0
  })
};

/**
 * Step Component - Container for step content
 *
 * @example
 * ```tsx
 * <Step>
 *   <h2>Step Title</h2>
 *   <p>Step content goes here...</p>
 * </Step>
 * ```
 */
export const Step = memo(function Step({ children }: StepProps) {
  return <div className={styles.step}>{children}</div>;
});

Step.displayName = 'Step';

/**
 * StepIndicator - Visual indicator for a step
 *
 * @private Internal component for the Stepper
 */
const StepIndicator = memo(function StepIndicator({
  step,
  currentStep,
  onClickStep,
  disableStepIndicators = false,
  orientation = 'vertical'
}: StepIndicatorProps) {
  const status = currentStep === step ? 'active' : currentStep < step ? 'inactive' : 'complete';

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) {
      onClickStep(step);
    }
  };

  return (
    <motion.div
      onClick={handleClick}
      className={styles['step-indicator']}
      animate={status}
      initial={false}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: '#222', color: '#a3a3a3' },
          active: { scale: 1, backgroundColor: '#00d8ff', color: '#00d8ff' },
          complete: { scale: 1, backgroundColor: '#00d8ff', color: '#3b82f6' }
        }}
        transition={{ duration: 0.3 }}
        className={styles['step-circle']}
      >
        {status === 'complete' ? (
          <CheckIcon className="h-4 w-4 text-black" />
        ) : status === 'active' ? (
          <div className={styles['step-circle-dot']} />
        ) : (
          <span className={styles['step-circle-number']}>{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
});

StepIndicator.displayName = 'StepIndicator';

/**
 * StepConnector - Connection line between step indicators
 *
 * @private Internal component for the Stepper
 */
const StepConnector = memo(function StepConnector({
  isComplete,
  orientation = 'vertical'
}: StepConnectorProps) {
  const lineVariants: Variants = {
    incomplete: { width: 0, backgroundColor: 'transparent' },
    complete: { width: '100%', backgroundColor: '#00d8ff' }
  };

  return (
    <div className={styles.connector}>
      <motion.div
        className={styles['connector-line']}
        variants={lineVariants}
        initial={false}
        animate={isComplete ? 'complete' : 'incomplete'}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
});

StepConnector.displayName = 'StepConnector';

/**
 * CheckIcon - Checkmark icon for completed steps
 *
 * @private Internal component for the Stepper
 */
const CheckIcon = memo(function CheckIcon(props: CheckIconProps) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          delay: 0.1,
          type: 'tween',
          ease: 'easeOut',
          duration: 0.3
        }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
});

CheckIcon.displayName = 'CheckIcon';

export { Stepper };
export default Stepper;
