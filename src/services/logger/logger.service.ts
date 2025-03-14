/**
 * Logger Service
 *
 * A centralized logging service for the application that provides consistent
 * logging functionality with environment-specific controls.
 */

import { MemorySnapshot } from '../memory-tracker';
import { ChildLogger } from './child-logger.service';
import {
  LogLevel,
  LogMessage,
  LogParams,
  LoggerConfig,
  LoggerEnvironmentConfig,
  PerformanceMeasureOptions,
  TableData,
  TimerRecord
} from './logger.types';

/**
 * Main Logger class implementing comprehensive logging functionality
 * with environment-specific controls and performance monitoring.
 */
export class Logger {
  private static instance: Logger;
  private config: LoggerConfig;
  private timestamp: boolean = true;
  private timers: Map<string, TimerRecord> = new Map();
  private counters: Map<string, number> = new Map();

  // Memory leak detection properties
  private memorySnapshots: MemorySnapshot[] = [];
  private memoryTrackingInterval: number | null = null;
  private memoryThreshold: number = 10; // 10% growth triggers warning
  private memoryMaxSamples: number = 100;

  // Environment-specific configurations
  private envConfigs: LoggerEnvironmentConfig = {
    development: {
      level: LogLevel.DEBUG,
      enabled: true,
      useColors: true
    },
    test: {
      level: LogLevel.INFO,
      enabled: true,
      useColors: false
    },
    production: {
      level: LogLevel.WARN, // Only warnings and errors in production
      enabled: true,
      useColors: false
    }
  };

  private constructor() {
    // Determine environment
    const env = this.getEnvironment();
    this.config = this.envConfigs[env] || this.envConfigs.development;
  }

  /**
   * Get the current environment or default to development
   */
  private getEnvironment(): string {
    // Check for environment variables, window.env, or other configurations
    // Default to 'development' if none found
    return import.meta.env?.MODE || 'development';
  }

  /**
   * Get the singleton instance of the logger
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Get the current timestamp as a formatted string
   */
  private getTimestamp(): string {
    if (!this.timestamp) return '';
    const now = new Date();
    return `[${now.toISOString()}]`;
  }

  /**
   * Create a prefix for log messages based on the current timestamp
   * and log level with appropriate styling
   */
  private createPrefix(level: string, useColor: boolean, color: string): string {
    const timestamp = this.getTimestamp();
    return useColor ? `%c${timestamp} ${level}:` : `${timestamp} ${level}:`;
  }

  /**
   * Log a message with specified level
   * @param level The log level
   * @param message The message to log
   * @param optionalParams Additional parameters to log
   */
  public log(level: LogLevel, message: LogMessage, ...optionalParams: LogParams): void {
    if (!this.config.enabled || this.config.level < level) return;

    switch (level) {
      case LogLevel.DEBUG:
        this.debug(message, ...optionalParams);
        break;
      case LogLevel.INFO:
        this.info(message, ...optionalParams);
        break;
      case LogLevel.WARN:
        this.warn(message, ...optionalParams);
        break;
      case LogLevel.ERROR:
        this.error(message, ...optionalParams);
        break;
    }
  }

  /**
   * Log a debug message
   * @param message The message to log
   * @param optionalParams Additional parameters to log
   */
  public debug(message: LogMessage, ...optionalParams: LogParams): void {
    if (!this.config.enabled || this.config.level < LogLevel.DEBUG) return;

    const prefix = this.createPrefix('DEBUG', this.config.useColors, '#8a8a8a');
    if (this.config.useColors) {
      console.debug(prefix, 'color: #8a8a8a', message, ...optionalParams);
    } else {
      console.debug(prefix, message, ...optionalParams);
    }
  }

  /**
   * Log an info message
   * @param message The message to log
   * @param optionalParams Additional parameters to log
   */
  public info(message: LogMessage, ...optionalParams: LogParams): void {
    if (!this.config.enabled || this.config.level < LogLevel.INFO) return;

    const prefix = this.createPrefix('INFO', this.config.useColors, '#3498db');
    if (this.config.useColors) {
      console.info(prefix, 'color: #3498db', message, ...optionalParams);
    } else {
      console.info(prefix, message, ...optionalParams);
    }
  }

