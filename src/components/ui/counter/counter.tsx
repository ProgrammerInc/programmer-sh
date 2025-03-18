'use client';

/**
 * Counter component
 * 
 * A customizable animated counter that displays numbers with a rolling digit animation
 */

import { motion, useSpring, useTransform } from 'framer-motion';
import { memo, useEffect } from 'react';

import styles from './counter.module.css';
import {
  CounterProps,
  DigitProps,
  NumberProps
} from './counter.types';

/**
 * Number component renders a single digit (0-9) within a digit column
 * 
 * @param props - The component props
 */
const Number = memo(({ mv, number, height }: NumberProps) => {
  const y = useTransform(mv, latest => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });

  return (
    <motion.span 
      className={styles.number} 
      style={{ y }}
    >
      {number}
    </motion.span>
  );
});

Number.displayName = 'Number';

/**
 * Digit component renders a column of numbers (0-9)
 * 
 * @param props - The component props
 */
const Digit = memo(({ place, value, height, digitStyle }: DigitProps) => {
  const valueRoundedToPlace = Math.floor(value / place);
  const animatedValue = useSpring(valueRoundedToPlace);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div 
      className={styles.digit} 
      style={{ 
        height, 
        ...digitStyle 
      }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </div>
  );
});

Digit.displayName = 'Digit';

/**
 * Counter component displays an animated rolling digit counter
 * 
 * @param props - The component props
 */
const Counter = memo(({
  value,
  fontSize = 100,
  padding = 0,
  places = [100, 10, 1],
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = 'white',
  fontWeight = 'bold',
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = 'black',
  gradientTo = 'transparent',
  topGradientStyle,
  bottomGradientStyle
}: CounterProps) => {
  const height = fontSize + padding;

  // Compose styles with defaults and custom overrides
  const computedCounterStyle = {
    fontSize,
    gap,
    borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight,
    ...counterStyle
  };

  const computedTopGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`,
    ...topGradientStyle
  };

  const computedBottomGradientStyle = {
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`,
    ...bottomGradientStyle
  };

  return (
    <div 
      className={styles.container} 
      style={containerStyle}
    >
      <div 
        className={styles.counter} 
        style={computedCounterStyle}
      >
        {places.map(place => (
          <Digit 
            key={place} 
            place={place} 
            value={value} 
            height={height} 
            digitStyle={digitStyle} 
          />
        ))}
      </div>
      <div className={styles['gradient-container']}>
        <div 
          className={styles['top-gradient']} 
          style={computedTopGradientStyle} 
        />
        <div 
          className={styles['bottom-gradient']} 
          style={computedBottomGradientStyle} 
        />
      </div>
    </div>
  );
});

Counter.displayName = 'Counter';

export default Counter;
