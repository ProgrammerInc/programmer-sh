/**
 * Wallpaper Database Service
 *
 * Service for interacting with wallpaper data in the Supabase database
 */

import {
  AnimationType,
  ColorType,
  GradientType,
  ImageMimeType,
  ImageType,
  VideoMimeType,
  VideoSourceType,
  VideoType,
  Wallpaper,
  WallpaperAnimation,
  WallpaperBackground,
  WallpaperColor,
  WallpaperGradient,
  WallpaperImage,
  WallpaperType,
  WallpaperVideo
} from '@/components/ui/wallpaper/wallpaper.types';
import { logger } from '@/services/logger';
import { logDbError, supabase } from '@/utils/supabase.utils';

// Define database wallpaper record interface
interface DbWallpaper {
  id: string;
  identifier: string;
  name: string;
  description: string;
  enabled: boolean;
  type: string;
  background_id: string;
  created_at?: string;
  updated_at?: string;
  wallpaper_background?: DbBackground;
}

// Define database background record interface
interface DbBackground {
  id: string;
  identifier: string;
  type: string;
  animation_id: string | null;
  color_id: string | null;
  gradient_id: string | null;
  image_id: string | null;
  video_id: string | null;
  created_at?: string;
  updated_at?: string;
  wallpaper_animation?: DbAnimation;
  wallpaper_color?: DbColor;
  wallpaper_gradient?: DbGradient;
  wallpaper_image?: DbImage;
  wallpaper_video?: DbVideo;
}

// Define database animation record interface
interface DbAnimation {
  id: string;
  identifier: string;
  type: string;
  url: string | null;
  animation_props: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
}

// Define database color record interface
interface DbColor {
  id: string;
  identifier: string;
  color: string;
  type: string;
  created_at?: string;
  updated_at?: string;
}

// Define database gradient record interface
interface DbGradient {
  id: string;
  identifier: string;
  type: string;
  gradient: string;
  created_at?: string;
  updated_at?: string;
}

// Define database image record interface
interface DbImage {
  id: string;
  identifier: string;
  url: string;
  type: string;
  mime_type: string;
  created_at?: string;
  updated_at?: string;
}

// Define database video record interface
interface DbVideo {
  id: string;
  identifier: string;
  url: string;
  type: string;
  mime_type: string;
  poster: string | null;
  source_type: string | null;
  created_at?: string;
  updated_at?: string;
}

// Cache management for wallpaper data
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

interface WallpaperCache {
  allWallpapers: CacheItem<Record<string, Wallpaper>> | null;
  enabledWallpapers: CacheItem<Record<string, Wallpaper>> | null;
  wallpapersByIdentifier: Record<string, CacheItem<Wallpaper>>;
}

// Initialize cache
const cache: WallpaperCache = {
  allWallpapers: null,
  enabledWallpapers: null,
  wallpapersByIdentifier: {}
};

// Cache expiration time in milliseconds (5 minutes)
const CACHE_EXPIRATION = 5 * 60 * 1000;

/**
 * Check if a cache item is still valid
 */
const isCacheValid = <T>(cacheItem: CacheItem<T> | null): boolean => {
  if (!cacheItem) return false;
  return Date.now() - cacheItem.timestamp < CACHE_EXPIRATION;
};

/**
 * Maps a database animation to the application Animation type
 */
const mapDbAnimationToAnimation = (dbAnimation: DbAnimation): WallpaperAnimation => ({
  id: dbAnimation.identifier,
  type: dbAnimation.type as AnimationType,
  url: dbAnimation.url || undefined,
  animationProps: (dbAnimation.animation_props as Record<string, unknown>) || {}
});

/**
 * Maps a database color to the application Color type
 */
const mapDbColorToColor = (dbColor: DbColor): WallpaperColor => ({
  id: dbColor.identifier,
  color: dbColor.color,
  type: (dbColor.type as ColorType) || 'hex'
});

/**
 * Maps a database gradient to the application Gradient type
 */
const mapDbGradientToGradient = (dbGradient: DbGradient): WallpaperGradient => ({
  id: dbGradient.identifier,
  type: dbGradient.type as GradientType,
  gradient: dbGradient.gradient
});

/**
 * Maps a database image to the application Image type
 */
const mapDbImageToImage = (dbImage: DbImage): WallpaperImage => ({
  id: dbImage.identifier,
  url: dbImage.url,
  type: dbImage.type as ImageType,
  mimeType: dbImage.mime_type as ImageMimeType
});

/**
 * Maps a database video to the application Video type
 */
