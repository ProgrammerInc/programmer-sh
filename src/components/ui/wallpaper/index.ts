'use client';

/**
 * Wallpaper Component
 *
 * A versatile UI component that provides customizable background wallpapers for your application.
 * Supports multiple background types including animations, images, videos, gradients, and colors.
 *
 * Features:
 * - Dynamic animated backgrounds
 * - Multiple background type support (animations, videos, images, gradients, colors)
 * - Lazy-loaded animations to improve performance
 * - Theme-aware backgrounds (light/dark mode support)
 * - Randomized background selection
 * - Interactive backgrounds that respond to user input
 * - Full-screen and contained display modes
 * - CSS module styling
 *
 * Exports:
 * - WallpaperProvider: The main component for rendering wallpapers (default export)
 * - All named exports from the component and types files
 */

import WallpaperProvider from './wallpaper';

export * from './wallpaper';
export * from './wallpaper.types';

export default WallpaperProvider;
