import React from 'react';
import styles from './star-border.module.css';

export type StarBorderProps<T extends React.ElementType> = React.ComponentPropsWithoutRef<T> & {
  as?: T;
  className?: string;
  children?: React.ReactNode;
  color?: string;
  speed?: React.CSSProperties['animationDuration'];
};

export const StarBorder = <T extends React.ElementType = 'button'>({
  as,
  className = '',
  color = 'white',
  speed = '6s',
  children,
  ...rest
}: StarBorderProps<T>) => {
  const Component = as || 'button';

  // Set CSS custom properties for dynamic values
  const cssVariables = {
    '--star-color': color,
    '--animation-duration': speed
  } as React.CSSProperties;

  return (
    <Component className={`${styles.starBorder} ${className}`} style={cssVariables} {...rest}>
      <div className={styles.starMovementBottom}></div>
      <div className={styles.starMovementTop}></div>
      <div className={styles.content}>{children}</div>
    </Component>
  );
};

export default StarBorder;
