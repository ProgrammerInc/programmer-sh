#!/usr/bin/env ts-node
/**
 * Wallpaper Presets Database Loader
 * 
 * This script loads the wallpaper presets from the static presets file
 * into the Supabase database with proper relationships between tables.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import wallpaperPresets from '../src/presets/wallpaper.presets';
import type { 
  Wallpaper, 
  WallpaperAnimation, 
  WallpaperBackground, 
  WallpaperColor, 
  WallpaperGradient, 
  WallpaperImage, 
  WallpaperVideo 
} from '../src/components/ui/wallpaper/wallpaper.types';

// Initialize environment variables
dotenv.config();

// Check for required environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('\x1b[31mError: VITE_SUPABASE_URL environment variable is required\x1b[0m');
  console.log('Please make sure you have a .env file with the following variables:');
  console.log('  VITE_SUPABASE_URL=your_supabase_url');
  console.log('  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
  process.exit(1);
}

if (!supabaseKey) {
  console.error('\x1b[31mError: VITE_SUPABASE_ANON_KEY environment variable is required\x1b[0m');
  console.log('Please make sure you have a .env file with the following variables:');
  console.log('  VITE_SUPABASE_URL=your_supabase_url');
  console.log('  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key');
  process.exit(1);
}

console.log('\x1b[32mFound Supabase credentials, connecting to database...\x1b[0m');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Insert an animation if it doesn't exist
 */
const insertAnimation = async (animation: WallpaperAnimation): Promise<string | null> => {
  try {
    // Check if animation already exists
    const { data: existingAnimation } = await supabase
      .from('animations')
      .select('id, identifier')
      .eq('identifier', animation.id)
      .single();

    if (existingAnimation) {
      console.log(`Animation ${animation.id} already exists with ID: ${existingAnimation.id}`);
      return existingAnimation.id;
    }

    // Insert animation
    const { data, error } = await supabase
      .from('animations')
      .insert({
        identifier: animation.id,
        name: animation.id.charAt(0).toUpperCase() + animation.id.slice(1),
        type: animation.type,
        url: animation.url,
        animationProps: animation.animationProps
      })
      .select('id')
      .single();

    if (error) {
      console.error(`Error inserting animation ${animation.id}:`, error);
      return null;
    }

    console.log(`Animation ${animation.id} inserted successfully!`);
    return data ? data.id : null;
  } catch (error) {
    console.error(`Error inserting animation ${animation.id}:`, error);
    return null;
  }
};

/**
 * Insert a color if it doesn't exist
 */
const insertColor = async (color: WallpaperColor): Promise<string | null> => {
  try {
    // Check if color already exists
    const { data: existingColor } = await supabase
      .from('colors')
      .select('id, identifier')
      .eq('identifier', color.id)
      .single();

    if (existingColor) {
      console.log(`Color ${color.id} already exists with ID: ${existingColor.id}`);
      return existingColor.id;
    }

    // Insert color
    const { data, error } = await supabase
      .from('colors')
      .insert({
        identifier: color.id,
        name: color.id.charAt(0).toUpperCase() + color.id.slice(1),
        color: color.color,
        type: color.type
      })
      .select('id')
      .single();

    if (error) {
      console.error(`Error inserting color ${color.id}:`, error);
      return null;
    }

    console.log(`Color ${color.id} inserted successfully!`);
    return data ? data.id : null;
  } catch (error) {
    console.error(`Error inserting color ${color.id}:`, error);
    return null;
  }
};

/**
 * Insert a gradient if it doesn't exist
 */
const insertGradient = async (gradient: WallpaperGradient): Promise<string | null> => {
  try {
    // Check if gradient already exists
    const { data: existingGradient } = await supabase
      .from('gradients')
      .select('id, identifier')
      .eq('identifier', gradient.id)
      .single();

    if (existingGradient) {
      console.log(`Gradient ${gradient.id} already exists with ID: ${existingGradient.id}`);
      return existingGradient.id;
    }

    // Insert gradient
    const { data, error } = await supabase
      .from('gradients')
      .insert({
        identifier: gradient.id,
        name: gradient.id.charAt(0).toUpperCase() + gradient.id.slice(1),
        gradient: gradient.gradient,
        type: gradient.type
      })
      .select('id')
      .single();

    if (error) {
      console.error(`Error inserting gradient ${gradient.id}:`, error);
      return null;
    }

    console.log(`Gradient ${gradient.id} inserted successfully!`);
    return data ? data.id : null;
  } catch (error) {
    console.error(`Error inserting gradient ${gradient.id}:`, error);
    return null;
  }
};

/**
 * Insert an image if it doesn't exist
 */
