# Switch Component Guide

This guide provides detailed information about the Switch component, including best practices, accessibility considerations, and integration tips.

## Overview

The Switch component is a toggle control that allows users to turn an option on or off. It's similar to a checkbox but with a different visual representation that more closely resembles a physical switch.

## Accessibility

### ARIA Attributes

The Switch component is built on top of Radix UI's Switch primitive, which ensures proper accessibility. Here are key ARIA attributes to consider:

- **aria-label**: If the switch doesn't have a visible label, always provide an `aria-label` attribute.
- **aria-labelledby**: If the switch has a visible label, use `aria-labelledby` and point it to the ID of the label element.
- **aria-describedby**: If the switch has additional description text, use `aria-describedby` to link to that text.

```tsx
// With aria-label (no visible label)
<Switch aria-label="Toggle dark mode" />

// With visible label
<div>
  <label id="switch-label">Dark Mode</label>
  <Switch aria-labelledby="switch-label" />
</div>

// With description
<div>
  <label id="switch-label">Email Notifications</label>
  <Switch 
    aria-labelledby="switch-label" 
    aria-describedby="switch-desc" 
  />
  <p id="switch-desc">Receive email notifications for account updates.</p>
</div>
```

### Keyboard Navigation

The Switch component supports the following keyboard interactions:

- **Tab**: Focuses the switch
- **Space**: Toggles the switch state

### Focus Management

The Switch component has appropriate focus styles. These styles are visible when navigating with a keyboard but not when clicking with a mouse, providing a better experience for keyboard users without affecting mouse users.

## Best Practices

### Use Clear Labels

Always provide clear and concise labels for your switches. The label should clearly communicate what option is being toggled.

```tsx
// Good
<div className="flex items-center space-x-2">
  <Switch id="dark-mode" />
  <label htmlFor="dark-mode">Dark Mode</label>
</div>

// Avoid
<div className="flex items-center space-x-2">
  <Switch id="toggle" />
  <label htmlFor="toggle">Toggle</label>
</div>
```

### Provide Immediate Feedback

When a user toggles a switch, the change should be visible immediately. For actions that require processing, consider showing a loading state.

```tsx
const [isChecked, setIsChecked] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const handleChange = async (checked) => {
  setIsLoading(true);
  setIsChecked(checked);
  // Perform an async operation
  await updateUserPreference(checked);
  setIsLoading(false);
};

<div className="flex items-center space-x-2">
  <Switch 
    checked={isChecked}
    onCheckedChange={handleChange}
    disabled={isLoading}
  />
  {isLoading && <span>Saving...</span>}
</div>
```

### Group Related Switches

When you have multiple related switches, group them together and provide a descriptive heading.

```tsx
<fieldset className="space-y-4">
  <legend className="text-lg font-medium">Notification Settings</legend>
  
  <div className="flex items-center justify-between">
    <label htmlFor="email-notif">Email Notifications</label>
    <Switch id="email-notif" />
  </div>
  
  <div className="flex items-center justify-between">
    <label htmlFor="push-notif">Push Notifications</label>
    <Switch id="push-notif" />
  </div>
  
  <div className="flex items-center justify-between">
    <label htmlFor="sms-notif">SMS Notifications</label>
    <Switch id="sms-notif" />
  </div>
</fieldset>
```

### Use Appropriate Colors

Use colors that provide sufficient contrast and convey meaning. The default switch uses the primary color for the active state, but you can customize it using the `colorScheme` prop.

```tsx
// Success action
<Switch colorScheme="success" aria-label="Enable feature" />

// Destructive action
<Switch colorScheme="danger" aria-label="Delete account data" />
```

## Common Patterns

### Settings Toggle

One of the most common use cases for switches is in settings panels.

```tsx
<div className="space-y-6">
  <h2 className="text-xl font-bold">Account Settings</h2>
  
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
      </div>
      <Switch aria-label="Toggle two-factor authentication" />
    </div>
    
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">Public Profile</h3>
        <p className="text-sm text-muted-foreground">Make your profile visible to everyone</p>
      </div>
      <Switch aria-label="Toggle public profile" />
    </div>
  </div>
</div>
```

### Feature Flag Toggle

Switches are often used to toggle feature flags or experimental features.

```tsx
<div className="p-4 border rounded-md">
  <div className="flex items-center justify-between">
    <div>
      <h3 className="font-medium">Beta Features</h3>
      <p className="text-sm text-muted-foreground">Enable experimental features</p>
    </div>
    <Switch aria-label="Enable beta features" />
  </div>
  
  <div className="mt-4 p-3 bg-muted rounded text-sm">
    <p className="font-medium">Warning</p>
    <p>Beta features may be unstable and could change without notice.</p>
  </div>
</div>
```

## Integration with Forms

The Switch component can be integrated with form libraries like React Hook Form:

```tsx
import { useForm, Controller } from 'react-hook-form';
import { Switch } from '@/components/ui/switch';

export default function SwitchFormExample() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      emailNotifications: true,
      marketingEmails: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label htmlFor="emailNotifications">
            Email Notifications
          </label>
          <Controller
            name="emailNotifications"
            control={control}
            render={({ field }) => (
              <Switch
                id="emailNotifications"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <label htmlFor="marketingEmails">
            Marketing Emails
          </label>
          <Controller
            name="marketingEmails"
            control={control}
            render={({ field }) => (
              <Switch
                id="marketingEmails"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
      
      <button 
        type="submit"
        className="px-4 py-2 bg-primary text-white rounded"
      >
        Save Preferences
      </button>
    </form>
  );
}
```

## Theming and Customization

The Switch component can be customized through CSS variables and the `className` prop:

```tsx
// Custom styling through className
<Switch 
  className="[&>span]:bg-blue-500 [&[data-state=checked]]:bg-green-500" 
  aria-label="Custom styled switch" 
/>
```

## Performance Considerations

The Switch component uses React.memo to prevent unnecessary re-renders. When using the Switch in a list or in situations where it might re-render frequently, you should follow these best practices:

1. Use a callback function for `onCheckedChange` that doesn't change on each render
2. Avoid creating new objects or arrays in props

```tsx
// Good practice
const handleCheckedChange = useCallback((checked) => {
  // Handle the change
  setIsEnabled(checked);
}, []);

<Switch 
  checked={isEnabled} 
  onCheckedChange={handleCheckedChange} 
/>

// Avoid this pattern in performance-sensitive areas
<Switch 
  checked={isEnabled} 
  onCheckedChange={(checked) => setIsEnabled(checked)} 
/>
```
