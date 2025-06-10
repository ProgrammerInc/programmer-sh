/**
 * QR Code Service
 *
 * Handles retrieval and management of QR code data from the database
 * with optimized query performance.
 */

import { QRCodeProps } from '@/components/ui/qr-code/qr-code.types';
import { logger } from '@/services/logger';
import { isNotFoundError, logDbError, supabase } from '@/utils/supabase.utils';

// Define QR code types
type QRCodeType = 'url' | 'text' | 'email' | 'tel' | 'sms' | 'wifi';

// Define database QR code interface
interface DbQRCode {
  id: number;
  identifier: string;
  name: string;
  description: string | null;
  type: string;
  content: string;
  color: string | null;
  background_color: string | null;
  logo_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  options: Record<string, unknown> | null;
}

/**
 * Maps a database QR code to the application QRCode type
 */
const mapDbQRCodeToQRCode = (dbQRCode: DbQRCode): QRCodeProps => {
  const qrCode: QRCodeProps = {
    id: dbQRCode.identifier,
    value: dbQRCode.content,
    title: dbQRCode.name
  };

  // Add optional properties if they exist in the database record
  if (dbQRCode.color) {
    qrCode.fgColor = dbQRCode.color; // use fgColor, not color
  }

  if (dbQRCode.background_color) {
    qrCode.bgColor = dbQRCode.background_color; // use bgColor, not backgroundColor
  }

  if (dbQRCode.logo_url) {
    // Use imageSettings instead of direct logoUrl
    qrCode.imageSettings = {
      src: dbQRCode.logo_url,
      height: 24, // Default height
      width: 24, // Default width
      excavate: true // Required property for ImageSettings
    };
  }

  // Map database type to QR code type if needed
  if (dbQRCode.type) {
    // Store type in a custom field if needed
  }

  // Map options if needed
  if (dbQRCode.options) {
    // Map options to appropriate QRCodeProps properties
  }

  return qrCode;
};

// In-memory cache for QR codes
let qrCodesCache: QRCodeProps[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Retrieves all QR codes from the database with optimized query performance
 */
export const getAllQRCodes = async (): Promise<QRCodeProps[]> => {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (qrCodesCache && now - lastFetchTime < CACHE_TTL) {
      return qrCodesCache;
    }

    const { data: qrCodes, error } = await supabase.from('qr_codes').select('*').order('name');

    if (error) {
      logDbError('getAllQRCodes', error);
      return [];
    }

    // Map database QR codes to application QR codes
    const mappedQRCodes = (qrCodes as DbQRCode[]).map(mapDbQRCodeToQRCode);

    // Update cache
    qrCodesCache = mappedQRCodes;
    lastFetchTime = now;

    return mappedQRCodes;
  } catch (error) {
    logger.error('Error in getAllQRCodes:', error);
    return [];
  }
};

/**
 * Retrieves a QR code by its identifier with optimized query performance
 */
export const getQRCodeById = async (id: string): Promise<QRCodeProps | null> => {
  try {
    // Try to find the QR code in the cache first
    if (qrCodesCache) {
      const cachedQRCode = qrCodesCache.find(qrCode => qrCode.id === id);
      if (cachedQRCode) {
        return cachedQRCode;
      }
    }

    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('identifier', id)
      .single();

    if (error) {
      if (isNotFoundError(error, 'QR code')) {
        return null;
      }
      logDbError('getQRCodeById', error);
      return null;
    }

    return mapDbQRCodeToQRCode(data as DbQRCode);
  } catch (error) {
    logger.error('Error in getQRCodeById:', error);
    return null;
  }
};

/**
 * Retrieves a QR code by its name with optimized query performance
 */
