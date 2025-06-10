/**
 * ASCII Art Component
 *
 * Displays ASCII art with optional animation and welcome command trigger.
 */

'use client';

import { cn } from '@/utils/app.utils';
import { memo, useEffect, useRef } from 'react';

import { DEFAULT_ASCII_ART, DEFAULT_WELCOME_DELAY } from './ascii-art.constants';
import styles from './ascii-art.module.css';
import { ASCIIArtProps } from './ascii-art.types';
import { triggerWelcomeCommand } from './ascii-art.utils';

/**
 * ASCIIArt component
 *
 * Displays ASCII art with optional animation and can trigger a welcome command.
 *
 * @example
 * ```tsx
 * <ASCIIArt />
 * ```
 *
 * @example
 * ```tsx
 * <ASCIIArt
 *   art={customAsciiArt}
 *   triggerWelcome={false}
 *   className="my-custom-class"
 * />
 * ```
 */
export const ASCIIArt = memo<ASCIIArtProps>(
  ({
    art = DEFAULT_ASCII_ART,
    triggerWelcome = true,
    welcomeDelay = DEFAULT_WELCOME_DELAY,
    className
  }) => {
    // Use a ref to store props to avoid unnecessary rerenders
    const propsRef = useRef({ triggerWelcome, welcomeDelay });

    // Update ref when props change
    useEffect(() => {
      propsRef.current = { triggerWelcome, welcomeDelay };
    }, [triggerWelcome, welcomeDelay]);

    // Trigger welcome command after ASCII art renders
    useEffect(() => {
      if (!propsRef.current.triggerWelcome) return;

      // Use the utility function to trigger the welcome command
      return triggerWelcomeCommand(propsRef.current.welcomeDelay);
    }, []); // Only run on mount

    return (
      <div className={cn(styles.container, styles.animated, className)}>
        {art.map((line, i) => (
          <div key={i} className={styles.line}>
            {line}
          </div>
        ))}
      </div>
    );
  }
);

ASCIIArt.displayName = 'ASCIIArt';

export default ASCIIArt;
