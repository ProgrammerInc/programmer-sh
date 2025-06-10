/**
 * Supabase Utilities
 *
 * Provides shared Supabase client and utility functions for
 * interacting with the Supabase backend across the application.
 */

import { logger } from '@/services/logger';
import { createClient } from '@supabase/supabase-js';

// Environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Shared Supabase client instance for interacting with the database
 */
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/**
 * Handles common 'not found' scenarios with consistent error messages
 * @param error - Error object from Supabase
 * @param entityName - Name of the entity being queried (e.g., 'wallpaper', 'cursor')
 * @returns true if the error is a 'not found' error, false otherwise
 */
export function isNotFoundError(error: unknown, entityName: string): boolean {
  if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'PGRST116') {
    logger.info(`${entityName} not found`);
    return true;
  }
  return false;
}

/**
 * Logs database errors in a consistent format
 * @param operation - The operation that was attempted
 * @param error - The error that occurred
 */
export function logDbError(operation: string, error: unknown): void {
  if (error instanceof Error) {
    logger.error(`Error in ${operation}: ${error.message}`);
  } else if (typeof error === 'object' && error !== null) {
    logger.error(`Error in ${operation}:`, JSON.stringify(error));
  } else {
    logger.error(`Error in ${operation}: Unknown error`);
  }
}
