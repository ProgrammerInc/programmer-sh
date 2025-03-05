import { Cursor } from './cursor.types';

export const cursors: Record<string, Cursor> = {
  default: {
    id: 'default',
    type: 'default'
  },
  splash: {
    id: 'splash',
    type: 'animation',
    animation: 'splash'
  }
};
