# Slider Component Examples

## Basic Usage

The Slider component allows users to select a value from a range of values.

```tsx
// Basic slider with single value
<Slider defaultValue={[50]} max={100} step={1} />

// With aria-label for accessibility
<Slider aria-label="Volume" defaultValue={[50]} max={100} step={1} />
```

## Range Selection

You can create a range slider by providing two values in the defaultValue array.

```tsx
// Range slider with two values
<Slider defaultValue={[20, 80]} max={100} step={1} />

// Range slider with min and max values
<Slider defaultValue={[20, 80]} min={0} max={100} step={1} />
```

## Custom Styling

You can customize the slider's appearance by using the subcomponents.

```tsx
// Custom styled slider
<Slider defaultValue={[50]} max={100}>
  <SliderTrack className="custom-track">
    <SliderRange className="custom-range" />
  </SliderTrack>
  <SliderThumb className="custom-thumb" />
</Slider>

// Multiple thumbs with custom styling
<Slider defaultValue={[20, 80]} max={100}>
  <SliderTrack className="h-3 bg-gray-200">
    <SliderRange className="bg-blue-500" />
  </SliderTrack>
  <SliderThumb className="bg-white border-blue-500" />
  <SliderThumb className="bg-white border-blue-500" />
</Slider>
```

## With Form Integration

You can use the slider within forms to collect user input.

```tsx
// With onChange handler to track value changes
import { useState } from 'react';

const [value, setValue] = useState([50]);

<form onSubmit={handleSubmit}>
  <label htmlFor="volume">Volume: {value}%</label>
  <Slider id="volume" defaultValue={value} max={100} step={1} onValueChange={setValue} />
  <button type="submit">Save</button>
</form>;
```

## With Custom Step

You can define the step size for more precise control.

```tsx
// Slider with custom step size
<Slider defaultValue={[25]} max={100} step={5} />

// Slider with decimal step size
<Slider defaultValue={[2.5]} min={0} max={10} step={0.1} />
```

## Disabled State

You can disable the slider to prevent user interaction.

```tsx
// Disabled slider
<Slider defaultValue={[50]} max={100} disabled />
```

## With Controlled Values

You can control the slider value from your component state.

```tsx
import { useState } from 'react';

const [value, setValue] = useState([25]);

<Slider
  value={value}
  onValueChange={setValue}
  max={100}
  step={1}
/>

<button onClick={() => setValue([0])}>Reset</button>
<button onClick={() => setValue([50])}>Set to 50%</button>
<button onClick={() => setValue([100])}>Set to 100%</button>
```
