import { gsap } from 'gsap';
import React, { FC, useEffect, useRef } from 'react';
import './grid-motion.css';

export interface GridMotionProps {
  items?: (string | React.ReactNode)[];
  gradientColor?: string;
}

export const GridMotion: FC<GridMotionProps> = ({ items = [], gradientColor = 'black' }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseXRef = useRef<number>(window.innerWidth / 2);

  // Ensure the grid has 28 items (4 rows x 7 columns) by default
  const totalItems = 28;
  const defaultItems = Array.from({ length: totalItems }, (_, index) => `Item ${index + 1}`);
  const combinedItems = items.length > 0 ? items.slice(0, totalItems) : defaultItems;

  useEffect(() => {
    // Set the CSS variable for gradient color
    if (gridRef.current) {
      gridRef.current.style.setProperty('--grid-motion-gradient-color', gradientColor);
    }

    gsap.ticker.lagSmoothing(0);

    const handleMouseMove = (e: MouseEvent): void => {
      mouseXRef.current = e.clientX;
    };

    const updateMotion = (): void => {
      const maxMoveAmount = 300;
      const baseDuration = 0.8; // Base duration for inertia
      const inertiaFactors = [0.6, 0.4, 0.3, 0.2]; // Different inertia for each row, outer rows slower

      rowRefs.current.forEach((row, index) => {
        if (row) {
          const direction = index % 2 === 0 ? 1 : -1;
          const moveAmount =
            ((mouseXRef.current / window.innerWidth) * maxMoveAmount - maxMoveAmount / 2) *
            direction;

          gsap.to(row, {
            x: moveAmount,
            duration: baseDuration + inertiaFactors[index % inertiaFactors.length],
            ease: 'power3.out',
            overwrite: 'auto'
          });
        }
      });
    };

    const removeAnimationLoop = gsap.ticker.add(updateMotion);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      removeAnimationLoop();
    };
  }, [gradientColor]);

  return (
    <div ref={gridRef} className="grid-motion-container">
      <section className="grid-motion-section">
        {/* Noise overlay - now using proper asset path */}
        <div className="grid-motion-noise-overlay" style={{ backgroundImage: 'url(/assets/noise.png)' }}></div>
        <div className="grid-motion-grid">
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className="grid-motion-row"
              ref={(el) => (rowRefs.current[rowIndex] = el)}
            >
              {combinedItems.slice(rowIndex * 7, (rowIndex + 1) * 7).map((item, index) => (
                <div
                  key={index}
                  className="grid-motion-item"
                >
                  {typeof item === 'string' && item.startsWith('http') ? (
                    <div
                      className="w-full h-full bg-cover bg-center absolute top-0 left-0"
                      style={{ backgroundImage: `url(${item})` }}
                    ></div>
                  ) : (
                    <div className="p-4 text-center z-[1]">
                      {item}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GridMotion;
