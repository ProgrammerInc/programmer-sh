/**
 * 3D Pin Container Component
 *
 * A container component that creates an interactive 3D pin effect with
 * hover animations and perspective effects.
 */

'use client';

import { cn } from '@/utils/app.utils';
import React, { useState } from 'react';

import styles from './3d-pin.module.css';
import PinPerspective from './3d-pin.perspective';
import { ThreeDPinProps } from './3d-pin.types';

/**
 * 3D Pin Container component
 *
 * Creates a 3D pin with hover animations and perspective effects.
 *
 * @param props - Component props
 * @param props.children - Child elements to render inside the pin
 * @param props.title - Title to display above the pin
 * @param props.href - URL to navigate to when the pin is clicked
 * @param props.className - Additional classes for the pin content
 * @param props.containerClassName - Additional classes for the pin container
 * @returns 3D Pin Container component
 */
export const ThreeDPin: React.FC<ThreeDPinProps> = ({
  children,
  title,
  href,
  className,
  containerClassName
}) => {
  const [transform, setTransform] = useState('translate(-50%,-50%) rotateX(0deg)');

  /**
   * Handle mouse enter event
   */
  const onMouseEnter = () => {
    setTransform('translate(-50%,-50%) rotateX(40deg) scale(0.8)');
  };

  /**
   * Handle mouse leave event
   */
  const onMouseLeave = () => {
    setTransform('translate(-50%,-50%) rotateX(0deg) scale(1)');
  };

  return (
    <a
      className={cn(styles.container, containerClassName)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      href={href || '/'}
    >
      <div className={styles['perspective-container']}>
        <div
          style={{
            transform: transform
          }}
          className={styles['pin-content']}
        >
          <div className={cn(styles['pin-inner'], className)}>{children}</div>
        </div>
      </div>
      <PinPerspective title={title} href={href} />
    </a>
  );
};

export default ThreeDPin;
