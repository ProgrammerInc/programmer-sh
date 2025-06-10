/**
 * Rolling Gallery Component
 *
 * A 3D rotating image carousel built with Framer Motion.
 * Provides an immersive way to showcase multiple images in a cylindrical gallery.
 *
 * Features:
 * - Interactive 3D rotating carousel
 * - Drag to rotate manually with momentum
 * - Optional autoplay with configurable behavior
 * - Responsive design that adapts to screen size
 * - Hover interactions and visual effects
 * - Smooth animations and transitions
 *
 * @example Basic usage
 * ```tsx
 * import { RollingGallery } from '@/components/ui/rolling-gallery';
 *
 * export function GalleryExample() {
 *   return <RollingGallery />;
 * }
 * ```
 *
 * @example With custom images and autoplay
 * ```tsx
 * import { RollingGallery } from '@/components/ui/rolling-gallery';
 *
 * export function CustomGallery() {
 *   const images = [
 *     '/images/photo1.jpg',
 *     '/images/photo2.jpg',
 *     '/images/photo3.jpg',
 *     '/images/photo4.jpg',
 *     '/images/photo5.jpg',
 *   ];
 *
 *   return (
 *     <RollingGallery
 *       images={images}
 *       autoplay
 *       pauseOnHover
 *     />
 *   );
 * }
 * ```
 *
 * @example With custom styling
 * ```tsx
 * import { RollingGallery } from '@/components/ui/rolling-gallery';
 *
 * export function StyledGallery() {
 *   return (
 *     <div className="p-8 bg-gray-900">
 *       <h2 className="text-2xl font-bold mb-4 text-white">Featured Work</h2>
 *       <RollingGallery
 *         autoplay
 *         className="h-[400px] rounded-lg overflow-hidden"
 *       />
 *     </div>
 *   );
 * }
 * ```
 */

export * from './rolling-gallery';
export * from './rolling-gallery.types';

// For backwards compatibility
import { RollingGallery } from './rolling-gallery';
export default RollingGallery;
