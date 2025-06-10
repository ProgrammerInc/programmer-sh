'use client';

import { useThreadsAudio } from '@/components/animations/threads';
import { Button } from '@/components/ui/button/button';
import { useCallback } from 'react';
import styles from './wallpaper.module.css';

/**
 * Props for the WallpaperAudioControl component
 */
interface WallpaperAudioControlProps {
  /** Optional class name for the component */
  className?: string;
  /** Optional position of the control */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

/**
 * WallpaperAudioControl component provides controls for audio reactivity in wallpapers
 *
 * @param props - Component props
 * @returns Audio control UI component
 */
export function WallpaperAudioControl({
  className = '',
  position = 'bottom-right'
}: WallpaperAudioControlProps) {
  // Get audio context from the ThreadsAudioProvider
  const { audioEnabled, toggleAudio } = useThreadsAudio();

  // Handle toggle of audio reactivity
  const handleToggleAudio = useCallback(() => {
    toggleAudio();
  }, [toggleAudio]);

  // Position-based class name
  const positionClass = `wallpaper-audio-control-${position}`;

  // Active class when audio is enabled
  const activeClass = audioEnabled ? 'wallpaper-audio-control-active' : '';

  return (
    <div
      className={`${styles['wallpaper-audio-control']} ${styles[positionClass]} ${audioEnabled ? styles['wallpaper-audio-control-active'] : ''} ${className}`}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleAudio}
        title={audioEnabled ? 'Disable audio reactivity' : 'Enable audio reactivity'}
        aria-label={audioEnabled ? 'Disable audio reactivity' : 'Enable audio reactivity'}
        className={audioEnabled ? styles['wallpaper-audio-button-active'] : ''}
      >
        {audioEnabled ? '🔊' : '🔇'}
      </Button>
    </div>
  );
}

export default WallpaperAudioControl;