const mapDbVideoToVideo = (dbVideo: DbVideo): WallpaperVideo => {
  const video: WallpaperVideo = {
    id: dbVideo.identifier,
    url: dbVideo.url,
    type: dbVideo.type as VideoType,
    mimeType: dbVideo.mime_type as VideoMimeType
  };

  let remoteSourceUrl: string | undefined;

  if (dbVideo.poster) {
    // Store poster URL in remoteSourceUrl for later use
    remoteSourceUrl = dbVideo.poster;
  }

  if (dbVideo.source_type) {
    video.sourceType = dbVideo.source_type as VideoSourceType;

    // If this is a remote video source, add it as a string
    if (video.sourceType === 'remote') {
      // Parse URL to identify video information
      try {
        const url = new URL(dbVideo.url);
        if (url.hostname.includes('youtube') || url.hostname.includes('youtu.be')) {
          // For YouTube videos, store the poster or generate from YouTube
          if (remoteSourceUrl) {
            video.source = remoteSourceUrl;
          } else {
            // Try to extract video ID for YouTube thumbnail
            const videoId = url.searchParams.get('v') || url.pathname.split('/').pop() || '';
            if (videoId) {
              // Use YouTube thumbnail as the source
              video.source = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }
          }
        } else if (url.hostname.includes('vimeo')) {
          // For Vimeo videos, store the poster
          if (remoteSourceUrl) {
            video.source = remoteSourceUrl;
          }
        } else if (remoteSourceUrl) {
          // For other video types, just use the poster if available
          video.source = remoteSourceUrl;
        }
      } catch (error) {
        logger.error('Error parsing remote video URL:', error);

        // Use the poster as a fallback if there was an error parsing the URL
        if (remoteSourceUrl) {
          video.source = remoteSourceUrl;
        }
      }
    }
  }

  return video;
};

/**
 * Maps a database background to the application Background type
 */
const mapDbBackgroundToBackground = (dbBackground: DbBackground): WallpaperBackground => {
  const background: WallpaperBackground = {
    id: dbBackground.identifier,
    type: dbBackground.type as WallpaperType
  };

  // Set animation if available
  if (dbBackground.wallpaper_animation) {
    background.animation = mapDbAnimationToAnimation(dbBackground.wallpaper_animation);
  }

  // Set color if available
  if (dbBackground.wallpaper_color) {
    const colorObj = mapDbColorToColor(dbBackground.wallpaper_color);
    background.colors = [colorObj];
  }

  // Set gradient if available
  if (dbBackground.wallpaper_gradient) {
    background.gradient = mapDbGradientToGradient(dbBackground.wallpaper_gradient);
  }

  // Set image if available
  if (dbBackground.wallpaper_image) {
    background.image = mapDbImageToImage(dbBackground.wallpaper_image);
  }

  // Set video if available
  if (dbBackground.wallpaper_video) {
    background.video = mapDbVideoToVideo(dbBackground.wallpaper_video);
  }

  return background;
};

/**
 * Maps a database wallpaper to the application Wallpaper type
 */
const mapDbWallpaperToWallpaper = (dbWallpaper: DbWallpaper): Wallpaper => {
  try {
    if (!dbWallpaper.wallpaper_background) {
      throw new Error(`Wallpaper background data not found for ${dbWallpaper.identifier}`);
    }

    return {
      id: dbWallpaper.identifier,
      name: dbWallpaper.name,
      description: dbWallpaper.description,
      enabled: dbWallpaper.enabled,
      type: dbWallpaper.type as WallpaperType,
      background: mapDbBackgroundToBackground(dbWallpaper.wallpaper_background)
    };
  } catch (error) {
    throw new Error(`Error mapping wallpaper: ${(error as Error).message}`);
  }
};

/**
 * The query to select all related wallpaper data
 */
const WALLPAPER_QUERY = `
  *,
  wallpaper_background:background_id(
    *,
    wallpaper_animation:animation_id(*),
    wallpaper_color:color_id(*),
    wallpaper_gradient:gradient_id(*),
    wallpaper_image:image_id(*),
    wallpaper_video:video_id(*)
  )
`;

/**
 * Fetch all wallpapers from the database
 */
export const fetchAllWallpapers = async (): Promise<Record<string, Wallpaper>> => {
  try {
    // Check if we have valid cached data
    if (isCacheValid(cache.allWallpapers)) {
      logger.debug('Using cached wallpapers');
      return cache.allWallpapers!.data;
    }

    // No valid cache, fetch from database with all related data in a single query
    logger.debug('Fetching all wallpapers from database');
    const { data, error } = await supabase.from('wallpapers').select(WALLPAPER_QUERY);

    if (error) {
      logDbError('fetchAllWallpapers', error);
      throw new Error(`Error fetching wallpapers: ${error.message}`);
    }

    if (!data || data.length === 0) {
      logger.warn('No wallpapers found in database');
      return {};
    }

    // Map database wallpapers to application wallpapers
    const wallpapers: Record<string, Wallpaper> = {};
    for (const wallpaper of data as DbWallpaper[]) {
      try {
        wallpapers[wallpaper.identifier] = mapDbWallpaperToWallpaper(wallpaper);
      } catch (error) {
        logger.error(`Error mapping wallpaper ${wallpaper.identifier}:`, error);
      }
    }

    // Update cache
    cache.allWallpapers = {
      data: wallpapers,
      timestamp: Date.now()
    };

    return wallpapers;
  } catch (error) {
    logger.error('Error fetching wallpapers:', error);
    throw error;
  }
};

