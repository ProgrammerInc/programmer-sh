# Tooltip Component Examples

This document provides various examples of how to use the Tooltip component in different scenarios.

## Basic Usage

The most basic usage of the Tooltip component involves wrapping a trigger element and providing tooltip content:

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function BasicTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="icon-button">Hover me</button>
        </TooltipTrigger>
        <TooltipContent>
          <p>This is a basic tooltip</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## Positioned Tooltips

Customize the position of the tooltip by specifying the `side` and `align` properties:

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function PositionedTooltips() {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="icon-button">Top</button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Tooltip on top</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="icon-button">Right</button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Tooltip on right</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="icon-button">Bottom</button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Tooltip on bottom</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="icon-button">Left</button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Tooltip on left</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

## Aligned Tooltips

Customize the alignment of the tooltip with the `align` property:

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function AlignedTooltips() {
  return (
    <TooltipProvider>
      <div className="flex gap-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="icon-button">Start</button>
          </TooltipTrigger>
          <TooltipContent align="start">
            <p>Aligned to start</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="icon-button">Center</button>
          </TooltipTrigger>
          <TooltipContent align="center">
            <p>Aligned to center</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <button className="icon-button">End</button>
          </TooltipTrigger>
          <TooltipContent align="end">
            <p>Aligned to end</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

## Customized Delay Duration

Control how quickly tooltips appear by adjusting the delay duration:

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function DelayedTooltips() {
  return (
    <div className="flex gap-4">
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="icon-button">Quick Tooltip</button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Shows after 100ms</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={1000}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="icon-button">Delayed Tooltip</button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Shows after 1000ms</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
```

## Rich Content Tooltips

Tooltips can contain rich content including multiple elements, formatting, and even interactive components:

```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function RichContentTooltip() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="icon-button">Help</button>
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
    </TooltipProvider>
  );
}
```

## Controlled Tooltips

Control the open state of tooltips programmatically:

```tsx
import { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export function ControlledTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex gap-4">
          <button onClick={() => setOpen(true)}>Show Tooltip</button>
          <button onClick={() => setOpen(false)}>Hide Tooltip</button>
        </div>

        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <button className="icon-button">Controlled Tooltip</button>
          </TooltipTrigger>
          <TooltipContent>
            <p>This tooltip is controlled programmatically</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```
