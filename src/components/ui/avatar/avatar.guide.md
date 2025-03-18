# Avatar Component Guide

This guide provides best practices, accessibility information, and implementation details for the Avatar component.

## Best Practices

### When to Use

u2705 **Do use avatars for:**
- User profile pictures or representations
- Team member displays
- Comment or activity stream author identification
- User account menus and navigation
- Contact lists and user directories

u274c **Don't use avatars for:**
- Decorative purposes unrelated to people or entities
- Large hero or background images
- Logo or brand representation (use dedicated components instead)

### Avatar Types

1. **Image Avatar**: Uses an actual image provided by the user
2. **Fallback Avatar**: Uses initials or a placeholder when no image is available
3. **Icon Avatar**: Uses a generic icon (like a person silhouette)

### Sizing Guidelines

- **Extra Small (XS)**: 16x16px (h-4 w-4) - For compact lists or dense UIs
- **Small (SM)**: 24x24px (h-6 w-6) - For tight spaces or secondary displays
- **Medium (Default)**: 40x40px (h-10 w-10) - For most standard uses
- **Large (LG)**: 64x64px (h-16 w-16) - For primary user representations
- **Extra Large (XL)**: 80x80px or larger (h-20 w-20+) - For profile pages or hero sections

## Accessibility Considerations

### Images and Alternative Text

- Always include descriptive `alt` text on `AvatarImage` components
- The alt text should typically be the user's name, e.g., `alt="Jane Smith"`
- For decorative avatars, use an empty alt attribute `alt=""` and include the user's name in surrounding context

### Fallback Experience

- Ensure fallbacks are legible with sufficient color contrast
- Keep fallback text brief (typically 1-2 characters)
- Use aria-label on the Avatar component if the user's identity isn't conveyed elsewhere

### Color Contrast

- Maintain a 4.5:1 minimum contrast ratio for text fallbacks
- Consider how fallback backgrounds appear in different color modes

### Keyboard and Focus

- If the avatar is clickable, ensure it receives focus with visible focus indicators
- Group avatars should be navigable via keyboard if they're interactive

### Implementation Example

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AccessibleAvatar({ user }) {
  return (
    <Avatar aria-label={user.interactive ? undefined : user.name}>
      {user.image ? (
        <AvatarImage 
          src={user.image}
          alt={user.name} 
          onError={(e) => e.currentTarget.style.display = 'none'}
        />
      ) : null}
      <AvatarFallback>
        {user.initials || user.name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}
```

## Technical Details

### Component Structure

The Avatar component consists of three main parts:

1. **Avatar Root (Avatar)**: The container component that establishes the shape and size
2. **Avatar Image (AvatarImage)**: The image component that displays the user's picture
3. **Avatar Fallback (AvatarFallback)**: The fallback content shown when the image is missing or fails to load

### CSS Variables

The component relies on these CSS variables for styling:

- `--background`: Used for the fallback background color
- `--foreground`: Used for the fallback text color

### Performance Considerations

- The component uses `memo` to prevent unnecessary re-renders
- Images should be properly sized and optimized before being displayed
- Consider lazy loading avatars that appear below the fold
- For avatar groups with many items, consider using virtualization for performance

### Integration Examples

#### Avatar in a User Card

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function UserProfileCard({ user }) {
  return (
    <Card>
      <CardHeader className="flex flex-row gap-4">
        <Avatar>
          <AvatarImage src={user.image} alt={user.name} />
          <AvatarFallback>{user.initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-bold">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.role}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p>{user.bio}</p>
        {/* Additional user info */}
      </CardContent>
    </Card>
  );
}
```

#### Avatar in a Comment System

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Comment({ comment }) {
  return (
    <div className="flex gap-4 pb-4 border-b">
      <Avatar>
        <AvatarImage src={comment.author.image} alt={comment.author.name} />
        <AvatarFallback>{comment.author.initials}</AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-medium">{comment.author.name}</h4>
          <span className="text-xs text-muted-foreground">{comment.dateFormatted}</span>
        </div>
        <p className="mt-1">{comment.content}</p>
      </div>
    </div>
  );
}
```

### Handling Image Loading and Errors

Implement proper handling for image loading states and errors:

```tsx
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AvatarWithErrorHandling({ user }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  return (
    <Avatar>
      {!hasError && (
        <AvatarImage 
          src={user.image} 
          alt={user.name}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        />
      )}
      <AvatarFallback 
        delayMs={isLoading ? 700 : undefined} // Wait for image load before showing fallback
      >
        {user.initials}
      </AvatarFallback>
    </Avatar>
  );
}
```

### Custom Avatar Shapes

While the default Avatar is round, you can customize its shape:

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AvatarShapes() {
  return (
    <div className="flex gap-4">
      {/* Default round avatar */}
      <Avatar>
        <AvatarImage src="https://example.com/user1.jpg" alt="Round Avatar" />
        <AvatarFallback>RA</AvatarFallback>
      </Avatar>
      
      {/* Square avatar */}
      <Avatar className="rounded-lg">
        <AvatarImage src="https://example.com/user2.jpg" alt="Square Avatar" />
        <AvatarFallback>SA</AvatarFallback>
      </Avatar>
      
      {/* Hexagon avatar using clip-path */}
      <Avatar className="rounded-none" style={{ 
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
      }}>
        <AvatarImage src="https://example.com/user3.jpg" alt="Hexagon Avatar" />
        <AvatarFallback>HA</AvatarFallback>
      </Avatar>
    </div>
  );
}
```
