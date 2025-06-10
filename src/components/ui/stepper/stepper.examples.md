# Stepper Component Examples

The Stepper component is a multi-step wizard that guides users through a sequence of steps. This document provides various examples to demonstrate its flexibility and customization options.

## Basic Usage

The most basic usage of the Stepper component involves wrapping multiple `Step` components:

```tsx
import { Stepper, Step } from '@/components/ui/stepper';

export default function BasicStepperExample() {
  return (
    <Stepper>
      <Step>
        <h2 className="text-xl font-semibold">Step 1: Account Information</h2>
        <p className="text-gray-500 mt-2">Enter your account details</p>
        {/* Step content goes here */}
      </Step>
      <Step>
        <h2 className="text-xl font-semibold">Step 2: Personal Information</h2>
        <p className="text-gray-500 mt-2">Tell us about yourself</p>
        {/* Step content goes here */}
      </Step>
      <Step>
        <h2 className="text-xl font-semibold">Step 3: Confirmation</h2>
        <p className="text-gray-500 mt-2">Review and submit</p>
        {/* Step content goes here */}
      </Step>
    </Stepper>
  );
}
```

## Starting at a Specific Step

You can specify which step to start from using the `initialStep` prop:

```tsx
import { Stepper, Step } from '@/components/ui/stepper';

export default function StartAtStep2Example() {
  return (
    <Stepper initialStep={2}>
      <Step>
        <h2 className="text-xl font-semibold">Step 1: Account Information</h2>
        {/* Step content */}
      </Step>
      <Step>
        <h2 className="text-xl font-semibold">Step 2: Personal Information</h2>
        {/* Step content */}
      </Step>
      <Step>
        <h2 className="text-xl font-semibold">Step 3: Confirmation</h2>
        {/* Step content */}
      </Step>
    </Stepper>
  );
}
```

## With Step Change Callbacks

Track step changes and completion with callback functions:

```tsx
import { Stepper, Step } from '@/components/ui/stepper';

export default function StepperWithCallbacksExample() {
  const handleStepChange = (step: number) => {
    console.log(`Now on step ${step}`);
    // You can perform actions like analytics tracking here
  };

  const handleCompletion = () => {
    console.log('All steps completed!');
    // You can perform submission actions here
  };

  return (
    <Stepper onStepChange={handleStepChange} onFinalStepCompleted={handleCompletion}>
      <Step>Step 1 content</Step>
      <Step>Step 2 content</Step>
      <Step>Step 3 content</Step>
    </Stepper>
  );
}
```

## Custom Button Text

Customize the text of the back and next buttons:

```tsx
import { Stepper, Step } from '@/components/ui/stepper';

export default function CustomButtonTextExample() {
  return (
    <Stepper backButtonText="Previous" nextButtonText="Next Step">
      <Step>Step 1 content</Step>
      <Step>Step 2 content</Step>
      <Step>Step 3 content</Step>
    </Stepper>
  );
}
```

## Custom Step Indicators

Provide a custom renderer for step indicators:

```tsx
import { Stepper, Step } from '@/components/ui/stepper';

export default function CustomStepIndicatorsExample() {
  return (
    <Stepper
      renderStepIndicator={({ step, currentStep, onStepClick }) => (
        <button
          onClick={() => onStepClick(step)}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
            currentStep === step
              ? 'bg-blue-500 text-white'
              : currentStep > step
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700'
          }`}
        >
          {currentStep > step ? '✓' : step}
        </button>
      )}
    >
      <Step>Step 1 content</Step>
      <Step>Step 2 content</Step>
      <Step>Step 3 content</Step>
    </Stepper>
  );
}
```

## With Custom Styling

Customize the appearance using the provided className props:

```tsx
import { Stepper, Step } from '@/components/ui/stepper';

export default function CustomStyledStepperExample() {
  return (
    <Stepper
      stepCircleContainerClassName="bg-gray-100 p-6 rounded-lg"
      stepContainerClassName="gap-8"
      contentClassName="p-8 bg-white shadow-md rounded-lg"
      footerClassName="mt-8 pt-4 border-t border-gray-200"
    >
      <Step>Step 1 content</Step>
      <Step>Step 2 content</Step>
      <Step>Step 3 content</Step>
    </Stepper>
  );
}
```

## Disabling Step Indicators

Disable the step indicators to prevent users from clicking them:

```tsx
import { Stepper, Step } from '@/components/ui/stepper';

export default function DisabledStepIndicatorsExample() {
  return (
    <Stepper disableStepIndicators>
      <Step>Step 1 content</Step>
      <Step>Step 2 content</Step>
      <Step>Step 3 content</Step>
    </Stepper>
  );
}
```

## Integration with Form Libraries

Example of integrating with React Hook Form:

```tsx
import { useForm, FormProvider } from 'react-hook-form';
import { Stepper, Step } from '@/components/ui/stepper';
import { useState } from 'react';

export default function FormStepperExample() {
  const [currentStep, setCurrentStep] = useState(1);
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      city: '',
      country: ''
    }
  });

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = methods.handleSubmit(data => {
    console.log('Form submitted:', data);
    // Submit data to your API
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit}>
        <Stepper initialStep={currentStep} onStepChange={handleStepChange}>
          <Step>
            {/* Account Information Step */}
            <h2 className="text-xl font-semibold">Account Information</h2>
            {/* Form fields */}
          </Step>
          <Step>
            {/* Address Step */}
            <h2 className="text-xl font-semibold">Address</h2>
            {/* Form fields */}
          </Step>
          <Step>
            {/* Review Step */}
            <h2 className="text-xl font-semibold">Review</h2>
            {/* Summary and submit button */}
          </Step>
        </Stepper>
      </form>
    </FormProvider>
  );
}
```

## Conditional Step Navigation

Example showing how to conditionally control step navigation based on form validation:

```tsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Stepper, Step } from '@/components/ui/stepper';

export default function ConditionalStepperExample() {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'onChange'
  });

  const handleStepChange = (step: number) => {
    // Only allow moving forward if current step is valid
    if (step > currentStep && !isValid) {
      return;
    }
    setCurrentStep(step);
  };

  return (
    <Stepper
      initialStep={currentStep}
      onStepChange={handleStepChange}
      nextButtonProps={{ disabled: !isValid }}
    >
      <Step>
        <h2>Step 1</h2>
        <div className="mt-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            {...register('email', { required: true, pattern: /^\S+@\S+\.\S+$/ })}
          />
          {errors.email && <span className="text-red-500 text-sm">Please enter a valid email</span>}
        </div>
      </Step>
      <Step>
        <h2>Step 2</h2>
        {/* Additional form fields */}
      </Step>
      <Step>
        <h2>Step 3</h2>
        {/* Final form fields */}
      </Step>
    </Stepper>
  );
}
```

## Horizontal Stepper Layout

```tsx
import { Stepper, Step } from '@/components/ui/stepper';

export default function HorizontalStepperExample() {
  return (
    <Stepper orientation="horizontal">
      <Step>
        <h2>Step 1</h2>
        <p>This is the first step content.</p>
      </Step>
      <Step>
        <h2>Step 2</h2>
        <p>This is the second step content.</p>
      </Step>
      <Step>
        <h2>Step 3</h2>
        <p>This is the third step content.</p>
      </Step>
    </Stepper>
  );
}
```

These examples demonstrate the versatility of the Stepper component and how it can be customized to fit different use cases. Explore and adapt these examples to meet your specific requirements.
