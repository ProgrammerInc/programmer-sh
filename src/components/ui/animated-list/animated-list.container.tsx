/**
 * Animated List Container Component
 *
 * A list with animated items and keyboard navigation support.
 */

'use client';

import { cn } from '@/utils/app.utils';
import React, { UIEvent, memo, useEffect, useRef, useState } from 'react';

import styles from './animated-list.module.css';
import AnimatedItem from './animated-list.item';
import { AnimatedListProps } from './animated-list.types';

/**
 * AnimatedList component
 * 
 * A list that animates items when they come into view with keyboard navigation support.
 * 
 * @example
 * ```tsx
 * <AnimatedList 
 *   items={['Item 1', 'Item 2', 'Item 3']} 
 *   onItemSelect={(item, index) => console.log(`Selected ${item} at index ${index}`)}
 * />
 * ```
 */
export const AnimatedList = memo<AnimatedListProps>(({ 
  items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15'
  ],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(initialSelectedIndex);
  const [keyboardNav, setKeyboardNav] = useState<boolean>(false);
  const [topGradientOpacity, setTopGradientOpacity] = useState<number>(0);
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState<number>(1);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLDivElement;
    setTopGradientOpacity(Math.min(scrollTop / 50, 1));
    const bottomDistance = scrollHeight - (scrollTop + clientHeight);
    setBottomGradientOpacity(scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1));
  };

  // Keyboard navigation: arrow keys, tab, and enter selection
  useEffect(() => {
    if (!enableArrowNavigation) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.min(prev + 1, items.length - 1));
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault();
        setKeyboardNav(true);
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault();
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation]);

  // Scroll the selected item into view if needed
  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return;
    
    const container = listRef.current;
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`
    ) as HTMLElement | null;
    
    if (selectedItem) {
      const extraMargin = 50;
      const containerScrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const itemTop = selectedItem.offsetTop;
      const itemBottom = itemTop + selectedItem.offsetHeight;
      
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' });
      } else if (itemBottom > containerScrollTop + containerHeight - extraMargin) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth'
        });
      }
    }
    
    setKeyboardNav(false);
  }, [selectedIndex, keyboardNav]);

  const listClassName = cn(
    styles.list,
    displayScrollbar ? styles['list-with-scrollbar'] : styles['list-without-scrollbar']
  );

  return (
    <div className={cn(styles.container, className)}>
      <div
        ref={listRef}
        className={listClassName}
        onScroll={handleScroll}
        style={{
          // These CSS properties won't work in some browsers, but are handled by CSS class fallbacks
          // Only used here for browsers that do support them
          ...(displayScrollbar ? {
            scrollbarWidth: 'thin', // Firefox only
            scrollbarColor: 'var(--scrollbar-thumb-color) var(--scrollbar-track-color)' // Firefox only
          } : {
            scrollbarWidth: 'none', // Firefox only
            scrollbarColor: 'transparent transparent' // Firefox only
          })
        }}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={index}
            delay={0.1}
            index={index}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => {
              setSelectedIndex(index);
              if (onItemSelect) {
                onItemSelect(item, index);
              }
            }}
          >
            <div
              className={cn(
                styles.item, 
                selectedIndex === index && styles['item-selected'],
                itemClassName
              )}
            >
              <p className={styles['item-text']}>{item}</p>
            </div>
          </AnimatedItem>
        ))}
      </div>
      
      {showGradients && (
        <>
          <div
            className={styles['top-gradient']}
            style={{ opacity: topGradientOpacity }}
          ></div>
          <div
            className={styles['bottom-gradient']}
            style={{ opacity: bottomGradientOpacity }}
          ></div>
        </>
      )}
    </div>
  );
});

AnimatedList.displayName = 'AnimatedList';

export default AnimatedList;