export const getQRCodeByName = async (name: string): Promise<QRCodeProps | null> => {
  try {
    // Try to find the QR code in the cache first
    if (qrCodesCache) {
      const cachedQRCode = qrCodesCache.find(qrCode => qrCode.title === name);
      if (cachedQRCode) {
        return cachedQRCode;
      }
    }

    const { data, error } = await supabase.from('qr_codes').select('*').eq('name', name).single();

    if (error) {
      if (isNotFoundError(error, 'QR code')) {
        return null;
      }
      logDbError('getQRCodeByName', error);
      return null;
    }

    return mapDbQRCodeToQRCode(data as DbQRCode);
  } catch (error) {
    logger.error('Error in getQRCodeByName:', error);
    return null;
  }
};

/**
 * Creates a new QR code in the database
 */
export const createQRCode = async (qrCodeData: {
  name: string;
  description?: string;
  type: string;
  content: string;
  color?: string;
  backgroundColor?: string;
  logoUrl?: string;
  options?: Record<string, unknown>;
}): Promise<QRCodeProps | null> => {
  try {
    // Convert from application type to database type
    const dbQRCode: Partial<DbQRCode> = {
      name: qrCodeData.name,
      description: qrCodeData.description || null,
      type: qrCodeData.type,
      content: qrCodeData.content,
      color: qrCodeData.color || null,
      background_color: qrCodeData.backgroundColor || null,
      logo_url: qrCodeData.logoUrl || null,
      is_active: true,
      options: qrCodeData.options || null
    };

    const { data, error } = await supabase.from('qr_codes').insert([dbQRCode]).select().single();

    if (error) {
      logDbError('createQRCode', error);
      return null;
    }

    // Invalidate cache
    invalidateQRCodesCache();

    return mapDbQRCodeToQRCode(data as DbQRCode);
  } catch (error) {
    logger.error('Error in createQRCode:', error);
    return null;
  }
};

/**
 * Updates an existing QR code in the database
 */
export const updateQRCode = async (
  id: string,
  qrCodeData: Partial<{
    name: string;
    description?: string;
    type: string;
    content: string;
    color?: string;
    backgroundColor?: string;
    logoUrl?: string;
    options?: Record<string, unknown>;
  }>
): Promise<QRCodeProps | null> => {
  try {
    // Convert from application type to database type
    const dbQRCode: Partial<DbQRCode> = {};

    if (qrCodeData.name !== undefined) dbQRCode.name = qrCodeData.name;
    if (qrCodeData.description !== undefined) dbQRCode.description = qrCodeData.description || null;
    if (qrCodeData.type !== undefined) dbQRCode.type = qrCodeData.type;
    if (qrCodeData.content !== undefined) dbQRCode.content = qrCodeData.content;
    if (qrCodeData.color !== undefined) dbQRCode.color = qrCodeData.color || null;
    if (qrCodeData.backgroundColor !== undefined)
      dbQRCode.background_color = qrCodeData.backgroundColor || null;
    if (qrCodeData.logoUrl !== undefined) dbQRCode.logo_url = qrCodeData.logoUrl || null;
    if (qrCodeData.options !== undefined) dbQRCode.options = qrCodeData.options || null;

    const { data, error } = await supabase
      .from('qr_codes')
      .update(dbQRCode)
      .eq('identifier', id)
      .select()
      .single();

    if (error) {
      logDbError('updateQRCode', error);
      return null;
    }

    // Invalidate cache
    invalidateQRCodesCache();

    return mapDbQRCodeToQRCode(data as DbQRCode);
  } catch (error) {
    logger.error('Error in updateQRCode:', error);
    return null;
  }
};

/**
 * Deletes a QR code from the database
 */
export const deleteQRCode = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase.from('qr_codes').delete().eq('identifier', id);

    if (error) {
      logDbError('deleteQRCode', error);
      return false;
    }

    // Invalidate cache
    invalidateQRCodesCache();

    return true;
  } catch (error) {
    logger.error('Error in deleteQRCode:', error);
    return false;
  }
};

/**
 * Invalidates the QR codes cache, forcing the next fetch to get fresh data
 */
export const invalidateQRCodesCache = (): void => {
  qrCodesCache = null;
  lastFetchTime = 0;
};
