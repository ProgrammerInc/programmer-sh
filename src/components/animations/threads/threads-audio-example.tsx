'use client';

import { lazy, Suspense } from 'react';

// Lazy load the audio demo component to improve initial load performance
const ThreadsAudioDemo = lazy(() => import('./threads-audio-demo'));

/**
 * Example page for demonstrating the audio-reactive Threads animation
 */
export const ThreadsAudioExample = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Suspense fallback={<div>Loading sound-reactive animation...</div>}>
        <ThreadsAudioDemo />
      </Suspense>
    </div>
  );
};

export default ThreadsAudioExample;
