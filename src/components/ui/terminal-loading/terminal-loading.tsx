'use client';

import React from 'react';
import styles from './terminal-loading.module.css';
import { Loader2 } from 'lucide-react';

export interface TerminalLoadingProps {
  message?: string;
  variant?: 'dots' | 'spinner';
}

/**
 * TerminalLoading Component
 * 
 * Displays an animated loading indicator for the terminal when running
 * asynchronous commands like database operations.
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <TerminalLoading />
 * 
 * // With custom message
 * <TerminalLoading message="Fetching data from database..." />
 * 
 * // With spinner variant
 * <TerminalLoading variant="spinner" />
 * ```
 */
export const TerminalLoading: React.FC<TerminalLoadingProps> = ({ 
  message = 'Processing command', 
  variant = 'dots' 
}) => {
  return (
    <div className={styles['loader-container']}>
      {variant === 'dots' ? (
        <>
          <span className={styles.message}>{message}</span>
          <div className={styles.loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </>
      ) : (
        <>
          <Loader2 className={styles.spinner} />
          <span className={styles.message}>{message}</span>
        </>
      )}
    </div>
  );
};

export default TerminalLoading;
