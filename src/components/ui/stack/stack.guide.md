# Stack Component Guide

## Overview

The Stack component creates an interactive stack of cards with drag-and-drop functionality and 3D rotation effects. It's built using Framer Motion for smooth animations and interactions, providing an engaging UI experience.

## Features

- **Interactive Dragging**: Cards can be dragged around with elastic constraints that pull them back to center
- **3D Rotation**: Cards rotate in 3D space as they are dragged, creating a realistic effect
- **Send to Back**: Cards can be sent to the back of the stack via dragging or clicking
- **Random Rotation**: Optional random rotation can be applied to give the stack a more natural appearance
- **Customizable**: Configurable card dimensions, animation properties, and sensitivity levels

## Best Practices

### Performance Considerations

- **Limit the Number of Cards**: For best performance, keep the number of cards in the stack reasonably small (under 10)
- **Image Optimization**: Use appropriately sized images to avoid unnecessary loading time
- **Use WebP Format**: Convert images to WebP format for better performance

### UX Guidelines

- **Provide Instructions**: Give users a hint about how to interact with the stack (e.g., "Drag to shuffle" or "Click to cycle")
- **Consistent Image Sizes**: Ensure all images have the same aspect ratio for a clean appearance
- **Feedback on Interaction**: Use the animation to provide clear feedback when cards are moved
- **Accessible Alternative**: Consider providing an alternative interface for users who may have difficulty with drag interactions

### Styling Tips

- **Card Borders**: Use borders to give cards a physical appearance
- **Shadows**: Consider adding shadows to enhance the 3D effect
- **Background Contrast**: Ensure the background provides good contrast with the cards

## Accessibility Considerations

The Stack component relies heavily on mouse interaction, which may present challenges for users with motor disabilities or those using screen readers. Consider the following:

- Add keyboard controls as an alternative navigation method
- Include appropriate ARIA attributes for screen readers
- Ensure sufficient contrast between elements
- Provide text alternatives for image content

## Implementation Examples

See the `stack.examples.md` file for comprehensive usage examples.

## API Details

### Stack Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `randomRotation` | `boolean` | `false` | Applies random rotation to cards |
| `sensitivity` | `number` | `200` | Drag distance needed to trigger send-to-back |
| `cardDimensions` | `{ width: number, height: number }` | `{ width: 208, height: 208 }` | Size of cards |
| `sendToBackOnClick` | `boolean` | `false` | Whether clicking a card sends it to back |
| `cardsData` | `CardData[]` | `[...defaultCards]` | Array of card data objects |
| `animationConfig` | `{ stiffness: number, damping: number }` | `{ stiffness: 260, damping: 20 }` | Framer Motion spring configuration |

### CardData Interface

| Property | Type | Description |
|----------|------|-------------|
| `id` | `number` | Unique identifier for the card |
| `img` | `string` | URL of the image to display |

## Advanced Usage

### Custom Card Content

While the default implementation displays images, you could extend the component to support custom card content by modifying the rendering logic.

### Integration with Backend

You can fetch card data from a backend service and update the state accordingly:

```tsx
import { useEffect, useState } from 'react';
import { Stack } from '@/components/ui/stack';

export default function DynamicStack() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch('/api/cards');
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCards();
  }, []);

  if (loading) return <div>Loading...</div>;

  return <Stack cardsData={cardData} />;
}
```

### Animation Customization

The component uses Framer Motion's spring animation with configurable stiffness and damping. You can experiment with different values to achieve the desired feel:

- Higher `stiffness` values create faster animations
- Lower `damping` values create bouncier animations

### Custom Interactions

You could extend the component to support additional interactions, such as:

- Double-click to zoom in on a card
- Swipe gestures for different actions
- Long-press to reveal additional information
