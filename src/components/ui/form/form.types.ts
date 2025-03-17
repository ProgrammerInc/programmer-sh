'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

// Form Field Props
export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ControllerProps<TFieldValues, TName>;

// Form Item Props
export type FormItemProps = React.HTMLAttributes<HTMLDivElement>;

// Form Label Props
export type FormLabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

// Form Control Props
export type FormControlProps = React.ComponentPropsWithoutRef<typeof Slot>;

// Form Description Props
export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

// Form Message Props
export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;
