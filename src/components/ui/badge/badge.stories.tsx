'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { Check, X, AlertCircle } from 'lucide-react';

import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual style of the badge'
    }
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * The default badge style.
 */
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default'
  }
};

/**
 * Secondary badge style with lower visual prominence.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary'
  }
};

/**
 * Destructive badge style for errors, warnings, or negative statuses.
 */
export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive'
  }
};

/**
 * Outline badge style with a border and transparent background.
 */
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline'
  }
};

/**
 * Badge with an icon for additional visual cues.
 */
export const WithIcon: Story = {
  render: () => (
    <Badge className="gap-1">
      <Check className="h-3 w-3" />
      Success
    </Badge>
  )
};

/**
 * Destructive badge with an icon for error states.
 */
export const DestructiveWithIcon: Story = {
  render: () => (
    <Badge variant="destructive" className="gap-1">
      <X className="h-3 w-3" />
      Error
    </Badge>
  )
};

/**
 * Various status badges using different variants and icons.
 */
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="gap-1">
        <Check className="h-3 w-3" />
        Completed
      </Badge>
      <Badge variant="secondary" className="gap-1">
        <span className="h-3 w-3 rounded-full bg-sky-400" />
        In Progress
      </Badge>
      <Badge variant="outline" className="gap-1">
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        Pending
      </Badge>
      <Badge variant="destructive" className="gap-1">
        <AlertCircle className="h-3 w-3" />
        Failed
      </Badge>
    </div>
  )
};

/**
 * Different sized badges using CSS classes.
 */
export const SizedBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Badge className="text-[0.625rem] px-2 py-0">
        Extra Small
      </Badge>
      <Badge>
        Default
      </Badge>
      <Badge className="text-sm px-3 py-1">
        Large
      </Badge>
    </div>
  )
};

/**
 * Interactive badges that change appearance on hover and focus.
 */
export const InteractiveBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge 
        className="hover:bg-primary/80 cursor-pointer"
        onClick={() => alert('Badge clicked!')}
      >
        Clickable
      </Badge>
      <Badge 
        variant="secondary" 
        className="hover:bg-secondary/80 cursor-pointer"
        onClick={() => alert('Secondary badge clicked!')}
      >
        Interactive
      </Badge>
    </div>
  )
};

/**
 * Badges with custom colors.
 */
export const CustomColors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge 
        className="bg-green-500 hover:bg-green-600 text-white border-transparent"
      >
        Success
      </Badge>
      <Badge 
        className="bg-yellow-500 hover:bg-yellow-600 text-white border-transparent"
      >
        Warning
      </Badge>
      <Badge 
        className="bg-blue-500 hover:bg-blue-600 text-white border-transparent"
      >
        Info
      </Badge>
      <Badge 
        className="bg-purple-500 hover:bg-purple-600 text-white border-transparent"
      >
        New
      </Badge>
    </div>
  )
};

/**
 * All badge variants displayed together for comparison.
 */
export const VariantsShowcase: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  )
};
