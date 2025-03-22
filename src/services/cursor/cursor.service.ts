/**
 * Cursor Service
 * 
 * Provides functionality to fetch cursor data from the database
 */

import { supabase } from '@/integrations/supabase/supabase.client';
import { Cursor } from '@/components/ui/cursor/cursor.types';
import { logger } from '@/services/logger/logger.service';

/**
 * Type definition for cursor animation data from the database
 */
interface CursorAnimationData {
  id: string;
  identifier: string;
  name: string | null;
  description: string | null;
  animation_type: string;
  props: Record<string, unknown> | null;
}

/**
 * Type definition for cursor data from the database
 */
interface CursorData {
  id: string;
  identifier: string;
  name: string;
  description: string | null;
  type: string;
  animation_id: string | null;
  enabled: boolean | null;
  style: Record<string, unknown> | null;
  animation?: CursorAnimationData;
}

/**
 * Cache for cursor presets
 */
let cachedCursorPresets: Record<string, Cursor> | null = null;

/**
 * Default cursor for fallback if no presets are available
 */
const defaultCursor: Cursor = {
  id: 'default',
  name: 'Default',
  description: 'Default cursor',
  type: 'default'
};

/**
 * Convert database cursor data to the Cursor interface format
 */
const mapDatabaseCursorToCursor = (cursorData: CursorData): Cursor => {
  const cursor: Cursor = {
    id: cursorData.identifier,
    name: cursorData.name,
    description: cursorData.description || '',
    type: cursorData.type as 'default' | 'cursor' | 'image' | 'animation',
  };

  // Add theme if in style object
  if (cursorData.style?.theme) {
    cursor.theme = cursorData.style.theme as 'light' | 'dark';
  }

  // Add URL for image type cursors
  if (cursorData.type === 'image' && cursorData.style?.url) {
    cursor.url = cursorData.style.url as string;
  }

  // Add animation properties for animation type cursors
  if (cursorData.type === 'animation' && cursorData.animation) {
    cursor.animation = cursorData.animation.identifier;
    cursor.animationType = cursorData.animation.animation_type;
    
    // Add animation props if available
    if (cursorData.animation.props) {
      cursor.animationProps = cursorData.animation.props;
    }
  }

  return cursor;
};

/**
 * Fetch cursor presets from the database
 */
export const fetchCursorPresets = async (): Promise<Record<string, Cursor>> => {
  try {
    // Return cached presets if available
    if (cachedCursorPresets) {
      return cachedCursorPresets;
    }

    // Fetch all cursor data with animation relationships
    const { data: cursorsData, error } = await supabase
      .from('cursors')
      .select(`
        id,
        identifier,
        name,
        description,
        type,
        animation_id,
        enabled,
        style,
        animation:cursor_animations(*)
      `)
      .eq('enabled', true);

    if (error) {
      logger.error('Error fetching cursor presets:', error);
      return { default: defaultCursor };
    }

    // Convert to Record<string, Cursor> format
    const presets: Record<string, Cursor> = {};
    
    cursorsData.forEach((cursorData) => {
      const cursor = mapDatabaseCursorToCursor(cursorData as CursorData);
      presets[cursor.id] = cursor;
    });

    // If no cursors were found, add a default cursor
    if (Object.keys(presets).length === 0) {
      presets.default = defaultCursor;
    }

    // Cache the presets
    cachedCursorPresets = presets;
    
    return presets;
  } catch (error) {
    logger.error('Error fetching cursor presets:', error);
    return { default: defaultCursor };
  }
};

/**
 * Clear the cursor presets cache
 */
export const clearCursorPresetsCache = (): void => {
  cachedCursorPresets = null;
};

/**
 * Get a specific cursor preset by ID
 */
export const getCursorPreset = async (id: string): Promise<Cursor> => {
  const presets = await fetchCursorPresets();
  return presets[id] || presets.default || defaultCursor;
};

export default {
  fetchCursorPresets,
  clearCursorPresetsCache,
  getCursorPreset
};