  /**
   * Log a warning message
   * @param message The message to log
   * @param optionalParams Additional parameters to log
   */
  public warn(message: LogMessage, ...optionalParams: LogParams): void {
    if (!this.config.enabled || this.config.level < LogLevel.WARN) return;

    const prefix = this.createPrefix('WARN', this.config.useColors, '#f39c12');
    if (this.config.useColors) {
      console.warn(prefix, 'color: #f39c12', message, ...optionalParams);
    } else {
      console.warn(prefix, message, ...optionalParams);
    }
  }

  /**
   * Log an error message
   * @param message The message to log
   * @param optionalParams Additional parameters to log
   */
  public error(message: LogMessage, ...optionalParams: LogParams): void {
    if (!this.config.enabled || this.config.level < LogLevel.ERROR) return;

    const prefix = this.createPrefix('ERROR', this.config.useColors, '#e74c3c');
    if (this.config.useColors) {
      console.error(prefix, 'color: #e74c3c', message, ...optionalParams);
    } else {
      console.error(prefix, message, ...optionalParams);
    }
  }

  /**
   * Log tabular data in a table format
   * @param data The data to display in a table
   * @param columns Optional array of column names to include
   */
  public table(data: TableData, columns?: string[]): void {
    if (!this.config.enabled || this.config.level < LogLevel.INFO) return;

    const timestamp = this.getTimestamp();
    if (this.config.useColors) {
      console.log(`%c${timestamp} TABLE:`, 'color: #3498db');
    } else {
      console.log(`${timestamp} TABLE:`);
    }

    if (columns) {
      console.table(data, columns);
    } else {
      console.table(data);
    }
  }

  /**
   * Create a performance mark in the browser's performance timeline
   * @param markName The name of the performance mark
   * @param markOptions Optional mark options containing detailed data
   */
  public mark(markName: string, markOptions?: { detail?: unknown }): void {
    if (!this.config.enabled) return;

    try {
      performance.mark(markName, markOptions);

      // Only log in debug mode
      if (this.config.level >= LogLevel.DEBUG) {
        const timestamp = this.getTimestamp();
        if (this.config.useColors) {
          console.log(`%c${timestamp} MARK:`, 'color: #9b59b6', `Created mark '${markName}'`);
        } else {
          console.log(`${timestamp} MARK:`, `Created mark '${markName}'`);
        }
      }
    } catch (error) {
      this.warn(`Error creating performance mark '${markName}':`, error);
    }
  }

  /**
   * Create a performance measure between two marks
   * @param measureName The name of the performance measure
   * @param startMarkName The name of the start mark
   * @param endMarkName The name of the end mark
   * @param options Additional measure options
   */
  public measure(
    measureName: string,
    startMarkName?: string,
    endMarkName?: string,
    options?: PerformanceMeasureOptions
  ): void {
    if (!this.config.enabled) return;

    try {
      // Handle different combinations of arguments
      if (startMarkName && endMarkName) {
        performance.measure(measureName, startMarkName, endMarkName);
      } else if (options) {
        performance.measure(measureName, options);
      } else if (startMarkName) {
        performance.measure(measureName, startMarkName);
      } else {
        performance.measure(measureName);
      }

      // Only log in debug mode
      if (this.config.level >= LogLevel.DEBUG) {
        const entries = performance.getEntriesByName(measureName, 'measure');
        if (entries.length > 0) {
          const entry = entries[entries.length - 1];
          const timestamp = this.getTimestamp();
          const duration = entry.duration.toFixed(2);

          if (this.config.useColors) {
            console.log(
              `%c${timestamp} MEASURE:`,
              'color: #9b59b6',
              `${measureName}: ${duration}ms`
            );
          } else {
            console.log(`${timestamp} MEASURE:`, `${measureName}: ${duration}ms`);
          }
        }
      }
    } catch (error) {
      this.warn(`Error creating performance measure '${measureName}':`, error);
    }
  }

  /**
   * Get performance entries by name and type
   * @param name Optional name to filter entries
   * @param entryType Optional type to filter entries
   * @returns Array of matching performance entries
   */
  public getPerformanceEntries(
    name?: string,
    entryType?: 'mark' | 'measure' | 'resource' | 'navigation' | 'paint' | 'longtask'
  ): PerformanceEntry[] {
    try {
      if (name && entryType) {
        return performance.getEntriesByName(name, entryType);
      } else if (name) {
        return performance.getEntriesByName(name);
      } else if (entryType) {
        return performance.getEntriesByType(entryType);
      } else {
        return performance.getEntries();
      }
    } catch (error) {
      this.warn('Error getting performance entries:', error);
      return [];
    }
  }

