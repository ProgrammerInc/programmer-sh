/**
 * Custom hooks for the ShootingStars animation component
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { ANIMATION, DEFAULT_SHOOTING_STARS } from './shooting-stars.constants';
import { ShootingStar, ShootingStarsProps } from './shooting-stars.types';
import { getRandomStartPoint } from './shooting-stars.utils';

/**
 * Hook to manage viewport dimensions
 * 
 * @returns Object containing current viewport width and height
 */
export const useViewportDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    // Don't try to access window during SSR
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial dimensions
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
};

/**
 * Hook to manage the shooting stars animation and lifecycle
 *
 * @param props - Animation configuration properties
 * @returns An object containing the current star and transform value
 */
export const useShootingStars = ({
  minSpeed = DEFAULT_SHOOTING_STARS.MIN_SPEED,
  maxSpeed = DEFAULT_SHOOTING_STARS.MAX_SPEED,
  minDelay = DEFAULT_SHOOTING_STARS.MIN_DELAY,
  maxDelay = DEFAULT_SHOOTING_STARS.MAX_DELAY,
  starWidth = DEFAULT_SHOOTING_STARS.STAR_WIDTH,
  starHeight = DEFAULT_SHOOTING_STARS.STAR_HEIGHT,
}: Pick<ShootingStarsProps, 'minSpeed' | 'maxSpeed' | 'minDelay' | 'maxDelay' | 'starWidth' | 'starHeight'>) => {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const { width, height } = useViewportDimensions();

  // Function to create a shooting star with random properties
  const createStar = useCallback(() => {
    if (width === 0 || height === 0) return; // Don't create stars if dimensions aren't available
    
    const { x, y, angle } = getRandomStartPoint(width, height);
    const newStar: ShootingStar = {
      id: Date.now(),
      x,
      y,
      angle,
      scale: 1,
      speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
      distance: 0
    };
    setStar(newStar);

    // Clear existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Schedule next star creation
    const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
    timerRef.current = setTimeout(createStar, randomDelay);
  }, [minSpeed, maxSpeed, minDelay, maxDelay, width, height]);

  // Create shooting stars when dimensions are available and on component mount
  useEffect(() => {
    if (width > 0 && height > 0) {
      createStar();
    }
    
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [createStar, width, height]);

  // Handle the animation of the shooting star
  useEffect(() => {
    if (!star) return;
    
    let animationFrameId: number;
    
    const moveStar = () => {
      setStar(prevStar => {
        if (!prevStar) return null;
        
        const newX = prevStar.x + prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
        const newY = prevStar.y + prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
        const newDistance = prevStar.distance + prevStar.speed;
        const newScale = 1 + newDistance / ANIMATION.SCALE_FACTOR;
        
        // Remove star when it moves off screen
        const margin = ANIMATION.OFF_SCREEN_MARGIN;
        if (
          newX < -margin ||
          newX > width + margin ||
          newY < -margin ||
          newY > height + margin
        ) {
          // If star is off screen, return null to trigger new star creation
          // Avoid creating new star here to prevent timing issues
          return null;
        }
        
        return {
          ...prevStar,
          x: newX,
          y: newY,
          distance: newDistance,
          scale: newScale
        };
      });
      
      animationFrameId = requestAnimationFrame(moveStar);
    };

    animationFrameId = requestAnimationFrame(moveStar);
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [star, width, height]);

  // Create a new star when the current one disappears
  useEffect(() => {
    if (star === null && width > 0 && height > 0) {
      // Small delay before creating a new star to prevent flickering
      const newStarTimer = setTimeout(() => createStar(), 100);
      return () => clearTimeout(newStarTimer);
    }
  }, [star, createStar, width, height]);

  // Calculate the transform value for the star
  const starTransform = star
    ? `rotate(${star.angle}, ${star.x + (starWidth * star.scale) / 2}, ${star.y + starHeight / 2})`
    : '';

  return { star, starTransform };
};
