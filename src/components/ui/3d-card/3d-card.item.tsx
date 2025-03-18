/**
 * 3D Card Item Component
 *
 * An element within the 3D card that can be individually transformed in 3D space.
 * Each item can have its own 3D translations and rotations when the card is hovered.
 */

'use client';

import useMouseEnter from '@/hooks/use-mouse-enter.hook';
import { cn } from '@/utils/app.utils';
import React, { ElementType, useEffect, useRef } from 'react';

import styles from './3d-card.module.css';
import { CardItemProps } from './3d-card.types';

/**
 * Card Item component for 3D card elements
 *
 * Elements that can be independently transformed in 3D space when the card is hovered.
 *
 * @param props - Component props
 * @param props.as - The HTML element type to render (default: div)
 * @param props.children - Child elements to render inside the item
 * @param props.className - Additional CSS classes for the card item
 * @param props.translateX - X-axis translation in pixels when hovered
 * @param props.translateY - Y-axis translation in pixels when hovered
 * @param props.translateZ - Z-axis translation in pixels when hovered
 * @param props.rotateX - X-axis rotation in degrees when hovered
 * @param props.rotateY - Y-axis rotation in degrees when hovered
 * @param props.rotateZ - Z-axis rotation in degrees when hovered
 * @returns Card Item component
 */
export const CardItem = ({
  as: Component = 'div',
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  useEffect(() => {
    handleAnimations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMouseEntered]);

  /**
   * Apply 3D transformations based on mouse hover state
   */
  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  return (
    <Component ref={ref} className={cn(styles.item, className)} {...rest}>
      {children}
    </Component>
  );
};

export default CardItem;