const insertImage = async (image: WallpaperImage): Promise<string | null> => {
  try {
    // Check if image already exists
    const { data: existingImage } = await supabase
      .from('images')
      .select('id, identifier')
      .eq('identifier', image.id)
      .single();

    if (existingImage) {
      console.log(`Image ${image.id} already exists with ID: ${existingImage.id}`);
      return existingImage.id;
    }

    // Insert image
    const { data, error } = await supabase
      .from('images')
      .insert({
        identifier: image.id,
        name: image.id.charAt(0).toUpperCase() + image.id.slice(1),
        mime_type: image.mimeType,
        type: image.type || 'jpg',
        url: image.url
      })
      .select('id')
      .single();

    if (error) {
      console.error(`Error inserting image ${image.id}:`, error);
      return null;
    }

    console.log(`Image ${image.id} inserted successfully!`);
    return data ? data.id : null;
  } catch (error) {
    console.error(`Error inserting image ${image.id}:`, error);
    return null;
  }
};

/**
 * Insert a video if it doesn't exist
 */
const insertVideo = async (video: WallpaperVideo): Promise<string | null> => {
  try {
    // Check if video already exists
    const { data: existingVideo } = await supabase
      .from('videos')
      .select('id, identifier')
      .eq('identifier', video.id)
      .single();

    if (existingVideo) {
      console.log(`Video ${video.id} already exists with ID: ${existingVideo.id}`);
      return existingVideo.id;
    }

    // Insert video
    const { data, error } = await supabase
      .from('videos')
      .insert({
        identifier: video.id,
        name: video.id.charAt(0).toUpperCase() + video.id.slice(1),
        mime_type: video.mimeType,
        type: video.type || 'mp4',
        url: video.url,
        poster: video.source ? (typeof video.source === 'string' ? video.source : null) : null,
        source_type: video.sourceType
      })
      .select('id')
      .single();

    if (error) {
      console.error(`Error inserting video ${video.id}:`, error);
      return null;
    }

    console.log(`Video ${video.id} inserted successfully!`);
    return data ? data.id : null;
  } catch (error) {
    console.error(`Error inserting video ${video.id}:`, error);
    return null;
  }
};

/**
 * Insert a background if it doesn't exist
 */
const insertBackground = async (
  identifier: string,
  type: string,
  animation: WallpaperAnimation | null = null,
  colors: WallpaperColor | null = null,
  gradient: WallpaperGradient | null = null,
  image: WallpaperImage | null = null,
  video: WallpaperVideo | null = null
): Promise<string | null> => {
  try {
    // Check if background already exists
    const { data: existingBackground } = await supabase
      .from('backgrounds')
      .select('id, identifier')
      .eq('identifier', identifier)
      .single();

    if (existingBackground) {
      console.log(`Background ${identifier} already exists with ID: ${existingBackground.id}`);
      return existingBackground.id;
    }

    // Prepare the background data
    const backgroundData: Record<string, unknown> = {
      identifier,
      name: identifier.charAt(0).toUpperCase() + identifier.slice(1),
      type
    };

    // Set the appropriate ID based on type
    if (animation && type === 'animation') {
      const animationId = await insertAnimation(animation);
      if (animationId) backgroundData.animation_id = animationId;
    } else if (gradient && type === 'gradient') {
      const gradientId = await insertGradient(gradient);
      if (gradientId) backgroundData.gradient_id = gradientId;
    } else if (image && type === 'image') {
      const imageId = await insertImage(image);
      if (imageId) backgroundData.image_id = imageId;
    } else if (video && type === 'video') {
      const videoId = await insertVideo(video);
      if (videoId) backgroundData.video_id = videoId;
    }

    // Insert the background
    const { data: background, error } = await supabase
      .from('backgrounds')
      .insert(backgroundData)
      .select('id')
      .single();

    if (error) {
      console.error(`Error inserting background ${identifier}:`, error);
      return null;
    }
    
    console.log(`Background ${identifier} inserted successfully!`);
    
    // If we have colors, handle the many-to-many relationship through the junction table
    if (colors && background) {
      const colorId = await insertColor(colors);
      if (colorId) {
        // Insert into the junction table background_colors
        const { error: junctionError } = await supabase
          .from('background_colors')
          .insert({
            background_id: background.id,
            color_id: colorId
          });
          
        if (junctionError) {
          console.error(`Error linking background ${identifier} to color:`, junctionError);
        } else {
          console.log(`Linked background ${identifier} to color successfully!`);
        }
      }
    }

    return background ? background.id : null;
  } catch (error) {
    console.error(`Error inserting background ${identifier}:`, error);
    return null;
  }
};

/**
 * Insert a wallpaper if it doesn't exist
 */
