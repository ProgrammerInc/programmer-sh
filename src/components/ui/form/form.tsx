'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { Controller, FieldPath, FieldValues, FormProvider } from 'react-hook-form';
import { Label } from '@/components/ui/label/label';
import { cn } from '@/utils/app.utils';
import { FormFieldContext, FormItemContext } from './form.context';
import { useFormField } from './form.hooks';
import {
  FormControlProps,
  FormDescriptionProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormMessageProps
} from './form.types';

/**
 * Form component wrapper for react-hook-form FormProvider
 */
const Form = FormProvider;

/**
 * Form Field component for handling form field context
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

/**
 * Form Item component for grouping form elements
 */
const FormItem = React.memo(
  React.forwardRef<HTMLDivElement, FormItemProps>(({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div className={cn('space-y-2', className)} ref={ref} {...props} />
      </FormItemContext.Provider>
    );
  })
);

FormItem.displayName = 'FormItem';

/**
 * Form Label component for form field labels
 */
const FormLabel = React.memo(
  React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, FormLabelProps>(
    ({ className, ...props }, ref) => {
      const { error, formItemId } = useFormField();

      return (
        <Label
          className={cn(error && 'text-destructive', className)}
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
 * Form Control component for form inputs
 */
const FormControl = React.memo(
  React.forwardRef<React.ElementRef<typeof Slot>, FormControlProps>(({ ...props }, ref) => {
    const { error, formDescriptionId, formItemId, formMessageId } = useFormField();

    return (
      <Slot
        aria-describedby={
          !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={!!error}
        id={formItemId}
        ref={ref}
        {...props}
      />
    );
  })
);

FormControl.displayName = 'FormControl';

/**
 * Form Description component for describing form fields
 */
const FormDescription = React.memo(
  React.forwardRef<HTMLParagraphElement, FormDescriptionProps>(
    ({ className, ...props }, ref) => {
      const { formDescriptionId } = useFormField();

      return (
        <p
          className={cn('text-sm text-muted-foreground', className)}
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
 * Form Message component for displaying form errors
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
          className={cn('text-sm font-medium text-destructive', className)}
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
