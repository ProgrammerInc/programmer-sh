# Tabs Component Examples

The Tabs component provides a flexible way to organize and switch between different sections of content. This document showcases various examples of how to use the Tabs component and its sub-components.

## Basic Tabs

A simple tabs interface with default styling:

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function BasicTabs() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
        <TabsTrigger value="tab3">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 border rounded-md mt-2">
          <h2 className="text-lg font-medium">Account Settings</h2>
          <p className="mt-2">Manage your account preferences here.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 border rounded-md mt-2">
          <h2 className="text-lg font-medium">Password Settings</h2>
          <p className="mt-2">Update your password and security preferences.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 border rounded-md mt-2">
          <h2 className="text-lg font-medium">General Settings</h2>
          <p className="mt-2">Configure application settings and preferences.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

## Tabs with Different Variants

The Tabs component supports different variants: 'default', 'underline', 'card', and 'bordered':

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function TabsVariants() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4">Default Variant</h3>
        <Tabs defaultValue="tab1" variant="default">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for Tab 1</TabsContent>
          <TabsContent value="tab2">Content for Tab 2</TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4">Underline Variant</h3>
        <Tabs defaultValue="tab1" variant="underline">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for Tab 1</TabsContent>
          <TabsContent value="tab2">Content for Tab 2</TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4">Card Variant</h3>
        <Tabs defaultValue="tab1" variant="card">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for Tab 1</TabsContent>
          <TabsContent value="tab2">Content for Tab 2</TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4">Bordered Variant</h3>
        <Tabs defaultValue="tab1" variant="bordered">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for Tab 1</TabsContent>
          <TabsContent value="tab2">Content for Tab 2</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
```

## Tabs with Different Sizes

The Tabs component supports different sizes: 'default', 'sm' (small), and 'lg' (large):

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function TabsSizes() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-4">Small Size</h3>
        <Tabs defaultValue="tab1" size="sm">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for small tabs</TabsContent>
          <TabsContent value="tab2">More content for small tabs</TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4">Default Size</h3>
        <Tabs defaultValue="tab1" size="default">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for default size tabs</TabsContent>
          <TabsContent value="tab2">More content for default size tabs</TabsContent>
        </Tabs>
      </div>

      <div>
        <h3 className="mb-4">Large Size</h3>
        <Tabs defaultValue="tab1" size="lg">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">Content for large tabs</TabsContent>
          <TabsContent value="tab2">More content for large tabs</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
```

## Vertical Tabs

The Tabs component supports vertical orientation:

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function VerticalTabs() {
  return (
    <Tabs defaultValue="tab1" orientation="vertical">
      <TabsList>
        <TabsTrigger value="tab1">Profile</TabsTrigger>
        <TabsTrigger value="tab2">Account</TabsTrigger>
        <TabsTrigger value="tab3">Notifications</TabsTrigger>
        <TabsTrigger value="tab4">Privacy</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium">Profile Settings</h3>
          <p className="mt-2">Manage your profile information.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="mt-2">Manage your account details.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium">Notification Preferences</h3>
          <p className="mt-2">Configure how you receive notifications.</p>
        </div>
      </TabsContent>
      <TabsContent value="tab4">
        <div className="p-4 border rounded-md">
          <h3 className="text-lg font-medium">Privacy Settings</h3>
          <p className="mt-2">Control your privacy preferences.</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

## Controlled Tabs

Implementing controlled tabs with state management:

```tsx
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div>
      <div className="mb-4">
        <p>Current active tab: {activeTab}</p>
        <button
          onClick={() => setActiveTab('tab3')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
        >
          Programmatically switch to Tab 3
        </button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content for Tab 1</TabsContent>
        <TabsContent value="tab2">Content for Tab 2</TabsContent>
        <TabsContent value="tab3">Content for Tab 3</TabsContent>
      </Tabs>
    </div>
  );
}
```

## Tabs with Disabled Options

Disabling specific tab triggers:

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function TabsWithDisabledOptions() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Available</TabsTrigger>
        <TabsTrigger value="tab2" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="tab3">Available</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for Tab 1</TabsContent>
      <TabsContent value="tab2">This content won't be accessible through disabled tab</TabsContent>
      <TabsContent value="tab3">Content for Tab 3</TabsContent>
    </Tabs>
  );
}
```

## Tabs with Icons

Adding icons to tab triggers for better visual cues:

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { User, Lock, Settings, Bell } from 'lucide-react';

export function TabsWithIcons() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Profile</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="tab2">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="tab3">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </div>
        </TabsTrigger>
        <TabsTrigger value="tab4">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Profile content here</TabsContent>
      <TabsContent value="tab2">Security content here</TabsContent>
      <TabsContent value="tab3">Notifications content here</TabsContent>
      <TabsContent value="tab4">Settings content here</TabsContent>
    </Tabs>
  );
}
```

