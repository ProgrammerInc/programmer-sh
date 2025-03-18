# Textarea Examples

## Basic Usage

The simplest way to use the Textarea component is with default settings:

```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea placeholder="Type your message here" />
```

## Size Variants

The Textarea component supports three size variants: small, medium, and large:

```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea size="sm" placeholder="Small textarea" />
<Textarea size="md" placeholder="Medium textarea" /> {/* Default */}
<Textarea size="lg" placeholder="Large textarea" />
```

## Status Variants

You can display different statuses with the textarea:

```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea status="default" placeholder="Default state" /> {/* Default */}
<Textarea status="error" placeholder="Error state" />
<Textarea status="success" placeholder="Success state" />
```

## Resize Options

Control how the textarea can be resized by users:

```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea resize="none" placeholder="Cannot be resized" />
<Textarea resize="vertical" placeholder="Can be resized vertically" /> {/* Default */}
<Textarea resize="horizontal" placeholder="Can be resized horizontally" />
<Textarea resize="both" placeholder="Can be resized in both directions" />
```

## Auto-growing Textareas

The textarea can automatically adjust its height based on content within specified row limits:

```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea 
  minRows={3} 
  maxRows={8} 
  placeholder="I will automatically grow between 3-8 rows as you type..." 
/>
```

## Disabled State

Disable the textarea to prevent user interaction:

```tsx
import { Textarea } from '@/components/ui/textarea';

<Textarea 
  disabled 
  value="This textarea cannot be edited" 
/>
```

## With Custom Styling

Apply custom styles to the textarea:

```tsx
import { Textarea } from '@/components/ui/textarea';
import styles from './custom-styles.module.css';

<Textarea 
  className={styles.customTextarea} 
  placeholder="Custom styled textarea" 
/>
```

## Within Forms

Use with React forms for form submission:

```tsx
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const MyForm = () => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted message:', message);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="message">Your Message:</label>
      <Textarea 
        id="message"
        name="message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};
```

## With Character Count

Implement a character count display:

```tsx
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const MessageWithCharCount = () => {
  const [message, setMessage] = useState('');
  const maxLength = 280;
  
  return (
    <div>
      <Textarea 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        maxLength={maxLength}
      />
      <div className="text-right text-sm text-gray-500">
        {message.length}/{maxLength} characters
      </div>
    </div>
  );
};
```

## With Validation Feedback

Implement validation feedback for the textarea:

```tsx
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const ValidatedTextarea = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const validateMessage = (value) => {
    if (value.length < 10) {
      setError('Message must be at least 10 characters long');
      return false;
    }
    setError('');
    return true;
  };
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setMessage(newValue);
    validateMessage(newValue);
  };
  
  return (
    <div>
      <Textarea 
        value={message}
        onChange={handleChange}
        placeholder="Type your message here..."
        status={error ? 'error' : 'default'}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};
```
