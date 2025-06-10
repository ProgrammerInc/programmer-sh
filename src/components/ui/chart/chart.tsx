/* eslint-disable react-refresh/only-export-components */
'use client';

import * as React from 'react';
import * as RechartsPrimitive from 'recharts';

import { cn } from '@/utils/app.utils';
import { ChartStyle } from './chart.components';
import { ChartContext } from './chart.context';
import styles from './chart.module.css';
import { ChartContainerProps } from './chart.types';

/**
 * Chart Container Component
 *
 * Main container for chart elements with theming and responsive behavior
 */
const Chart = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ id, className, children, config, ...props }, ref) => {
    const uniqueId = React.useId();
    const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

    return (
      <ChartContext.Provider value={{ config }}>
        <div data-chart={chartId} ref={ref} className={cn(styles.container, className)} {...props}>
          <ChartStyle id={chartId} config={config} />
          <RechartsPrimitive.ResponsiveContainer>{children}</RechartsPrimitive.ResponsiveContainer>
        </div>
      </ChartContext.Provider>
    );
  }
);

Chart.displayName = 'Chart';

// Export everything from components
export * from './chart.components';
export * from './chart.context';
export * from './chart.types';
export * from './chart.utils';

export default Chart;
