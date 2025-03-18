# Avatar Component Examples

This document provides various examples of how to use the Avatar component in different scenarios.

## Basic Usage

The most basic usage is to create an avatar with an image and fallback text:

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function BasicAvatar() {
  return (
    <Avatar>
      <AvatarImage src="https://example.com/avatar.jpg" alt="User's name" />
      <AvatarFallback>UN</AvatarFallback>
    </Avatar>
  );
}
```

## Avatar with Fallback Only

When an image isn't available, you can use just the fallback:

```tsx
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function FallbackAvatar() {
  return (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}
```

## Different Sizes

You can customize the size of the avatar using CSS classes:

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AvatarSizes() {
  return (
    <div className="flex items-end gap-4">
      <Avatar className="h-6 w-6">
        <AvatarImage src="https://example.com/avatar.jpg" alt="Small avatar" />
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
      
      <Avatar> {/* Default size */}
        <AvatarImage src="https://example.com/avatar.jpg" alt="Default avatar" />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      
      <Avatar className="h-16 w-16">
        <AvatarImage src="https://example.com/avatar.jpg" alt="Large avatar" />
        <AvatarFallback>L</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

## Custom Styled Avatar

Customize the appearance of the avatar with additional classes:

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function CustomAvatar() {
  return (
    <Avatar className="border-4 border-primary">
      <AvatarImage src="https://example.com/avatar.jpg" alt="Styled avatar" />
      <AvatarFallback className="bg-primary text-primary-foreground font-bold">
        SA
      </AvatarFallback>
    </Avatar>
  );
}
```

## Avatar with Status Indicator

Add an online/offline status indicator:

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AvatarWithStatus({ status = 'online' }) {
  return (
    <div className="relative">
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="User with status" />
        <AvatarFallback>US</AvatarFallback>
      </Avatar>
      <span 
        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} 
        aria-hidden="true"
      />
      <span className="sr-only">{status === 'online' ? 'Online' : 'Offline'}</span>
    </div>
  );
}
```

## Avatar Group

Create a group of avatars for a team or group display:

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AvatarGroup() {
  const team = [
    { name: 'John Doe', image: 'https://example.com/john.jpg', initials: 'JD' },
    { name: 'Jane Smith', image: 'https://example.com/jane.jpg', initials: 'JS' },
    { name: 'Robert Brown', image: 'https://example.com/robert.jpg', initials: 'RB' },
    // Additional users not shown but counted
    { name: 'Additional Users', image: '', initials: '+2' },
  ];
  
  return (
    <div className="flex -space-x-4">
      {team.map((person, index) => (
        <Avatar 
          key={index} 
          className="border-2 border-background"
          aria-label={person.name}
        >
          {person.image ? (
            <AvatarImage src={person.image} alt={person.name} />
          ) : null}
          <AvatarFallback>{person.initials}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
```

## Loading State with Skeleton

Show a loading state while the image is loading:

```tsx
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

export function LoadingAvatar() {
  const [isLoading, setIsLoading] = useState(true);
  
  return (
    <>
      {isLoading && (
        <Skeleton className="h-10 w-10 rounded-full" />
      )}
      <div className={isLoading ? 'hidden' : 'block'}>
        <Avatar>
          <AvatarImage 
            src="https://example.com/avatar.jpg" 
            alt="Loading avatar"
            onLoad={() => setIsLoading(false)}
          />
          <AvatarFallback>LA</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}
```

## Clickable Avatar with Dropdown

Use an avatar as a trigger for a dropdown menu:

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function AvatarWithDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:opacity-80">
          <AvatarImage src="https://example.com/avatar.jpg" alt="User menu" />
          <AvatarFallback>UM</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Avatar with Name and Description

Display additional user information alongside the avatar:

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function AvatarWithDetails() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar>
        <AvatarImage src="https://example.com/avatar.jpg" alt="Jane Smith" />
        <AvatarFallback>JS</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-sm font-medium">Jane Smith</p>
        <p className="text-xs text-muted-foreground">Product Designer</p>
      </div>
    </div>
  );
}
```

## Avatars with Color Variations

Assign different background colors based on user data:

```tsx
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function ColoredAvatars() {
  const users = [
    { name: 'Alice Johnson', color: 'bg-red-500' },
    { name: 'Bob Wilson', color: 'bg-blue-500' },
    { name: 'Carol Martinez', color: 'bg-green-500' },
    { name: 'Dave Thompson', color: 'bg-yellow-500' },
    { name: 'Eve Jackson', color: 'bg-purple-500' },
  ];
  
  // Function to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <div className="flex gap-2">
      {users.map((user, index) => (
        <Avatar key={index}>
          <AvatarFallback className={`${user.color} text-white`}>
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
```
