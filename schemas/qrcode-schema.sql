-- Create schema for QR code presets system
-- This script creates tables for QR code presets with UUIDs and relationships

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create qrcode_presets table
CREATE TABLE IF NOT EXISTS qrcode_presets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  src TEXT NOT NULL,
  height INTEGER NOT NULL,
  width INTEGER NOT NULL,
  excavate BOOLEAN DEFAULT true,
  logo_padding INTEGER,
  logo_padding_style VARCHAR(50),
  opacity DECIMAL,
  quiet_zone INTEGER DEFAULT 0,
  remove_qrcode_behind_logo BOOLEAN DEFAULT true,
  enabled BOOLEAN DEFAULT true,
  cross_origin VARCHAR(50),
  x INTEGER,
  y INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_qrcode_presets_identifier ON qrcode_presets(identifier);
CREATE INDEX IF NOT EXISTS idx_qrcode_presets_enabled ON qrcode_presets(enabled);
