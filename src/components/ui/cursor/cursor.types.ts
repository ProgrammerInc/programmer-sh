import {
  BlobCursorProps,
  BubbleCursorProps,
  CrosshairProps,
  RibbonsProps,
  SnowflakeCursorProps
} from '@/components/cursors';
import { RefObject } from 'react';

// Cursor types
export type CursorType = 'default' | 'cursor' | 'image' | 'animation';

// Cursor definition
export interface Cursor {
  id: string;
  name: string;
  description: string;
  type: CursorType;
  animation?: string;
  animationProps?:
    | BlobCursorProps
    | BubbleCursorProps
    | CrosshairProps
    | RibbonsProps
    | SnowflakeCursorProps;
  animationType?: string;
  theme?: 'light' | 'dark';
  url?: string;
}

export interface CursorProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  containerRef?: RefObject<HTMLDivElement> | null;
  cursor?: string;
  theme?: 'light' | 'dark';
}
