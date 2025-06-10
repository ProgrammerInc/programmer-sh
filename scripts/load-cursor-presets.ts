#!/usr/bin/env ts-node
/* eslint-disable no-secrets/no-secrets */

/**
 * Cursor Presets Database Loader
 *
 * This script loads the cursor presets from the static presets file
 * into the Supabase database with proper relationships between tables.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import type { Cursor } from '../src/components/ui/cursor/cursor.types';
import { cursorPresets } from '../src/presets/cursor.presets';

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
 * Insert a cursor animation if it doesn't exist
 */
const insertCursorAnimation = async (
  identifier: string,
  animationType: string,
  animationProps?: unknown
): Promise<string | null> => {
  try {
    // Check if animation already exists
    const { data: existingAnimation } = await supabase
      .from('cursor_animations')
      .select('id, identifier')
      .eq('identifier', identifier)
      .single();

    if (existingAnimation) {
      console.log(`Cursor animation ${identifier} already exists with ID: ${existingAnimation.id}`);
      return existingAnimation.id;
    }

    // Insert animation
    const { data, error } = await supabase
      .from('cursor_animations')
      .insert({
        identifier,
        name: identifier.charAt(0).toUpperCase() + identifier.slice(1),
        description: `${identifier.charAt(0).toUpperCase() + identifier.slice(1)} cursor animation`,
        animation_type: animationType,
        props: animationProps || {}
      })
      .select('id')
      .single();

    if (error) {
      console.error(`Error inserting cursor animation ${identifier}:`, error);
      return null;
    }

    console.log(`Cursor animation ${identifier} inserted successfully!`);
    return data ? data.id : null;
  } catch (error) {
    console.error(`Error inserting cursor animation ${identifier}:`, error);
    return null;
  }
};

/**
 * Insert a cursor if it doesn't exist
 */
const insertCursor = async (cursor: Cursor): Promise<string | null> => {
  try {
    // Check if cursor already exists
    const { data: existingCursor } = await supabase
      .from('cursors')
      .select('id, identifier')
      .eq('identifier', cursor.id)
      .single();

    if (existingCursor) {
      console.log(`Cursor ${cursor.id} already exists with ID: ${existingCursor.id}`);
      return existingCursor.id;
    }

    const cursorData: Record<string, unknown> = {
      identifier: cursor.id,
      name: cursor.name || cursor.id.charAt(0).toUpperCase() + cursor.id.slice(1),
      description:
        cursor.description || `${cursor.id.charAt(0).toUpperCase() + cursor.id.slice(1)} cursor`,
      type: cursor.type,
      enabled: true,
      style: {}
    };

    // Add theme if it exists
    if (cursor.theme) {
      cursorData.style = { ...(cursorData.style as Record<string, unknown>), theme: cursor.theme };
    }

    // Add URL for image type cursors
    if (cursor.type === 'image' && cursor.url) {
      cursorData.style = { ...(cursorData.style as Record<string, unknown>), url: cursor.url };
    }

    // If it's an animation cursor, insert the animation first and link it
    if (cursor.type === 'animation' && cursor.animation && cursor.animationType) {
      const animationId = await insertCursorAnimation(
        cursor.animation,
        cursor.animationType,
        cursor.animationProps
      );
      if (animationId) {
        cursorData.animation_id = animationId;
      }
    }

    // Insert cursor
    const { data, error } = await supabase.from('cursors').insert(cursorData).select('id').single();

    if (error) {
      console.error(`Error inserting cursor ${cursor.id}:`, error);
      return null;
    }

    console.log(`Cursor ${cursor.id} inserted successfully!`);
    return data ? data.id : null;
  } catch (error) {
    console.error(`Error inserting cursor ${cursor.id}:`, error);
    return null;
  }
};

/**
 * Load all cursor presets into the database
 */
const loadCursorPresets = async () => {
  console.log('\x1b[36mStarting cursor presets database load...\x1b[0m');

  try {
    // Process all cursors in sequence
    for (const [id, cursor] of Object.entries(cursorPresets)) {
      await insertCursor(cursor);
    }

    console.log('\x1b[32mCursor presets loaded successfully!\x1b[0m');
  } catch (error) {
    console.error('\x1b[31mError loading cursor presets:\x1b[0m', error);
    throw error;
  }
};

// Run the loader
loadCursorPresets().catch(err => console.error('Error loading cursor presets:', err));
