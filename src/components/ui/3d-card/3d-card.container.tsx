/**
 * 3D Card Container Component
 *
 * A container component that adds 3D perspective and rotation effects to its children
 * based on mouse position, creating an interactive 3D card effect.
 */

'use client';

import { MouseEnterContext } from '@/hooks/use-mouse-enter.hook';
import { cn } from '@/utils/app.utils';
import React, { useRef, useState } from 'react';

import styles from './3d-card.module.css';
import { CardContainerProps } from './3d-card.types';

/**
 * 3D Card Container component
 *
 * @param props - Component props
 * @param props.children - Child elements to render inside the container
 * @param props.className - Additional classes for the inner card element
 * @param props.containerClassName - Additional classes for the outer container
 * @returns 3D Card Container component
 */
export const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className,
  containerClassName
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  /**
   * Handles mouse movement to apply rotation to the card
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  /**
   * Handles mouse enter events
   */
  const handleMouseEnter = () => {
    setIsMouseEntered(true);
  };

  /**
   * Handles mouse leave events to reset the rotation
   */
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(styles.container, containerClassName)}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(styles.card, className)}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

export default CardContainer;
