import { RibbonsProps } from '@/components/cursors/ribbons';

// Cursor types
export type CursorType = 'default' | 'cursor' | 'animation';

// Cursor definition
export interface Cursor {
  id: string;
  name: string;
  description: string;
  type: CursorType;
  animation?: string;
  animationProps?: RibbonsProps;
  animationType?: string;
  url?: string;
}

export interface CursorProps extends React.HTMLAttributes<HTMLDivElement> {
  cursor?: string;
}
