'use client';

import { useEffect, useRef, useState } from 'react';
import { CSS_VARIABLES, SAFARI_DETECTION_REGEX } from './gradient-animation.constants';
import { GradientAnimationProps } from './gradient-animation.types';

/**
 * Hook to set CSS variables for gradient animation
 */
export const useGradientCssVariables = ({
  gradientBackgroundStart,
  gradientBackgroundEnd,
  firstColor,
  secondColor,
  thirdColor,
  fourthColor,
  fifthColor,
  pointerColor,
  size,
  blendingValue
}: Pick<
  GradientAnimationProps,
  | 'gradientBackgroundStart'
  | 'gradientBackgroundEnd'
  | 'firstColor'
  | 'secondColor'
  | 'thirdColor'
  | 'fourthColor'
  | 'fifthColor'
  | 'pointerColor'
  | 'size'
  | 'blendingValue'
>) => {
  useEffect(() => {
    document.body.style.setProperty(CSS_VARIABLES.gradientBackgroundStart, gradientBackgroundStart);
    document.body.style.setProperty(CSS_VARIABLES.gradientBackgroundEnd, gradientBackgroundEnd);
    document.body.style.setProperty(CSS_VARIABLES.firstColor, firstColor);
    document.body.style.setProperty(CSS_VARIABLES.secondColor, secondColor);
    document.body.style.setProperty(CSS_VARIABLES.thirdColor, thirdColor);
    document.body.style.setProperty(CSS_VARIABLES.fourthColor, fourthColor);
    document.body.style.setProperty(CSS_VARIABLES.fifthColor, fifthColor);
    document.body.style.setProperty(CSS_VARIABLES.pointerColor, pointerColor);
    document.body.style.setProperty(CSS_VARIABLES.size, size);
    document.body.style.setProperty(CSS_VARIABLES.blendingValue, blendingValue);
  }, [
    blendingValue,
    fifthColor,
    firstColor,
    fourthColor,
    gradientBackgroundEnd,
    gradientBackgroundStart,
    pointerColor,
    secondColor,
    size,
    thirdColor
  ]);
};

/**
 * Hook to handle interactive pointer movement
 * @returns Object containing ref and mouse move handler
 */
export const useInteractivePointer = () => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
    }

    move();
  }, [curX, curY, tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  return { interactiveRef, handleMouseMove };
};

/**
 * Hook to detect Safari browser
 * @returns Boolean indicating if the browser is Safari
 */
export const useSafariDetection = () => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    setIsSafari(SAFARI_DETECTION_REGEX.test(navigator.userAgent));
  }, []);

  return isSafari;
};
