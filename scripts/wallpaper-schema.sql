-- Create schema for wallpaper system
-- This script creates tables for wallpaper components with UUIDs and relationships

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create animations table
CREATE TABLE IF NOT EXISTS animations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  description TEXT,
  type VARCHAR(50) NOT NULL,
  url TEXT,
  animation_props JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create colors table
CREATE TABLE IF NOT EXISTS colors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  description TEXT,
  color VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gradients table
CREATE TABLE IF NOT EXISTS gradients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  description TEXT,
  gradient TEXT,
  type VARCHAR(50) NOT NULL,
  alpha DECIMAL,
  style JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create images table
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  description TEXT,
  mime_type VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  url TEXT,
  width INTEGER,
  height INTEGER,
  aspect_ratio VARCHAR(20),
  orientation VARCHAR(20),
  source_type VARCHAR(50),
  source JSONB,
  storage_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  description TEXT,
  mime_type VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  url TEXT,
  width INTEGER,
  height INTEGER,
  aspect_ratio VARCHAR(20),
  orientation VARCHAR(20),
  source_type VARCHAR(50),
  source JSONB,
  storage_type VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create backgrounds table
CREATE TABLE IF NOT EXISTS backgrounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  description TEXT,
  type VARCHAR(50) NOT NULL,
  animation_id UUID REFERENCES animations(id),
  gradient_id UUID REFERENCES gradients(id),
  image_id UUID REFERENCES images(id),
  video_id UUID REFERENCES videos(id),
  style JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create background_colors junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS background_colors (
  background_id UUID REFERENCES backgrounds(id),
  color_id UUID REFERENCES colors(id),
  PRIMARY KEY (background_id, color_id)
);

-- Create wallpapers table
CREATE TABLE IF NOT EXISTS wallpapers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  description TEXT,
  type VARCHAR(50) NOT NULL,
  enabled BOOLEAN DEFAULT true,
  theme VARCHAR(20),
  background_id UUID NOT NULL REFERENCES backgrounds(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_animations_identifier ON animations(identifier);
CREATE INDEX IF NOT EXISTS idx_colors_identifier ON colors(identifier);
CREATE INDEX IF NOT EXISTS idx_gradients_identifier ON gradients(identifier);
CREATE INDEX IF NOT EXISTS idx_images_identifier ON images(identifier);
CREATE INDEX IF NOT EXISTS idx_videos_identifier ON videos(identifier);
CREATE INDEX IF NOT EXISTS idx_backgrounds_identifier ON backgrounds(identifier);
CREATE INDEX IF NOT EXISTS idx_wallpapers_identifier ON wallpapers(identifier);
CREATE INDEX IF NOT EXISTS idx_wallpapers_enabled ON wallpapers(enabled);
