/**
 * Utility functions for the BackgroundBeams component
 */

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with Tailwind's class merging
 *
 * @param inputs - Class values to be merged
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a random percentage value within a range
 *
 * @param baseValue - Base percentage value
 * @param variance - Maximum random variance to add/subtract
 * @returns String percentage value with % suffix
 */
export function randomPercentage(baseValue: number, variance: number): string {
  return `${baseValue + Math.random() * variance}%`;
}

/**
 * Generates random animation duration within a range
 *
 * @param baseDuration - Base duration in seconds
 * @param randomAddition - Maximum random seconds to add
 * @returns Random duration in seconds
 */
export function randomDuration(baseDuration: number, randomAddition: number): number {
  return baseDuration + Math.random() * randomAddition;
}

/**
 * Generates random animation delay
 *
 * @param maxDelay - Maximum delay in seconds
 * @returns Random delay in seconds
 */
export function randomDelay(maxDelay: number): number {
  return Math.random() * maxDelay;
}

/**
 * Interface for gradient animation properties
 */
interface GradientAnimation {
  initial: {
    x1: string;
    x2: string;
    y1: string;
    y2: string;
  };
  animate: {
    x1: string[];
    x2: string[];
    y1: string[];
    y2: string[];
  };
}

/**
 * Creates animation properties for beam gradients
 *
 * @param baseGradient - Base gradient properties
 * @param variance - Variance for y2 value (percentage)
 * @returns Modified gradient animation properties
 */
export function createGradientAnimation(
  baseGradient: GradientAnimation,
  variance = 8
): GradientAnimation {
  // Clone the base gradient to avoid mutation
  const animateGradient = { ...baseGradient.animate };

  // Apply random variance to y2
  if (Array.isArray(animateGradient.y2) && animateGradient.y2.length > 1) {
    const baseY2 = parseFloat(animateGradient.y2[1]);
    animateGradient.y2 = [animateGradient.y2[0], randomPercentage(baseY2, variance)];
  }

  return {
    initial: baseGradient.initial,
    animate: animateGradient
  };
}
