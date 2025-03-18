'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import { TooltipProps, LegendProps } from 'recharts';

import { cn } from '@/utils/app.utils';
import { 
  ChartConfig, 
  ChartPayloadItem, 
  ChartStyleProps, 
  BasicTooltipContentProps,
  BasicLegendContentProps
} from './chart.types';
import { useChartConfig } from './chart.context';
import styles from './chart.module.css';

/**
 * Get payload configuration from chart config
 */
const getPayloadConfigFromPayload = (config: ChartConfig, payload: ChartPayloadItem, key: string) => {
  return config[key] || { label: key };
};

/**
 * Chart Style Component
 * 
 * Generates CSS styles for chart based on configuration
 */
export const ChartStyle = ({ id, config }: ChartStyleProps) => {
  if (!config || !id) return null;

  const styles = Object.entries(config).reduce((styles, [name, { theme, color }]) => {
    if (!theme && !color) return styles;

    // Selectors
    const selector = `[data-chart="${id}"]`;

    if (color) {
      styles += `${selector} [data-name="${name}"] { color: ${color}; fill: ${color}; stroke: ${color}; }\n`;
    }

    if (theme) {
      Object.entries(theme).forEach(([key, value]) => {
        styles += `${key} ${selector} [data-name="${name}"] { color: ${value}; fill: ${value}; stroke: ${value}; }\n`;
      });
    }

    return styles;
  }, '');

  if (!styles) return null;

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
};

// Type for Recharts tooltip props to avoid using 'any'
type RechartsTooltipProps = TooltipProps<string | number, string | number> & {
  payload?: Array<{ [key: string]: unknown }>;
  active?: boolean;
  label?: string | number;
};

/**
 * Custom chart tooltip component
 */
export const ChartTooltip = (props: TooltipProps<string | number, string | number>) => {
  // Using a direct content function to handle tooltip rendering
  const content = (tooltipProps: RechartsTooltipProps | undefined) => {
    if (!tooltipProps) return null;
    return <ChartTooltipContent 
      active={tooltipProps.active}
      payload={tooltipProps.payload as ChartPayloadItem[]}
      label={tooltipProps.label}
    />;
  };
  
  return (
    <RechartsPrimitive.Tooltip
      cursor={false}
      content={content}
      {...props}
    />
  );
};

/**
 * Custom chart tooltip content component
 */
export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  BasicTooltipContentProps & React.HTMLProps<HTMLDivElement>
>(({ active, payload = [], className, indicator = 'dot', hideLabel = false, hideIndicator = false, label, labelFormatter, color, nameKey, labelKey }, ref) => {
  const { config } = useChartConfig();
  if (!active || !payload.length) return null;

  // Treat the payload as ChartPayloadItem[] since we control that implementation
  const tooltipLabel = labelFormatter ? labelFormatter(label, payload as ChartPayloadItem[]) : label;
  const nestLabel = !hideLabel && labelKey && typeof tooltipLabel === 'string';

  return (
    <div ref={ref} className={cn(styles.tooltip, className)}>
      {!nestLabel ? tooltipLabel : null}
      <div className={styles.tooltipContent}>
        {payload.map((item: ChartPayloadItem, index: number) => {
          const key = `${nameKey || item.dataKey || item.name || 'value'}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload?.fill || item.color;

          return (
            <div
              key={`item-${index}`}
              className={styles.tooltipItem}
              data-name={key}
            >
              {!hideIndicator ? (
                <>
                  <div
                    className={cn(
                      styles.tooltipIndicator,
                      indicator === 'line' && styles.tooltipIndicatorLine,
                      indicator === 'dot' && styles.tooltipIndicatorDot,
                      indicator === 'dashed' && styles.tooltipIndicatorDashed
                    )}
                    style={{ backgroundColor: indicatorColor }}
                  />
                  <div
                    className={cn(
                      styles.tooltipItemContent,
                      nestLabel
                        ? styles.tooltipItemContentNestLabel
                        : styles.tooltipItemContentNoNestLabel
                    )}
                  >
                    {nestLabel ? tooltipLabel : null}
                    <div className={styles.tooltipItemLabel}>{item.name}</div>
                    <div className={styles.tooltipItemValue}>
                      {typeof item.value === 'number' 
                        ? item.value.toLocaleString() 
                        : item.value}
                    </div>
                  </div>
                </>
              ) : (
                <div
                  className={cn(
                    styles.tooltipItemContent,
                    nestLabel
                      ? styles.tooltipItemContentNestLabel
                      : styles.tooltipItemContentNoNestLabel
                  )}
                >
                  {nestLabel ? tooltipLabel : null}
                  <div className={styles.tooltipItemLabel}>{item.name}</div>
                  <div className={styles.tooltipItemValue}>
                    {typeof item.value === 'number' 
                      ? item.value.toLocaleString() 
                      : item.value}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

ChartTooltipContent.displayName = 'ChartTooltipContent';

// Type for Recharts legend props to avoid using 'any'
type RechartsLegendProps = LegendProps & {
  payload?: Array<{ [key: string]: unknown }>;
};

/**
 * Function to render legend content, used by the Legend component
 */
const renderLegendContent = (props: RechartsLegendProps) => {
  return <ChartLegendContent 
    payload={props.payload as ChartPayloadItem[]}
    hideIcon={false}
  />;
};

/**
 * Custom chart legend component
 */
export const ChartLegend = (props: LegendProps) => {
  // By not using a JSX element directly as content, we avoid ref issues
  // Need to tell TypeScript to ignore the ref type mismatch
  return (
    // @ts-expect-error - There is a ref type incompatibility with Legend component
    <RechartsPrimitive.Legend
      content={renderLegendContent}
      {...props}
    />
  );
};

/**
 * Custom chart legend content component
 */
export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  BasicLegendContentProps & React.HTMLProps<HTMLDivElement>
>(({ payload = [], className, nameKey, hideIcon, verticalAlign }, ref) => {
  const { config } = useChartConfig();
  if (!payload.length) return null;

  return (
    <div
      ref={ref}
      className={cn(
        styles.legend,
        verticalAlign === 'top' && styles.legendTop,
        verticalAlign === 'bottom' && styles.legendBottom,
        className
      )}
    >
      {payload.map((item: ChartPayloadItem, index: number) => {
        const key = `${nameKey || item.value || item.id || 'value'}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        const color = item.payload?.stroke || item.payload?.fill || item.color;

        return (
          <div key={`item-${index}`} className={styles.legendItem}>
            {!hideIcon ? (
              <div
                className={styles.legendIcon}
                style={{ backgroundColor: color }}
                data-name={key}
              />
            ) : null}
            <div
              className={styles.legendLabel}
              data-icon={!hideIcon}
              data-name={key}
            >
              {itemConfig.label || item.value}
            </div>
          </div>
        );
      })}
    </div>
  );
});

ChartLegendContent.displayName = 'ChartLegendContent';
