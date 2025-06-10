/**
 * Progress Component
 *
 * A fully accessible progress indicator built with Radix UI primitives.
 * The Progress component visually displays the completion percentage of a task,
 * and is commonly used for loading states, form submissions, or any other process
 * that takes time to complete.
 *
 * Features:
 * - Accessible: Implements ARIA attributes for screen readers
 * - Customizable: Supports custom heights, widths, and colors
 * - Animated: Smooth transitions between progress states
 * - Reactive: Updates in real-time as the value changes
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Progress value={33} />
 * ```
 *
 * With custom height:
 * ```tsx
 * <Progress value={66} className="h-2" />
 * ```
 *
 * Custom size with accessibility label:
 * ```tsx
 * <Progress
 *   value={75}
 *   className="h-3 w-[60%]"
 *   aria-label="Download progress"
 * />
 * ```
 *
 * As a loading indicator:
 * ```tsx
 * const [progress, setProgress] = useState(0);
 *
 * useEffect(() => {
 *   const timer = setTimeout(() => {
 *     setProgress(progress >= 100 ? 0 : progress + 10);
 *   }, 500);
 *   return () => clearTimeout(timer);
 * }, [progress]);
 *
 * return <Progress value={progress} aria-label="Loading..." />;
 * ```
 */

// Export all components and types
export * from './progress';
export * from './progress.types';

// For backwards compatibility
import { Progress } from './progress';
export default Progress;
