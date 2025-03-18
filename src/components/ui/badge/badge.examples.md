# Badge Component Examples

This document provides various examples of how to use the Badge component in different scenarios.

## Basic Usage

The most basic usage is to create a badge with default styling:

```tsx
import { Badge } from '@/components/ui/badge';

export function BasicBadge() {
  return <Badge>New</Badge>;
}
```

## Badge Variants

The Badge component supports different visual variants:

```tsx
import { Badge } from '@/components/ui/badge';

export function BadgeVariants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}
```

## Badges with Icons

Add icons to badges for additional visual cues:

```tsx
import { Badge } from '@/components/ui/badge';
import { Check, X, AlertCircle, Clock } from 'lucide-react';

export function BadgesWithIcons() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="gap-1">
        <Check className="h-3 w-3" />
        Completed
      </Badge>
      <Badge variant="secondary" className="gap-1">
        <Clock className="h-3 w-3" />
        Pending
      </Badge>
      <Badge variant="outline" className="gap-1">
        <AlertCircle className="h-3 w-3" />
        Info
      </Badge>
      <Badge variant="destructive" className="gap-1">
        <X className="h-3 w-3" />
        Failed
      </Badge>
    </div>
  );
}
```

## Status Indicators

Create status indicators using colored dots with badges:

```tsx
import { Badge } from '@/components/ui/badge';

export function StatusBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge variant="outline" className="gap-1">
        <span className="h-2 w-2 rounded-full bg-green-500" />
        Online
      </Badge>
      <Badge variant="outline" className="gap-1">
        <span className="h-2 w-2 rounded-full bg-yellow-500" />
        Away
      </Badge>
      <Badge variant="outline" className="gap-1">
        <span className="h-2 w-2 rounded-full bg-red-500" />
        Offline
      </Badge>
      <Badge variant="outline" className="gap-1">
        <span className="h-2 w-2 rounded-full bg-gray-500" />
        Invisible
      </Badge>
    </div>
  );
}
```

## Custom Sized Badges

Adjust the size of badges using CSS classes:

```tsx
import { Badge } from '@/components/ui/badge';

export function BadgeSizes() {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Badge className="text-[0.625rem] px-2 py-0">Tiny</Badge>
      <Badge>Default</Badge>
      <Badge className="text-sm px-3 py-1">Large</Badge>
    </div>
  );
}
```

## Number Badges

Create number or counter badges:

```tsx
import { Badge } from '@/components/ui/badge';

export function NumberBadges() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="relative inline-block">
        <button className="px-3 py-2 border rounded-md">
          Notifications
        </button>
        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
          5
        </Badge>
      </div>
      
      <div className="relative inline-block">
        <button className="px-3 py-2 border rounded-md">
          Messages
        </button>
        <Badge 
          variant="secondary" 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
        >
          3
        </Badge>
      </div>
    </div>
  );
}
```

## Interactive Badges

Make badges interactive for filtering or toggling states:

```tsx
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export function InteractiveBadges() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const tags = ['React', 'TypeScript', 'UI', 'Component', 'CSS'];
  
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            className="cursor-pointer hover:bg-primary/90"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <div>
        Selected: {selectedTags.length ? selectedTags.join(', ') : 'None'}
      </div>
    </div>
  );
}
```

## Custom Colored Badges

Create badges with custom colors beyond the default variants:

```tsx
import { Badge } from '@/components/ui/badge';

export function CustomColoredBadges() {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-green-500 hover:bg-green-600 text-white border-transparent">
        Success
      </Badge>
      <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white border-transparent">
        Warning
      </Badge>
      <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-transparent">
        Info
      </Badge>
      <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-transparent">
        New
      </Badge>
      <Badge className="bg-pink-500 hover:bg-pink-600 text-white border-transparent">
        Featured
      </Badge>
    </div>
  );
}
```

## Removable Badges

Create badges that can be removed or dismissed:

```tsx
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useState } from 'react';

export function RemovableBadges() {
  const [tags, setTags] = useState([
    'React', 'TypeScript', 'UI', 'Component', 'CSS'
  ]);
  
  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map(tag => (
        <Badge key={tag} variant="secondary" className="gap-1 pr-1">
          {tag}
          <button 
            className="ml-1 rounded-full hover:bg-secondary-foreground/20 h-4 w-4 inline-flex items-center justify-center"
            onClick={() => removeTag(tag)}
          >
            <X className="h-2 w-2" />
            <span className="sr-only">Remove {tag}</span>
          </button>
        </Badge>
      ))}
    </div>
  );
}
```

## Badges in Card UI

Incorporate badges into card interfaces:

```tsx
import { Badge } from '@/components/ui/badge';

export function CardWithBadges() {
  return (
    <div className="border rounded-lg p-4 max-w-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">Product Name</h3>
        <Badge>New</Badge>
      </div>
      <p className="text-gray-500 mb-4">Product description goes here explaining the features and benefits.</p>
      <div className="flex flex-wrap gap-1">
        <Badge variant="outline">Feature 1</Badge>
        <Badge variant="outline">Feature 2</Badge>
        <Badge variant="outline">Feature 3</Badge>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="font-bold">$99.99</span>
        <Badge variant="secondary">In Stock</Badge>
      </div>
    </div>
  );
}
```

## Notification Badges

Create notification badges that appear over icons:

```tsx
import { Badge } from '@/components/ui/badge';
import { Bell, Mail, ShoppingCart } from 'lucide-react';

export function NotificationBadges() {
  return (
    <div className="flex gap-8">
      <div className="relative">
        <Bell className="h-6 w-6" />
        <Badge 
          className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center"
        >
          3
        </Badge>
      </div>
      
      <div className="relative">
        <Mail className="h-6 w-6" />
        <Badge 
          variant="secondary"
          className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center"
        >
          5
        </Badge>
      </div>
      
      <div className="relative">
        <ShoppingCart className="h-6 w-6" />
        <Badge 
          variant="outline"
          className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center"
        >
          2
        </Badge>
      </div>
    </div>
  );
}
```