  /**
   * Clear all performance marks, or those with a specific name
   * @param markName Optional name of the mark to clear
   */
  public clearMarks(markName?: string): void {
    try {
      if (markName) {
        performance.clearMarks(markName);
      } else {
        performance.clearMarks();
      }
    } catch (error) {
      this.warn('Error clearing performance marks:', error);
    }
  }

  /**
   * Clear all performance measures, or those with a specific name
   * @param measureName Optional name of the measure to clear
   */
  public clearMeasures(measureName?: string): void {
    try {
      if (measureName) {
        performance.clearMeasures(measureName);
      } else {
        performance.clearMeasures();
      }
    } catch (error) {
      this.warn('Error clearing performance measures:', error);
    }
  }

  /**
   * Start a timer to track the duration of operations
   * @param label The label for the timer
   */
  public time(label: string): void {
    if (!this.config.enabled) return;

    this.timers.set(label, {
      start: performance.now(),
      label
    });

    if (this.config.level >= LogLevel.DEBUG) {
      const timestamp = this.getTimestamp();
      if (this.config.useColors) {
        console.log(`%c${timestamp} TIME:`, 'color: #9b59b6', `Started timer '${label}'`);
      } else {
        console.log(`${timestamp} TIME:`, `Started timer '${label}'`);
      }
    }
  }

  /**
   * End a timer and log the duration since the matching time() call
   * @param label The label for the timer
   */
  public timeEnd(label: string): void {
    if (!this.config.enabled) return;

    const timer = this.timers.get(label);
    if (!timer) {
      this.warn(`Timer '${label}' does not exist`);
      return;
    }

    const duration = performance.now() - timer.start;
    this.timers.delete(label);

    const timestamp = this.getTimestamp();

    if (this.config.useColors) {
      console.log(`%c${timestamp} TIME:`, 'color: #9b59b6', `${label}: ${duration.toFixed(2)}ms`);
    } else {
      console.log(`${timestamp} TIME:`, `${label}: ${duration.toFixed(2)}ms`);
    }
  }

  /**
   * Reset a specific timer back to zero
   * @param label The label for the timer to reset
   */
  public timeReset(label: string): void {
    if (!this.config.enabled) return;

    // Reset the timer if it exists
    if (this.timers.has(label)) {
      this.timers.set(label, {
        start: performance.now(),
        label
      });

      if (this.config.level >= LogLevel.DEBUG) {
        this.debug(`Timer '${label}' has been reset`);
      }
    } else {
      this.warn(`Timer '${label}' does not exist and could not be reset`);
    }
  }

  /**
   * Count and log the number of times a specific label occurs
   * @param label The label to count
   * @param message Optional message to display with the count
   */
  public count(label: string = 'default', message?: string): void {
    if (!this.config.enabled) return;

    const count = (this.counters.get(label) || 0) + 1;
    this.counters.set(label, count);

    const countMessage = message ? `${message} (${count})` : `${label}: ${count}`;

    const timestamp = this.getTimestamp();
    if (this.config.useColors) {
      console.log(`%c${timestamp} COUNT:`, 'color: #1abc9c', countMessage);
    } else {
      console.log(`${timestamp} COUNT:`, countMessage);
    }
  }

  /**
   * Reset a counter back to zero
   * @param label Optional label for the counter to reset
   */
  public countReset(label: string = 'default'): void {
    if (!this.config.enabled) return;

    if (this.counters.has(label)) {
      this.counters.delete(label);
      if (this.config.level >= LogLevel.DEBUG) {
        this.debug(`Counter '${label}' has been reset`);
      }
    } else if (this.config.level >= LogLevel.DEBUG) {
      this.debug(`Counter '${label}' does not exist`);
    }
  }

  /**
   * Outputs a stack trace at the point of call
   * @param message The message to display with the trace
   * @param optionalParams Additional parameters to log
   */
  public trace(message: LogMessage, ...optionalParams: LogParams): void {
    if (!this.config.enabled || this.config.level < LogLevel.DEBUG) return;

    const timestamp = this.getTimestamp();
    console.trace(`${timestamp} TRACE:`, message, ...optionalParams);
  }

