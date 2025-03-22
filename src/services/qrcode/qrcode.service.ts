/**
 * QR Code Service
 *
 * Handles retrieval and management of QR code data from the database
 * with optimized query performance.
 */

import { QRCodeType, QRCode } from '@/components/ui/qrcode/qrcode.types';
import { supabase, isNotFoundError, logDbError } from '@/utils/supabase.utils';
import { logger } from '@/services/logger';

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
const mapDbQRCodeToQRCode = (dbQRCode: DbQRCode): QRCode => {
  const qrCode: QRCode = {
    id: dbQRCode.identifier,
    name: dbQRCode.name,
    description: dbQRCode.description || '',
    type: dbQRCode.type as QRCodeType,
    content: dbQRCode.content
  };

  // Add optional properties if they exist in the database record
  if (dbQRCode.color) {
    qrCode.color = dbQRCode.color;
  }

  if (dbQRCode.background_color) {
    qrCode.backgroundColor = dbQRCode.background_color;
  }

  if (dbQRCode.logo_url) {
    qrCode.logoUrl = dbQRCode.logo_url;
  }

  if (dbQRCode.options) {
    qrCode.options = dbQRCode.options;
  }

  return qrCode;
};

// In-memory cache for QR codes
let qrCodesCache: QRCode[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Retrieves all QR codes from the database with optimized query performance
 */
export const getAllQRCodes = async (): Promise<QRCode[]> => {
  try {
    // Check if we have a valid cache
    const now = Date.now();
    if (qrCodesCache && (now - lastFetchTime < CACHE_TTL)) {
      return qrCodesCache;
    }

    const { data: qrCodes, error } = await supabase
      .from('qr_codes')
      .select('*')
      .order('name');

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
export const getQRCodeById = async (id: string): Promise<QRCode | null> => {
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
export const getQRCodeByName = async (name: string): Promise<QRCode | null> => {
  try {
    // Try to find the QR code in the cache first
    if (qrCodesCache) {
      const cachedQRCode = qrCodesCache.find(qrCode => qrCode.name === name);
      if (cachedQRCode) {
        return cachedQRCode;
      }
    }

    const { data, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('name', name)
      .single();

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
export const createQRCode = async (qrCode: Omit<QRCode, 'id'>): Promise<QRCode | null> => {
  try {
    // Convert from application type to database type
    const dbQRCode: Partial<DbQRCode> = {
      name: qrCode.name,
      description: qrCode.description || null,
      type: qrCode.type,
      content: qrCode.content,
      color: qrCode.color || null,
      background_color: qrCode.backgroundColor || null,
      logo_url: qrCode.logoUrl || null,
      is_active: true,
      options: qrCode.options || null
    };

    const { data, error } = await supabase
      .from('qr_codes')
      .insert([dbQRCode])
      .select()
      .single();

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
export const updateQRCode = async (id: string, qrCode: Partial<QRCode>): Promise<QRCode | null> => {
  try {
    // Convert from application type to database type
    const dbQRCode: Partial<DbQRCode> = {};
    
    if (qrCode.name !== undefined) dbQRCode.name = qrCode.name;
    if (qrCode.description !== undefined) dbQRCode.description = qrCode.description || null;
    if (qrCode.type !== undefined) dbQRCode.type = qrCode.type;
    if (qrCode.content !== undefined) dbQRCode.content = qrCode.content;
    if (qrCode.color !== undefined) dbQRCode.color = qrCode.color || null;
    if (qrCode.backgroundColor !== undefined) dbQRCode.background_color = qrCode.backgroundColor || null;
    if (qrCode.logoUrl !== undefined) dbQRCode.logo_url = qrCode.logoUrl || null;
    if (qrCode.options !== undefined) dbQRCode.options = qrCode.options || null;

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
    const { error } = await supabase
      .from('qr_codes')
      .delete()
      .eq('identifier', id);

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