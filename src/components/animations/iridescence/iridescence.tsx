'use client';

import { useEffect, useRef } from 'react';
import { IridescenceApp } from './iridescence-app.class';
import { IridescenceProps } from './iridescence.types';

/**
 * Iridescence animation component that renders a dynamic, colorful WebGL effect.
 *
 * The effect creates a mesmerizing, smooth color transition that responds to time
 * and optionally to mouse movements. It uses WebGL shaders through the OGL library
 * to achieve high-performance rendering.
 *
 * @param {IridescenceProps} props - Component props
 * @returns {JSX.Element} A div containing the WebGL canvas
 */
export function Iridescence({
  color = [1, 1, 1],
  speed = 1.0,
  amplitude = 0.1,
  mouseReact = true,
  ...rest
}: IridescenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<IridescenceApp | null>(null);

  useEffect(() => {
    // Only initialize if the container is available
    if (!containerRef.current) return;

    // Create the WebGL app instance
    const app = new IridescenceApp(containerRef.current, color, speed, amplitude, mouseReact);

    // Store reference to the app for cleanup
    appRef.current = app;

    // Start the animation
    app.start();

    // Cleanup function
    return () => {
      if (appRef.current) {
        appRef.current.destroy();
        appRef.current = null;
      }
    };
  }, [color, speed, amplitude, mouseReact]); // Re-initialize if props change

  // Update app properties if they change after initial render
  useEffect(() => {
    if (appRef.current) {
      appRef.current.updateColor(color);
      appRef.current.updateSpeed(speed);
      appRef.current.updateAmplitude(amplitude);
    }
  }, [color, speed, amplitude]);

  return <div ref={containerRef} className="w-full h-full" {...rest} />;
}

export default Iridescence;
