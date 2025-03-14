/**
 * Logger Types
 *
 * Type definitions for the logger service
 */

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3
}

export interface LoggerConfig {
  level: LogLevel;
  enabled: boolean;
  useColors: boolean;
}

export type LoggerEnvironmentConfig = {
  [key: string]: LoggerConfig;
};

// Define types for logging messages and parameters
export type LogMessage = string | number | boolean | object | null | undefined;
export type LogParams = Array<LogMessage>;

// Type for tabular data logging
export type TableData = Record<string, unknown>[] | Record<string, unknown>;

// Type for performance timing
export interface TimerRecord {
  start: number;
  label: string;
}

// Type for performance measures
export interface PerformanceMeasureOptions {
  detail?: unknown;
  start?: string | number;
  duration?: number;
  end?: string | number;
}
