'use client';

import { useEffect, useState } from 'react';
import { Wallpaper } from './wallpaper.types';
import wallpaperPresets from '@/presets/wallpaper.presets';
import { fetchAllWallpapers, fetchEnabledWallpapers } from '@/services/database/wallpaper.service';

/**
 * Hook to load wallpapers from the database with fallback to presets
 * 
 * @param onlyEnabled - Whether to only load enabled wallpapers
 * @returns Object containing the wallpapers and loading state
 */
export const useWallpapers = (onlyEnabled = false) => {
  const [wallpapers, setWallpapers] = useState<Record<string, Wallpaper>>(wallpaperPresets);
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
        
        // Update state with database wallpapers
        setWallpapers(dbWallpapers);
        setError(null);
      } catch (err) {
        console.error('Failed to load wallpapers from database:', err);
        setError(err instanceof Error ? err : new Error('Failed to load wallpapers'));
        
        // Fallback to presets if database fetch fails
        setWallpapers(onlyEnabled 
          ? Object.fromEntries(Object.entries(wallpaperPresets).filter(([_, w]) => w.enabled))
          : wallpaperPresets
        );
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
