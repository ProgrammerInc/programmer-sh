import * as React from 'react';
import * as RechartsPrimitive from 'recharts';
import { TooltipProps, LegendProps } from 'recharts';

// Format: { THEME_NAME: CSS_SELECTOR }
export const THEMES = { light: '', dark: '.dark' } as const;

/**
 * Chart configuration type
 */
export type ChartConfig = {
  [k in string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

/**
 * Chart context props
 */
export interface ChartContextProps {
  config: ChartConfig;
}

/**
 * Chart container props
 */
export interface ChartContainerProps extends React.ComponentProps<'div'> {
  config: ChartConfig;
  children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>['children'];
}

/**
 * Chart style props
 */
export interface ChartStyleProps {
  id: string;
  config: ChartConfig;
}

/**
 * Chart payload item - Compatible with Recharts Payload
 */
export interface ChartPayloadItem {
  dataKey?: string | number;
  name?: string | number;
  value?: string | number;
  payload?: {
    fill?: string;
    stroke?: string;
    [key: string]: string | number | boolean | object | null | undefined;
  };
  color?: string;
  fill?: string;
  stroke?: string;
  id?: string;
  [key: string]: string | number | boolean | object | null | undefined;
}

/**
 * Basic tooltip content props without Recharts dependencies
 */
export interface BasicTooltipContentProps {
  active?: boolean;
  hideLabel?: boolean;
  hideIndicator?: boolean;
  indicator?: 'line' | 'dot' | 'dashed';
  nameKey?: string;
  labelKey?: string;
  label?: string | number;
  labelFormatter?: (label: string | number, payload: ChartPayloadItem[]) => React.ReactNode;
  payload?: ChartPayloadItem[];
  color?: string;
}

/**
 * Chart tooltip content props
 */
export type ChartTooltipContentProps = BasicTooltipContentProps &
  Omit<TooltipProps<string | number, string | number>, 'content'> & 
  Omit<React.HTMLProps<HTMLDivElement>, 'content'>;

/**
 * Chart tooltip item props
 */
export interface ChartTooltipItemProps {
  name?: string | number;
  dataKey?: string | number;
  value?: number | string;
  payload?: ChartPayloadItem;
  fill?: string;
  color?: string;
}

/**
 * Basic legend content props without Recharts dependencies
 */
export interface BasicLegendContentProps {
  hideIcon?: boolean;
  nameKey?: string;
  verticalAlign?: 'top' | 'middle' | 'bottom';
  payload?: ChartPayloadItem[];
}

/**
 * Chart legend content props
 */
export type ChartLegendContentProps = BasicLegendContentProps &
  Omit<LegendProps, 'content'> & 
  Omit<React.HTMLProps<HTMLDivElement>, 'content'>;
