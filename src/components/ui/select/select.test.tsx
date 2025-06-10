import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue
} from './select';

describe('Select component', () => {
  it('renders properly with basic options', async () => {
    render(
      <Select defaultValue="apple">
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectContent>
      </Select>
    );

    // Initially shows the default value
    const trigger = screen.getByTestId('select-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Apple');

    // Click to open dropdown
    await userEvent.click(trigger);

    // Check if options are shown
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Orange' })).toBeInTheDocument();

    // Select a new option
    await userEvent.click(screen.getByRole('option', { name: 'Banana' }));

    // Check if trigger text is updated
    expect(trigger).toHaveTextContent('Banana');
  });

  it('supports disabled state', () => {
    render(
      <Select disabled>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    );

    const trigger = screen.getByTestId('select-trigger');
    expect(trigger).toBeDisabled();
  });

  it('renders with grouped options', async () => {
    render(
      <Select>
        <SelectTrigger data-testid="select-trigger">
          <SelectValue placeholder="Select a food" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Vegetables</SelectLabel>
            <SelectItem value="carrot">Carrot</SelectItem>
            <SelectItem value="potato">Potato</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    );

    // Open the dropdown
    await userEvent.click(screen.getByTestId('select-trigger'));

    // Check if groups and labels are shown
    expect(screen.getByText('Fruits')).toBeInTheDocument();
    expect(screen.getByText('Vegetables')).toBeInTheDocument();

    // Check all options
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Carrot' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Potato' })).toBeInTheDocument();
  });

  it('supports controlled usage', async () => {
    function ControlledExample() {
      const [value, setValue] = React.useState('banana');

      return (
        <div>
          <span data-testid="selected-value">{value}</span>
          <Select value={value} onValueChange={setValue}>
            <SelectTrigger data-testid="select-trigger">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="banana">Banana</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    }

    render(<ControlledExample />);

    // Check initial value
    expect(screen.getByTestId('selected-value')).toHaveTextContent('banana');
    expect(screen.getByTestId('select-trigger')).toHaveTextContent('Banana');

    // Open dropdown and select new value
    await userEvent.click(screen.getByTestId('select-trigger'));
    await userEvent.click(screen.getByRole('option', { name: 'Orange' }));

    // Check if value is updated
    expect(screen.getByTestId('selected-value')).toHaveTextContent('orange');
    expect(screen.getByTestId('select-trigger')).toHaveTextContent('Orange');
  });
});