/**
 * Fetch only enabled wallpapers from the database
 */
export const fetchEnabledWallpapers = async (): Promise<Record<string, Wallpaper>> => {
  try {
    // Check if we have valid cached data
    if (isCacheValid(cache.enabledWallpapers)) {
      logger.debug('Using cached enabled wallpapers');
      return cache.enabledWallpapers!.data;
    }

    // No valid cache, fetch from database with all related data in a single query
    logger.debug('Fetching enabled wallpapers from database');
    const { data, error } = await supabase
      .from('wallpapers')
      .select(WALLPAPER_QUERY)
      .eq('enabled', true);

    if (error) {
      logDbError('fetchEnabledWallpapers', error);
      throw new Error(`Error fetching enabled wallpapers: ${error.message}`);
    }

    if (!data || data.length === 0) {
      logger.warn('No enabled wallpapers found in database');
      return {};
    }

    // Map database wallpapers to application wallpapers
    const wallpapers: Record<string, Wallpaper> = {};
    for (const wallpaper of data as DbWallpaper[]) {
      try {
        wallpapers[wallpaper.identifier] = mapDbWallpaperToWallpaper(wallpaper);
      } catch (error) {
        logger.error(`Error mapping wallpaper ${wallpaper.identifier}:`, error);
      }
    }

    // Update cache
    cache.enabledWallpapers = {
      data: wallpapers,
      timestamp: Date.now()
    };

    return wallpapers;
  } catch (error) {
    logger.error('Error fetching enabled wallpapers:', error);
    throw error;
  }
};

/**
 * Fetch a specific wallpaper by identifier
 */
export const fetchWallpaperByIdentifier = async (identifier: string): Promise<Wallpaper | null> => {
  try {
    // Check cache for this specific wallpaper
    if (identifier && isCacheValid(cache.wallpapersByIdentifier[identifier])) {
      logger.debug(`Using cached wallpaper: ${identifier}`);
      return cache.wallpapersByIdentifier[identifier].data;
    }

    // Check if we have it in the all wallpapers cache already
    if (isCacheValid(cache.allWallpapers) && cache.allWallpapers!.data[identifier]) {
      logger.debug(`Found wallpaper ${identifier} in all wallpapers cache`);
      // Store in individual cache too for future requests
      cache.wallpapersByIdentifier[identifier] = {
        data: cache.allWallpapers!.data[identifier],
        timestamp: Date.now()
      };
      return cache.allWallpapers!.data[identifier];
    }

    // Neither cache is valid, fetch from database with all related data in a single query
    logger.debug(`Fetching wallpaper ${identifier} from database`);
    const { data, error } = await supabase
      .from('wallpapers')
      .select(WALLPAPER_QUERY)
      .eq('identifier', identifier)
      .single();

    if (error) {
      logDbError(`fetchWallpaperByIdentifier`, error);
      return null;
    }

    if (!data) {
      logger.warn(`Wallpaper ${identifier} not found`);
      return null;
    }

    // Map database wallpaper to application wallpaper
    try {
      const wallpaper = mapDbWallpaperToWallpaper(data as DbWallpaper);

      // Update cache
      cache.wallpapersByIdentifier[identifier] = {
        data: wallpaper,
        timestamp: Date.now()
      };

      return wallpaper;
    } catch (error) {
      logger.error(`Error mapping wallpaper ${identifier}:`, error);
      return null;
    }
  } catch (error) {
    logger.error(`Error fetching wallpaper ${identifier}:`, error);
    return null;
  }
};

/**
 * Clear all wallpaper caches
 */
export const clearWallpaperCache = (): void => {
  cache.allWallpapers = null;
  cache.enabledWallpapers = null;
  cache.wallpapersByIdentifier = {};
  logger.debug('Wallpaper cache cleared');
};

/**
 * Clear cache for a specific wallpaper
 */
export const clearWallpaperCacheByIdentifier = (identifier: string): void => {
  delete cache.wallpapersByIdentifier[identifier];
  // Also invalidate the collection caches since they might contain this wallpaper
  cache.allWallpapers = null;
  cache.enabledWallpapers = null;
  logger.debug(`Cache cleared for wallpaper: ${identifier}`);
};

export default {
  fetchAllWallpapers,
  fetchEnabledWallpapers,
  fetchWallpaperByIdentifier,
  clearWallpaperCache,
  clearWallpaperCacheByIdentifier
};
