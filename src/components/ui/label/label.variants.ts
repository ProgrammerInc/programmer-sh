import { cva } from 'class-variance-authority';

/**
 * Variant styles for the Label component
 */
export const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);
