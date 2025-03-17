/**
 * Utility functions for the ASCII Text component
 */

/**
 * Maps a number from one range to another
 *
 * @param n - The number to map
 * @param start - Start of the input range
 * @param stop - End of the input range
 * @param start2 - Start of the output range
 * @param stop2 - End of the output range
 * @returns The mapped number
 */
export function map(n: number, start: number, stop: number, start2: number, stop2: number): number {
  return ((n - start) / (stop - start)) * (stop2 - start2) + start2;
}
