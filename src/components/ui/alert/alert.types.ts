import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { alertVariants } from './alert.variants';

/**
 * Props for the Alert component
 */
export interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, 
  VariantProps<typeof alertVariants> {}

/**
 * Props for the AlertTitle component
 */
export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

/**
 * Props for the AlertDescription component
 */
export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
