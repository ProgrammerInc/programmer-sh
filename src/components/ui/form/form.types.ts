'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

/**
 * FormFieldProps Interface
 * 
 * Props for the FormField component, extending react-hook-form's ControllerProps.
 * 
 * @template TFieldValues - The type of the form values
 * @template TName - The type of the field name
 * 
 * @example
 * ```tsx
 * <FormField
 *   control={form.control}
 *   name="email"
 *   render={({ field }) => (
 *     <FormItem>
 *       <FormLabel>Email</FormLabel>
 *       <FormControl>
 *         <Input placeholder="email@example.com" {...field} />
 *       </FormControl>
 *       <FormMessage />
 *     </FormItem>
 *   )}
 * />
 * ```
 */
export type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = ControllerProps<TFieldValues, TName>;

/**
 * FormItemProps Interface
 * 
 * Props for the FormItem component, which wraps form elements.
 * 
 * @example
 * ```tsx
 * <FormItem>
 *   <FormLabel>Name</FormLabel>
 *   <FormControl>
 *     <Input placeholder="John Doe" />
 *   </FormControl>
 *   <FormDescription>Enter your full name.</FormDescription>
 *   <FormMessage />
 * </FormItem>
 * ```
 */
export type FormItemProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * FormLabelProps Interface
 * 
 * Props for the FormLabel component, extending Radix UI's Label component props.
 * 
 * @example
 * ```tsx
 * <FormLabel>Email Address</FormLabel>
 * ```
 */
export type FormLabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

/**
 * FormControlProps Interface
 * 
 * Props for the FormControl component, which wraps the actual input element.
 * 
 * @example
 * ```tsx
 * <FormControl>
 *   <Input placeholder="email@example.com" {...field} />
 * </FormControl>
 * ```
 */
export type FormControlProps = React.ComponentPropsWithoutRef<typeof Slot>;

/**
 * FormDescriptionProps Interface
 * 
 * Props for the FormDescription component, which provides additional information about a field.
 * 
 * @example
 * ```tsx
 * <FormDescription>
 *   Your password must be at least 8 characters long.
 * </FormDescription>
 * ```
 */
export type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

/**
 * FormMessageProps Interface
 * 
 * Props for the FormMessage component, which displays validation errors.
 * 
 * @example
 * ```tsx
 * <FormMessage>
 *   This will display errors from form validation
 * </FormMessage>
 * ```
 */
export type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>;
