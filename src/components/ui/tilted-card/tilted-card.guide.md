# TiltedCard Component Guide

This guide explains how to use the `TiltedCard` component effectively, covering best practices, accessibility considerations, performance optimization, and troubleshooting.

## Overview

The `TiltedCard` component creates an interactive 3D card that responds to mouse movement with smooth tilt animations. It's ideal for creating engaging UI elements like product showcases, gallery items, or profile cards.

## Best Practices

### Image Selection

- Use high-quality images that maintain clarity at your specified dimensions
- Consider using images with a clear focal point that benefits from the 3D effect
- Images with good contrast work better for the tilt effect to be noticeable
- Keep file sizes reasonable to avoid performance issues

### Dimensions

- Set appropriate dimensions for your use case – too large can be overwhelming, too small may make the effect hard to notice
- Match the container and image dimensions for a clean look, or make the image slightly smaller than the container for a border effect
- Consider the placement within your overall layout – leave enough space around the card for the hover effect

### Effect Intensity

- Use moderate values for `scaleOnHover` (1.05-1.15) and `rotateAmplitude` (10-15) for a subtle, professional effect
- For more playful or dramatic interfaces, you can use larger values
- Test the effect with actual users to find the right balance between interesting and distracting

### Overlay Content

- Keep overlay content simple and readable
- Ensure there's enough contrast between the overlay and the background image
- Consider using semi-transparent backgrounds for overlays to maintain visibility of the underlying image

## Accessibility Considerations

### Alternative Text

- Always provide meaningful `altText` for screen readers
- The alt text should describe the content and purpose of the image
- If the image is purely decorative, consider whether it should be in a TiltedCard at all

### Motion Sensitivity

- The animation effects may be problematic for users with vestibular disorders or motion sensitivity
- Consider providing a way to reduce motion in your application, and adjust the card's behavior accordingly
- You can respect the user's `prefers-reduced-motion` setting with additional CSS

### Keyboard Navigation

- If the card is interactive (e.g., clickable), ensure it is focusable and clearly indicates focus state
- Add appropriate keyboard handlers alongside mouse handlers

## Performance Optimization

### Image Optimization

- Optimize images before using them (compression, correct dimensions)
- Consider using responsive images with multiple sizes
- Lazy load images that appear below the fold

### Animation Performance

- The component uses `will-change` and hardware acceleration for smoother animations
- For many cards on a page, consider only activating animations for cards in the viewport
- If performance is an issue, reduce the complexity of overlays or the precision of the tilt effect

### Rendering Optimization

- The component uses React.memo to prevent unnecessary re-renders
- When using many TiltedCards, consider virtualizing the list
- For very complex layouts, you might need to debounce mouse events

## Mobile Considerations

- The 3D effect relies on mouse position, which doesn't translate well to touch interfaces
- The component includes a mobile warning by default
- Consider providing an alternative interaction model for mobile users
- You might want to disable the effect entirely on mobile and use a simpler hover state

## Troubleshooting

### Effect Not Working

- Check that you've provided the required `imageSrc` prop
- Verify that the card has sufficient dimensions to be visible
- Confirm that there are no CSS conflicts that might be preventing the transform effects

### Jittery Animation

- This could indicate performance issues. Try optimizing your images
- Reduce the number of TiltedCards visible at once
- Adjust the spring values for smoother animation

### Z-Index Issues

- If the card or its tooltip is appearing behind other elements, adjust the z-index in your layout
- The tooltip uses z-index 3 by default, which might need adjustment in complex layouts

### Browser Compatibility

- The 3D effects rely on CSS transforms which have good browser support, but may render differently across browsers
- Test in multiple browsers, especially if you're using custom overlays
- Safari sometimes handles 3D transforms differently than Chrome or Firefox

## Advanced Customization

### Custom Animation Parameters

You can extend the component to accept custom spring options:

```tsx
// Example of component extension with custom animation parameters
import { TiltedCard as BaseTiltedCard, TiltedCardProps } from '@/components/ui/tilted-card';
import { SpringOptions } from 'framer-motion';

interface CustomTiltedCardProps extends TiltedCardProps {
  customSpringOptions?: SpringOptions;
}

export function CustomTiltedCard({ customSpringOptions, ...props }: CustomTiltedCardProps) {
  // Implementation that uses customSpringOptions for the animations
  // This would require modifying the original component
  return <BaseTiltedCard {...props} />;
}
```

### Integration with Other Components

The TiltedCard can be effectively combined with other components:

```tsx
import { TiltedCard } from '@/components/ui/tilted-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ProductTiltedCard({ product }) {
  return (
    <div className="relative">
      <TiltedCard
        imageSrc={product.imageUrl}
        altText={product.name}
        captionText={product.name}
      />
      <Badge className="absolute top-2 right-2" variant="success">
        New
      </Badge>
      <div className="mt-3 text-center">
        <h3 className="text-lg font-medium">{product.name}</h3>
        <p className="text-gray-500">${product.price}</p>
        <Button className="mt-2" size="sm">
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
```

## Conclusion

The TiltedCard component provides an engaging way to present images with an interactive 3D effect. By following these guidelines, you can create experiences that are both visually appealing and accessible to all users.
