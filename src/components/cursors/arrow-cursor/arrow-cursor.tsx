'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { memo } from 'react';
import { CSS_CLASSES, DEFAULT_VALUES } from './arrow-cursor.constants';
import { useArrowAnimationVariants, useArrowCursorTracking } from './arrow-cursor.hooks';
import type { ArrowCursorProps } from './arrow-cursor.types';

/**
 * ArrowCursor Component
 *
 * Displays an arrow indicator that follows the mouse cursor and points
 * in the direction of mouse movement (up or down).
 *
 * @component
 */
export const ArrowCursor = memo<ArrowCursorProps>(
  ({ bgColor = DEFAULT_VALUES.BG_COLOR, fgColor = DEFAULT_VALUES.FG_COLOR }) => {
    const { direction, mousePosition } = useArrowCursorTracking();
    const arrowVariants = useArrowAnimationVariants(direction);

    return (
      <div className={CSS_CLASSES.CONTAINER}>
        <AnimatePresence>
          {direction && (
            <motion.div
              key={`${direction}-arrow`}
              style={{
                position: 'fixed',
                top: mousePosition.y + DEFAULT_VALUES.POSITION_OFFSET.Y,
                left: mousePosition.x + DEFAULT_VALUES.POSITION_OFFSET.X
              }}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={arrowVariants}
            >
              <div
                className={CSS_CLASSES.ARROW_INDICATOR}
                style={
                  {
                    '--bg-color': bgColor
                  } as React.CSSProperties
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={CSS_CLASSES.ARROW_ICON}
                  style={
                    {
                      '--fg-color': fgColor
                    } as React.CSSProperties
                  }
                >
                  <line x1="12" y1="19" x2="12" y2="5"></line>
                  <polyline points="5 12 12 5 19 12"></polyline>
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

ArrowCursor.displayName = 'ArrowCursor';

export default ArrowCursor;
