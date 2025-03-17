/**
 * Custom hooks for the Sphere Animation component
 */

import anime from 'animejs';
import { useEffect, useMemo, useRef } from 'react';
import { ANIMATION, COLOR_SCHEMES, SVG } from './sphere-animation.constants';
import { ColorScheme, ColorSchemeMap } from './sphere-animation.types';
import { fitElementToParent, updateGradientColors } from './sphere-animation.utils';

/**
 * Hook for managing color schemes
 *
 * @param colorScheme - The active color scheme name
 * @returns The color schemes mapping object with the active scheme
 */
export const useColorSchemes = (colorScheme: ColorScheme = 'default') => {
  return useMemo<ColorSchemeMap>(
    () => COLOR_SCHEMES,
    // We don't include colorScheme in the deps because we want to memoize the entire color scheme map
    // regardless of which scheme is currently active
    []
  );
};

/**
 * Hook to initialize and control sphere animations
 *
 * @param sphereRef - Reference to the SVG element
 * @param colorScheme - Current color scheme
 */
export const useSphereAnimation = (
  sphereRef: React.RefObject<SVGSVGElement>,
  colorScheme: ColorScheme = 'default'
) => {
  const animationsRef = useRef<anime.AnimeInstance[]>([]);
  const colorSchemes = useColorSchemes(colorScheme);

  // Breathing animation effect
  useEffect(() => {
    if (!sphereRef.current) return;

    const sphereEl = sphereRef.current;
    const spherePathEls = sphereEl.querySelectorAll('path');
    const pathLength = spherePathEls.length;
    const colors = colorSchemes[colorScheme];

    // Update gradient colors
    updateGradientColors(sphereEl, SVG.GRADIENT_ID, colors.gradient);

    // Fit the SVG to its parent container
    fitElementToParent(sphereEl, SVG.DEFAULT_PADDING);

    const breathAnimation = anime({
      begin: () => {
        for (let i = 0; i < pathLength; i++) {
          animationsRef.current.push(
            anime({
              targets: spherePathEls[i],
              stroke: {
                value: colors.stroke,
                duration: 500
              },
              translateX: [2, -4],
              translateY: [2, -4],
              easing: 'easeOutQuad',
              autoplay: false
            })
          );
        }
      },
      update: ins => {
        animationsRef.current.forEach((animation, i) => {
          const percent = (1 - Math.sin(i * 0.35 + 0.0022 * ins.currentTime)) / 2;
          animation.seek(animation.duration * percent);
        });
      },
      duration: Infinity,
      autoplay: false
    });

    const introAnimation = anime
      .timeline({
        autoplay: false
      })
      .add(
        {
          targets: spherePathEls,
          strokeDashoffset: {
            value: [anime.setDashoffset, 0],
            duration: ANIMATION.INTRO_DURATION,
            easing: ANIMATION.INTRO_EASING,
            delay: anime.stagger(ANIMATION.INTRO_STAGGER, { direction: 'reverse' })
          },
          duration: 2000,
          delay: anime.stagger(60, { direction: 'reverse' }),
          easing: 'linear'
        },
        0
      );

    const shadowAnimation = anime({
      targets: `#${SVG.GRADIENT_ID}`,
      x1: '75%',
      x2: '25%',
      y1: '0%',
      y2: '75%',
      duration: ANIMATION.SHADOW_DURATION,
      easing: ANIMATION.SHADOW_EASING,
      autoplay: false
    });

    introAnimation.play();
    breathAnimation.play();
    shadowAnimation.play();

    return () => {
      breathAnimation.pause();
      shadowAnimation.pause();
      animationsRef.current.forEach(anim => anim.pause());
      animationsRef.current = [];
    };
  }, [colorScheme, colorSchemes, sphereRef]);

  // Path animation effect
  useEffect(() => {
    const sphereEl = sphereRef.current;
    if (!sphereEl) return;

    const animation = anime({
      targets: sphereEl.querySelectorAll(`.${SVG.GRADIENT_ID}-path`),
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: ANIMATION.PATH_EASING,
      duration: ANIMATION.PATH_DURATION,
      delay: function () {
        return anime.random(0, ANIMATION.PATH_MAX_DELAY);
      },
      loop: true
    });

    return () => {
      animation.pause();
    };
  }, [sphereRef]);
};
