'use client';

import * as React from 'react';

import { Skeleton } from './skeleton';

/**
 * Demonstrates all skeleton variants
 */
export function AllSkeletonVariants() {
  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold">Skeleton Variants</h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Default</h3>
        <Skeleton className="h-16 w-full" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Circle</h3>
        <Skeleton variant="circle" className="h-16 w-16" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Avatar</h3>
        <Skeleton variant="avatar" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Text</h3>
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Button</h3>
        <Skeleton variant="button" className="w-32" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Card</h3>
        <Skeleton variant="card" className="h-40" />
      </div>
    </div>
  );
}

/**
 * Demonstrates using a custom element type
 */
export function PolymorphicSkeletons() {
  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold">Polymorphic Skeletons</h2>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">As span</h3>
        <Skeleton as="span" className="inline-block h-4 w-32" />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">As li</h3>
        <ul className="space-y-2">
          <Skeleton as="li" className="h-8" />
          <Skeleton as="li" className="h-8" />
          <Skeleton as="li" className="h-8" />
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">As button</h3>
        {/* @ts-expect-error - The 'as' prop doesn't properly handle element-specific attributes yet */}
        <Skeleton as="button" className="h-10 w-24 rounded-md" disabled />
      </div>
    </div>
  );
}

/**
 * Demonstrates controlling visibility and animation
 */
export function SkeletonControls() {
  const [isVisible, setIsVisible] = React.useState(true);
  const [isPulsing, setIsPulsing] = React.useState(true);

  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold">Skeleton Controls</h2>

      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => setIsVisible(!isVisible)}
          >
            Toggle Visibility
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => setIsPulsing(!isPulsing)}
          >
            Toggle Pulse
          </button>
        </div>

        <div className="space-y-4">
          <Skeleton
            className="h-32 w-full"
            visible={isVisible}
            pulse={isPulsing}
            loadingLabel="Controllable skeleton example"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Demonstrates common skeleton UI patterns
 */
export function SkeletonPatterns() {
  return (
    <div className="space-y-8 p-4">
      <h2 className="text-2xl font-bold">Skeleton Patterns</h2>

      {/* Profile skeleton */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Profile</h3>
        <div className="flex items-center space-x-4">
          <Skeleton variant="avatar" loadingLabel="Loading user avatar" />
          <div className="space-y-2">
            <Skeleton variant="text" className="w-[250px]" />
            <Skeleton variant="text" className="w-[200px]" />
          </div>
        </div>
      </div>

      {/* Card skeleton */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Card</h3>
        <div className="rounded-lg border p-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <div className="mt-4 space-y-2">
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-full" />
            <Skeleton variant="text" className="w-3/4" />
          </div>
          <div className="mt-4 flex justify-between">
            <Skeleton variant="button" className="w-24" />
            <Skeleton variant="button" className="w-24" />
          </div>
        </div>
      </div>

      {/* Table skeleton */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Table</h3>
        <div className="w-full">
          {/* Table header */}
          <div className="flex border-b pb-2">
            <div className="w-[30%] pr-4">
              <Skeleton variant="text" className="w-full" />
            </div>
            <div className="w-[50%] px-4">
              <Skeleton variant="text" className="w-full" />
            </div>
            <div className="w-[20%] pl-4">
              <Skeleton variant="text" className="w-full" />
            </div>
          </div>

          {/* Table rows */}
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="flex border-b py-4">
                <div className="w-[30%] pr-4">
                  <Skeleton variant="text" className="w-full" />
                </div>
                <div className="w-[50%] px-4">
                  <Skeleton variant="text" className="w-full" />
                </div>
                <div className="w-[20%] pl-4">
                  <Skeleton variant="text" className="w-2/3" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
