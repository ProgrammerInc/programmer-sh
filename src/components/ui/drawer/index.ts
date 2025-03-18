/**
 * Drawer Component Module
 * 
 * Provides a sliding panel that appears from the edge of the screen.
 * Based on the Vaul drawer component library.
 * 
 * @see https://vaul.emilkowal.ski/ for the original Vaul documentation
 */

// Named exports for all drawer components and types
export * from './drawer';
export * from './drawer.types';

// Default export for backward compatibility
import { Drawer } from './drawer';
export default Drawer;
