'use client';

import { ToasterProps as SonnerToasterProps } from 'sonner';

/**
 * Props for the Toaster component that wraps Sonner's Toaster
 * 
 * Extends all props from the original Sonner Toaster component.
 * See the Sonner documentation for all available props:
 * {@link https://sonner.emilkowal.ski/styling Sonner Styling Documentation}
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Toaster position="top-right" />
 * 
 * // With custom theme
 * <Toaster theme="light" />
 * 
 * // With rich colors
 * <Toaster richColors />
 * ```
 */
export type ToasterProps = SonnerToasterProps;
