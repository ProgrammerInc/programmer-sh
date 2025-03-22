/**
 * Cursor Service
 *
 * Handles retrieval and management of cursor data from the database
 * with optimized query performance.
 */

import { createClient } from '@supabase/supabase-js';
import { CursorType, Cursor } from '@/components/ui/cursor/cursor.types';
import { logger } from '@/services/logger';

// Environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ypsbxadldkiokgvlfxag.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwc2J4YWRsZGtpb2tndmxmeGFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NTcyMDEsImV4cCI6MjA1NTMzMzIwMX0.s_LiIvqGbHBeN1HSXEKMBzGV6se9ezvjyH_KtLi5lYk';

// Create a single Supabase client for interacting with the database
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
  poster: string | null;
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

    // Fetch cursors from database with a single optimized query
    const { data: cursors, error } = await supabase
      .from('cursors')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Error fetching cursors: ${error.message}`);
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

    // Fetch cursor from database
    const { data: cursor, error } = await supabase
      .from('cursors')
      .select('*')
      .eq('identifier', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        return null;
      }
      throw new Error(`Error fetching cursor: ${error.message}`);
    }

    return mapDbCursorToCursor(cursor as DbCursor);
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

    // Fetch cursor from database
    const { data: cursor, error } = await supabase
      .from('cursors')
      .select('*')
      .eq('name', name)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        return null;
      }
      throw new Error(`Error fetching cursor: ${error.message}`);
    }

    return mapDbCursorToCursor(cursor as DbCursor);
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