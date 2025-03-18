'use client';

/**
 * Textarea Component
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
 * // With row limits and autogrow behavior
 * <Textarea minRows={3} maxRows={8} placeholder="Will grow between 3-8 rows" />
 * ```
 */

// Export textarea components
export * from './textarea';
export * from './textarea.types';

// For backwards compatibility
import { Textarea } from './textarea';
export default Textarea;
