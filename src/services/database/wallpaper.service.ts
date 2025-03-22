/**
 * Wallpaper Database Service
 * 
 * Service for interacting with wallpaper data in the Supabase database
 */

import { createClient } from '@supabase/supabase-js';
import { 
  Wallpaper, 
  WallpaperBackground, 
  WallpaperAnimation, 
  WallpaperColor, 
  WallpaperGradient, 
  WallpaperImage, 
  WallpaperVideo,
  AnimationType,
  GradientType,
  ImageType,
  ImageMimeType,
  VideoSourceType,
  VideoMimeType,
  WallpaperType,
  ColorType,
  RemoteVideoSource
} from '@/components/ui/wallpaper/wallpaper.types';

// Create a singleton instance of the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Interface for database wallpaper records
 */
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
}

/**
 * Interface for database background records
 */
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
}

/**
 * Interface for database animation records
 */
interface DbAnimation {
  id: string;
  identifier: string;
  type: string;
  url: string | null;
  animation_props: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface for database color records
 */
interface DbColor {
  id: string;
  identifier: string;
  color: string;
  type: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface for database gradient records
 */
interface DbGradient {
  id: string;
  identifier: string;
  type: string;
  gradient: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface for database image records
 */
interface DbImage {
  id: string;
  identifier: string;
  url: string;
  type: string;
  mime_type: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Interface for database video records
 */
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

/**
 * Maps a database animation to the application Animation type
 */
const mapDbAnimationToAnimation = (dbAnimation: DbAnimation): WallpaperAnimation => ({
  id: dbAnimation.identifier,
  type: dbAnimation.type as AnimationType,
  url: dbAnimation.url || undefined,
  animationProps: dbAnimation.animation_props as Record<string, unknown> || {}
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
  // Create base video object with required properties
  const video: WallpaperVideo = {
    id: dbVideo.identifier,
    url: dbVideo.url,
    type: dbVideo.type as 'mp4',
    mimeType: dbVideo.mime_type as VideoMimeType
  };
  
  // Add optional properties if they exist in the DB record
  if (dbVideo.source_type) {
    video.sourceType = dbVideo.source_type as VideoSourceType;
  }
  
  // Handle poster URL as source property if present
  if (dbVideo.poster) {
    video.source = dbVideo.poster as RemoteVideoSource;
  }
  
  return video;
};

/**
 * Maps a database background to the application Background type
 */
const mapDbBackgroundToBackground = async (dbBackground: DbBackground): Promise<WallpaperBackground> => {
  const background: WallpaperBackground = {
    id: dbBackground.identifier,
    type: dbBackground.type as WallpaperType
  };

  // Get animation if available
  if (dbBackground.animation_id) {
    const { data: animationData, error: animationError } = await supabase
      .from('animations')
      .select('*')
      .eq('id', dbBackground.animation_id)
      .single();

    if (!animationError && animationData) {
      background.animation = mapDbAnimationToAnimation(animationData as DbAnimation);
    }
  }

  // Get color if available
  if (dbBackground.color_id) {
    const { data: colorData, error: colorError } = await supabase
      .from('colors')
      .select('*')
      .eq('id', dbBackground.color_id)
      .single();

    if (!colorError && colorData) {
      const color = mapDbColorToColor(colorData as DbColor);
      background.colors = [color];
    }
  }

  // Get gradient if available
  if (dbBackground.gradient_id) {
    const { data: gradientData, error: gradientError } = await supabase
      .from('gradients')
      .select('*')
      .eq('id', dbBackground.gradient_id)
      .single();

    if (!gradientError && gradientData) {
      background.gradient = mapDbGradientToGradient(gradientData as DbGradient);
    }
  }

  // Get image if available
  if (dbBackground.image_id) {
    const { data: imageData, error: imageError } = await supabase
      .from('images')
      .select('*')
      .eq('id', dbBackground.image_id)
      .single();

    if (!imageError && imageData) {
      background.image = mapDbImageToImage(imageData as DbImage);
    }
  }

  // Get video if available
  if (dbBackground.video_id) {
    const { data: videoData, error: videoError } = await supabase
      .from('videos')
      .select('*')
      .eq('id', dbBackground.video_id)
      .single();

    if (!videoError && videoData) {
      background.video = mapDbVideoToVideo(videoData as DbVideo);
    }
  }

  return background;
};

/**
 * Maps a database wallpaper to the application Wallpaper type
 */
const mapDbWallpaperToWallpaper = async (dbWallpaper: DbWallpaper): Promise<Wallpaper> => {
  // Get the background
  const { data: backgroundData, error: backgroundError } = await supabase
    .from('backgrounds')
    .select('*')
    .eq('id', dbWallpaper.background_id)
    .single();

  if (backgroundError || !backgroundData) {
    throw new Error(`Failed to fetch background for wallpaper ${dbWallpaper.identifier}: ${backgroundError?.message}`);
  }

  const background = await mapDbBackgroundToBackground(backgroundData as DbBackground);

  return {
    id: dbWallpaper.identifier,
    name: dbWallpaper.name,
    description: dbWallpaper.description,
    enabled: dbWallpaper.enabled,
    type: dbWallpaper.type as WallpaperType,
    background
  };
};

/**
 * Fetch all wallpapers from the database
 */
export const fetchAllWallpapers = async (): Promise<Record<string, Wallpaper>> => {
  // Get all wallpapers
  const { data: wallpaperData, error: wallpaperError } = await supabase
    .from('wallpapers')
    .select('*');

  if (wallpaperError) {
    throw new Error(`Failed to fetch wallpapers: ${wallpaperError.message}`);
  }

  // Map each wallpaper to the application Wallpaper type
  const wallpapers: Record<string, Wallpaper> = {};

  // Use Promise.all to fetch all wallpapers in parallel
  await Promise.all(
    (wallpaperData as DbWallpaper[]).map(async (dbWallpaper) => {
      try {
        const wallpaper = await mapDbWallpaperToWallpaper(dbWallpaper);
        wallpapers[wallpaper.id] = wallpaper;
      } catch (error) {
        console.error(`Error mapping wallpaper ${dbWallpaper.identifier}:`, error);
      }
    })
  );

  return wallpapers;
};

/**
 * Fetch only enabled wallpapers from the database
 */
export const fetchEnabledWallpapers = async (): Promise<Record<string, Wallpaper>> => {
  // Get only enabled wallpapers
  const { data: wallpaperData, error: wallpaperError } = await supabase
    .from('wallpapers')
    .select('*')
    .eq('enabled', true);

  if (wallpaperError) {
    throw new Error(`Failed to fetch enabled wallpapers: ${wallpaperError.message}`);
  }

  // Map each wallpaper to the application Wallpaper type
  const wallpapers: Record<string, Wallpaper> = {};

  // Use Promise.all to fetch all wallpapers in parallel
  await Promise.all(
    (wallpaperData as DbWallpaper[]).map(async (dbWallpaper) => {
      try {
        const wallpaper = await mapDbWallpaperToWallpaper(dbWallpaper);
        wallpapers[wallpaper.id] = wallpaper;
      } catch (error) {
        console.error(`Error mapping wallpaper ${dbWallpaper.identifier}:`, error);
      }
    })
  );

  return wallpapers;
};

/**
 * Fetch a specific wallpaper by identifier
 */
export const fetchWallpaperByIdentifier = async (identifier: string): Promise<Wallpaper | null> => {
  // Get the wallpaper by identifier
  const { data: wallpaperData, error: wallpaperError } = await supabase
    .from('wallpapers')
    .select('*')
    .eq('identifier', identifier)
    .single();

  if (wallpaperError || !wallpaperData) {
    console.error(`Failed to fetch wallpaper with identifier ${identifier}:`, wallpaperError);
    return null;
  }

  try {
    return await mapDbWallpaperToWallpaper(wallpaperData as DbWallpaper);
  } catch (error) {
    console.error(`Error mapping wallpaper ${identifier}:`, error);
    return null;
  }
};
