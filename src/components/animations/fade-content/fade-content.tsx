'use client';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { FadeContentProps } from './fade-content.types';

/**
 * A component that fades in its children when they enter the viewport
 *
 * @example
 * <FadeContent blur={true} duration={800}>
 *   <div>This content will fade in when scrolled into view</div>
 * </FadeContent>
 */
export const FadeContent = memo(function FadeContent({
  children,
  blur = false,
  duration = 1000,
  easing = 'ease-out',
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = ''
}: FadeContentProps) {
  const [inView, setInView] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          observer.unobserve(element);
          setTimeout(() => {
            setInView(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, delay]);

  const containerStyle = useMemo(
    () => ({
      opacity: inView ? 1 : initialOpacity,
      transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
      filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none'
    }),
    [inView, initialOpacity, duration, easing, blur]
  );

  return (
    <div ref={ref} className={className} style={containerStyle}>
      {children}
    </div>
  );
});

export default FadeContent;
