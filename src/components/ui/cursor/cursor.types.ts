export type CursorType = 'default' | 'animation' | 'image';

export interface Cursor {
  id: string;
  color?: string;
  animation?: string;
  gradient?: string;
  type?: CursorType;
}

export interface CursorProps extends React.HTMLAttributes<HTMLDivElement> {
  cursor?: string;
}
