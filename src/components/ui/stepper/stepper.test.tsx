import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

import { Stepper, Step } from './stepper';

describe('Stepper', () => {
  test('renders with default props', () => {
    render(
      <Stepper>
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );

    // Check that the first step is rendered
    expect(screen.getByText('Step 1 content')).toBeInTheDocument();
    
    // Check that the step indicators are rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    
    // Check that the next button is rendered (but not the back button on first step)
    expect(screen.getByText('Continue')).toBeInTheDocument();
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });

  test('navigates to the next step when next button is clicked', async () => {
    render(
      <Stepper>
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );

    // Click the next button
    fireEvent.click(screen.getByText('Continue'));

    // Check that the second step is rendered
    await waitFor(() => {
      expect(screen.getByText('Step 2 content')).toBeInTheDocument();
      expect(screen.queryByText('Step 1 content')).not.toBeInTheDocument();
    });

    // Check that both back and next buttons are now rendered
    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  test('navigates back to the previous step when back button is clicked', async () => {
    render(
      <Stepper initialStep={2}>
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );

    // Check that the second step is rendered
    expect(screen.getByText('Step 2 content')).toBeInTheDocument();

    // Click the back button
    fireEvent.click(screen.getByText('Back'));

    // Check that the first step is rendered
    await waitFor(() => {
      expect(screen.getByText('Step 1 content')).toBeInTheDocument();
      expect(screen.queryByText('Step 2 content')).not.toBeInTheDocument();
    });
  });

  test('calls onStepChange when navigating between steps', () => {
    const onStepChange = jest.fn();
    
    render(
      <Stepper onStepChange={onStepChange}>
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );

    // Click the next button
    fireEvent.click(screen.getByText('Continue'));

    // Check that onStepChange was called with the correct step number
    expect(onStepChange).toHaveBeenCalledWith(2);
  });

  test('calls onFinalStepCompleted when completing the last step', () => {
    const onFinalStepCompleted = jest.fn();
    
    render(
      <Stepper initialStep={3} onFinalStepCompleted={onFinalStepCompleted}>
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );

    // Click the Complete button on the last step
    fireEvent.click(screen.getByText('Complete'));

    // Check that onFinalStepCompleted was called
    expect(onFinalStepCompleted).toHaveBeenCalled();
  });

  test('allows step indicators to be clicked when enabled', async () => {
    render(
      <Stepper>
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );

    // Click on the third step indicator
    fireEvent.click(screen.getByText('3'));

    // Check that the third step is rendered
    await waitFor(() => {
      expect(screen.getByText('Step 3 content')).toBeInTheDocument();
    });
  });

  test('disables step indicators when disableStepIndicators is true', () => {
    render(
      <Stepper disableStepIndicators>
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );

    // Click on the third step indicator
    fireEvent.click(screen.getByText('3'));

    // Check that we're still on the first step
    expect(screen.getByText('Step 1 content')).toBeInTheDocument();
    expect(screen.queryByText('Step 3 content')).not.toBeInTheDocument();
  });

  test('supports custom button text', () => {
    render(
      <Stepper 
        initialStep={2}
        backButtonText="Previous"
        nextButtonText="Forward"
      >
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );

    // Check that the custom button text is used
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Forward')).toBeInTheDocument();
  });

  test('supports custom step indicators', () => {
    const customIndicator = ({ step, currentStep, onStepClick }) => (
      <button onClick={() => onStepClick(step)} data-testid={`custom-indicator-${step}`}>
        {`Custom ${step}`}
      </button>
    );

    render(
      <Stepper renderStepIndicator={customIndicator}>
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
      </Stepper>
    );

    // Check that the custom indicators are rendered
    expect(screen.getByText('Custom 1')).toBeInTheDocument();
    expect(screen.getByText('Custom 2')).toBeInTheDocument();

    // Check that the custom indicators are clickable
    fireEvent.click(screen.getByText('Custom 2'));
    expect(screen.getByText('Step 2 content')).toBeInTheDocument();
  });

  test('shows completion state after final step', async () => {
    render(
      <Stepper initialStep={3}>
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );

    // Click the Complete button
    fireEvent.click(screen.getByText('Complete'));

    // Check that step content is hidden after completion
    await waitFor(() => {
      expect(screen.queryByText('Step 3 content')).not.toBeInTheDocument();
    });
  });

  test('renders with horizontal orientation', () => {
    render(
      <Stepper orientation="horizontal">
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );

    // Check that the first step is rendered
    expect(screen.getByText('Step 1 content')).toBeInTheDocument();
    
    // Check that the step indicators are rendered
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  test('navigates between steps in horizontal orientation', async () => {
    render(
      <Stepper orientation="horizontal">
        <Step>Step 1 content</Step>
        <Step>Step 2 content</Step>
        <Step>Step 3 content</Step>
      </Stepper>
    );

    // Click the next button
    fireEvent.click(screen.getByText('Continue'));

    // Check that the second step is rendered
    await waitFor(() => {
      expect(screen.getByText('Step 2 content')).toBeInTheDocument();
      expect(screen.queryByText('Step 1 content')).not.toBeInTheDocument();
    });

    // Click the back button
    fireEvent.click(screen.getByText('Back'));

    // Check that the first step is rendered again
    await waitFor(() => {
      expect(screen.getByText('Step 1 content')).toBeInTheDocument();
      expect(screen.queryByText('Step 2 content')).not.toBeInTheDocument();
    });
  });
});
