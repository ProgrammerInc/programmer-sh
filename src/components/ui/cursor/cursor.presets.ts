import { Cursor } from './cursor.types';

export const cursors: Record<string, Cursor> = {
  default: {
    id: 'default',
    name: 'Default',
    description: 'Default cursor',
    type: 'default'
  },
  // blob: {
  //   id: 'blob',
  //   name: 'Blob',
  //   description: 'Blob cursor',
  //   type: 'animation',
  //   animation: 'blob',
  //   animationType: 'reactbits'
  // },
  bubble: {
    id: 'bubble',
    name: 'Bubble',
    description: 'Bubble cursor',
    type: 'animation',
    animation: 'bubble',
    animationType: 'cursify'
  },
  crosshair: {
    id: 'crosshair',
    name: 'Crosshair',
    description: 'Crosshair cursor',
    type: 'animation',
    animation: 'crosshair',
    animationType: 'reactbits'
  },
  // ribbons: {
  //   id: 'ribbons',
  //   name: 'Ribbons',
  //   description: 'Ribbons cursor',
  //   type: 'animation',
  //   animation: 'ribbons',
  //   animationType: 'reactbits'
  // },
  snowflake: {
    id: 'snowflake',
    name: 'Snowflake',
    description: 'Snowflake cursor',
    type: 'animation',
    animation: 'snowflake',
    animationType: 'cursify'
  },
  splash: {
    id: 'splash',
    name: 'Splash',
    description: 'Splash cursor',
    type: 'animation',
    animation: 'splash',
    animationType: 'reactbits'
  }
};
