'use client';

import React from 'react';
import {
  DEFAULT_ACTIVE_TRANSITION,
  DEFAULT_DISABLED,
  DEFAULT_INACTIVE_TRANSITION,
  DEFAULT_INNER_CLASS_NAME,
  DEFAULT_MAGNET_STRENGTH,
  DEFAULT_PADDING,
  DEFAULT_WRAPPER_CLASS_NAME
} from './magnet.constants';
import { useMagnetEffect } from './magnet.hooks';
import { MagnetProps } from './magnet.types';

/**
 * Magnet component that attracts to the mouse cursor when nearby
 *
 * @param props Component props
 * @returns Magnetic element that follows cursor with configurable strength
 */
export const Magnet = React.memo<MagnetProps>(
  ({
    children,
    padding = DEFAULT_PADDING,
    disabled = DEFAULT_DISABLED,
    magnetStrength = DEFAULT_MAGNET_STRENGTH,
    activeTransition = DEFAULT_ACTIVE_TRANSITION,
    inactiveTransition = DEFAULT_INACTIVE_TRANSITION,
    wrapperClassName = DEFAULT_WRAPPER_CLASS_NAME,
    innerClassName = DEFAULT_INNER_CLASS_NAME,
    ...props
  }) => {
    // Use our custom hook to handle the magnet effect logic
    const { magnetRef, isActive, position } = useMagnetEffect(padding, disabled, magnetStrength);

    // Use appropriate transition based on active state
    const transitionStyle = isActive ? activeTransition : inactiveTransition;

    return (
      <div
        ref={magnetRef}
        className={wrapperClassName}
        style={{ position: 'relative', display: 'inline-block' }}
        {...props}
      >
        <div
          className={innerClassName}
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            transition: transitionStyle,
            willChange: 'transform'
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

// Add display name for better debugging
Magnet.displayName = 'Magnet';

export default Magnet;
