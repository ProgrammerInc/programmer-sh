'use client';

import { Meta, StoryObj } from '@storybook/react';
import { TiltedCard } from './tilted-card';

const meta: Meta<typeof TiltedCard> = {
  title: 'UI/TiltedCard',
  component: TiltedCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    imageSrc: {
      control: 'text',
      description: 'Source URL for the card image',
    },
    altText: {
      control: 'text',
      description: 'Alternative text for the image',
    },
    captionText: {
      control: 'text',
      description: 'Text displayed in the tooltip on hover',
    },
    containerHeight: {
      control: 'text',
      description: 'Height of the container',
    },
    containerWidth: {
      control: 'text',
      description: 'Width of the container',
    },
    imageHeight: {
      control: 'text',
      description: 'Height of the image',
    },
    imageWidth: {
      control: 'text',
      description: 'Width of the image',
    },
    scaleOnHover: {
      control: { type: 'range', min: 1, max: 1.5, step: 0.05 },
      description: 'Scale factor applied on hover',
    },
    rotateAmplitude: {
      control: { type: 'range', min: 0, max: 30, step: 1 },
      description: 'Maximum rotation angle in degrees',
    },
    showMobileWarning: {
      control: 'boolean',
      description: 'Whether to show a warning on mobile devices',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Whether to show a tooltip on hover',
    },
    displayOverlayContent: {
      control: 'boolean',
      description: 'Whether to display overlay content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TiltedCard>;

// Default placeholder image for stories
const placeholderImage = 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80';

export const Default: Story = {
  args: {
    imageSrc: placeholderImage,
    altText: 'Mountain landscape',
    captionText: 'Interactive 3D Card',
  },
};

export const WithCustomDimensions: Story = {
  args: {
    ...Default.args,
    containerHeight: '400px',
    containerWidth: '400px',
    imageHeight: '380px',
    imageWidth: '380px',
  },
};

export const HighRotation: Story = {
  args: {
    ...Default.args,
    rotateAmplitude: 25,
    scaleOnHover: 1.2,
  },
};

export const WithOverlayContent: Story = {
  args: {
    ...Default.args,
    displayOverlayContent: true,
    overlayContent: (
      <div className="bg-black/50 text-white p-4 w-full h-full flex flex-col items-center justify-center rounded-xl">
        <h3 className="text-xl font-bold mb-2">Mountain View</h3>
        <p className="text-sm text-white/80">Explore the beauty of nature</p>
        <button className="mt-4 px-4 py-2 bg-white text-black rounded-md font-medium text-sm">
          Learn More
        </button>
      </div>
    ),
  },
};

export const WithoutTooltip: Story = {
  args: {
    ...Default.args,
    showTooltip: false,
  },
};

export const WithoutMobileWarning: Story = {
  args: {
    ...Default.args,
    showMobileWarning: false,
  },
};

export const NoRotation: Story = {
  args: {
    ...Default.args,
    rotateAmplitude: 0,
    scaleOnHover: 1.15,
  },
};
