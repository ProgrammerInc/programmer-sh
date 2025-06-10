# Wallpaper Component Guide

This guide provides best practices, accessibility considerations, and implementation tips for using the Wallpaper component.

## Best Practices

### When to Use Wallpapers

✅ **Do use wallpapers for:**

- Creating immersive user experiences
- Setting the mood or theme of an application
- Providing visual cues about the current section or context
- Landing pages and presentation sites
- Login/authentication screens
- Empty states that need visual interest

❌ **Don't use wallpapers for:**

- Content-heavy pages where the wallpaper may distract from important information
- Pages where performance is absolutely critical
- Accessibility-focused interfaces that require minimal visual complexity
- Interfaces where users need to focus intensely on specific tasks

### Performance Considerations

- **Lazy Load Animations**: All complex animations are lazy-loaded by default to improve initial page load
- **Use Simple Animations**: For performance-critical applications, use simpler animations like gradients or static patterns
- **Optimize Images/Videos**: Ensure any images or videos used are properly optimized and compressed
- **Monitor Performance**: Pay attention to frame rates and CPU/GPU usage when using animated wallpapers
- **Provide Fallbacks**: Always have simpler fallbacks for devices with limited resources

## Accessibility Considerations

### Contrast and Readability

- Ensure content placed on top of wallpapers has sufficient contrast
- Use overlays or semi-transparent containers for text when necessary
- Test readability across different viewport sizes and devices
- Consider offering a "high contrast" option to disable complex wallpapers

### Motion Sensitivity

- Respect user preferences for reduced motion using the `prefers-reduced-motion` media query
- Provide static alternatives to animated wallpapers
- Allow users to disable animations and transitions

### Implementation Example for Reduced Motion

```tsx
import { useEffect, useState } from 'react';
import { WallpaperProvider } from '@/components/ui/wallpaper';

export function AccessibleWallpaper() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Choose an appropriate wallpaper based on user preference
  const wallpaperId = prefersReducedMotion ? 'static-gradient' : 'particle-network';

  return (
    <WallpaperProvider wallpaper={wallpaperId}>
      <div className="content">
        <h1>Accessible Wallpaper</h1>
        <p>This wallpaper respects reduced motion preferences</p>
      </div>
    </WallpaperProvider>
  );
}
```

## Implementation Patterns

### Theme Integration

Integrate wallpapers with your application's theme system:

```tsx
import { useTheme } from '@/hooks/use-theme';
import { WallpaperProvider } from '@/components/ui/wallpaper';

export function ThemedApp() {
  const { theme } = useTheme();

  // Select a wallpaper based on current theme
  const getWallpaperId = () => {
    switch (theme) {
      case 'dark':
        return 'starry-night';
      case 'light':
        return 'light-gradient';
      default:
        return 'neutral-pattern';
    }
  };

  return (
    <WallpaperProvider wallpaper={getWallpaperId()} theme={theme}>
      <div className="app-container">{/* Your app content */}</div>
    </WallpaperProvider>
  );
}
```

### Context-Aware Wallpapers

Change wallpapers based on application context or routes:

```tsx
import { useRouter } from 'next/router';
import { WallpaperProvider } from '@/components/ui/wallpaper';

export function ContextualApp() {
  const router = useRouter();

  // Select wallpaper based on current route
  const getWallpaperForRoute = () => {
    if (router.pathname.startsWith('/dashboard')) {
      return 'dashboard-pattern';
    } else if (router.pathname.startsWith('/profile')) {
      return 'profile-gradient';
    } else if (router.pathname === '/login') {
      return 'login-animation';
    }
    return 'default-wallpaper';
  };

  return (
    <WallpaperProvider wallpaper={getWallpaperForRoute()}>
      <div className="app-container">{/* Your app content */}</div>
    </WallpaperProvider>
  );
}
```

### Wallpaper with Content Overlay

Ensure content is readable over any wallpaper:

```tsx
import { WallpaperProvider } from '@/components/ui/wallpaper';

export function OverlayContent() {
  return (
    <WallpaperProvider wallpaper="particle-network">
      <div className="content-container">
        {/* Semi-transparent container for better contrast */}
        <div className="overlay-panel">
          <h1>Important Content</h1>
          <p>
            This content is placed in a semi-transparent container to ensure readability over any
            wallpaper.
          </p>
          <button>Action Button</button>
        </div>
      </div>
    </WallpaperProvider>
  );
}
```

CSS for the overlay panel:

```css
.overlay-panel {
  background-color: rgba(0, 0, 0, 0.7); /* Dark overlay for light text */
  color: white;
  padding: 2rem;
  border-radius: 8px;
  backdrop-filter: blur(8px); /* Additional blur effect for modern browsers */
  max-width: 600px;
  margin: 2rem auto;
}

/* For light themes */
.light-theme .overlay-panel {
  background-color: rgba(255, 255, 255, 0.8);
  color: #111;
}
```

## Performance Optimization

### Canvas-Based Animation Best Practices

- Limit the number of particles/elements in animations
- Use appropriate size for canvas elements (avoid unnecessarily large canvases)
- Implement frame rate limiting for complex animations
- Use `requestAnimationFrame` carefully and cancel it when component unmounts
- Consider disabling animations on battery-powered devices

### Memory Management

For applications that change wallpapers frequently, ensure proper cleanup:

```tsx
import { useState, useEffect } from 'react';
import { WallpaperProvider } from '@/components/ui/wallpaper';

export function OptimizedWallpaperSwitcher() {
  const [activeWallpaper, setActiveWallpaper] = useState('default');

  useEffect(() => {
    // Force garbage collection after wallpaper change
    // by delaying the actual wallpaper switch
    let cleanup: NodeJS.Timeout;

    const handleWallpaperChange = (id: string) => {
      // First set to null to help cleanup previous wallpaper
      setActiveWallpaper('none');

      // Then set to new wallpaper after a short delay
      cleanup = setTimeout(() => {
        setActiveWallpaper(id);
      }, 100);
    };

    // Setup event listeners or other logic here

    return () => {
      if (cleanup) clearTimeout(cleanup);
    };
  }, []);

  return (
    <WallpaperProvider wallpaper={activeWallpaper}>
      <div className="content">{/* Content here */}</div>
    </WallpaperProvider>
  );
}
```

## Browser Compatibility

- All basic wallpaper types (colors, gradients, images) work in all modern browsers
- More complex animations like particles and WebGL effects may have varying performance across browsers
- For IE11 and older browsers, use simple gradient or color wallpapers as fallbacks
- Test animations in Firefox, Chrome, Safari, and Edge to ensure cross-browser compatibility
