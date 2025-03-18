'use client';

import React, { useState, memo } from 'react';

import { cn } from '@/utils/app.utils';
import styles from './folder.module.css';
import { FolderProps, Offset } from './folder.types';

/**
 * Darkens a hex color by a given percentage
 *
 * @param hex - Hex color code (with or without #)
 * @param percent - Percentage to darken (0-1)
 * @returns Darkened hex color
 */
const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

/**
 * Folder Component
 *
 * A folder component that can be opened to reveal its contents.
 * Supports up to 3 items which animate when the folder is opened.
 *
 * @example
 * ```tsx
 * <Folder
 *   color="#00d8ff"
 *   size={1.2}
 *   items={[
 *     <div>Document 1</div>,
 *     <div>Document 2</div>,
 *     <div>Document 3</div>
 *   ]}
 * />
 * ```
 */
const Folder = memo(function Folder({
  color = '#00d8ff',
  size = 1,
  items = [],
  className = ''
}: FolderProps) {
  const maxItems = 3;
  const papers = items.slice(0, maxItems);
  while (papers.length < maxItems) {
    papers.push(null);
  }

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<Offset[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  /**
   * Handles clicking the folder to toggle its open state
   */
  const handleClick = () => {
    setOpen(prev => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })));
    }
  };

  /**
   * Handles mouse movement over a paper to add parallax effect
   */
  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: offsetX, y: offsetY };
      return newOffsets;
    });
  };

  /**
   * Handles mouse leaving a paper to reset its position
   */
  const handlePaperMouseLeave = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev];
      newOffsets[index] = { x: 0, y: 0 };
      return newOffsets;
    });
  };

  // CSS custom properties for colors
  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3
  } as React.CSSProperties;

  // Outer scale style
  const scaleStyle = { transform: `scale(${size})` };

  /**
   * Gets the transform style for open papers
   */
  const getOpenTransform = (index: number) => {
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
    return '';
  };

  return (
    <div style={scaleStyle} className={className}>
      <div
        className={cn(
          styles.folder,
          open && styles.open
        )}
        style={folderStyle}
        onClick={handleClick}
      >
        <div
          className={styles['folder-back']}
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className={styles['folder-tab']}
            style={{ backgroundColor: folderBackColor }}
          ></span>
          {/* Render papers */}
          {papers.map((item, i) => {
            const paperClass = `paper-${i + 1}`;
            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
              : undefined;

            return (
              <div
                key={i}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                className={cn(
                  styles.paper,
                  styles[paperClass],
                  open && styles.open
                )}
                style={{
                  ...(!open ? {} : { transform: transformStyle }),
                  backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3
                }}
              >
                {item}
              </div>
            );
          })}
          <div
            className={cn(
              styles.cover,
              styles['cover-left'],
              open && styles.open
            )}
            style={{ backgroundColor: color }}
          ></div>
          <div
            className={cn(
              styles.cover,
              styles['cover-right'],
              open && styles.open
            )}
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>
    </div>
  );
});

Folder.displayName = 'Folder';

export default Folder;
