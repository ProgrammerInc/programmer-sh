/**
 * Flowing Menu Component Module
 * 
 * A navigation menu with flowing animations when items are hovered.
 * Each menu item reveals a marquee animation with text and images.
 */

// Named exports for components and types
export * from './flowing-menu';
export * from './flowing-menu.types';

// Default export for backward compatibility
import { FlowingMenu } from './flowing-menu';
export default FlowingMenu;
