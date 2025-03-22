#!/usr/bin/env ts-node
/**
 * QR Code Presets Database Loader
 * 
 * This script loads the QR code presets from the static presets file
 * into the Supabase database.
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { qrcodePresets } from '../src/presets/qrcode.presets';
import type { ImageSettings } from '../src/components/ui/qr-code/qr-code.types';

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
 * Insert a QR code preset if it doesn't exist
 */
const insertQRCodePreset = async (identifier: string, preset: ImageSettings): Promise<string | null> => {
  try {
    // Check if preset already exists
    const { data: existingPreset } = await supabase
      .from('qrcode_presets')
      .select('id, identifier')
      .eq('identifier', identifier)
      .single();

    if (existingPreset) {
      console.log(`QR code preset ${identifier} already exists with ID: ${existingPreset.id}`);
      return existingPreset.id;
    }

    // Format preset for database
    const presetData = {
      identifier,
      name: identifier.charAt(0).toUpperCase() + identifier.slice(1).replace(/([A-Z])/g, ' $1').trim(),
      description: `${identifier.charAt(0).toUpperCase() + identifier.slice(1).replace(/([A-Z])/g, ' $1').trim()} QR code preset`,
      src: preset.src,
      height: preset.height,
      width: preset.width,
      excavate: preset.excavate,
      logo_padding: preset.logoPadding,
      logo_padding_style: preset.logoPaddingStyle,
      opacity: preset.opacity,
      quiet_zone: preset.quietZone,
      remove_qrcode_behind_logo: preset.removeQrCodeBehindLogo,
      enabled: true,
      cross_origin: preset.crossOrigin,
      x: preset.x,
      y: preset.y
    };

    // Insert QR code preset
    const { data, error } = await supabase
      .from('qrcode_presets')
      .insert(presetData)
      .select('id')
      .single();

    if (error) {
      console.error(`Error inserting QR code preset ${identifier}:`, error);
      return null;
    }

    console.log(`QR code preset ${identifier} inserted successfully!`);
    return data ? data.id : null;
  } catch (error) {
    console.error(`Error inserting QR code preset ${identifier}:`, error);
    return null;
  }
};

/**
 * Load all QR code presets into the database
 */
const loadQRCodePresets = async () => {
  console.log('\x1b[36mStarting QR code presets database load...\x1b[0m');
  
  try {
    // Process all QR code presets in sequence
    for (const [id, preset] of Object.entries(qrcodePresets)) {
      await insertQRCodePreset(id, preset);
    }
    
    console.log('\x1b[32mQR code presets loaded successfully!\x1b[0m');
  } catch (error) {
    console.error('\x1b[31mError loading QR code presets:\x1b[0m', error);
    throw error;
  }
};

// Run the loader
loadQRCodePresets().catch(err => console.error('Error loading QR code presets:', err));
