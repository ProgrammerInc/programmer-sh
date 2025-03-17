/**
 * Hyperspeed animation component that creates a three.js-based driving animation
 * with various customizable visual effects.
 *
 * @component
 */
'use client';

import { FC, useEffect, useRef } from 'react';
import { HyperspeedApp } from './hyperspeed-app.class';
import { DEFAULT_HYPERSPEED_OPTIONS, DISTORTIONS } from './hyperspeed.constants';
import { HyperspeedOptions, HyperspeedProps } from './hyperspeed.types';

/**
 * Hyperspeed component that renders a customizable driving animation with
 * light effects using three.js.
 *
 * @param {HyperspeedProps} props - The component props
 * @returns {JSX.Element} The rendered hyperspeed animation container
 */
export const Hyperspeed: FC<HyperspeedProps> = ({ effectOptions = {} }) => {
  const mergedOptions: HyperspeedOptions = {
    ...DEFAULT_HYPERSPEED_OPTIONS,
    ...effectOptions
  };
  const hyperspeed = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = hyperspeed.current;
    if (!container) return;

    if (typeof mergedOptions.distortion === 'string') {
      mergedOptions.distortion = DISTORTIONS[mergedOptions.distortion];
    }

    const myApp = new HyperspeedApp(container, mergedOptions);
    myApp.loadAssets().then(myApp.init);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id="hyperspeed" className="hyperspeed w-full h-full" ref={hyperspeed}></div>;
};

export default Hyperspeed;
