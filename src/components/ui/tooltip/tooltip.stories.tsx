'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { InfoIcon, EditIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../button/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex items-center justify-center p-8">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * A basic tooltip showing additional information when hovering over a button.
 */
export const Basic: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltips can be positioned on different sides of the trigger element.
 */
export const Positions: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>I'm above the button</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex justify-between">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>I'm to the left</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>I'm to the right</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>I'm below the button</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
};

/**
 * Tooltips can have different alignments (start, center, end).
 */
export const Alignment: Story = {
  render: () => (
    <div className="flex justify-between w-full max-w-lg">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Start Aligned</Button>
        </TooltipTrigger>
        <TooltipContent align="start">
          <p>Aligned to start</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Center Aligned</Button>
        </TooltipTrigger>
        <TooltipContent align="center">
          <p>Aligned to center</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">End Aligned</Button>
        </TooltipTrigger>
        <TooltipContent align="end">
          <p>Aligned to end</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * Tooltips can be used with icon buttons to provide context for their action.
 */
export const IconButtons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost">
            <InfoIcon className="h-4 w-4" />
            <span className="sr-only">Info</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>View information</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost">
            <EditIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit item</p>
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Delete item</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * Tooltips can contain rich content with formatting and structure.
 */
export const RichContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Help</Button>
      </TooltipTrigger>
      <TooltipContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium">Configuration Help</h4>
          <p>This feature allows you to:</p>
          <ul className="list-disc space-y-1 pl-4">
            <li>Create custom views</li>
            <li>Save filter configurations</li>
            <li>Share your setup with team members</li>
          </ul>
          <p className="text-xs text-muted-foreground">
            Note: Advanced features may require additional permissions.
          </p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltips can be controlled programmatically.
 */
export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    
    return (
      <div className="space-y-4">
        <div className="flex gap-4">
          <Button onClick={() => setOpen(true)}>Show Tooltip</Button>
          <Button onClick={() => setOpen(false)} variant="outline">Hide Tooltip</Button>
        </div>
        
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <Button variant="outline">Controlled Tooltip</Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This tooltip is controlled programmatically</p>
          </TooltipContent>
        </Tooltip>
      </div>
    );
  },
};

/**
 * Example showing a tooltip on a disabled element.
 */
export const WithDisabledElement: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-block">
          <Button disabled>Disabled Button</Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>You cannot perform this action right now</p>
      </TooltipContent>
    </Tooltip>
  ),
};
