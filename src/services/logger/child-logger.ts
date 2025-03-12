import { Logger, LogLevel } from './logger';
import { LogMessage, LogParams, PerformanceMeasureOptions, TableData } from './logger.types';

/**
 * A child logger that adds a prefix to all log messages
 */
export class ChildLogger {
  constructor(
    private parent: Logger,
    private prefix: string
  ) {}

  public debug(message: LogMessage, ...optionalParams: LogParams): void {
    this.parent.debug(`[${this.prefix}] ${message}`, ...optionalParams);
  }

  public log(level: LogLevel, message: LogMessage, ...optionalParams: LogParams): void {
    this.parent.log(level, `[${this.prefix}] ${message}`, ...optionalParams);
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
    const prefixedStartMark = startMarkName
      ? startMarkName.includes(':')
        ? startMarkName
        : `${this.prefix}:${startMarkName}`
      : undefined;

    const prefixedEndMark = endMarkName
      ? endMarkName.includes(':')
        ? endMarkName
        : `${this.prefix}:${endMarkName}`
      : undefined;

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
      this.parent.warn(
        `ChildLogger ${this.prefix}: clearMarks() without a specific mark name would clear all marks. Provide a mark name to clear prefixed marks.`
      );
    }
  }

  public clearMeasures(measureName?: string): void {
    if (measureName) {
      // Add prefix to measure name
      this.parent.clearMeasures(`${this.prefix}:${measureName}`);
    } else {
      // Without a specific measure name, we'd clear all measures which isn't what we want
      // So we warn about this instead
      this.parent.warn(
        `ChildLogger ${this.prefix}: clearMeasures() without a specific measure name would clear all measures. Provide a measure name to clear prefixed measures.`
      );
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

  public profile(label: string): void {
    this.parent.profile(label);
  }

  public profileEnd(label: string): void {
    this.parent.profileEnd(label);
  }
}

// Export LogLevel enum for configuration
export { LogLevel };

export default ChildLogger;
