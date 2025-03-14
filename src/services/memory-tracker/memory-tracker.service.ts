/**
 * Memory Tracker Service
 *
 * A utility for tracking memory usage and detecting potential memory leaks
 * in web applications. Uses the Chrome Performance API where available.
 */

import { logger } from '../logger';

// Create a service-specific logger
const memoryLogger = logger.createChildLogger('MemoryTracker');

/**
 * Chrome-specific Performance interface with memory information
 * This extends the standard Performance interface with Chrome's memory property
 */
interface PerformanceMemory {
  jsHeapSizeLimit: number;
  totalJSHeapSize: number;
  usedJSHeapSize: number;
}

/**
 * Extended Performance interface that includes Chrome's memory property
 */
interface ExtendedPerformance extends Performance {
  memory?: PerformanceMemory;
}

/**
 * Extended Window interface that includes Chrome DevTools specific methods
 * for memory profiling and garbage collection
 */
interface ExtendedWindow extends Window {
  gc?: () => void;
}

// Memory snapshot interface for tracking heap usage over time
export interface MemorySnapshot {
  timestamp: number;
  jsHeapSizeLimit?: number;
  totalJSHeapSize?: number;
  usedJSHeapSize?: number;
}

// Configuration options for memory tracking
export interface MemoryTrackerOptions {
  sampleInterval?: number; // Milliseconds between samples (default: 5000)
  maxSamples?: number; // Maximum snapshots to keep (default: 100)
  growthThreshold?: number; // Percent growth to trigger warnings (default: 10)
  autoStart?: boolean; // Whether to start tracking on init (default: false)
  debugMode?: boolean; // Whether to output detailed logs (default: false)
}

/**
 * Memory Tracker class for monitoring memory usage and detecting leaks
 */
export class MemoryTracker {
  private static instance: MemoryTracker;
  private snapshots: MemorySnapshot[] = [];
  private trackingInterval: number | null = null;
  private options: Required<MemoryTrackerOptions>;

  // Default configuration values
  private readonly DEFAULT_OPTIONS: Required<MemoryTrackerOptions> = {
    sampleInterval: 5000,
    maxSamples: 100,
    growthThreshold: 10,
    autoStart: false,
    debugMode: false
  };

  private constructor(options: MemoryTrackerOptions = {}) {
    this.options = { ...this.DEFAULT_OPTIONS, ...options };
    memoryLogger.info('Memory tracker initialized', { options: this.options });

    if (this.options.autoStart) {
      this.start();
    }
  }

  /**
   * Get the singleton instance of the memory tracker
   */
  public static getInstance(options?: MemoryTrackerOptions): MemoryTracker {
    if (!MemoryTracker.instance) {
      MemoryTracker.instance = new MemoryTracker(options);
    }
    return MemoryTracker.instance;
  }

  /**
   * Check if the browser supports memory profiling
   */
  public isSupported(): boolean {
    return (
      typeof performance !== 'undefined' &&
      (performance as ExtendedPerformance).memory !== undefined
    );
  }

  /**
   * Take a snapshot of the current memory usage
   */
  public takeSnapshot(): MemorySnapshot | null {
    if (!this.isSupported()) {
      memoryLogger.warn('Memory API not available in this browser');
      return null;
    }

    try {
      const memory = (performance as ExtendedPerformance).memory;

      const snapshot: MemorySnapshot = {
        timestamp: Date.now(),
        jsHeapSizeLimit: memory?.jsHeapSizeLimit,
        totalJSHeapSize: memory?.totalJSHeapSize,
        usedJSHeapSize: memory?.usedJSHeapSize
      };

      // Store snapshot
      this.snapshots.push(snapshot);

      // Limit the number of stored snapshots
      if (this.snapshots.length > this.options.maxSamples) {
        this.snapshots.shift();
      }

      // Log debug information if enabled
      if (this.options.debugMode) {
        const usedPercent = (
          ((snapshot.usedJSHeapSize || 0) / (snapshot.jsHeapSizeLimit || 1)) *
          100
        ).toFixed(2);

        memoryLogger.debug('Memory snapshot:', {
          used: `${this.formatBytes(snapshot.usedJSHeapSize)} (${usedPercent}%)`,
          total: this.formatBytes(snapshot.totalJSHeapSize),
          limit: this.formatBytes(snapshot.jsHeapSizeLimit)
        });
      }

      return snapshot;
    } catch (error) {
      memoryLogger.error('Error taking memory snapshot:', error);
      return null;
    }
  }

