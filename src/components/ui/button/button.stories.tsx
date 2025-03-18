'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { Laptop } from 'lucide-react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual style of the button'
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button'
    },
    asChild: {
      control: 'boolean',
      description: 'Whether to render as a child component using Radix UI Slot'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * The default button style.
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default'
  }
};

/**
 * Secondary button style with lower visual prominence.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
};

/**
 * Outline button style with a border and transparent background.
 */
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline'
  }
};

/**
 * Destructive button style for dangerous actions.
 */
export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive'
  }
};

/**
 * Ghost button style with no background until interaction.
 */
export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost'
  }
};

/**
 * Link button style that resembles a hyperlink.
 */
export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link'
  }
};

/**
 * Small-sized button for compact spaces.
 */
export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm'
  }
};

/**
 * Large-sized button for primary actions.
 */
export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg'
  }
};

/**
 * Icon button for using icons without text.
 */
export const Icon: Story = {
  args: {
    size: 'icon',
    'aria-label': 'Laptop',
    children: <Laptop className="h-4 w-4" />
  }
};

/**
 * Disabled state for any button variant.
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true
  }
};

/**
 * Loading state for buttons with an indicator.
 */
export const Loading: Story = {
  args: {
    children: (
      <>
        <span className="animate-spin mr-2">⏳</span>
        Loading
      </>
    )
  }
};

/**
 * Button with icon + text combination.
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Laptop className="mr-2 h-4 w-4" />
        Button with Icon
      </>
    )
  }
};

/**
 * Button variants displayed together for comparison.
 */
export const VariantsShowcase: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
};

/**
 * Button sizes displayed together for comparison.
 */
export const SizesShowcase: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="lg">Large</Button>
      <Button size="default">Default</Button>
      <Button size="sm">Small</Button>
      <Button size="icon" aria-label="Icon button">
        <Laptop className="h-4 w-4" />
      </Button>
    </div>
  )
};
