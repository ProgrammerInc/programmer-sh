/**
 * QR Code Database Service
 * 
 * Service for interacting with QR code preset data in the Supabase database
 */

import { createClient } from '@supabase/supabase-js';
import { ImageSettings } from '@/components/ui/qr-code/qr-code.types';
import { logger } from '@/services/logger/logger.service';

// Create a singleton instance of the Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Interface for database QR code preset records
 */
interface DbQRCodePreset {
  id: string;
  identifier: string;
  name: string;
  description: string | null;
  src: string;
  height: number;
  width: number;
  excavate: boolean;
  logo_padding: number | null;
  logo_padding_style: string | null;
  opacity: number | null;
  quiet_zone: number | null;
  remove_qrcode_behind_logo: boolean | null;
  enabled: boolean;
  cross_origin: string | null;
  x: number | null;
  y: number | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Default QR code preset for fallback
 */
const defaultQRCodePreset: ImageSettings = {
  src: '/images/programmer-icon-transparent.png',
  height: 69,
  width: 69,
  excavate: true,
  logoPadding: 13,
  logoPaddingStyle: 'circle',
  opacity: 1,
  quietZone: 0,
  removeQrCodeBehindLogo: true
};

/**
 * Maps a database QR code preset to the application ImageSettings type
 */
const mapDbQRCodePresetToImageSettings = (dbPreset: DbQRCodePreset): ImageSettings => ({
  src: dbPreset.src,
  height: dbPreset.height,
  width: dbPreset.width,
  excavate: dbPreset.excavate,
  logoPadding: dbPreset.logo_padding || undefined,
  logoPaddingStyle: dbPreset.logo_padding_style as 'circle' | 'square' | undefined,
  opacity: dbPreset.opacity || undefined,
  quietZone: dbPreset.quiet_zone || undefined,
  removeQrCodeBehindLogo: dbPreset.remove_qrcode_behind_logo || undefined,
  crossOrigin: dbPreset.cross_origin || undefined,
  x: dbPreset.x || undefined,
  y: dbPreset.y || undefined
});

/**
 * Fetch all QR code presets from the database
 */
export const fetchAllQRCodePresets = async (): Promise<Record<string, ImageSettings>> => {
  try {
    const { data: presets, error } = await supabase
      .from('qrcode_presets')
      .select('*');

    if (error) {
      logger.error('Error fetching QR code presets:', error);
      return { programmerIcon: defaultQRCodePreset };
    }

    if (!presets || presets.length === 0) {
      logger.warn('No QR code presets found in database');
      return { programmerIcon: defaultQRCodePreset };
    }

    // Transform database objects to application objects and organize by identifier
    const presetsMap: Record<string, ImageSettings> = {};
    for (const preset of presets as DbQRCodePreset[]) {
      presetsMap[preset.identifier] = mapDbQRCodePresetToImageSettings(preset);
    }

    return presetsMap;
  } catch (error) {
    logger.error('Failed to fetch QR code presets:', error);
    return { programmerIcon: defaultQRCodePreset };
  }
};

/**
 * Fetch only enabled QR code presets from the database
 */
export const fetchEnabledQRCodePresets = async (): Promise<Record<string, ImageSettings>> => {
  try {
    const { data: presets, error } = await supabase
      .from('qrcode_presets')
      .select('*')
      .eq('enabled', true);

    if (error) {
      logger.error('Error fetching enabled QR code presets:', error);
      return { programmerIcon: defaultQRCodePreset };
    }

    if (!presets || presets.length === 0) {
      logger.warn('No enabled QR code presets found in database');
      return { programmerIcon: defaultQRCodePreset };
    }

    // Transform database objects to application objects and organize by identifier
    const presetsMap: Record<string, ImageSettings> = {};
    for (const preset of presets as DbQRCodePreset[]) {
      presetsMap[preset.identifier] = mapDbQRCodePresetToImageSettings(preset);
    }

    return presetsMap;
  } catch (error) {
    logger.error('Failed to fetch enabled QR code presets:', error);
    return { programmerIcon: defaultQRCodePreset };
  }
};

/**
 * Fetch a specific QR code preset by identifier
 */
export const fetchQRCodePresetByIdentifier = async (identifier: string): Promise<ImageSettings | null> => {
  try {
    const { data: preset, error } = await supabase
      .from('qrcode_presets')
      .select('*')
      .eq('identifier', identifier)
      .single();

    if (error) {
      logger.error(`Error fetching QR code preset with identifier ${identifier}:`, error);
      return null;
    }

    if (!preset) {
      logger.warn(`No QR code preset found with identifier ${identifier}`);
      return null;
    }

    return mapDbQRCodePresetToImageSettings(preset as DbQRCodePreset);
  } catch (error) {
    logger.error(`Failed to fetch QR code preset with identifier ${identifier}:`, error);
    return null;
  }
};
