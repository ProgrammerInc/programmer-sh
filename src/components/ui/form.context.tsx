import * as React from 'react';
import {
  FieldPath,
  FieldValues,
} from 'react-hook-form';

/**
 * Context type for the form field
 */
export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

/**
 * Context for the form field
 */
export const FormFieldContext = React.createContext<FormFieldContextValue>({} as FormFieldContextValue);

/**
 * Context type for the form item
 */
export type FormItemContextValue = {
  id: string;
};

/**
 * Context for the form item
 */
export const FormItemContext = React.createContext<FormItemContextValue>({} as FormItemContextValue);