  /**
   * Create a new logging group with optional collapsing
   * @param label The label for the group
   * @param collapsed Whether the group should be collapsed
   */
  public group(label: string, collapsed: boolean = false): void {
    if (!this.config.enabled) return;

    if (collapsed) {
      console.groupCollapsed(label);
    } else {
      console.group(label);
    }
  }

  /**
   * End the current logging group
   */
  public groupEnd(): void {
    if (!this.config.enabled) return;
    console.groupEnd();
  }

  /**
   * Start profiling for performance analysis
   * @param label The label for the profile
   */
  public profile(label: string): void {
    if (!this.config.enabled || typeof console.profile !== 'function') return;
    console.profile(label);
  }

  /**
   * End profiling for performance analysis
   * @param label The label for the profile
   */
  public profileEnd(label: string): void {
    if (!this.config.enabled || typeof console.profileEnd !== 'function') return;
    console.profileEnd(label);
  }

  /**
   * Create a child logger with a specific prefix
   * @param prefix The prefix for the child logger
   * @returns A new child logger instance
   */
  public createChildLogger(prefix: string): ChildLogger {
    return new ChildLogger(this, prefix);
  }

  /**
   * Configure the logger settings
   * @param config The configuration to apply
   */
  public configure(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Enable or disable the logger
   * @param enabled Whether the logger is enabled
   */
  public setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
  }

  /**
   * Set the log level
   * @param level The log level to set
   */
  public setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  /**
   * Enable or disable timestamps in logs
   * @param enabled Whether timestamps are enabled
   */
  public setTimestamp(enabled: boolean): void {
    this.timestamp = enabled;
  }

  /**
   * Alias for setTimestamp for backward compatibility
   * @param enabled Whether timestamps are enabled
   */
  public setTimestampEnabled(enabled: boolean): void {
    this.setTimestamp(enabled);
  }

  /**
   * Enable or disable colored logs
   * @param enabled Whether colored logs are enabled
   */
  public setColors(enabled: boolean): void {
    this.config.useColors = enabled;
  }

  /**
   * Start tracking memory usage to detect memory leaks
   * @param intervalMs Interval in milliseconds between memory snapshots
   * @param thresholdPercent Percentage growth threshold to trigger warnings
   */
  public startMemoryTracking(intervalMs: number = 5000, thresholdPercent: number = 10): void {
    if (this.memoryTrackingInterval !== null) {
      this.stopMemoryTracking();
    }

    this.memoryThreshold = thresholdPercent;
    this.memorySnapshots = [];

    this.memoryTrackingInterval = window.setInterval(() => {
      if ('memory' in performance) {
        const memoryInfo = (performance as unknown as { memory: { usedJSHeapSize: number } })
          .memory;

        const snapshot = {
          timestamp: Date.now(),
          usedJSHeapSize: memoryInfo.usedJSHeapSize
        };

        this.memorySnapshots.push(snapshot);

        // Limit the number of snapshots
        if (this.memorySnapshots.length > this.memoryMaxSamples) {
          this.memorySnapshots.shift();
        }

        // Check for memory leaks if we have at least 2 snapshots
        if (this.memorySnapshots.length >= 2) {
          this.checkMemoryLeak();
        }
      }
    }, intervalMs);
  }

  /**
   * Stop tracking memory usage
   */
  public stopMemoryTracking(): void {
    if (this.memoryTrackingInterval !== null) {
      window.clearInterval(this.memoryTrackingInterval);
      this.memoryTrackingInterval = null;
    }
  }

  /**
   * Check for potential memory leaks
   */
  private checkMemoryLeak(): void {
    const first = this.memorySnapshots[0];
    const last = this.memorySnapshots[this.memorySnapshots.length - 1];

    if (!first || !last) return;

    const growthPercent =
      ((last.usedJSHeapSize - first.usedJSHeapSize) / first.usedJSHeapSize) * 100;

    if (growthPercent > this.memoryThreshold) {
      this.warn(
        `Memory usage has increased by ${growthPercent.toFixed(2)}% over the last ${this.memorySnapshots.length} samples. ` +
          `This may indicate a memory leak.`
      );

      if (this.config.level >= LogLevel.DEBUG) {
        this.debug('Memory snapshots:', this.memorySnapshots);
      }
    }
  }

  /**
   * Format bytes into a human-readable format
   * @param bytes The number of bytes
   * @returns A formatted string with appropriate units
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// Export singleton instance for direct use
export const logger = Logger.getInstance();

// Export LogLevel enum for configuration
export { LogLevel } from './logger.types';
