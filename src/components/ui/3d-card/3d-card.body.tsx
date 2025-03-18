/**
 * 3D Card Body Component
 *
 * Defines the main body of the 3D card with preserved 3D styling.
 */

import { cn } from '@/utils/app.utils';
import React from 'react';

import styles from './3d-card.module.css';
import { CardBodyProps } from './3d-card.types';

/**
 * Card Body component for the 3D card
 *
 * @param props - Component props
 * @param props.children - Child elements to render inside the body
 * @param props.className - Additional classes for the card body
 * @returns Card Body component
 */
export const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  return <div className={cn(styles.body, className)}>{children}</div>;
};

export default CardBody;
