'use client';

import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import React, { useEffect, useRef, useState, memo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './elastic-slider.module.css';
import { ElasticSliderProps, SliderProps } from './elastic-slider.types';

/**
 * Maximum overflow distance for the elastic effect
 */
const MAX_OVERFLOW = 50;

/**
 * ElasticSlider Component
 * 
 * A slider component with elastic effects when dragging beyond the bounds.
 * It provides visual feedback through animations and haptic-like UI responses.
 * 
 * @example
 * ```tsx
 * <ElasticSlider
 *   defaultValue={50}
 *   maxValue={100}
 *   isStepped={true}
 *   stepSize={5}
 * />
 * ```
 */
export const ElasticSlider = memo(function ElasticSlider({
  defaultValue = 50,
  startingValue = 0,
  maxValue = 100,
  className = '',
  isStepped = false,
  stepSize = 1,
  leftIcon = <>-</>,
  rightIcon = <>+</>
}: ElasticSliderProps) {
  const sliderContainerClassName = cn(styles['slider-container'], className);
  
  return (
    <div className={sliderContainerClassName}>
      <Slider
        defaultValue={defaultValue}
        startingValue={startingValue}
        maxValue={maxValue}
        isStepped={isStepped}
        stepSize={stepSize}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      />
    </div>
  );
});

ElasticSlider.displayName = 'ElasticSlider';

/**
 * Internal Slider Component
 * 
 * Implements the core slider functionality with elastic effects.
 * Handles user interactions, animations, and value calculations.
 */
const Slider = memo(function Slider({
  defaultValue,
  startingValue,
  maxValue,
  isStepped,
  stepSize,
  leftIcon,
  rightIcon
}: SliderProps) {
  const [value, setValue] = useState<number>(defaultValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [region, setRegion] = useState<'left' | 'middle' | 'right'>('middle');
  const clientX = useMotionValue(0);
  const overflow = useMotionValue(0);
  const scale = useMotionValue(1);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useMotionValueEvent(clientX, 'change', (latest: number) => {
    if (sliderRef.current) {
      const { left, right } = sliderRef.current.getBoundingClientRect();
      let newValue: number;
      if (latest < left) {
        setRegion('left');
        newValue = left - latest;
      } else if (latest > right) {
        setRegion('right');
        newValue = latest - right;
      } else {
        setRegion('middle');
        newValue = 0;
      }
      overflow.jump(decay(newValue, MAX_OVERFLOW));
    }
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.buttons > 0 && sliderRef.current) {
      const { left, width } = sliderRef.current.getBoundingClientRect();
      let newValue = startingValue + ((e.clientX - left) / width) * (maxValue - startingValue);
      if (isStepped) {
        newValue = Math.round(newValue / stepSize) * stepSize;
      }
      newValue = Math.min(Math.max(newValue, startingValue), maxValue);
      setValue(newValue);
      clientX.jump(e.clientX);
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerMove(e);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerUp = () => {
    animate(overflow, 0, { type: 'spring', bounce: 0.5 });
  };

  const getRangePercentage = (): number => {
    const totalRange = maxValue - startingValue;
    if (totalRange === 0) return 0;
    return ((value - startingValue) / totalRange) * 100;
  };

  return (
    <>
      <motion.div
        onHoverStart={() => animate(scale, 1.2)}
        onHoverEnd={() => animate(scale, 1)}
        onTouchStart={() => animate(scale, 1.2)}
        onTouchEnd={() => animate(scale, 1)}
        style={{
          scale,
          opacity: useTransform(scale, [1, 1.2], [0.7, 1])
        }}
        className={styles['slider-controls']}
      >
        <motion.div
          animate={{
            scale: region === 'left' ? [1, 1.4, 1] : 1,
            transition: { duration: 0.25 }
          }}
          style={{
            x: useTransform(() => (region === 'left' ? -overflow.get() / scale.get() : 0))
          }}
          className={styles['slider-icon']}
        >
          {leftIcon}
        </motion.div>

        <div
          ref={sliderRef}
          className={styles['slider-track-container']}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <motion.div
            style={{
              scaleX: useTransform(() => {
                if (sliderRef.current) {
                  const { width } = sliderRef.current.getBoundingClientRect();
                  return 1 + overflow.get() / width;
                }
                return 1;
              }),
              scaleY: useTransform(overflow, [0, MAX_OVERFLOW], [1, 0.8]),
              transformOrigin: useTransform(() => {
                if (sliderRef.current) {
                  const { left, width } = sliderRef.current.getBoundingClientRect();
                  return clientX.get() < left + width / 2 ? 'right' : 'left';
                }
                return 'center';
              }),
              height: useTransform(scale, [1, 1.2], [6, 12]),
              marginTop: useTransform(scale, [1, 1.2], [0, -3]),
              marginBottom: useTransform(scale, [1, 1.2], [0, -3])
            }}
            className={styles['slider-track']}
          >
            <div className={styles['slider-track-background']}>
              <div
                className={styles['slider-track-fill']}
                style={{ width: `${getRangePercentage()}%` }}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{
            scale: region === 'right' ? [1, 1.4, 1] : 1,
            transition: { duration: 0.25 }
          }}
          style={{
            x: useTransform(() => (region === 'right' ? overflow.get() / scale.get() : 0))
          }}
          className={styles['slider-icon']}
        >
          {rightIcon}
        </motion.div>
      </motion.div>
      <p className={styles['slider-value']}>
        {Math.round(value)}
      </p>
    </>
  );
});

Slider.displayName = 'Slider';

/**
 * Decay function for elastic effect
 * 
 * Calculates a sigmoid-based decay to create a natural-feeling elastic effect
 * when dragging beyond the slider bounds.
 * 
 * @param value - Current overflow value
 * @param max - Maximum overflow threshold
 * @returns Decayed value with sigmoid curve applied
 */
function decay(value: number, max: number): number {
  if (max === 0) {
    return 0;
  }
  const entry = value / max;
  const sigmoid = 2 * (1 / (1 + Math.exp(-entry)) - 0.5);
  return sigmoid * max;
}

export default ElasticSlider;
