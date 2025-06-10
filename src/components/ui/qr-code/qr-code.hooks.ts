'use client';

import { useEffect, useState } from 'react';

import { logger } from '@/services';
import { ImageSettings } from './qr-code.types';

/**
 * Hook to load QR code image presets
 *
 * @param presetId - The ID of the preset to load
 * @returns Object containing the preset and loading state
 */
export const useQRCodePreset = (presetId: string) => {
  const [preset, setPreset] = useState<ImageSettings | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!presetId) {
      setPreset(null);
      return;
    }

    // Set loading state
    setIsLoading(true);

    // This would normally fetch from an API or database
    // For now implementing a mock that returns predefined presets
    const loadPreset = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 300));

        // Mock presets - in a real app, these would come from an API
        const presets: Record<string, ImageSettings> = {
          programmerIcon: {
            src: '/images/programmer-icon.png',
            width: 60,
            height: 60,
            logoPadding: 5,
            logoPaddingStyle: 'circle',
            removeQrCodeBehindLogo: true,
            excavate: true
          },
          companyLogo: {
            src: '/images/company-logo.png',
            width: 50,
            height: 50,
            logoPadding: 4,
            logoPaddingStyle: 'square',
            removeQrCodeBehindLogo: true,
            excavate: true
          }
        };

        const foundPreset = presets[presetId];
        if (foundPreset) {
          setPreset(foundPreset);
          logger.debug(`Loaded QR code preset: ${presetId}`);
        } else {
          logger.warn(`QR code preset not found: ${presetId}`);
          setPreset(null);
        }
      } catch (error) {
        logger.error('Error loading QR code preset', error);
        setPreset(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreset();
  }, [presetId]);

  return { preset, isLoading };
};
