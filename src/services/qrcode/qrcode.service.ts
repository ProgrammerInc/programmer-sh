/**
 * QR Code Service
 *
 * Handles retrieval and management of QR code data from the database
 * with optimized query performance.
 */

import { createClient } from '@supabase/supabase-js';
import { QRCodeType, QRCode } from '@/components/ui/qrcode/qrcode.types';
import { logger } from '@/services/logger';

// Environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ypsbxadldkiokgvlfxag.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlwc2J4YWRsZGtpb2tndmxmeGFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NTcyMDEsImV4cCI6MjA1NTMzMzIwMX0.s_LiIvqGbHBeN1HSXEKMBzGV6se9ezvjyH_KtLi5lYk';

// Create a single Supabase client for interacting with the database
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

    // Fetch QR codes from database with a single optimized query
    const { data: qrCodes, error } = await supabase
      .from('qr_codes')
      .select('*')
      .order('name');

    if (error) {
      throw new Error(`Error fetching QR codes: ${error.message}`);
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

    // Fetch QR code from database
    const { data: qrCode, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('identifier', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        return null;
      }
      throw new Error(`Error fetching QR code: ${error.message}`);
    }

    return mapDbQRCodeToQRCode(qrCode as DbQRCode);
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

    // Fetch QR code from database
    const { data: qrCode, error } = await supabase
      .from('qr_codes')
      .select('*')
      .eq('name', name)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Record not found
        return null;
      }
      throw new Error(`Error fetching QR code: ${error.message}`);
    }

    return mapDbQRCodeToQRCode(qrCode as DbQRCode);
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

    // Insert new QR code into database
    const { data, error } = await supabase
      .from('qr_codes')
      .insert([dbQRCode])
      .select()
      .single();

    if (error) {
      throw new Error(`Error creating QR code: ${error.message}`);
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

    // Update QR code in database
    const { data, error } = await supabase
      .from('qr_codes')
      .update(dbQRCode)
      .eq('identifier', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Error updating QR code: ${error.message}`);
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
      throw new Error(`Error deleting QR code: ${error.message}`);
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