  /**
   * Start periodic memory tracking
   */
  public start(): boolean {
    if (!this.isSupported()) {
      memoryLogger.warn('Cannot start memory tracking - API not supported');
      return false;
    }

    if (this.trackingInterval !== null) {
      memoryLogger.warn('Memory tracking already running');
      return true;
    }

    try {
      // Clear existing snapshots when starting fresh
      this.snapshots = [];

      // Take initial snapshot
      this.takeSnapshot();

      // Setup interval for regular snapshots
      this.trackingInterval = window.setInterval(() => {
        const snapshot = this.takeSnapshot();
        this.detectLeaks();
      }, this.options.sampleInterval);

      memoryLogger.info('Memory tracking started', {
        interval: `${this.options.sampleInterval}ms`,
        threshold: `${this.options.growthThreshold}%`
      });

      return true;
    } catch (error) {
      memoryLogger.error('Failed to start memory tracking:', error);
      return false;
    }
  }

  /**
   * Stop memory tracking
   */
  public stop(): void {
    if (this.trackingInterval === null) {
      memoryLogger.warn('Memory tracking not active');
      return;
    }

    window.clearInterval(this.trackingInterval);
    this.trackingInterval = null;
    memoryLogger.info('Memory tracking stopped');
  }

  /**
   * Check for potential memory leaks based on heap growth
   */
  public detectLeaks(): { detected: boolean; growth: number } {
    if (this.snapshots.length < 2) {
      return { detected: false, growth: 0 };
    }

    // Compare first and last snapshots to analyze trend
    const first = this.snapshots[0];
    const latest = this.snapshots[this.snapshots.length - 1];

    if (!first.usedJSHeapSize || !latest.usedJSHeapSize) {
      return { detected: false, growth: 0 };
    }

    // Calculate growth percentage
    const growth = ((latest.usedJSHeapSize - first.usedJSHeapSize) / first.usedJSHeapSize) * 100;

    // Absolute growth in bytes
    const absoluteGrowth = latest.usedJSHeapSize - first.usedJSHeapSize;

    // Check if growth exceeds threshold
    const detected = growth > this.options.growthThreshold;

    if (detected) {
      // Mark this moment in the performance timeline
      performance.mark('memoryLeakDetected', {
        detail: { growth, threshold: this.options.growthThreshold }
      });

      memoryLogger.warn('Potential memory leak detected!', {
        growth: `${growth.toFixed(2)}%`,
        increased: this.formatBytes(absoluteGrowth),
        threshold: `${this.options.growthThreshold}%`,
        timespan: `${((latest.timestamp - first.timestamp) / 1000).toFixed(1)}s`,
        snapshots: this.snapshots.length
      });

      // Generate memory chart in verbose mode
      if (this.options.debugMode) {
        this.logMemoryChart();
      }
    }

    return { detected, growth };
  }

  /**
   * Log a visual representation of memory usage
   */
  public logMemoryChart(): void {
    if (this.snapshots.length < 2) {
      memoryLogger.info('Not enough snapshots for memory chart');
      return;
    }

    try {
      // Find min and max values for scaling
      let min = Infinity;
      let max = -Infinity;

      const validSnapshots = this.snapshots.filter(s => s.usedJSHeapSize !== undefined);

      validSnapshots.forEach(s => {
        const value = s.usedJSHeapSize!;
        min = Math.min(min, value);
        max = Math.max(max, value);
      });

      // Generate chart with fixed width
      const width = 30; // Chart width in characters
      const chartData = validSnapshots.map(s => {
        const value = s.usedJSHeapSize!;
        const normalized = Math.floor(((value - min) / (max - min)) * width) || 0;
        return { value, bar: 'u2588'.repeat(normalized) };
      });

      // Output formatted chart
      console.group('%cMemory Usage Chart', 'font-weight: bold; color: #9b59b6');
      console.log(`Min: ${this.formatBytes(min)} | Max: ${this.formatBytes(max)}`);
      console.log('Time u2192');

      // Print bars with timestamps
      chartData.forEach((data, i) => {
        const timestamp = new Date(validSnapshots[i].timestamp).toLocaleTimeString();
        console.log(
          `%c${timestamp}: ${this.formatBytes(data.value)} ${'u2502'}${data.bar}`,
          'font-family: monospace;'
        );
      });

      console.groupEnd();
    } catch (error) {
      memoryLogger.warn('Error generating memory chart:', error);
    }
  }

