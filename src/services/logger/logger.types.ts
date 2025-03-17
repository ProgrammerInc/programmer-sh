/**
 * Logger Types
 *
 * Type definitions for the logger service
 */

/**
 * Enum defining available log levels in ascending order of verbosity
 * ERROR: Only critical errors
 * WARN: Warnings and errors
 * INFO: General information, warnings, and errors
 * DEBUG: Verbose debugging information and all other levels
 */
export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

/**
 * Logger configuration interface
 */
export interface LoggerConfig {
  /** Log level threshold */
  level: LogLevel;
  /** Whether logging is enabled */
  enabled: boolean;
  /** Whether to use colors in console output */
  useColors: boolean;
}

/**
 * Configuration for different environments
 */
export type LoggerEnvironmentConfig = {
  /** Map of environment names to their logger configurations */
  [key: string]: LoggerConfig;
};

/**
 * Type for log message content
 * Supports various primitive and object types
 */
export type LogMessage = string | number | boolean | object | null | undefined;

/**
 * Type for array of parameters to be logged
 */
export type LogParams = ReadonlyArray<LogMessage>;

/**
 * Type for tabular data to be logged in a structured format
 */
export type TableData = ReadonlyArray<Record<string, unknown>> | Record<string, unknown>;

/**
 * Interface for a performance timer record
 */
export interface TimerRecord {
  /** Timestamp when the timer started (in milliseconds) */
  start: number;
  /** Label to identify the timer */
  label: string;
}

/**
 * Interface for performance measurement options
 */
export interface PerformanceMeasureOptions {
  /** Additional details about the performance measure */
  detail?: unknown;
  /** Start marker name or timestamp */
  start?: string | number;
  /** Duration in milliseconds */
  duration?: number;
  /** End marker name or timestamp */
  end?: string | number;
}

/**
 * Interface for logger instance
 */
export interface Logger {
  /** Log an error message */
  error(...args: LogParams): void;
  /** Log a warning message */
  warn(...args: LogParams): void;
  /** Log an info message */
  info(...args: LogParams): void;
  /** Log a debug message */
  debug(...args: LogParams): void;
  /** Log tabular data */
  table(data: TableData, columns?: ReadonlyArray<string>): void;
  /** Start a timer for performance measurement */
  time(label: string): void;
  /** End a timer and log the elapsed time */
  timeEnd(label: string): void;
  /** Create a child logger with additional context */
  child(context: Record<string, unknown>): Logger;
}

/**
 * Interface for logger factory
 */
export interface LoggerFactory {
  /** Create a new logger instance */
  createLogger(name: string): Logger;
  /** Get the current configuration */
  getConfig(): LoggerConfig;
  /** Set the log level */
  setLevel(level: LogLevel): void;
  /** Enable or disable logging */
  setEnabled(enabled: boolean): void;
}
