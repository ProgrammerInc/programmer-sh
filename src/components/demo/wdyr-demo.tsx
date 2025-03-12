/**
 * Why Did You Render Demo Component
 *
 * This component demonstrates how to use the Why Did You Render package
 * to identify and fix unnecessary re-renders in React components.
 */

import { logger } from '@/services/logger';
import React, { useState, useCallback, memo } from 'react';
import './wdyr-demo.css';

// Create a component-specific logger
const wdyrLogger = logger.createChildLogger('WDYRDemo');

// Parent component that triggers renders
export function WhyDidYouRenderDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  
  // Use useCallback to prevent recreation of this function on every render
  const incrementCounter = useCallback(() => {
    setCount(prev => prev + 1);
    wdyrLogger.mark('counterIncremented');
    wdyrLogger.info('Counter incremented', { newValue: count + 1 });
  }, [count]);
  
  // This function is recreated on every render - will cause child re-renders with function props
  const resetCounter = () => {
    setCount(0);
    wdyrLogger.mark('counterReset');
    wdyrLogger.info('Counter reset');
  };
  
  // Log when parent renders
  wdyrLogger.info('Parent component rendered', { count, textLength: text.length });
  
  return (
    <div className="wdyr-demo-container">
      <h2 className="wdyr-heading">Why Did You Render Demo</h2>
      
      <div>
        <p className="wdyr-description">
          This component demonstrates the Why Did You Render package to help identify unnecessary re-renders.
          Open your console to see WDYR logs about components that re-render.
        </p>
        
        <div className="wdyr-code-box">
          <p className="wdyr-highlight">Look for console logs with [WDYR] prefix</p>
        </div>
      </div>
      
      <div className="wdyr-grid">
        <div className="wdyr-panel">
          <h3 className="wdyr-panel-title">Optimized Child Component</h3>
          <p className="wdyr-panel-description">
            This component uses <code>memo</code> and <code>useCallback</code> to prevent unnecessary re-renders.
          </p>
          <OptimizedChild 
            count={count} 
            onIncrement={incrementCounter} 
          />
        </div>
        
        <div className="wdyr-panel">
          <h3 className="wdyr-panel-title">Unoptimized Child Component</h3>
          <p className="wdyr-panel-description">
            This component will re-render when parent renders, even when its props haven't changed.
          </p>
          <UnoptimizedChild 
            count={count} 
            onReset={resetCounter} 
          />
        </div>
      </div>
      
      <div className="wdyr-input-container">
        <h3 className="wdyr-panel-title">Trigger Parent Re-render</h3>
        <p className="wdyr-panel-description">
          Type in this input to trigger a parent re-render without changing the count.
          Watch how each child component responds differently.
        </p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type to trigger parent re-render..."
          className="wdyr-input"
        />
      </div>
      
      <div className="wdyr-docs">
        <p className="wdyr-panel-title">How to track your own components:</p>
        <pre className="wdyr-code-sample">{`// Option 1: Enable tracking on a specific component
MyComponent.whyDidYouRender = true;

// Option 2: Use displayName for clearer logs
MyComponent.displayName = 'MyComponent';
MyComponent.whyDidYouRender = true;

// Option 3: Track class components
class MyComponent extends React.Component {
  static whyDidYouRender = true;
  // component code...
}`}</pre>
      </div>
    </div>
  );
}

// Type definitions for component props
interface ChildProps {
  count: number;
}

interface OptimizedChildProps extends ChildProps {
  onIncrement: () => void;
}

interface UnoptimizedChildProps extends ChildProps {
  onReset: () => void;
}

// Optimized child component using memo
const OptimizedChild = memo(function OptimizedChild({ count, onIncrement }: OptimizedChildProps) {
  // Log when optimized child renders
  wdyrLogger.info('OptimizedChild rendered', { count });
  
  return (
    <div className="wdyr-component-optimized">
      <p>Count: {count}</p>
      <button 
        className="wdyr-button wdyr-button-blue"
        onClick={onIncrement}
      >
        Increment
      </button>
    </div>
  );
});

// Enable Why Did You Render for this component
OptimizedChild.whyDidYouRender = true;

// Unoptimized child component that will re-render unnecessarily
function UnoptimizedChild({ count, onReset }: UnoptimizedChildProps) {
  // Log when unoptimized child renders
  wdyrLogger.info('UnoptimizedChild rendered', { count });
  
  return (
    <div className="wdyr-component-unoptimized">
      <p>Count: {count}</p>
      <button 
        className="wdyr-button wdyr-button-red"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
}

// Enable Why Did You Render for this component
UnoptimizedChild.whyDidYouRender = true;

export default WhyDidYouRenderDemo;
