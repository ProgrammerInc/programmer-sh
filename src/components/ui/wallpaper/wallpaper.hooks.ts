'use client';

import { useEffect, useState } from 'react';
import { Wallpaper } from './wallpaper.types';
import { fetchAllWallpapers, fetchEnabledWallpapers } from '@/services/database/wallpaper.service';
import { logger } from '@/services/logger/logger.service';

/**
 * Default wallpaper to use when database fails to load
 */
const defaultWallpaper: Wallpaper = {
  id: 'default',
  name: 'Default',
  description: 'Default empty wallpaper',
  type: 'color',
  enabled: true,
  background: {
    id: 'default-background',
    type: 'color',
    colors: [
      {
        id: 'default-color',
        color: '#121212',
        type: 'hex'
      }
    ]
  }
};

/**
 * Hook to load wallpapers from the database
 * 
 * @param onlyEnabled - Whether to only load enabled wallpapers
 * @returns Object containing the wallpapers and loading state
 */
export const useWallpapers = (onlyEnabled = false) => {
  const [wallpapers, setWallpapers] = useState<Record<string, Wallpaper>>({ default: defaultWallpaper });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadWallpapers = async () => {
      try {
        setIsLoading(true);
        
        // Fetch wallpapers from database
        const dbWallpapers = onlyEnabled 
          ? await fetchEnabledWallpapers() 
          : await fetchAllWallpapers();
        
        // If no wallpapers found, ensure we have at least a default one
        if (Object.keys(dbWallpapers).length === 0) {
          logger.warn('No wallpapers found in database, using default fallback');
          setWallpapers({ default: defaultWallpaper });
        } else {
          // Update state with database wallpapers
          setWallpapers(dbWallpapers);
        }
        
        setError(null);
      } catch (err) {
        logger.error('Failed to load wallpapers from database:', err);
        setError(err instanceof Error ? err : new Error('Failed to load wallpapers'));
        
        // Use minimal default wallpaper as fallback
        setWallpapers({ default: defaultWallpaper });
      } finally {
        setIsLoading(false);
      }
    };

    loadWallpapers();
  }, [onlyEnabled]);

  return { wallpapers, isLoading, error };
};

/**
 * Hook to get the available wallpaper identifiers
 * 
 * @param wallpapers - The wallpaper record
 * @returns Array of wallpaper identifiers
 */
export const useWallpaperIdentifiers = (wallpapers: Record<string, Wallpaper>) => {
  const [identifiers, setIdentifiers] = useState<string[]>([]);

  useEffect(() => {
    if (wallpapers) {
      setIdentifiers(Object.keys(wallpapers));
    }
  }, [wallpapers]);

  return identifiers;
};
