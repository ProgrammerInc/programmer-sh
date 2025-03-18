'use client';

import * as React from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';

/**
 * Form Field Context Value Interface
 * 
 * Defines the shape of the FormFieldContext value.
 * 
 * @template TFieldValues - The type of the form values
 * @template TName - The type of the field name
 * 
 * @property name - The name of the field in the form
 */
export type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

/**
 * Form Field Context
 * 
 * React context for maintaining state between a FormField and its descendants.
 * Used by the FormField component to pass the field name to child components.
 * 
 * @example
 * ```tsx
 * // Internal component usage
 * <FormFieldContext.Provider value={{ name: props.name }}>
 *   <Controller {...props} />
 * </FormFieldContext.Provider>
 * ```
 */
export const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

/**
 * Form Item Context Value Interface
 * 
 * Defines the shape of the FormItemContext value.
 * 
 * @property id - The unique ID for the form item
 */
export type FormItemContextValue = {
  id: string;
};

/**
 * Form Item Context
 * 
 * React context for maintaining state between a FormItem and its descendants.
 * Used by the FormItem component to pass the generated ID to child components.
 * 
 * @example
 * ```tsx
 * // Internal component usage
 * <FormItemContext.Provider value={{ id }}>
 *   <div className={styles['form-item']} ref={ref} {...props} />
 * </FormItemContext.Provider>
 * ```
 */
export const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);