const insertWallpaper = async (
  identifier: string,
  type: string,
  background: WallpaperBackground | null = null
): Promise<string | null> => {
  try {
    // Check if wallpaper already exists
    const { data: existingWallpaper } = await supabase
      .from('wallpapers')
      .select('id, identifier')
      .eq('identifier', identifier)
      .single();

    if (existingWallpaper) {
      console.log(`Wallpaper ${identifier} already exists with ID: ${existingWallpaper.id}`);
      return existingWallpaper.id;
    }

    // First, ensure we have a background for this wallpaper
    let backgroundId: string | null = null;
    if (background) {
      // If the background object doesn't have an identifier, use the wallpaper identifier
      const backgroundIdentifier = background.id || identifier;
      
      // Determine background type from the wallpaper type or use a default
      let backgroundType = type;
      if (background.animation) backgroundType = 'animation';
      else if (background.colors && background.colors.length > 0) backgroundType = 'color';
      else if (background.gradient) backgroundType = 'gradient';
      else if (background.image) backgroundType = 'image';
      else if (background.video) backgroundType = 'video';
      
      // Insert background with the appropriate components
      backgroundId = await insertBackground(
        backgroundIdentifier,
        backgroundType,
        background.animation || null,
        (background.colors && background.colors.length > 0) ? background.colors[0] : null,
        background.gradient || null,
        background.image || null,
        background.video || null
      );
    } else {
      // If no background provided, create a simple one with same identifier
      backgroundId = await insertBackground(identifier, type, null, null, null, null, null);
    }

    // Only proceed if we have a valid background_id
    if (!backgroundId) {
      console.error(`Could not create background for wallpaper ${identifier}`);
      return null;
    }

    // Insert the wallpaper with the background_id
    const { data: wallpaper, error } = await supabase
      .from('wallpapers')
      .insert({
        identifier,
        name: identifier.charAt(0).toUpperCase() + identifier.slice(1),
        description: `${identifier.charAt(0).toUpperCase() + identifier.slice(1)} wallpaper`,
        type,
        enabled: true,
        background_id: backgroundId
      })
      .select('id')
      .single();

    if (error) {
      console.error(`Error inserting wallpaper ${identifier}:`, error);
      return null;
    }

    console.log(`Wallpaper ${identifier} inserted successfully!`);
    return wallpaper ? wallpaper.id : null;
  } catch (error) {
    console.error(`Error inserting wallpaper ${identifier}:`, error);
    return null;
  }
};

/**
 * Load all wallpaper presets into the database
 */
const loadWallpaperPresets = async () => {
  console.log('Starting to load wallpaper presets into database...');
  
  // Existing IDs to avoid duplicates
  const wallpaperIds = new Set<string>();
  const backgroundIds = new Set<string>();
  const animationIds = new Set<string>();
  const colorIds = new Set<string>();
  const gradientIds = new Set<string>();
  const imageIds = new Set<string>();
  const videoIds = new Set<string>();
  
  // Get existing ids from database
  const getExistingIds = async () => {
    // Get existing wallpapers
    const { data: existingWallpapers } = await supabase
      .from('wallpapers')
      .select('identifier');
    
    if (existingWallpapers) {
      existingWallpapers.forEach(wp => wallpaperIds.add(wp.identifier));
    }
    
    // Get existing backgrounds
    const { data: existingBackgrounds } = await supabase
      .from('backgrounds')
      .select('identifier');
    
    if (existingBackgrounds) {
      existingBackgrounds.forEach(bg => backgroundIds.add(bg.identifier));
    }
    
    // Get existing animations
    const { data: existingAnimations } = await supabase
      .from('animations')
      .select('identifier');
    
    if (existingAnimations) {
      existingAnimations.forEach(anim => animationIds.add(anim.identifier));
    }
    
    // Get existing colors
    const { data: existingColors } = await supabase
      .from('colors')
      .select('identifier');
    
    if (existingColors) {
      existingColors.forEach(col => colorIds.add(col.identifier));
    }
    
    // Get existing gradients
    const { data: existingGradients } = await supabase
      .from('gradients')
      .select('identifier');
    
    if (existingGradients) {
      existingGradients.forEach(grad => gradientIds.add(grad.identifier));
    }
    
    // Get existing images
    const { data: existingImages } = await supabase
      .from('images')
      .select('identifier');
    
    if (existingImages) {
      existingImages.forEach(img => imageIds.add(img.identifier));
    }
    
    // Get existing videos
    const { data: existingVideos } = await supabase
      .from('videos')
      .select('identifier');
    
    if (existingVideos) {
      existingVideos.forEach(vid => videoIds.add(vid.identifier));
    }
  };
  
  // Get existing IDs first
  await getExistingIds();
  
  // Process all wallpapers in sequence
  for (const [id, wallpaper] of Object.entries(wallpaperPresets)) {
    await insertWallpaper(
      id,
      wallpaper.type,
      wallpaper.background
    );
  }
  
  console.log('Finished loading wallpaper presets into database!');
};

// Run the loader
loadWallpaperPresets().catch(err => console.error('Error loading wallpaper presets:', err));
