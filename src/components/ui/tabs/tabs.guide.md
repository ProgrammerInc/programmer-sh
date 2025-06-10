# Tabs Component Guide

This guide provides best practices, accessibility information, and implementation details for the Tabs component.

## Best Practices

### Component Structure

- Use the complete set of components for proper semantics: `Tabs`, `TabsList`, `TabsTrigger`, and `TabsContent`.
- Always ensure each `TabsTrigger` has a matching `TabsContent` with the same value.
- Provide a `defaultValue` that matches one of your tab values to ensure a tab is selected when the component mounts.

### Usability

- Use clear, concise labels for tab triggers.
- Keep related content within each tab (don't split related information across tabs).
- Limit the number of tabs to a reasonable amount (generally 2-7 tabs works well).
- Consider adding icons alongside text for visual cues where appropriate.
- Place the most frequently accessed or important content in the first tab.

### Performance

- For tabs with heavy content, consider lazy loading the content only when the tab is selected.
- Use React.memo (already applied in the refactored component) to prevent unnecessary re-renders.
- For very large tab content, consider implementing virtualization or pagination within the tab content.

### Variants and Styling

- Choose the appropriate variant based on your UI needs:
  - `default`: Standard tabs with a muted background
  - `underline`: Clean tabs with an underline indicator
  - `card`: Tabs that look like individual cards
  - `bordered`: Tabs with a border around the content area
- Use consistent sizing throughout your application:
  - `sm`: Compact tabs for space-constrained UIs
  - `default`: Standard-sized tabs for most cases
  - `lg`: Larger tabs for increased visibility or touch targets

### Layout and Orientation

- Use horizontal tabs (the default) for most standard cases.
- Consider vertical tabs when:
  - You have many tabs and horizontal space is limited
  - You're displaying a sidebar navigation pattern
  - The tab labels are long and would wrap in a horizontal layout

## Accessibility Guidelines

### Keyboard Navigation

The Tabs component uses Radix UI's primitives, which provide excellent keyboard support:

- `Tab`: Moves focus to the next focusable element
- `Shift + Tab`: Moves focus to the previous focusable element
- `Arrow keys`: When focus is on `TabsList`, moves between tab triggers
- `Space` or `Enter`: Activates the focused tab trigger
- `Home`: When focus is on `TabsList`, moves focus to the first tab trigger
- `End`: When focus is on `TabsList`, moves focus to the last tab trigger

### ARIA Attributes

The component automatically handles proper ARIA attributes:

- `role="tablist"` on the `TabsList`
- `role="tab"` on `TabsTrigger` elements
- `role="tabpanel"` on `TabsContent` elements
- `aria-selected` to indicate the selected tab
- `aria-controls` and `aria-labelledby` to establish relationships between tabs and content

### Focus Management

- Focus styles are properly applied for keyboard users.
- Focus is properly managed when switching between tabs.
- The tab content maintains proper focus ordering for screen readers.

### Other Accessibility Considerations

- Ensure sufficient color contrast for all tab states (default, hover, active, disabled).
- Don't rely solely on color to indicate the active tab; the active tab should have multiple visual indicators.
- For vertical tabs, ensure there's a clear relationship between the tabs and their content.

## Implementation Details

### Component Architecture

The Tabs component is built on Radix UI's primitives and uses these key files:

- `tabs.tsx`: Main component implementation
- `tabs.types.ts`: TypeScript interfaces and types
- `tabs.module.css`: CSS modules for styling
- `index.ts`: Export manager for the component

### CSS Module Structure

The CSS module (`tabs.module.css`) organizes styles with these key classes:

- `.tabs`: Base container styles
- `.tabs-list`: Styles for the tab list container
- `.tabs-trigger`: Styles for individual tab triggers
- `.tabs-content`: Styles for the tab content area

Variant-specific classes:

- `.tabs-underline`: Styles for the underline variant
- `.tabs-card`: Styles for the card variant
- `.tabs-bordered`: Styles for the bordered variant

Size-specific classes:

- `.tabs-sm`: Styles for small tabs
- `.tabs-lg`: Styles for large tabs

Orientation-specific classes:

- `.tabs-vertical`: Styles for vertical orientation

### Variants Implementation

Variants are implemented using CSS classes and controlled via props:

```tsx
<Tabs variant="underline">{/* ... */}</Tabs>
```

The variant prop is passed to the root component and used to generate appropriate class names for all nested components.

### Size Implementation

Sizes are implemented similarly to variants:

```tsx
<Tabs size="lg">{/* ... */}</Tabs>
```

### Orientation Implementation

Orientation is controlled via the `orientation` prop:

```tsx
<Tabs orientation="vertical">{/* ... */}</Tabs>
```

This sets both the CSS classes for visual layout and the ARIA attributes for accessibility.

## Common Patterns

### Controlled Tabs

For controlled tabs where you need to manage the state:

```tsx
const [activeTab, setActiveTab] = useState('tab1');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  {/* ... */}
</Tabs>;
```

### Lazy Loading Content

For tabs with heavy content that should only load when selected:

```tsx
const [visitedTabs, setVisitedTabs] = useState(['tab1']);

const handleTabChange = value => {
  if (!visitedTabs.includes(value)) {
    setVisitedTabs([...visitedTabs, value]);
  }
};

<Tabs defaultValue="tab1" onValueChange={handleTabChange}>
  <TabsList>{/* ... */}</TabsList>
  <TabsContent value="tab1">{/* Default tab content */}</TabsContent>
  {visitedTabs.includes('tab2') && <TabsContent value="tab2">{/* Heavy content */}</TabsContent>}
</Tabs>;
```

### Tabs with Icons

For tabs with both icons and text:

```tsx
<TabsTrigger value="account">
  <div className="flex items-center gap-2">
    <UserIcon className="h-4 w-4" />
    <span>Account</span>
  </div>
</TabsTrigger>
```

### Dynamic Tabs

For dynamically generated tabs:

```tsx
const tabs = [
  { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
  { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
  { id: 'tab3', label: 'Tab 3', content: 'Content 3' }
];

<Tabs defaultValue={tabs[0].id}>
  <TabsList>
    {tabs.map(tab => (
      <TabsTrigger key={tab.id} value={tab.id}>
        {tab.label}
      </TabsTrigger>
    ))}
  </TabsList>
  {tabs.map(tab => (
    <TabsContent key={tab.id} value={tab.id}>
      {tab.content}
    </TabsContent>
  ))}
</Tabs>;
```

## Troubleshooting

### Common Issues

1. **All tabs showing at once or no tabs showing**

   - Ensure each `TabsTrigger` has a matching `TabsContent` with exactly the same value
   - Verify the `defaultValue` matches one of your tab values
   - Check that the `value` prop (if using controlled mode) is correctly set

2. **Tab content not updating when tab changes**

   - If using controlled mode, ensure your `onValueChange` handler is correctly updating the state
   - Verify that each tab has a unique value

3. **Styling issues with specific variants**

   - Ensure the CSS module is properly imported
   - Check that CSS variables for colors are properly defined in your theme

4. **Vertical tabs not displaying correctly**
   - Make sure you've set `orientation="vertical"` on the `Tabs` component
   - Check that the CSS module is properly loaded

### Advanced Customization

For advanced customization beyond the provided variants and sizes:

1. **Custom styling**:

   ```tsx
   <Tabs className="my-custom-tabs">
     <TabsList className="my-custom-tabs-list">
       <TabsTrigger className="my-custom-trigger" value="tab1">
         Tab 1
       </TabsTrigger>
       {/* ... */}
     </TabsList>
     {/* ... */}
   </Tabs>
   ```

2. **Dynamic props based on state**:

   ```tsx
   <TabsTrigger value="tab1" className={isSpecial ? 'special-tab' : ''} disabled={!hasPermission}>
     Tab 1
   </TabsTrigger>
   ```

3. **Integration with routing**:

   ```tsx
   const router = useRouter();
   const currentTab = router.query.tab || 'default';

   const handleTabChange = value => {
     router.push(`?tab=${value}`, undefined, { shallow: true });
   };

   <Tabs value={currentTab} onValueChange={handleTabChange}>
     {/* ... */}
   </Tabs>;
   ```
