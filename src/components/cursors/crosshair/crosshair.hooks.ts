/**
 * @fileoverview Hook implementation for the Crosshair component
 * @module Crosshair/Hooks
 */

import { gsap } from 'gsap';
import { useCallback, useRef } from 'react';
import { CrosshairProps, MousePosition, PrimitiveValues, RenderedStyles } from './crosshair.types';
import { getMousePos, lerp } from './crosshair.utils';

/**
 * Hook to manage the Crosshair state and behavior
 *
 * @param props - Props for the Crosshair component
 * @returns Object containing refs and handler functions
 */
export const useCrosshairHooks = (props: CrosshairProps) => {
  const { color = 'white', containerRef = null } = props;

  const lineHorizontalRef = useRef<HTMLDivElement>(null);
  const lineVerticalRef = useRef<HTMLDivElement>(null);
  const filterXRef = useRef<SVGFETurbulenceElement>(null);
  const filterYRef = useRef<SVGFETurbulenceElement>(null);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });

  /**
   * Initialize the animation timeline for filter effects
   *
   * @returns GSAP timeline instance
   */
  const initializeTimeline = useCallback(() => {
    const primitiveValues: PrimitiveValues = { turbulence: 0 };

    return gsap
      .timeline({
        paused: true,
        onStart: () => {
          if (lineHorizontalRef.current) {
            lineHorizontalRef.current.style.filter = 'url(#filter-noise-x)';
          }
          if (lineVerticalRef.current) {
            lineVerticalRef.current.style.filter = 'url(#filter-noise-y)';
          }
        },
        onUpdate: () => {
          if (filterXRef.current && filterYRef.current) {
            filterXRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());
            filterYRef.current.setAttribute('baseFrequency', primitiveValues.turbulence.toString());
          }
        },
        onComplete: () => {
          if (lineHorizontalRef.current && lineVerticalRef.current) {
            lineHorizontalRef.current.style.filter = 'none';
            lineVerticalRef.current.style.filter = 'none';
          }
        }
      })
      .to(primitiveValues, {
        duration: 0.5,
        ease: 'power1',
        startAt: { turbulence: 1 },
        turbulence: 0
      });
  }, []);

  /**
   * Setup the animation and event listeners for the crosshair component
   */
  const setupCrosshair = useCallback(() => {
    const target: HTMLElement | Window = containerRef?.current || window;
    let animationFrameId: number;

    // Initialize rendered styles for animation
    const renderedStyles: RenderedStyles = {
      tx: { previous: 0, current: 0, amt: 0.15 },
      ty: { previous: 0, current: 0, amt: 0.15 }
    };

    // Hide crosshair lines initially
    gsap.set([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), { opacity: 0 });

    // Handle mouse movements to update crosshair position
    const handleMouseMove = (ev: Event) => {
      const mouseEvent = ev as MouseEvent;
      mouseRef.current = getMousePos(mouseEvent, containerRef?.current);

      // Handle visibility when mouse enters/leaves container
      if (containerRef?.current) {
        const bounds = containerRef.current.getBoundingClientRect();
        if (
          mouseEvent.clientX < bounds.left ||
          mouseEvent.clientX > bounds.right ||
          mouseEvent.clientY < bounds.top ||
          mouseEvent.clientY > bounds.bottom
        ) {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), {
            opacity: 0
          });
        } else {
          gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), {
            opacity: 1
          });
        }
      }
    };

    // Initialize animation on first mouse move
    const onInitialMouseMove = (_ev: Event) => {
      renderedStyles.tx.previous = renderedStyles.tx.current = mouseRef.current.x;
      renderedStyles.ty.previous = renderedStyles.ty.current = mouseRef.current.y;

      gsap.to([lineHorizontalRef.current, lineVerticalRef.current].filter(Boolean), {
        duration: 0.9,
        ease: 'Power3.easeOut',
        opacity: 1
      });

      animationFrameId = requestAnimationFrame(render);

      target.removeEventListener('mousemove', onInitialMouseMove);
    };

    // Animation render loop
    const render = () => {
      renderedStyles.tx.current = mouseRef.current.x;
      renderedStyles.ty.current = mouseRef.current.y;

      for (const key in renderedStyles) {
        const style = renderedStyles[key];
        style.previous = lerp(style.previous, style.current, style.amt);
      }

      if (lineHorizontalRef.current && lineVerticalRef.current) {
        gsap.set(lineVerticalRef.current, { x: renderedStyles.tx.previous });
        gsap.set(lineHorizontalRef.current, { y: renderedStyles.ty.previous });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Initialize timeline for filter effects
    const tl = initializeTimeline();

    // Add enter/leave animations for links
    const enter = () => tl.restart();
    const leave = () => {
      tl.progress(1).kill();
    };

    // Set up event listeners
    target.addEventListener('mousemove', handleMouseMove);
    target.addEventListener('mousemove', onInitialMouseMove);

    // Set up event listeners for links
    const links: NodeListOf<HTMLAnchorElement> = containerRef?.current
      ? containerRef.current.querySelectorAll('a')
      : document.querySelectorAll('a');

    links.forEach(link => {
      link.addEventListener('mouseenter', enter);
      link.addEventListener('mouseleave', leave);
    });

    // Return cleanup function
    return () => {
      target.removeEventListener('mousemove', handleMouseMove);
      target.removeEventListener('mousemove', onInitialMouseMove);

      links.forEach(link => {
        link.removeEventListener('mouseenter', enter);
        link.removeEventListener('mouseleave', leave);
      });

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [containerRef, initializeTimeline]);

  return {
    lineHorizontalRef,
    lineVerticalRef,
    filterXRef,
    filterYRef,
    setupCrosshair,
    color
  };
};
