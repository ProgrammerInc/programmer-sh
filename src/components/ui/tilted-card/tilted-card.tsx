'use client';

import { cn } from '@/utils/app.utils';
import type { SpringOptions } from 'framer-motion';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { memo, useRef, useState } from 'react';

import styles from './tilted-card.module.css';
import { TiltedCardProps } from './tilted-card.types';

/**
 * Spring animation configuration values
 */
const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2
};

/**
 * TiltedCard Component
 * 
 * A card component with interactive 3D tilt effect based on mouse position.
 * The card responds to mouse movement by tilting in the direction of the cursor
 * and provides visual feedback through rotation, scaling, and optional tooltip.
 * 
 * Features:
 * - Interactive 3D rotation effect based on mouse position
 * - Smooth animations with configurable parameters
 * - Optional tooltip with customizable text
 * - Responsive design with mobile device warning
 * - Support for overlay content
 * - Configurable dimensions and appearance
 * - Accessible with proper alt text support
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <TiltedCard 
 *   imageSrc="/path/to/image.jpg" 
 *   altText="Description of the image"
 * />
 * 
 * // With caption and custom dimensions
 * <TiltedCard 
 *   imageSrc="/path/to/image.jpg"
 *   captionText="Interactive 3D Card"
 *   containerHeight="400px"
 *   imageWidth="350px"
 *   imageHeight="350px"
 * />
 * 
 * // With overlay content
 * <TiltedCard 
 *   imageSrc="/path/to/image.jpg"
 *   displayOverlayContent={true}
 *   overlayContent={<div className="p-4 text-white">Overlay Content</div>}
 * />
 * ```
 */
const TiltedCard = memo(function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
  className,
  ...props
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });

  const [lastY, setLastY] = useState(0);

  /**
   * Handle mouse movement over the card
   * Calculates rotation based on mouse position relative to card center
   */
  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  /**
   * Handle mouse entering the card
   * Activates the hover effect with scaling and tooltip
   */
  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  /**
   * Handle mouse leaving the card
   * Resets all effects to their default state
   */
  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  return (
    <figure
      ref={ref}
      className={cn(styles.container, className)}
      style={{
        height: containerHeight,
        width: containerWidth
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {showMobileWarning && (
        <div className={styles['mobile-warning']}>
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

      <motion.div
        className={styles.card}
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale
        }}
      >
        <motion.img
          src={imageSrc}
          alt={altText}
          className={styles.image}
          style={{
            width: imageWidth,
            height: imageHeight
          }}
        />

        {displayOverlayContent && overlayContent && (
          <motion.div className={styles.overlay}>
            {overlayContent}
          </motion.div>
        )}
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className={styles.caption}
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption
          }}
          aria-hidden={opacity.get() === 0}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
});

export { TiltedCard };
export default TiltedCard;
