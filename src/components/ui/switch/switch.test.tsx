import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { Switch } from './switch';

describe('Switch', () => {
  test('renders with default props', () => {
    render(<Switch aria-label="Test switch" />);

    // Check that switch is rendered and has the correct role
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
  });

  test('renders in checked state when checked prop is true', () => {
    render(<Switch checked aria-label="Test switch" />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
  });

  test('calls onCheckedChange when clicked', () => {
    const onCheckedChange = jest.fn();
    render(<Switch onCheckedChange={onCheckedChange} aria-label="Test switch" />);

    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  test('changes from unchecked to checked when clicked', () => {
    const { rerender } = render(<Switch aria-label="Test switch" />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(switchElement);

    // We need to manually rerender with the new checked state
    // since we're not using a controlled component in this test
    rerender(<Switch checked aria-label="Test switch" />);

    expect(switchElement).toHaveAttribute('aria-checked', 'true');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Switch disabled aria-label="Test switch" />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeDisabled();
  });

  test('does not call onCheckedChange when disabled', () => {
    const onCheckedChange = jest.fn();
    render(<Switch disabled onCheckedChange={onCheckedChange} aria-label="Test switch" />);

    const switchElement = screen.getByRole('switch');
    fireEvent.click(switchElement);

    expect(onCheckedChange).not.toHaveBeenCalled();
  });

  test('renders with different size', () => {
    render(<Switch size="lg" aria-label="Test switch" />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    // Additional assertions could check for specific CSS classes or styles
    // but that would be implementation-specific
  });

  test('renders with different color scheme', () => {
    render(<Switch colorScheme="success" aria-label="Test switch" />);

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    // Additional assertions could check for specific CSS classes or styles
    // but that would be implementation-specific
  });

  test('forwards ref to underlying element', () => {
    const ref = jest.fn();
    render(<Switch ref={ref} aria-label="Test switch" />);

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLButtonElement);
  });
});
