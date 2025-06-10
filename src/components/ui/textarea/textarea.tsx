'use client';

import { cn } from '@/utils/app.utils';
import * as React from 'react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import styles from './textarea.module.css';
import { TextareaProps } from './textarea.types';

/**
 * Textarea component
 *
 * A customizable multi-line text input component with support for different sizes,
 * status states, and resize behaviors.
 *
 * Features:
 * - Multiple size variants (small, medium, large)
 * - Status indicators (default, error, success)
 * - Customizable resize behavior
 * - Auto-growing height based on content
 * - Minimum and maximum row limits
 * - Full accessibility support
 * - Customizable styles through CSS modules
 *
 * @example
 * ```tsx
 * // Basic usage
 * <Textarea placeholder="Type your message here" />
 *
 * // Different sizes
 * <Textarea size="sm" placeholder="Small textarea" />
 * <Textarea size="md" placeholder="Medium textarea" />
 * <Textarea size="lg" placeholder="Large textarea" />
 *
 * // Status variants
 * <Textarea status="error" placeholder="Error state" />
 * <Textarea status="success" placeholder="Success state" />
 *
 * // Resize options
 * <Textarea resize="none" placeholder="Cannot be resized" />
 * <Textarea resize="vertical" placeholder="Can be resized vertically" />
 * <Textarea resize="horizontal" placeholder="Can be resized horizontally" />
 * <Textarea resize="both" placeholder="Can be resized in both directions" />
 *
 * // With row limits
 * <Textarea minRows={3} maxRows={8} placeholder="Will grow between 3-8 rows" />
 * ```
 */
const Textarea = memo(
  React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
      {
        className,
        size = 'md',
        status = 'default',
        resize = 'vertical',
        minRows,
        maxRows,
        onChange,
        value,
        defaultValue,
        ...props
      },
      ref
    ) => {
      const innerRef = useRef<HTMLTextAreaElement>(null);
      const isControlled = value !== undefined;
      const [innerValue, setInnerValue] = useState(defaultValue || '');

      // Auto-resize height based on content
      const adjustHeight = useCallback(
        (textarea: HTMLTextAreaElement) => {
          if (!minRows && !maxRows) return;

          textarea.style.height = 'auto';

          const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10) || 20;
          const paddingTop = parseInt(getComputedStyle(textarea).paddingTop, 10) || 8;
          const paddingBottom = parseInt(getComputedStyle(textarea).paddingBottom, 10) || 8;

          const minHeight = minRows ? lineHeight * minRows + paddingTop + paddingBottom : 0;
          const maxHeight = maxRows ? lineHeight * maxRows + paddingTop + paddingBottom : Infinity;

          const scrollHeight = textarea.scrollHeight;
          const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);

          textarea.style.height = `${newHeight}px`;
        },
        [minRows, maxRows]
      );

      // Get the current value for useEffect dependency
      const currentValue = isControlled ? value : innerValue;

      // Handle resize on content change
      useEffect(() => {
        const textarea = innerRef.current;
        if (textarea) {
          adjustHeight(textarea);
        }
      }, [currentValue, adjustHeight]);

      // Handle onChange events
      const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isControlled) {
          setInnerValue(e.target.value);
        }

        if (onChange) {
          onChange(e);
        }

        if (innerRef.current) {
          adjustHeight(innerRef.current);
        }
      };

      // Combine all className values
      const textareaClassNames = cn(
        styles.textarea,
        styles[`textarea-${size}`],
        status !== 'default' && styles[`textarea-${status}`],
        styles[`textarea-resize-${resize}`],
        className
      );

      // Handle aria attributes based on status
      const ariaAttributes = {};
      if (status === 'error') {
        ariaAttributes['aria-invalid'] = true;
      }

      return (
        <textarea
          className={textareaClassNames}
          ref={innerRef}
          value={isControlled ? value : innerValue}
          onChange={handleChange}
          {...ariaAttributes}
          {...props}
        />
      );
    }
  )
);

Textarea.displayName = 'Textarea';

export { Textarea };
export default Textarea;