  /**
   * Take heap snapshot and analyze object references
   * Note: This requires Chrome DevTools to be open
   */
  public analyzeHeapObjects(): void {
    try {
      if (typeof console.profile === 'function' && typeof console.profileEnd === 'function') {
        memoryLogger.info('Starting heap profile - open Chrome DevTools to view');
        console.profile('Memory Leak Analysis');

        // Add memory markers for easier analysis
        performance.mark('heapAnalysisStart');

        // Force garbage collection if exposed (Chrome DevTools must be open)
        if (typeof (window as ExtendedWindow).gc === 'function') {
          memoryLogger.debug('Forcing garbage collection');
          (window as ExtendedWindow).gc?.();
        }

        setTimeout(() => {
          performance.mark('heapAnalysisEnd');
          performance.measure('Heap Analysis', 'heapAnalysisStart', 'heapAnalysisEnd');
          console.profileEnd('Memory Leak Analysis');
          memoryLogger.info('Heap analysis complete - check DevTools for results');
        }, 500);
      } else {
        memoryLogger.warn('Heap profiling not available - open Chrome DevTools first');
      }
    } catch (error) {
      memoryLogger.error('Error during heap analysis:', error);
    }
  }

  /**
   * Get memory usage statistics
   */
  public getStats() {
    // Take snapshot if we don't have one yet
    if (this.snapshots.length === 0) {
      this.takeSnapshot();
    }

    const latest = this.snapshots[this.snapshots.length - 1];
    const first = this.snapshots[0] || latest;

    // Calculate growth if we have multiple snapshots
    let growth = 0;
    if (
      this.snapshots.length > 1 &&
      first.usedJSHeapSize !== undefined &&
      latest.usedJSHeapSize !== undefined
    ) {
      growth = ((latest.usedJSHeapSize - first.usedJSHeapSize) / first.usedJSHeapSize) * 100;
    }

    // Current usage percentage
    const usagePercent =
      latest.usedJSHeapSize && latest.jsHeapSizeLimit
        ? (latest.usedJSHeapSize / latest.jsHeapSizeLimit) * 100
        : 0;

    return {
      current: latest,
      isTracking: this.trackingInterval !== null,
      snapshots: this.snapshots.length,
      usedMemory: this.formatBytes(latest.usedJSHeapSize),
      totalMemory: this.formatBytes(latest.totalJSHeapSize),
      limit: this.formatBytes(latest.jsHeapSizeLimit),
      usagePercent: `${usagePercent.toFixed(2)}%`,
      growth: `${growth.toFixed(2)}%`,
      growthDetected: growth > this.options.growthThreshold,
      timeElapsed:
        this.snapshots.length > 1
          ? `${((latest.timestamp - first.timestamp) / 1000).toFixed(1)}s`
          : '0s'
    };
  }

  /**
   * Reset memory tracking by clearing all snapshots
   */
  public reset(): void {
    this.snapshots = [];
    memoryLogger.info('Memory tracking data reset');
  }

  /**
   * Format bytes to a human-readable string
   */
  private formatBytes(bytes?: number): string {
    if (bytes === undefined) return 'N/A';

    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(2)} ${units[unitIndex]}`;
  }
}

// Export singleton instance for direct use
export const memoryTracker = MemoryTracker.getInstance();

export default MemoryTracker;