## Tabs in a Card Layout

Combining tabs with a card component for a cohesive UI:

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export function TabsInCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" variant="underline">
          <TabsList className="w-full">
            <TabsTrigger value="general" className="flex-1">
              General
            </TabsTrigger>
            <TabsTrigger value="password" className="flex-1">
              Password
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex-1">
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border rounded-md"
                  defaultValue="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full p-2 border rounded-md"
                  defaultValue="john.doe@example.com"
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Current Password</label>
                <input type="password" className="mt-1 block w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">New Password</label>
                <input type="password" className="mt-1 block w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">Confirm Password</label>
                <input type="password" className="mt-1 block w-full p-2 border rounded-md" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notifications">
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="email-notifications" className="mr-2" defaultChecked />
                <label htmlFor="email-notifications">Email Notifications</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="push-notifications" className="mr-2" defaultChecked />
                <label htmlFor="push-notifications">Push Notifications</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="sms-notifications" className="mr-2" />
                <label htmlFor="sms-notifications">SMS Notifications</label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <button className="px-4 py-2 border rounded-md">Cancel</button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Save Changes</button>
      </CardFooter>
    </Card>
  );
}
```

## Lazy Loading Tab Content

Optimizing performance by only mounting content when a tab is active:

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useState } from 'react';

export function LazyTabs() {
  const [visitedTabs, setVisitedTabs] = useState<string[]>(['tab1']);

  const handleTabChange = (value: string) => {
    if (!visitedTabs.includes(value)) {
      setVisitedTabs([...visitedTabs, value]);
    }
  };

  return (
    <Tabs defaultValue="tab1" onValueChange={handleTabChange}>
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2 (Heavy)</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3 (Heavy)</TabsTrigger>
      </TabsList>

      {/* Always mounted (default tab) */}
      <TabsContent value="tab1">
        <div className="p-4 border rounded-md mt-2">
          <h3>Tab 1 Content</h3>
          <p>This tab is always mounted.</p>
        </div>
      </TabsContent>

      {/* Only mount if visited */}
      {visitedTabs.includes('tab2') && (
        <TabsContent value="tab2">
          <div className="p-4 border rounded-md mt-2">
            <h3>Tab 2 Content</h3>
            <p>This tab is only mounted once it's been visited.</p>
            <div className="mt-2">
              <p>Heavy content simulation: large table with 100 rows</p>
              <div className="border mt-2 rounded-md max-h-60 overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="p-2 border-b">ID</th>
                      <th className="p-2 border-b">Item</th>
                      <th className="p-2 border-b">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 100 }).map((_, index) => (
                      <tr key={index}>
                        <td className="p-2 border-b">{index + 1}</td>
                        <td className="p-2 border-b">Item {index + 1}</td>
                        <td className="p-2 border-b">Description for item {index + 1}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>
      )}

      {/* Only mount if visited */}
      {visitedTabs.includes('tab3') && (
        <TabsContent value="tab3">
          <div className="p-4 border rounded-md mt-2">
            <h3>Tab 3 Content</h3>
            <p>This tab is only mounted once it's been visited.</p>
            <div className="mt-2">
              <p>Heavy content simulation: many form elements</p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {Array.from({ length: 20 }).map((_, index) => (
                  <div key={index} className="space-y-1">
                    <label className="text-sm font-medium">Field {index + 1}</label>
                    <input type="text" className="w-full p-2 border rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      )}
    </Tabs>
  );
}
```
