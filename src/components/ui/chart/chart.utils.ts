import { ChartConfig } from './chart.types';

/**
 * Extract item config from a payload
 * 
 * @param config Chart configuration
 * @param payload Recharts payload
 * @param key Key to lookup in the config
 * @returns The configuration for the key or undefined
 */
export function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: any,
  key: string
) {
  if (!payload || !key) {
    return undefined;
  }

  const dataKey = payload?.dataKey || payload?.name || key;

  if (typeof dataKey !== 'string') {
    return undefined;
  }

  if (config[dataKey]) {
    return config[dataKey];
  }

  // Try to find the key in the config by removing the accessor part
  // e.g. 'data.value' -> 'data'
  const parts = dataKey.split('.');
  if (parts.length > 1 && config[parts[0]]) {
    return config[parts[0]];
  }

  return undefined;
}
