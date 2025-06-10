'use client';

import { gsap } from 'gsap';
import React, { memo, useMemo, useRef } from 'react';

import styles from './flowing-menu.module.css';
import { FlowingMenuProps, MenuItemProps } from './flowing-menu.types';

/**
 * FlowingMenu Component
 *
 * A navigation menu with flowing animations on hover.
 * Each item reveals a marquee animation when hovered.
 *
 * @example
 * ```tsx
 * <FlowingMenu
 *   items={[
 *     { link: "/home", text: "Home", image: "/images/home.jpg" },
 *     { link: "/about", text: "About", image: "/images/about.jpg" },
 *   ]}
 * />
 * ```
 */
export const FlowingMenu = memo(function FlowingMenu({ items = [] }: FlowingMenuProps) {
  return (
    <div className={styles['flowing-menu-container']}>
      <nav className={styles['flowing-menu-nav']}>
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
});

FlowingMenu.displayName = 'FlowingMenu';

/**
 * MenuItem Component
 *
 * An individual item in the FlowingMenu that displays a text label
 * and reveals an animated marquee with text and image on hover.
 *
 * @example
 * ```tsx
 * <MenuItem
 *   link="/about"
 *   text="About Us"
 *   image="/images/about.jpg"
 * />
 * ```
 */
export const MenuItem = memo(function MenuItem({ link, text, image }: MenuItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: 'expo' };

  /**
   * Determines which edge of the element the mouse is closest to
   */
  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number
  ): 'top' | 'bottom' => {
    const topEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY, 2);
    const bottomEdgeDist = Math.pow(mouseX - width / 2, 2) + Math.pow(mouseY - height, 2);
    return topEdgeDist < bottomEdgeDist ? 'top' : 'bottom';
  };

  /**
   * Handles mouse enter animation for the menu item
   */
  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' })
      .set(marqueeInnerRef.current, { y: edge === 'top' ? '101%' : '-101%' })
      .to([marqueeRef.current, marqueeInnerRef.current], { y: '0%' });
  };

  /**
   * Handles mouse leave animation for the menu item
   */
  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.to(marqueeRef.current, { y: edge === 'top' ? '-101%' : '101%' }).to(
      marqueeInnerRef.current,
      { y: edge === 'top' ? '101%' : '-101%' }
    );
  };

  /**
   * Generates repeated marquee content for the continuous animation
   */
  const repeatedMarqueeContent = useMemo(() => {
    return Array.from({ length: 4 }).map((_, idx) => (
      <React.Fragment key={idx}>
        <span className={styles['marquee-text']}>{text}</span>
        <div className={styles['marquee-image']} style={{ backgroundImage: `url(${image})` }} />
      </React.Fragment>
    ));
  }, [text, image]);

  return (
    <div className={styles['menu-item']} ref={itemRef}>
      <a
        className={styles['menu-item-link']}
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div className={styles['marquee-container']} ref={marqueeRef}>
        <div className={styles['marquee-inner']} ref={marqueeInnerRef}>
          <div className={styles['marquee-content']}>{repeatedMarqueeContent}</div>
        </div>
      </div>
    </div>
  );
});

MenuItem.displayName = 'MenuItem';

export default FlowingMenu;
