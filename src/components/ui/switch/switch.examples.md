# Switch Component Examples

The Switch component is a toggle control that allows users to turn an option on or off, similar to a light switch. This document provides various examples to demonstrate its flexibility and customization options.

## Basic Usage

The most basic usage of the Switch component:

```tsx
import { Switch } from '@/components/ui/switch';

export default function BasicSwitchExample() {
  return <Switch aria-label="Toggle option" />;
}
```

## Controlled Component

You can control the Switch state using React state:

```tsx
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export default function ControlledSwitchExample() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Switch checked={isChecked} onCheckedChange={setIsChecked} aria-label="Toggle dark mode" />
      <span>Dark mode is {isChecked ? 'on' : 'off'}</span>
    </div>
  );
}
```

## With Label

Add a label and properly associate it with the Switch:

```tsx
import { Switch } from '@/components/ui/switch';

export default function SwitchWithLabelExample() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" aria-label="Toggle airplane mode" />
      <label htmlFor="airplane-mode" className="text-sm font-medium leading-none">
        Airplane Mode
      </label>
    </div>
  );
}
```

## Different Sizes

The Switch component supports different sizes:

```tsx
import { Switch } from '@/components/ui/switch';

export default function SwitchSizesExample() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Switch size="sm" aria-label="Small switch" />
        <span className="text-sm">Small</span>
      </div>

      <div className="flex items-center space-x-2">
        <Switch size="default" aria-label="Default switch" />
        <span className="text-sm">Default</span>
      </div>

      <div className="flex items-center space-x-2">
        <Switch size="lg" aria-label="Large switch" />
        <span className="text-sm">Large</span>
      </div>
    </div>
  );
}
```

## Custom Color Schemes

You can customize the color scheme of the Switch:

```tsx
import { Switch } from '@/components/ui/switch';

export default function SwitchColorsExample() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-2">
        <Switch colorScheme="primary" aria-label="Primary switch" />
        <span className="text-sm">Primary</span>
      </div>

      <div className="flex items-center space-x-2">
        <Switch colorScheme="secondary" aria-label="Secondary switch" />
        <span className="text-sm">Secondary</span>
      </div>

      <div className="flex items-center space-x-2">
        <Switch colorScheme="success" aria-label="Success switch" />
        <span className="text-sm">Success</span>
      </div>

      <div className="flex items-center space-x-2">
        <Switch colorScheme="danger" aria-label="Danger switch" />
        <span className="text-sm">Danger</span>
      </div>

      <div className="flex items-center space-x-2">
        <Switch colorScheme="warning" aria-label="Warning switch" />
        <span className="text-sm">Warning</span>
      </div>
    </div>
  );
}
```

## Disabled State

You can disable the Switch:

```tsx
import { Switch } from '@/components/ui/switch';

export default function DisabledSwitchExample() {
  return (
    <div className="flex space-x-4">
      <div className="flex items-center space-x-2">
        <Switch disabled aria-label="Disabled unchecked" />
        <span className="text-sm text-muted-foreground">Disabled (unchecked)</span>
      </div>

      <div className="flex items-center space-x-2">
        <Switch disabled checked aria-label="Disabled checked" />
        <span className="text-sm text-muted-foreground">Disabled (checked)</span>
      </div>
    </div>
  );
}
```

## Form Integration

Integrate the Switch with a form:

```tsx
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export default function SwitchFormExample() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true
  });

  const handleSubmit = e => {
    e.preventDefault();
    alert(JSON.stringify(notifications, null, 2));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-lg font-medium">Notification Preferences</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="email-notifications" className="text-sm">
            Email Notifications
          </label>
          <Switch
            id="email-notifications"
            checked={notifications.email}
            onCheckedChange={checked => setNotifications({ ...notifications, email: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="push-notifications" className="text-sm">
            Push Notifications
          </label>
          <Switch
            id="push-notifications"
            checked={notifications.push}
            onCheckedChange={checked => setNotifications({ ...notifications, push: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="sms-notifications" className="text-sm">
            SMS Notifications
          </label>
          <Switch
            id="sms-notifications"
            checked={notifications.sms}
            onCheckedChange={checked => setNotifications({ ...notifications, sms: checked })}
          />
        </div>
      </div>

      <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
        Save Preferences
      </button>
    </form>
  );
}
```

## With Description

Add a description for accessibility:

```tsx
import { Switch } from '@/components/ui/switch';

export default function SwitchWithDescriptionExample() {
  return (
    <div className="grid gap-1.5">
      <label htmlFor="terms" className="text-sm font-medium leading-none">
        Accept terms and conditions
      </label>
      <div className="flex items-center space-x-2">
        <Switch id="terms" aria-describedby="terms-description" />
        <span>I agree</span>
      </div>
      <p id="terms-description" className="text-sm text-muted-foreground">
        By accepting, you agree to our terms of service and privacy policy.
      </p>
    </div>
  );
}
```

## Multiple Switches in a Group

Create a group of related switches:

```tsx
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';

export default function SwitchGroupExample() {
  const [features, setFeatures] = useState({
    darkMode: false,
    animations: true,
    soundEffects: false,
    autoSave: true
  });

  const updateFeature = (feature, value) => {
    setFeatures(prev => ({ ...prev, [feature]: value }));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Feature Settings</h3>

      <div className="space-y-3">
        {Object.entries(features).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <label htmlFor={key} className="text-sm capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
            <Switch
              id={key}
              checked={value}
              onCheckedChange={checked => updateFeature(key, checked)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
```
