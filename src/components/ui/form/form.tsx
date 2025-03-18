'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { Controller, FieldPath, FieldValues, FormProvider } from 'react-hook-form';

import { Label } from '@/components/ui/label/label';
import { cn } from '@/utils/app.utils';
import { FormFieldContext, FormItemContext } from './form.context';
import { useFormField } from './form.hooks';
import styles from './form.module.css';
import {
  FormControlProps,
  FormDescriptionProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormMessageProps
} from './form.types';

/**
 * Form Component
 * 
 * A wrapper around react-hook-form's FormProvider.
 * Creates the form context for handling form state management.
 */
const Form = FormProvider;

/**
 * FormField Component
 * 
 * Provides a context wrapper for a form field.
 * Uses react-hook-form's Controller to manage the field's state.
 * 
 * @template TFieldValues The type of the form values
 * @template TName The type of the field name
 */
const FormField = React.memo(
  <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>(
    props: FormFieldProps<TFieldValues, TName>
  ) => {
    return (
      <FormFieldContext.Provider value={{ name: props.name }}>
        <Controller {...props} />
      </FormFieldContext.Provider>
    );
  }
);

FormField.displayName = 'FormField';

/**
 * FormItem Component
 * 
 * A container for form elements with consistent spacing.
 * Provides context for child components.
 */
const FormItem = React.memo(
  React.forwardRef<HTMLDivElement, FormItemProps>(({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div className={cn(styles['form-item'], className)} ref={ref} {...props} />
      </FormItemContext.Provider>
    );
  })
);

FormItem.displayName = 'FormItem';

/**
 * FormLabel Component
 * 
 * A label for form inputs with error styling.
 * Automatically connects to its input field using context.
 */
const FormLabel = React.memo(
  React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, FormLabelProps>(
    ({ className, ...props }, ref) => {
      const { error, formItemId } = useFormField();

      return (
        <Label
          className={cn(
            styles['form-label'],
            error && styles['form-label-error'],
            className
          )}
          htmlFor={formItemId}
          ref={ref}
          {...props}
        />
      );
    }
  )
);

FormLabel.displayName = 'FormLabel';

/**
 * FormControl Component
 * 
 * A wrapper for form inputs that adds required accessibility attributes.
 * Connects inputs to their labels, descriptions, and error messages.
 */
const FormControl = React.memo(
  React.forwardRef<React.ElementRef<typeof Slot>, FormControlProps>(({ className, ...props }, ref) => {
    const { error, formDescriptionId, formItemId, formMessageId } = useFormField();

    return (
      <Slot
        aria-describedby={
          !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        className={cn(styles['form-control'], className)}
        id={formItemId}
        ref={ref}
        {...props}
      />
    );
  })
);

FormControl.displayName = 'FormControl';

/**
 * FormDescription Component
 * 
 * A text component for providing additional information about a form field.
 * Uses a consistent style and connects to its field using context.
 */
const FormDescription = React.memo(
  React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
    ({ className, ...props }, ref) => {
      const { formDescriptionId } = useFormField();

      return (
        <p
          className={cn(styles['form-description'], className)}
          id={formDescriptionId}
          ref={ref}
          {...props}
        />
      );
    }
  )
);

FormDescription.displayName = 'FormDescription';

/**
 * FormMessage Component
 * 
 * A component for displaying validation errors.
 * Automatically shows error messages from react-hook-form.
 */
const FormMessage = React.memo(
  React.forwardRef<HTMLParagraphElement, FormMessageProps>(
    ({ children, className, ...props }, ref) => {
      const { error, formMessageId } = useFormField();
      const body = error ? String(error?.message) : children;

      if (!body) {
        return null;
      }

      return (
        <p
          className={cn(styles['form-message'], className)}
          id={formMessageId}
          ref={ref}
          {...props}
        >
          {body}
        </p>
      );
    }
  )
);

FormMessage.displayName = 'FormMessage';

export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage };
export default Form;
