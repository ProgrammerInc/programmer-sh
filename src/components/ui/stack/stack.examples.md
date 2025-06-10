# Stack Component Examples

## Basic Usage

The Stack component creates an interactive stack of cards that can be dragged and rearranged.

```tsx
// Basic usage with default settings
<Stack />
```

## Custom Configuration

You can customize the stack's behavior with various props.

```tsx
// With random rotation for a more natural look
<Stack randomRotation={true} />

// With different sensitivity for drag-to-back gesture
<Stack sensitivity={150} />

// With custom card dimensions
<Stack cardDimensions={{ width: 300, height: 200 }} />

// With ability to send cards to back by clicking
<Stack sendToBackOnClick={true} />

// Combining multiple customizations
<Stack
  randomRotation={true}
  sensitivity={150}
  cardDimensions={{ width: 300, height: 200 }}
  sendToBackOnClick={true}
/>
```

## Custom Cards Data

You can provide your own card data to display custom images.

```tsx
// With custom cards data
<Stack
  cardsData={[
    { id: 1, img: '/images/photo1.jpg' },
    { id: 2, img: '/images/photo2.jpg' },
    { id: 3, img: '/images/photo3.jpg' },
    { id: 4, img: '/images/photo4.jpg' }
  ]}
/>
```

## Animation Configuration

You can customize the animation behavior with different spring values.

```tsx
// With customized animation for smoother movement
<Stack animationConfig={{ stiffness: 200, damping: 25 }} />

// With snappier animation
<Stack animationConfig={{ stiffness: 300, damping: 15 }} />

// With bouncier animation
<Stack animationConfig={{ stiffness: 280, damping: 10 }} />
```

## Gallery Example

Use the Stack component to create an interactive photo gallery.

```tsx
import { Stack } from '@/components/ui/stack';

export default function PhotoGallery() {
  const photos = [
    { id: 1, img: '/gallery/landscape1.jpg' },
    { id: 2, img: '/gallery/landscape2.jpg' },
    { id: 3, img: '/gallery/landscape3.jpg' },
    { id: 4, img: '/gallery/landscape4.jpg' }
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Photo Gallery</h1>
      <p>Drag a photo to send it to the back, or click to flip through them</p>
      <div className="mt-8">
        <Stack
          cardsData={photos}
          cardDimensions={{ width: 350, height: 250 }}
          randomRotation={true}
          sendToBackOnClick={true}
          animationConfig={{ stiffness: 250, damping: 15 }}
        />
      </div>
    </div>
  );
}
```

## Integration with Other Components

Combine the Stack component with other UI elements to create interactive interfaces.

```tsx
import { useState } from 'react';
import { Stack } from '@/components/ui/stack';
import { Button } from '@/components/ui/button/button';

export default function CardGame() {
  const [cards, setCards] = useState([
    { id: 1, img: '/cards/card1.jpg' },
    { id: 2, img: '/cards/card2.jpg' },
    { id: 3, img: '/cards/card3.jpg' }
  ]);

  const addCard = () => {
    const newId = Math.max(...cards.map(card => card.id)) + 1;
    setCards([...cards, { id: newId, img: `/cards/card${(newId % 10) + 1}.jpg` }]);
  };

  const shuffleCards = () => {
    setCards([...cards].sort(() => Math.random() - 0.5));
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="mt-4 space-x-4">
        <Button onClick={addCard}>Add Card</Button>
        <Button onClick={shuffleCards}>Shuffle</Button>
      </div>
      <div className="mt-8">
        <Stack cardsData={cards} randomRotation={true} sendToBackOnClick={true} />
      </div>
    </div>
  );
}
```
