/**
 * Memory Leak Detection Demo Component
 *
 * This component demonstrates memory leak detection features
 * using the memory tracker service.
 */

import { logger } from '@/services/logger';
import { MemorySnapshot, memoryTracker } from '@/services/memory-tracker';
import { useCallback, useEffect, useState } from 'react';
import './memory-leak-demo.css';

// Create component-specific logger
const demoLogger = logger.createChildLogger('MemoryLeakDemo');

// Types for the memory leak demo
interface LeakArrayItem {
  id: string;
  values: number[];
}

interface LargeObject {
  data: number[];
  id: string;
}

type LeakyClosure = () => void;

interface MemoryStats {
  current: MemorySnapshot;
  isTracking: boolean;
  snapshots: number;
  usedMemory: string;
  totalMemory: string;
  limit: string;
  usagePercent: string;
  growth: string;
  growthDetected: boolean;
  timeElapsed: string;
  detected?: boolean;
}

// Define a union type for each kind of data that can be in the leaky arrays
type LeakyDataChunk = LeakArrayItem[] | LeakyClosure[] | HTMLDivElement[];

export function MemoryLeakDemo() {
  // State to store different types of potentially leaky data
  const [leakyData, setLeakyData] = useState<LeakyDataChunk[]>([]);
  const [controlData, setControlData] = useState<LeakyDataChunk[]>([]);
  const [iterations, setIterations] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [stats, setStats] = useState<MemoryStats | null>(null);
  const [leakType, setLeakType] = useState('array');

  // Start memory tracking
  const startTracking = useCallback(() => {
    if (memoryTracker.isSupported()) {
      const started = memoryTracker.start();
      setIsTracking(started);
      demoLogger.info('Memory tracking started');
    } else {
      demoLogger.warn('Memory tracking not supported in this browser');
      alert('Memory tracking is not supported in this browser. Try Chrome for best results.');
    }
  }, []);

  // Stop memory tracking
  const stopTracking = useCallback(() => {
    memoryTracker.stop();
    setIsTracking(false);
    demoLogger.info('Memory tracking stopped');
  }, []);

  // Create a controlled memory leak
  const createLeak = useCallback(() => {
    demoLogger.info('Creating controlled memory leak', { type: leakType });
    performance.mark('beforeOperation');

    if (leakType === 'array') {
      // Create array memory leak by continuously adding large arrays
      const newArray = Array(100000)
        .fill(0)
        .map((_, i) => ({
          id: `item-${i}-${Date.now()}`,
          values: Array(100).fill(Math.random())
        }));

      // Explicitly cast newArray as a LeakyDataChunk
      setLeakyData(prev => [...prev, newArray as LeakyDataChunk]);
    } else if (leakType === 'closures') {
      // Create closure memory leak
      const leakyClosures: LeakyClosure[] = [];
      for (let i = 0; i < 10000; i++) {
        const largeObject: LargeObject = {
          data: Array(1000).fill(Math.random()),
          id: `closure-${i}-${Date.now()}`
        };

        leakyClosures.push(() => {
          // This closure captures the large object
          console.log(largeObject.id);
        });
      }

      // Store in state to prevent garbage collection
      setLeakyData(prev => [...prev, leakyClosures as LeakyDataChunk]);
    } else if (leakType === 'dom') {
      // Create DOM node leak
      const leakyNodes: HTMLDivElement[] = [];
      for (let i = 0; i < 1000; i++) {
        const div = document.createElement('div');
        div.innerHTML = `<div class="memory-leak-item">
          <span>${i}</span>
          <p>DOM Node that won't be garbage collected</p>
          <data value="${i}">${Math.random()}</data>
        </div>`;

        // Store DOM references preventing garbage collection
        leakyNodes.push(div);
      }

      setLeakyData(prev => [...prev, leakyNodes as LeakyDataChunk]);
    }

    setIterations(prev => prev + 1);
    performance.mark('afterOperation');
    performance.measure('Memory Impact', 'beforeOperation', 'afterOperation');
  }, [leakType]);

  // Properly handle controlled data - will be garbage collected
  const createControlData = useCallback(() => {
    demoLogger.info('Creating properly managed data');

    // Create temporary array that will be garbage collected
    const tempArray = Array(100000)
      .fill(0)
      .map((_, i) => ({
        id: `control-${i}`,
        values: Array(100).fill(Math.random())
      }));

    // Store reference to the data but allow it to be replaced (not leaking)
    setControlData([tempArray as LeakyDataChunk]);
  }, []);

  // Get memory stats and update
  const updateStats = useCallback(() => {
    if (memoryTracker.isSupported()) {
      const currentStats: MemoryStats = memoryTracker.getStats();
      setStats(currentStats);
    }
  }, []);

  // Reset the demo
  const resetDemo = useCallback(() => {
    setLeakyData([]);
    setControlData([]);
    setIterations(0);
    memoryTracker.reset();
    if (isTracking) {
      memoryTracker.start();
    }
    demoLogger.info('Demo reset');
  }, [isTracking]);

  // Update stats periodically
  useEffect(() => {
    if (isTracking) {
      const statsInterval = setInterval(updateStats, 1000);
      return () => clearInterval(statsInterval);
    }
  }, [isTracking, updateStats]);

  // Log when component mounts/unmounts
  useEffect(() => {
    demoLogger.info('Memory leak detection demo mounted');

    // Auto-start if browser supports it
    if (memoryTracker.isSupported()) {
      updateStats();
    }

    return () => {
      // Ensure tracking is stopped when component unmounts
      if (isTracking) {
        memoryTracker.stop();
      }
      demoLogger.info('Memory leak detection demo unmounted');
    };
  }, [isTracking, updateStats]);

  return (
    <div className="memory-leak-page">
      <div className="memory-leak-container">
        <h2 className="memory-heading">Memory Leak Detection Demo</h2>
        <p className="memory-description">
          This demo shows how to detect memory leaks using performance monitoring tools. Works best
          in Chrome with DevTools open.
        </p>

        <div className="memory-controls">
          <div className="memory-control-panel">
            <h3 className="memory-panel-title">Memory Tracking</h3>
            <div className="memory-button-group">
              <button
                className="memory-button memory-button-primary"
                onClick={startTracking}
                disabled={isTracking}
              >
                Start Tracking
              </button>
              <button
                className="memory-button memory-button-secondary"
                onClick={stopTracking}
                disabled={!isTracking}
              >
                Stop Tracking
              </button>
            </div>
          </div>

          <div className="memory-control-panel">
            <h3 className="memory-panel-title" id="leak-type-label">
              Leak Type
            </h3>
            <select
              className="memory-select"
              value={leakType}
              onChange={e => setLeakType(e.target.value)}
              aria-labelledby="leak-type-label"
              id="leak-type-select"
            >
              <option value="array">Array Leak</option>
              <option value="closures">Closure Leak</option>
              <option value="dom">DOM Node Leak</option>
            </select>
          </div>

          <div className="memory-control-panel">
            <h3 className="memory-panel-title">Memory Operations</h3>
            <div className="memory-button-group">
              <button className="memory-button memory-button-warning" onClick={createLeak}>
                Create Memory Leak
              </button>
              <button className="memory-button memory-button-info" onClick={createControlData}>
                Create Normal Data
              </button>
              <button className="memory-button memory-button-danger" onClick={resetDemo}>
                Reset Demo
              </button>
            </div>
          </div>
        </div>

        {stats && (
          <div className="memory-stats-panel">
            <h3 className="memory-panel-title">Memory Statistics</h3>
            <div className="memory-stats-grid">
              <div className="memory-stat-item">
                <span className="memory-stat-label">Used Memory:</span>
                <span className="memory-stat-value">{stats.usedMemory}</span>
              </div>
              <div className="memory-stat-item">
                <span className="memory-stat-label">Total Heap:</span>
                <span className="memory-stat-value">{stats.totalMemory}</span>
              </div>
              <div className="memory-stat-item">
                <span className="memory-stat-label">Heap Limit:</span>
                <span className="memory-stat-value">{stats.limit}</span>
              </div>
              <div className="memory-stat-item">
                <span className="memory-stat-label">Usage:</span>
                <span className="memory-stat-value">{stats.usagePercent}</span>
              </div>
              <div className="memory-stat-item">
                <span className="memory-stat-label">Memory Growth:</span>
                <span
                  className={`memory-stat-value ${stats.growthDetected ? 'memory-stat-alert' : ''}`}
                >
                  {stats.growth}
                </span>
              </div>
              <div className="memory-stat-item">
                <span className="memory-stat-label">Time Elapsed:</span>
                <span className="memory-stat-value">{stats.timeElapsed}</span>
              </div>
              <div className="memory-stat-item">
                <span className="memory-stat-label">Tracking Active:</span>
                <span className="memory-stat-value">{stats.isTracking ? 'Yes' : 'No'}</span>
              </div>
              <div className="memory-stat-item">
                <span className="memory-stat-label">Leak Operations:</span>
                <span className="memory-stat-value">{iterations}</span>
              </div>
            </div>
          </div>
        )}

        <div className="memory-info-box">
          <h3 className="memory-panel-title">About Memory Leak Detection</h3>
          <p>
            Memory leaks occur when your app continuously uses more memory over time without
            releasing it. Common causes include:
          </p>
          <ul className="memory-list">
            <li>Accumulating data in arrays or objects without limits</li>
            <li>Forgotten event listeners</li>
            <li>Closures that capture and retain large objects</li>
            <li>Detached DOM nodes still referenced in JavaScript</li>
          </ul>
          <div className="memory-code-example">
            <h4>Example Memory Leak Pattern:</h4>
            <pre className="memory-code-block">
              {`// This creates a memory leak
const leaks = [];

function addData() {
  // Create large objects and store indefinitely
  const data = Array(10000).fill(Math.random());
  leaks.push(data); // Never cleaned up!
}

// Fix:
// 1. Limit array size: leaks.splice(0, leaks.length - MAX_SIZE);
// 2. Or replace instead of pushing: leaks = [newData];
`}
            </pre>
          </div>
          <div className="memory-tip">
            <strong>Pro Tip:</strong> Open Chrome DevTools and use the Memory or Performance tab to
            capture heap snapshots and identify memory leaks in your application.
          </div>
        </div>

        <div className="memory-data-summary">
          <div>
            <h3 className="memory-panel-title">
              Leaky Data Objects: {leakyData.length > 0 ? leakyData.flat().length : 0}
            </h3>
            <div className="memory-data-box memory-leak-box">
              {leakyData.length > 0 && (
                <div className="memory-leak-indicator">Memory leak detected!</div>
              )}
            </div>
          </div>
          <div>
            <h3 className="memory-panel-title">Controlled Data Objects: {controlData.length}</h3>
            <div className="memory-data-box memory-control-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryLeakDemo;
