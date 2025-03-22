'use client';

import { useEffect, useState } from 'react';
import { ImageSettings } from './qr-code.types';
import { fetchAllQRCodePresets, fetchEnabledQRCodePresets, fetchQRCodePresetByIdentifier } from '@/services/qrcode';
import { logger } from '@/services/logger/logger.service';

/**
 * Default QR code preset to use when database fails to load
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
 * Hook to load QR code presets from the database
 * 
 * @param onlyEnabled - Whether to only load enabled presets
 * @returns Object containing the presets and loading state
 */
export const useQRCodePresets = (onlyEnabled = false) => {
  const [presets, setPresets] = useState<Record<string, ImageSettings>>({ programmerIcon: defaultQRCodePreset });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadQRCodePresets = async () => {
      try {
        setIsLoading(true);
        
        // Fetch presets from database
        const dbPresets = onlyEnabled 
          ? await fetchEnabledQRCodePresets() 
          : await fetchAllQRCodePresets();
        
        // If no presets found, ensure we have at least a default one
        if (Object.keys(dbPresets).length === 0) {
          logger.warn('No QR code presets found in database, using default fallback');
          setPresets({ programmerIcon: defaultQRCodePreset });
        } else {
          // Update state with database presets
          setPresets(dbPresets);
        }
        
        setError(null);
      } catch (err) {
        logger.error('Failed to load QR code presets from database:', err);
        setError(err instanceof Error ? err : new Error('Failed to load QR code presets'));
        
        // Use minimal default preset as fallback
        setPresets({ programmerIcon: defaultQRCodePreset });
      } finally {
        setIsLoading(false);
      }
    };

    loadQRCodePresets();
  }, [onlyEnabled]);

  return { presets, isLoading, error };
};

/**
 * Hook to get a specific QR code preset by identifier
 * 
 * @param identifier - The preset identifier to fetch
 * @returns The preset and loading state
 */
export const useQRCodePreset = (identifier: string) => {
  const [preset, setPreset] = useState<ImageSettings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadQRCodePreset = async () => {
      try {
        setIsLoading(true);
        
        // Fetch preset from database
        const dbPreset = await fetchQRCodePresetByIdentifier(identifier);
        
        if (!dbPreset) {
          logger.warn(`QR code preset ${identifier} not found, using default fallback`);
          setPreset(defaultQRCodePreset);
        } else {
          setPreset(dbPreset);
        }
        
        setError(null);
      } catch (err) {
        logger.error(`Failed to load QR code preset ${identifier}:`, err);
        setError(err instanceof Error ? err : new Error(`Failed to load QR code preset ${identifier}`));
        
        // Use default preset as fallback
        setPreset(defaultQRCodePreset);
      } finally {
        setIsLoading(false);
      }
    };

    loadQRCodePreset();
  }, [identifier]);

  return { preset, isLoading, error };
};
