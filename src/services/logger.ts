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

export class Logger {
  private static instance: Logger;
  private config: LoggerConfig;
  private timestamp: boolean = true;

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
