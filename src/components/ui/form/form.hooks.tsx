'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormFieldContext, FormItemContext } from './form.context';

/**
 * useFormField Hook
 *
 * A custom React hook that provides form field state and metadata.
 * It combines context from both FormFieldContext and FormItemContext
 * with react-hook-form's field state management.
 *
 * This hook abstracts away the details of accessing field state and
 * generating unique IDs for accessibility attributes.
 *
 * @returns An object containing:
 * - id: The unique ID for the form item
 * - name: The name of the field
 * - formItemId: ID for the form item element
 * - formDescriptionId: ID for the form description element
 * - formMessageId: ID for the form message/error element
 * - ...fieldState: The current state of the field (error, isDirty, etc.)
 *
 * @throws Error if used outside of a FormField component
 *
 * @example
 * ```tsx
 * // Inside a form component
 * const { id, name, formItemId, error } = useFormField();
 *
 * // Use the field information for rendering or validation
 * return (
 *   <div>
 *     <label htmlFor={formItemId}>Field Label</label>
 *     {error && <p>Error: {error.message}</p>}
 *   </div>
 * );
 * ```
 */
export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};

export default useFormField;
