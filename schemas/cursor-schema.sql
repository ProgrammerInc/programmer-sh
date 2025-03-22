-- Create schema for cursor system
-- This script creates tables for cursor components with UUIDs and relationships

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create cursor_animations table
CREATE TABLE IF NOT EXISTS cursor_animations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  description TEXT,
  animation_type VARCHAR(50) NOT NULL, -- 'cursify', 'reactbits', 'artifact-ui', etc.
  props JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cursors table
CREATE TABLE IF NOT EXISTS cursors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) NOT NULL, -- 'default', 'animation', etc.
  animation_id UUID REFERENCES cursor_animations(id),
  enabled BOOLEAN DEFAULT true,
  style JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_cursor_animations_identifier ON cursor_animations(identifier);
CREATE INDEX IF NOT EXISTS idx_cursors_identifier ON cursors(identifier);
CREATE INDEX IF NOT EXISTS idx_cursors_enabled ON cursors(enabled);
