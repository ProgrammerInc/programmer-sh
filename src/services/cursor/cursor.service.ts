/**
 * Cursor Service
 *
 * Handles retrieval and management of cursor data from the database
 * with optimized query performance.
 */

import { CursorType, Cursor } from '@/components/ui/cursor/cursor.types';
import { supabase, isNotFoundError, logDbError } from '@/utils/supabase.utils';
import { logger } from '@/services/logger';

// Define database cursor interface
interface DbCursor {
  id: number;
  identifier: string;
  name: string;
  description: string | null;
  type: string;
  theme: string | null;
  animation: string | null;
  animation_type: string | null;
  url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Maps a database cursor to the application Cursor type
 */
const mapDbCursorToCursor = (dbCursor: DbCursor): Cursor => {
  const cursor: Cursor = {
    id: dbCursor.identifier,
    name: dbCursor.name,
    description: dbCursor.description || '',
    type: dbCursor.type as CursorType
  };

  // Add optional properties if they exist in the database record
  if (dbCursor.theme) {
    cursor.theme = dbCursor.theme as 'light' | 'dark';
  }

  if (dbCursor.animation) {
    cursor.animation = dbCursor.animation;
  }

  if (dbCursor.animation_type) {
    cursor.animationType = dbCursor.animation_type;
  }

  if (dbCursor.url) {
    cursor.url = dbCursor.url;
  }

  return cursor;
};

// In-memory cache for cursors
let cursorsCache: Cursor[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Retrieves all cursors from the database with optimized query performance
 */
export const getAllCursors = async (): Promise<Cursor[]> => {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (cursorsCache && (now - lastFetchTime < CACHE_TTL)) {
      return cursorsCache;
    }

    const { data: cursors, error } = await supabase
      .from('cursors')
      .select('*')
      .order('name');

    if (error) {
      logDbError('getAllCursors', error);
      return [];
    }

    // Map database cursors to application cursors
    const mappedCursors = (cursors as DbCursor[]).map(mapDbCursorToCursor);
    
    // Update cache
    cursorsCache = mappedCursors;
    lastFetchTime = now;

    return mappedCursors;
  } catch (error) {
    logger.error('Error in getAllCursors:', error);
    return [];
  }
};

/**
 * Retrieves a cursor by its identifier with optimized query performance
 */
export const getCursorById = async (id: string): Promise<Cursor | null> => {
  try {
    // Try to find the cursor in the cache first
    if (cursorsCache) {
      const cachedCursor = cursorsCache.find(cursor => cursor.id === id);
      if (cachedCursor) {
        return cachedCursor;
      }
    }

    const { data, error } = await supabase
      .from('cursors')
      .select('*')
      .eq('identifier', id)
      .single();

    if (error) {
      if (isNotFoundError(error, 'Cursor')) {
        return null;
      }
      logDbError('getCursorById', error);
      return null;
    }

    return mapDbCursorToCursor(data as DbCursor);
  } catch (error) {
    logger.error('Error in getCursorById:', error);
    return null;
  }
};

/**
 * Retrieves a cursor by its name with optimized query performance
 */
export const getCursorByName = async (name: string): Promise<Cursor | null> => {
  try {
    // Try to find the cursor in the cache first
    if (cursorsCache) {
      const cachedCursor = cursorsCache.find(cursor => cursor.name === name);
      if (cachedCursor) {
        return cachedCursor;
      }
    }

    const { data, error } = await supabase
      .from('cursors')
      .select('*')
      .eq('name', name)
      .single();

    if (error) {
      if (isNotFoundError(error, 'Cursor')) {
        return null;
      }
      logDbError('getCursorByName', error);
      return null;
    }

    return mapDbCursorToCursor(data as DbCursor);
  } catch (error) {
    logger.error('Error in getCursorByName:', error);
    return null;
  }
};

/**
 * Invalidates the cursors cache, forcing the next fetch to get fresh data
 */
export const invalidateCursorsCache = (): void => {
  cursorsCache = null;
  lastFetchTime = 0;
};