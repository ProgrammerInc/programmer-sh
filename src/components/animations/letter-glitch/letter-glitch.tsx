'use client';

import { memo, useEffect } from 'react';
import { DEFAULT_GLITCH_COLORS, RESIZE_DEBOUNCE } from './letter-glitch.constants';
import { useLetterGlitch } from './letter-glitch.hooks';
import styles from './letter-glitch.module.css';
import { LetterGlitchProps } from './letter-glitch.types';

/**
 * A component that creates a matrix-like letter glitch effect on a canvas.
 * Displays randomly changing characters with glitch color effects.
 *
 * @param {LetterGlitchProps} props - The component props
 * @returns {JSX.Element} The rendered component
 */
export const LetterGlitch = memo(function LetterGlitch({
  glitchColors = DEFAULT_GLITCH_COLORS,
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true
}: LetterGlitchProps) {
  const { canvasRef, initAnimation, cleanupAnimation, resizeCanvas, animate } = useLetterGlitch(
    glitchColors,
    glitchSpeed,
    smooth
  );

  // Setup the canvas and animation on component mount
  useEffect(() => {
    initAnimation();

    let resizeTimeout: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cleanupAnimation();
        resizeCanvas();
        animate();
      }, RESIZE_DEBOUNCE);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cleanupAnimation();
      window.removeEventListener('resize', handleResize);
    };
  }, [initAnimation, cleanupAnimation, resizeCanvas, animate]);

  return (
    <div className={styles['container']}>
      <canvas ref={canvasRef} className={styles['canvas']} />
      {outerVignette && <div className={styles['outer-vignette']}></div>}
      {centerVignette && <div className={styles['center-vignette']}></div>}
    </div>
  );
});

export default LetterGlitch;
