/**
 * Logger Service
 * 
 * A centralized logging service for the application that provides consistent
 * logging functionality with environment-specific controls.
 */

enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

interface LoggerConfig {
  level: LogLevel;
  enabled: boolean;
  useColors: boolean;
}

type LoggerEnvironmentConfig = {
  [key: string]: LoggerConfig;
};

// Define types for logging messages and parameters
type LogMessage = string | number | boolean | object | null | undefined;
type LogParams = Array<LogMessage>;

// Type for tabular data logging
type TableData = Record<string, unknown>[] | Record<string, unknown>;

// Type for performance timing
interface TimerRecord {
  start: number;
  label: string;
}

// Type for performance measures
interface PerformanceMeasureOptions {
  detail?: unknown;
  start?: string | number;
  duration?: number;
  end?: string | number;
}

export class Logger {
  private static instance: Logger;
  private config: LoggerConfig;
  private timestamp: boolean = true;
  private timers: Map<string, TimerRecord> = new Map();

  // Environment-specific configurations
  private envConfigs: LoggerEnvironmentConfig = {
    development: {
      level: LogLevel.DEBUG,
      enabled: true,
      useColors: true,
    },
    test: {
      level: LogLevel.INFO,
      enabled: true,
      useColors: false,
    },
    production: {
      level: LogLevel.WARN,  // Only warnings and errors in production
      enabled: true,
      useColors: false,
    },
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
   * Log a debug message
   * @param message The message to log
   * @param optionalParams Additional parameters to log
   */
  public debug(message: LogMessage, ...optionalParams: LogParams): void {
    if (!this.config.enabled || this.config.level < LogLevel.DEBUG) return;

    const timestamp = this.getTimestamp();
    if (this.config.useColors) {
      console.debug(`%c${timestamp} DEBUG:`, 'color: #8a8a8a', message, ...optionalParams);
    } else {
      console.debug(`${timestamp} DEBUG:`, message, ...optionalParams);
    }
  }

  /**
   * Log an info message
   * @param message The message to log
   * @param optionalParams Additional parameters to log
   */
  public info(message: LogMessage, ...optionalParams: LogParams): void {
    if (!this.config.enabled || this.config.level < LogLevel.INFO) return;

    const timestamp = this.getTimestamp();
    if (this.config.useColors) {
      console.info(`%c${timestamp} INFO:`, 'color: #3498db', message, ...optionalParams);
    } else {
      console.info(`${timestamp} INFO:`, message, ...optionalParams);
    }
  }

  /**
   * Log a warning message
   * @param message The message to log
   * @param optionalParams Additional parameters to log
   */
  public warn(message: LogMessage, ...optionalParams: LogParams): void {
    if (!this.config.enabled || this.config.level < LogLevel.WARN) return;

    const timestamp = this.getTimestamp();
    if (this.config.useColors) {
      console.warn(`%c${timestamp} WARN:`, 'color: #f39c12', message, ...optionalParams);
    } else {
      console.warn(`${timestamp} WARN:`, message, ...optionalParams);
    }
  }

  /**
   * Log an error message
   * @param message The message to log
   * @param optionalParams Additional parameters to log
   */
  public error(message: LogMessage, ...optionalParams: LogParams): void {
    if (!this.config.enabled || this.config.level < LogLevel.ERROR) return;

    const timestamp = this.getTimestamp();
    if (this.config.useColors) {
      console.error(`%c${timestamp} ERROR:`, 'color: #e74c3c', message, ...optionalParams);
    } else {
      console.error(`${timestamp} ERROR:`, message, ...optionalParams);
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
   * @param options Optional measure options
   */
  public measure(
    measureName: string, 
    startMarkName?: string, 
    endMarkName?: string, 
    options?: PerformanceMeasureOptions
  ): void {
    if (!this.config.enabled) return;

    try {
      // Handle the different measure API patterns
      if (startMarkName && options) {
        // If we have both mark names and options, merge them properly
        // Create a new options object with the mark names as start/end
        const mergedOptions: PerformanceMeasureOptions = {
          ...options,
          start: startMarkName,
          end: endMarkName
        };
        performance.measure(measureName, mergedOptions);
      } 
      // If only options are provided (no mark names)
      else if (options && (options.start || options.end || options.duration)) {
        performance.measure(measureName, options);
      }
      // If we have mark names but no options
      else if (startMarkName) {
        performance.measure(measureName, startMarkName, endMarkName);
      } 
      // Just the measure name without start/end marks
      else {
        performance.measure(measureName);
      }

      // Get the measure data if available
      let measureData: PerformanceEntry | undefined;
      try {
        const entries = performance.getEntriesByName(measureName, 'measure');
        if (entries.length > 0) {
          measureData = entries[entries.length - 1];
        }
      } catch (error) {
        // Ignore errors in getting measure data
      }

      // Log the measure at INFO level
      if (this.config.level >= LogLevel.INFO) {
        const timestamp = this.getTimestamp();
        const duration = measureData ? `${measureData.duration.toFixed(2)}ms` : 'unknown';
        const markInfo = startMarkName && endMarkName ? 
          `from '${startMarkName}' to '${endMarkName}'` : 
          startMarkName ? `from '${startMarkName}'` : '';
          
        if (this.config.useColors) {
          console.log(
            `%c${timestamp} MEASURE:`, 
            'color: #9b59b6', 
            `'${measureName}' ${markInfo} - Duration: ${duration}`
          );
        } else {
          console.log(
            `${timestamp} MEASURE:`, 
            `'${measureName}' ${markInfo} - Duration: ${duration}`
          );
        }
      }
    } catch (error) {
      this.warn(`Error creating performance measure '${measureName}':`, error);
    }
  }

  /**
   * Clear all performance marks, or specific ones if markName is provided
   * @param markName Optional name of the mark to clear
   */
  public clearMarks(markName?: string): void {
    if (!this.config.enabled) return;
    
    try {
      if (markName) {
        performance.clearMarks(markName);
        if (this.config.level >= LogLevel.DEBUG) {
          this.debug(`Cleared performance mark '${markName}'`);
        }
      } else {
        performance.clearMarks();
        if (this.config.level >= LogLevel.DEBUG) {
          this.debug('Cleared all performance marks');
        }
      }
    } catch (error) {
      this.warn('Error clearing performance marks:', error);
    }
  }

  /**
   * Clear all performance measures, or specific ones if measureName is provided
   * @param measureName Optional name of the measure to clear
   */
  public clearMeasures(measureName?: string): void {
    if (!this.config.enabled) return;
    
    try {
      if (measureName) {
        performance.clearMeasures(measureName);
        if (this.config.level >= LogLevel.DEBUG) {
          this.debug(`Cleared performance measure '${measureName}'`);
        }
      } else {
        performance.clearMeasures();
        if (this.config.level >= LogLevel.DEBUG) {
          this.debug('Cleared all performance measures');
        }
      }
    } catch (error) {
      this.warn('Error clearing performance measures:', error);
    }
  }

  /**
   * Get a list of performance entries filtered by name and type
   * @param name Optional name to filter entries by
   * @param entryType Optional type to filter entries by
   * @returns Array of performance entries
   */
  public getPerformanceEntries(
    name?: string, 
    entryType?: 'mark' | 'measure' | 'resource' | 'navigation' | 'paint' | 'longtask'
  ): PerformanceEntry[] {
    if (!this.config.enabled) return [];
    
    try {
      if (name && entryType) {
        return performance.getEntriesByName(name, entryType);
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
   * Start a timer for performance measurement
   * @param label The name of the timer
   */
  public time(label: string): void {
    if (!this.config.enabled) return;

    // If timer already exists, warn and restart
    if (this.timers.has(label)) {
      this.warn(`Timer '${label}' already exists. Restarting.`);
    }

    this.timers.set(label, {
      start: performance.now(),
      label
    });

    // Only log in debug mode
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
   * End a timer and log the duration
   * @param label The name of the timer to end
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

    // Always log timeEnd results at INFO level or higher
    if (this.config.level >= LogLevel.INFO) {
      const timestamp = this.getTimestamp();
      if (this.config.useColors) {
        console.log(`%c${timestamp} TIME:`, 'color: #9b59b6', `${label}: ${duration.toFixed(2)}ms`);
      } else {
        console.log(`${timestamp} TIME:`, `${label}: ${duration.toFixed(2)}ms`);
      }
    }
  }

  /**
   * Clear all active timers
   */
  public clearTimers(): void {
    if (!this.config.enabled) return;
    
    const timerCount = this.timers.size;
    this.timers.clear();
    
    if (this.config.level >= LogLevel.DEBUG) {
      this.debug(`Cleared ${timerCount} active timers`);
    }
  }

  /**
   * Log with count of how many times this has been called with the same label
   * @param label The counter label
   * @param message Optional message to display
   */
  private counters: Map<string, number> = new Map();
  
  public count(label: string, message?: string): void {
    if (!this.config.enabled || this.config.level < LogLevel.DEBUG) return;

    // Initialize or increment counter
    const current = this.counters.get(label) || 0;
    this.counters.set(label, current + 1);

    const timestamp = this.getTimestamp();
    const countMessage = message ? `${message} - Count: ${current + 1}` : `${label}: ${current + 1}`;
    
    if (this.config.useColors) {
      console.log(`%c${timestamp} COUNT:`, 'color: #1abc9c', countMessage);
    } else {
      console.log(`${timestamp} COUNT:`, countMessage);
    }
  }

  /**
   * Reset a specific counter or all counters
   * @param label Optional counter label to reset, resets all if not specified
   */
  public countReset(label?: string): void {
    if (!this.config.enabled) return;

    if (label) {
      this.counters.delete(label);
      if (this.config.level >= LogLevel.DEBUG) {
        this.debug(`Counter '${label}' reset`);
      }
    } else {
      const counterCount = this.counters.size;
      this.counters.clear();
      if (this.config.level >= LogLevel.DEBUG) {
        this.debug(`All counters reset (${counterCount} counters)`);
      }
    }
  }

  /**
   * Log a group of messages
   * @param label The group label
   * @param collapsed Whether the group should be collapsed by default
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
   * End the current group
   */
  public groupEnd(): void {
    if (!this.config.enabled) return;
    console.groupEnd();
  }

  /**
   * Enable or disable all logging
   * @param enabled Whether logging is enabled
   */
  public setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;
  }

  /**
   * Set the logging level
   * @param level The log level to set
   */
  public setLevel(level: LogLevel): void {
    this.config.level = level;
  }

  /**
   * Enable or disable timestamps
   * @param enabled Whether timestamps are enabled
   */
  public setTimestampEnabled(enabled: boolean): void {
    this.timestamp = enabled;
  }

  /**
   * Create a child logger with a prefix
   * @param prefix The prefix for the child logger
   */
  public createChildLogger(prefix: string): ChildLogger {
    return new ChildLogger(this, prefix);
  }

  /**
   * Log a trace with stack trace information
   * @param message The message to log
   * @param optionalParams Additional parameters to log
   */
  public trace(message: LogMessage, ...optionalParams: LogParams): void {
    if (!this.config.enabled || this.config.level < LogLevel.DEBUG) return;

    const timestamp = this.getTimestamp();
    if (this.config.useColors) {
      console.trace(`%c${timestamp} TRACE:`, 'color: #8a8a8a', message, ...optionalParams);
    } else {
      console.trace(`${timestamp} TRACE:`, message, ...optionalParams);
    }
  }

  /**
   * Log a message at the specified level
   * @param level The log level
   * @param message The message to log
   * @param optionalParams Additional parameters to log
   */
  public log(level: LogLevel, message: LogMessage, ...optionalParams: LogParams): void {
    switch (level) {
      case LogLevel.ERROR:
        this.error(message, ...optionalParams);
        break;
      case LogLevel.WARN:
        this.warn(message, ...optionalParams);
        break;
      case LogLevel.INFO:
        this.info(message, ...optionalParams);
        break;
      case LogLevel.DEBUG:
        this.debug(message, ...optionalParams);
        break;
    }
  }
}

/**
 * A child logger that adds a prefix to all log messages
 */
export class ChildLogger {
  constructor(private parent: Logger, private prefix: string) {}

  public debug(message: LogMessage, ...optionalParams: LogParams): void {
    this.parent.debug(`[${this.prefix}] ${message}`, ...optionalParams);
  }

  public info(message: LogMessage, ...optionalParams: LogParams): void {
    this.parent.info(`[${this.prefix}] ${message}`, ...optionalParams);
  }

  public warn(message: LogMessage, ...optionalParams: LogParams): void {
    this.parent.warn(`[${this.prefix}] ${message}`, ...optionalParams);
  }

  public error(message: LogMessage, ...optionalParams: LogParams): void {
    this.parent.error(`[${this.prefix}] ${message}`, ...optionalParams);
  }

  public table(data: TableData, columns?: string[]): void {
    // For table data, we don't modify the data itself, but we add the prefix to the label
    this.parent.group(`[${this.prefix}] Table Output`);
    this.parent.table(data, columns);
    this.parent.groupEnd();
  }

  public mark(markName: string, markOptions?: { detail?: unknown }): void {
    // Add prefix to mark name for organization
    this.parent.mark(`${this.prefix}:${markName}`, markOptions);
  }

  public measure(
    measureName: string, 
    startMarkName?: string, 
    endMarkName?: string, 
    options?: PerformanceMeasureOptions
  ): void {
    // Add prefix to measure name for organization
    const prefixedMeasureName = `${this.prefix}:${measureName}`;
    
    // If using mark names, add prefix to them only if they don't already have one
    const prefixedStartMark = startMarkName ? 
      (startMarkName.includes(':') ? startMarkName : `${this.prefix}:${startMarkName}`) : 
      undefined;
      
    const prefixedEndMark = endMarkName ? 
      (endMarkName.includes(':') ? endMarkName : `${this.prefix}:${endMarkName}`) : 
      undefined;
    
    // Handle the different cases for combining options and mark names correctly
    if (prefixedStartMark && options) {
      // If we have both mark names and options, create merged options
      const mergedOptions: PerformanceMeasureOptions = {
        ...options,
        start: prefixedStartMark,
        end: prefixedEndMark
      };
      this.parent.measure(prefixedMeasureName, undefined, undefined, mergedOptions);
    } else {
      // Otherwise use the standard approach
      this.parent.measure(prefixedMeasureName, prefixedStartMark, prefixedEndMark, options);
    }
  }

  public clearMarks(markName?: string): void {
    if (markName) {
      // Add prefix to mark name
      this.parent.clearMarks(`${this.prefix}:${markName}`);
    } else {
      // Without a specific mark name, we'd clear all marks which isn't what we want
      // So we warn about this instead
      this.parent.warn(`ChildLogger ${this.prefix}: clearMarks() without a specific mark name would clear all marks. Provide a mark name to clear prefixed marks.`);
    }
  }

  public clearMeasures(measureName?: string): void {
    if (measureName) {
      // Add prefix to measure name
      this.parent.clearMeasures(`${this.prefix}:${measureName}`);
    } else {
      // Without a specific measure name, we'd clear all measures which isn't what we want
      // So we warn about this instead
      this.parent.warn(`ChildLogger ${this.prefix}: clearMeasures() without a specific measure name would clear all measures. Provide a measure name to clear prefixed measures.`);
    }
  }

  public getPerformanceEntries(
    name?: string, 
    entryType?: 'mark' | 'measure' | 'resource' | 'navigation' | 'paint' | 'longtask'
  ): PerformanceEntry[] {
    return this.parent.getPerformanceEntries(name, entryType);
  }

  public time(label: string): void {
    this.parent.time(`[${this.prefix}] ${label}`);
  }

  public timeEnd(label: string): void {
    this.parent.timeEnd(`[${this.prefix}] ${label}`);
  }

  public count(label: string, message?: string): void {
    this.parent.count(`[${this.prefix}] ${label}`, message);
  }

  public countReset(label?: string): void {
    if (label) {
      this.parent.countReset(`[${this.prefix}] ${label}`);
    } else {
      // If no label, we can't reset only this prefix's counters
      // so we just forward the call
      this.parent.countReset();
    }
  }

  public trace(message: LogMessage, ...optionalParams: LogParams): void {
    this.parent.trace(`[${this.prefix}] ${message}`, ...optionalParams);
  }

  public group(label: string, collapsed: boolean = false): void {
    this.parent.group(`[${this.prefix}] ${label}`, collapsed);
  }

  public groupEnd(): void {
    this.parent.groupEnd();
  }
}

// Export singleton instance for direct use
export const logger = Logger.getInstance();

// Export LogLevel enum for configuration
export { LogLevel };
