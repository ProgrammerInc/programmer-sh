# TiltedCard Component Examples

The `TiltedCard` component creates an interactive 3D card effect that responds to mouse movement. Here are several examples demonstrating how to use it effectively in different scenarios.

## Basic Usage

A simple implementation with just the required image source:

```tsx
<TiltedCard imageSrc="/images/sample-image.jpg" altText="Sample image description" />
```

## With Caption Text

Add a tooltip caption that appears when hovering:

```tsx
<TiltedCard
  imageSrc="/images/profile-photo.jpg"
  altText="User profile photo"
  captionText="Jane Smith, Product Designer"
/>
```

## Custom Dimensions

Specify custom dimensions for the container and image:

```tsx
<TiltedCard
  imageSrc="/images/landscape-photo.jpg"
  altText="Mountain landscape"
  containerWidth="500px"
  containerHeight="300px"
  imageWidth="480px"
  imageHeight="280px"
/>
```

## Customize Tilt Effect

Adjust the scale and rotation amplitude of the effect:

```tsx
<TiltedCard
  imageSrc="/images/product-image.jpg"
  altText="Product showcase"
  scaleOnHover={1.15} // More pronounced scale effect
  rotateAmplitude={18} // More pronounced rotation
/>
```

## With Overlay Content

Add custom overlay content on top of the image:

```tsx
<TiltedCard
  imageSrc="/images/background.jpg"
  altText="Product background"
  displayOverlayContent={true}
  overlayContent={
    <div className="p-4 text-white bg-black/50 rounded-lg text-center w-full h-full flex items-center justify-center">
      <h3 className="text-2xl font-bold">Special Offer</h3>
      <p>Limited time discount</p>
    </div>
  }
/>
```

## Disable Mobile Warning

Remove the mobile warning message:

```tsx
<TiltedCard imageSrc="/images/sample.jpg" altText="Sample image" showMobileWarning={false} />
```

## Disable Tooltip

Hide the tooltip caption completely:

```tsx
<TiltedCard imageSrc="/images/gallery-image.jpg" altText="Gallery image" showTooltip={false} />
```

## Gallery Implementation

Implement a gallery of tilted cards:

```tsx
import { TiltedCard } from '@/components/ui/tilted-card';

export function Gallery() {
  const images = [
    { src: '/images/gallery/image1.jpg', alt: 'Gallery image 1', caption: 'Mountain View' },
    { src: '/images/gallery/image2.jpg', alt: 'Gallery image 2', caption: 'Ocean Sunset' },
    { src: '/images/gallery/image3.jpg', alt: 'Gallery image 3', caption: 'Forest Trail' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((image, index) => (
        <TiltedCard
          key={index}
          imageSrc={image.src}
          altText={image.alt}
          captionText={image.caption}
          containerHeight="250px"
        />
      ))}
    </div>
  );
}
```

## Product Card Example

Implement a product card with overlay content:

```tsx
import { TiltedCard } from '@/components/ui/tilted-card';

export function ProductCard({ product }) {
  return (
    <TiltedCard
      imageSrc={product.imageUrl}
      altText={product.name}
      captionText={`${product.name} - $${product.price}`}
      displayOverlayContent={true}
      overlayContent={
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-sm">${product.price}</p>
          <button className="mt-2 px-4 py-1 bg-white text-black rounded-full text-sm font-medium">
            Add to Cart
          </button>
        </div>
      }
    />
  );
}
```

## Custom Animation Values

By modifying the component, you can customize its animation values:

```tsx
// Example of customizing the spring values
const customSpringValues = {
  damping: 20, // Less damping for more bounce
  stiffness: 120, // More stiffness for faster response
  mass: 1.5 // Less mass for faster movement
};

// Then pass these custom values to useSpring instances
```

## Accessibility Considerations

Always provide meaningful `altText` for screen readers:

```tsx
<TiltedCard
  imageSrc="/images/chart.jpg"
  altText="Bar chart showing sales growth from January to December 2023"
/>
```
