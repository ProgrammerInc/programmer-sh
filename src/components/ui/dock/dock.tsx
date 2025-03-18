'use client';

import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion';
import React, { Children, cloneElement, memo, useEffect, useMemo, useRef, useState } from 'react';

import styles from './dock.module.css';
import {
  DockIconProps,
  DockItemProps,
  DockLabelProps,
  DockProps
} from './dock.types';

/**
 * Dock Item Component
 * 
 * An individual item in the dock that responds to mouse position for magnification effects.
 * 
 * @example
 * ```tsx
 * <DockItem
 *   mouseX={mouseX}
 *   spring={spring}
 *   distance={200}
 *   magnification={70}
 *   baseItemSize={50}
 *   onClick={() => alert('Clicked!')}
 * >
 *   <DockIcon><CommandIcon size={24} /></DockIcon>
 *   <DockLabel>Command</DockLabel>
 * </DockItem>
 * ```
 */
export const DockItem = memo(function DockItem({
  children,
  className = '',
  onClick,
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`${styles['dock-item']} ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child => cloneElement(child as React.ReactElement, { isHovered }))}
    </motion.div>
  );
});

/**
 * Dock Label Component
 * 
 * Label that appears above a dock item when hovered.
 * 
 * @example
 * ```tsx
 * <DockLabel>Settings</DockLabel>
 * ```
 */
export const DockLabel = memo(function DockLabel({
  children,
  className = '',
  ...rest
}: DockLabelProps) {
  const { isHovered } = rest as { isHovered: MotionValue<number> };
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`${styles['dock-label']} ${className}`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

/**
 * Dock Icon Component
 * 
 * Container for the icon in a dock item.
 * 
 * @example
 * ```tsx
 * <DockIcon><CommandIcon size={24} /></DockIcon>
 * ```
 */
export const DockIcon = memo(function DockIcon({
  children,
  className = ''
}: DockIconProps) {
  return <div className={`${styles['dock-icon']} ${className}`}>{children}</div>;
});

/**
 * Dock Component
 * 
 * A macOS-style dock that provides a magnification effect when hovering over items.
 * 
 * @example
 * ```tsx
 * const dockItems = [
 *   {
 *     icon: <CommandIcon size={24} />,
 *     label: 'Command',
 *     onClick: () => setCommandOpen(true),
 *   },
 *   {
 *     icon: <SettingsIcon size={24} />,
 *     label: 'Settings',
 *     onClick: () => setSettingsOpen(true),
 *   }
 * ];
 * 
 * <Dock
 *   items={dockItems}
 *   magnification={70}
 *   baseItemSize={50}
 *   distance={200}
 * />
 * ```
 */
const Dock = memo(function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [dockHeight, magnification]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height, scrollbarWidth: 'none' }}
      className={styles['dock-container']}
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={`${styles['dock-panel']} ${className}`}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
});

// Set display names for better debugging
DockItem.displayName = 'DockItem';
DockLabel.displayName = 'DockLabel';
DockIcon.displayName = 'DockIcon';
Dock.displayName = 'Dock';

export { Dock };
export default Dock;
