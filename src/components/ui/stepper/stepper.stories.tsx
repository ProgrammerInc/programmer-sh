import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Stepper, Step } from './stepper';

const meta: Meta<typeof Stepper> = {
  title: 'UI/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    initialStep: {
      control: { type: 'number', min: 1 },
      description: 'The initial active step',
      table: {
        defaultValue: { summary: '1' },
      },
    },
    disableStepIndicators: {
      control: 'boolean',
      description: 'Whether to disable step indicators',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    backButtonText: {
      control: 'text',
      description: 'Text for the back button',
      table: {
        defaultValue: { summary: 'Back' },
      },
    },
    nextButtonText: {
      control: 'text',
      description: 'Text for the next button',
      table: {
        defaultValue: { summary: 'Continue' },
      },
    },
    orientation: {
      control: { type: 'radio' },
      options: ['vertical', 'horizontal'],
      description: 'Layout orientation of the stepper',
      table: {
        defaultValue: { summary: 'vertical' },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'A multi-step wizard component with interactive step indicators.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

/**
 * Default Stepper component with three steps.
 */
export const Default: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl mx-auto">
      <Stepper {...args}>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Step 1: Account Information</h2>
            <p className="text-gray-500 mb-4">Please provide your account details.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  placeholder="u2022u2022u2022u2022u2022u2022u2022u2022"
                />
              </div>
            </div>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Step 2: Personal Information</h2>
            <p className="text-gray-500 mb-4">Tell us about yourself.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md" 
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Step 3: Confirmation</h2>
            <p className="text-gray-500 mb-4">Review your information.</p>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm">Please review your information carefully before submitting.</p>
              <p className="text-sm mt-2">By clicking Complete, you agree to our Terms and Conditions.</p>
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  ),
};

/**
 * Custom step indicators with alternative styling.
 */
export const CustomStepIndicators: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl mx-auto">
      <Stepper
        {...args}
        renderStepIndicator={({ step, currentStep, onStepClick }) => (
          <button
            onClick={() => onStepClick(step)}
            className={`
              w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium
              transition-colors
              ${currentStep === step 
                ? 'bg-blue-500 text-white' 
                : currentStep > step 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-200 text-gray-800'}
            `}
          >
            {currentStep > step ? 'u2713' : step}
          </button>
        )}
      >
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 1</h2>
            <p>This step has custom indicators.</p>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 2</h2>
            <p>You can click on the step indicators to navigate.</p>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 3</h2>
            <p>Completed steps show a checkmark in the indicator.</p>
          </div>
        </Step>
      </Stepper>
    </div>
  ),
};

/**
 * Controlled stepper with external state management.
 */
export const ControlledStepper: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [currentStep, setCurrentStep] = useState(1);

    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <h3 className="text-lg font-medium">Current Step: {currentStep}</h3>
          <div className="space-x-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-3 py-1 bg-gray-200 rounded-md text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        <Stepper
          {...args}
          initialStep={currentStep}
          onStepChange={(step) => setCurrentStep(step)}
        >
          <Step>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">First Step</h2>
              <p>This stepper is controlled by external state.</p>
            </div>
          </Step>
          <Step>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Second Step</h2>
              <p>The current step is tracked in a parent component.</p>
            </div>
          </Step>
          <Step>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">Final Step</h2>
              <p>You can programmatically control the active step.</p>
            </div>
          </Step>
        </Stepper>
      </div>
    );
  },
};

/**
 * Stepper with custom button text and styling.
 */
export const CustomButtons: Story = {
  render: (args) => (
    <div className="w-full max-w-3xl mx-auto">
      <Stepper
        {...args}
        backButtonText="Previous"
        nextButtonText="Proceed"
        backButtonProps={{
          className: 'px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-800 transition-colors',
        }}
        nextButtonProps={{
          className: 'px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-md text-white transition-colors',
        }}
      >
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 1</h2>
            <p>This stepper has custom button text and styling.</p>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 2</h2>
            <p>The buttons use custom styling defined via props.</p>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 3</h2>
            <p>The final button will still say "Complete".</p>
          </div>
        </Step>
      </Stepper>
    </div>
  ),
};

/**
 * Stepper with disabled step indicators.
 */
export const DisabledStepIndicators: Story = {
  args: {
    disableStepIndicators: true,
  },
  render: (args) => (
    <div className="w-full max-w-3xl mx-auto">
      <Stepper {...args}>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 1</h2>
            <p>The step indicators are disabled and cannot be clicked.</p>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 2</h2>
            <p>Users must use the next and back buttons to navigate.</p>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 3</h2>
            <p>This ensures users complete each step in sequence.</p>
          </div>
        </Step>
      </Stepper>
    </div>
  ),
};

/**
 * Stepper with horizontal layout.
 */
export const HorizontalStepper: Story = {
  args: {
    orientation: 'horizontal',
  },
  render: (args) => (
    <div className="w-full max-w-3xl mx-auto">
      <Stepper {...args}>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 1</h2>
            <p>This stepper uses a horizontal layout.</p>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 2</h2>
            <p>The step indicators are displayed horizontally above the content.</p>
          </div>
        </Step>
        <Step>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">Step 3</h2>
            <p>This layout is better for wider screens or when vertical space is limited.</p>
          </div>
        </Step>
      </Stepper>
    </div>
  ),
};
