'use client';

import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormFieldContext, FormItemContext } from './form.context';

/**
 * Custom hook to access form field context
 * Must be used within a FormField component
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
