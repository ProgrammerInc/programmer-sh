# Wallpaper Component Examples

This document provides various examples of how to use the Wallpaper component in different scenarios.

## Basic Usage

The most basic usage is to wrap your application with the Wallpaper provider:

```tsx
import { WallpaperProvider } from '@/components/ui/wallpaper';

export function App() {
  return (
    <WallpaperProvider>
      <div className="app-content">
        <h1>My Application</h1>
        <p>Content appears on top of the wallpaper</p>
      </div>
    </WallpaperProvider>
  );
}
```

## Specific Wallpaper Selection

You can specify a particular wallpaper by ID:

```tsx
import { WallpaperProvider } from '@/components/ui/wallpaper';

export function App() {
  return (
    <WallpaperProvider wallpaper="particle-network">
      <div className="app-content">
        <h1>Application with Particle Network Background</h1>
        <p>Content appears on top of the wallpaper</p>
      </div>
    </WallpaperProvider>
  );
}
```

## Randomized Wallpapers

Enable randomized wallpaper selection each time the component loads:

```tsx
import { WallpaperProvider } from '@/components/ui/wallpaper';

export function App() {
  return (
    <WallpaperProvider randomize={true}>
      <div className="app-content">
        <h1>Random Wallpaper Each Time</h1>
        <p>The wallpaper will be different on each page load</p>
      </div>
    </WallpaperProvider>
  );
}
```

## Theme-Aware Wallpapers

Wallpapers that respond to the current theme:

```tsx
import { WallpaperProvider } from '@/components/ui/wallpaper';
import { useTheme } from '@/hooks/use-theme';

export function App() {
  const { theme } = useTheme();

  return (
    <WallpaperProvider theme={theme}>
      <div className="app-content">
        <h1>Theme-Aware Wallpaper</h1>
        <p>The wallpaper adjusts to light/dark mode</p>
      </div>
    </WallpaperProvider>
  );
}
```

## Interactive Wallpapers

Enable interactive features that respond to user movement:

```tsx
import { WallpaperProvider } from '@/components/ui/wallpaper';

export function InteractiveBackground() {
  return (
    <WallpaperProvider wallpaper="particle-network" interactive={true}>
      <div className="app-content">
        <h1>Interactive Background</h1>
        <p>Move your mouse or touch the screen to interact with the particles</p>
      </div>
    </WallpaperProvider>
  );
}
```

## Custom References

Provide references to access wallpaper elements:

```tsx
import { useRef } from 'react';
import { WallpaperProvider } from '@/components/ui/wallpaper';

export function ControlledWallpaper() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleFadeAnimation = () => {
    // Access animation container through ref
    if (animationRef.current) {
      animationRef.current.style.opacity = '0.5';
    }
  };

  return (
    <>
      <button onClick={handleFadeAnimation}>Fade Wallpaper</button>

      <WallpaperProvider
        containerRef={containerRef}
        animationRef={animationRef}
        contentRef={contentRef}
      >
        <div className="app-content">
          <h1>Controlled Wallpaper</h1>
          <p>The wallpaper can be controlled via refs</p>
        </div>
      </WallpaperProvider>
    </>
  );
}
```

## Custom Collection of Wallpapers

Provide a custom collection of wallpapers:

```tsx
import { WallpaperProvider, Wallpaper } from '@/components/ui/wallpaper';
import { useState } from 'react';

export function CustomWallpapers() {
  const [customWallpapers, setCustomWallpapers] = useState<Record<string, Wallpaper>>({
    'custom-gradient': {
      id: 'custom-gradient',
      name: 'Custom Gradient',
      enabled: true,
      type: 'gradient',
      background: {
        id: 'custom-gradient-bg',
        type: 'gradient',
        gradient: {
          id: 'purple-blue',
          type: 'linear',
          gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
        }
      }
    },
    'custom-color': {
      id: 'custom-color',
      name: 'Custom Solid Color',
      enabled: true,
      type: 'color',
      background: {
        id: 'custom-color-bg',
        type: 'color',
        colors: [
          {
            id: 'bg-color',
            color: '#1e293b',
            type: 'hex'
          }
        ]
      }
    }
  });

  const [activeWallpaper, setActiveWallpaper] = useState('custom-gradient');

  return (
    <>
      <div className="controls">
        <button onClick={() => setActiveWallpaper('custom-gradient')}>Gradient</button>
        <button onClick={() => setActiveWallpaper('custom-color')}>Solid Color</button>
      </div>

      <WallpaperProvider wallpapers={customWallpapers} wallpaper={activeWallpaper}>
        <div className="app-content">
          <h1>Custom Wallpaper Collection</h1>
          <p>Choose between different custom wallpapers</p>
        </div>
      </WallpaperProvider>
    </>
  );
}
```

## Video Wallpaper

Use a video as a background:

```tsx
import { WallpaperProvider, Wallpaper } from '@/components/ui/wallpaper';

export function VideoBackground() {
  const videoWallpaper: Wallpaper = {
    id: 'ocean-waves',
    name: 'Ocean Waves',
    enabled: true,
    type: 'video',
    background: {
      id: 'ocean-waves-bg',
      type: 'video',
      video: {
        id: 'ocean-video',
        url: '/videos/ocean-waves.mp4',
        mimeType: 'video/mp4',
        type: 'mp4'
      }
    }
  };

  return (
    <WallpaperProvider wallpapers={{ 'ocean-waves': videoWallpaper }} wallpaper="ocean-waves">
      <div className="app-content">
        <h1>Video Background</h1>
        <p>A calming ocean video plays in the background</p>
      </div>
    </WallpaperProvider>
  );
}
```

## Image Wallpaper

Use an image as a background:

```tsx
import { WallpaperProvider, Wallpaper } from '@/components/ui/wallpaper';

export function ImageBackground() {
  const imageWallpaper: Wallpaper = {
    id: 'mountain-landscape',
    name: 'Mountain Landscape',
    enabled: true,
    type: 'image',
    background: {
      id: 'mountain-bg',
      type: 'image',
      image: {
        id: 'mountain-img',
        url: '/images/mountains.jpg',
        mimeType: 'image/jpeg',
        type: 'static'
      }
    }
  };

  return (
    <WallpaperProvider
      wallpapers={{ 'mountain-landscape': imageWallpaper }}
      wallpaper="mountain-landscape"
    >
      <div className="app-content dark-content">
        <h1>Image Background</h1>
        <p>A beautiful mountain landscape in the background</p>
      </div>
    </WallpaperProvider>
  );
}
```
