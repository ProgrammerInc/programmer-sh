'use client';

import * as React from 'react';
import { ChartContextProps } from './chart.types';

/**
 * Chart Context for providing configuration to chart components
 */
export const ChartContext = React.createContext<ChartContextProps>({ config: {} });

/**
 * Hook to access chart configuration from context
 */
export const useChartConfig = (): ChartContextProps => {
  const context = React.useContext(ChartContext);
  if (!context) {
    throw new Error('useChartConfig must be used within a ChartContext.Provider');
  }
  return context;
};
