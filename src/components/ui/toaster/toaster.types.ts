'use client';

import React from 'react';

/**
 * Props for the Toaster component
 *
 * @interface ToasterProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 */
export interface ToasterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Optional className for custom styling
   */
  className?: string;
}
