// Adapted from shadcn-ui toast implementation
import { createFeatureLogger } from '@/services/logger/logger.utils';
import * as React from 'react';

import { ToastProviderProps, ToastRootProps } from '@/components/ui';
import type { ToastActionElement } from '@/components/ui/toast/toast';

// Create a dedicated logger for toast management
const toastLogger = createFeatureLogger('Toast');

/**
 * Maximum number of toasts to show at once
 */
export const TOAST_LIMIT = 5;

/**
 * Delay before removing toast from DOM after dismissal (in milliseconds)
 */
export const TOAST_REMOVE_DELAY = 5000;

/**
 * Toast notification interface including all properties
 */
export type ToasterToast = ToastRootProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

/**
 * Actions available for managing toasts
 */
export const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST'
} as const;

let count = 0;

/**
 * Generate a unique ID for each toast
 * @returns A unique string ID
 */
function generateId(): string {
  return `${count++}`;
}

export type ActionType = typeof actionTypes;

/**
 * Union type for all possible toast actions
 */
export type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: string;
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: string;
    };

/**
 * State interface for toast management
 */
export interface State {
  toasts: ToasterToast[];
}

/**
 * Map of toast IDs to their setTimeout handles for cleanup
 */
export const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Reducer function for handling toast state updates
 * @param state - Current toast state
 * @param action - Action to process
 * @returns Updated state
 */
export const reducer = (state: State, action: Action): State => {
  try {
    switch (action.type) {
      case actionTypes.ADD_TOAST:
        toastLogger.debug('Adding toast', { id: action.toast.id });
        return {
          ...state,
          toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
        };

      case actionTypes.UPDATE_TOAST:
        toastLogger.debug('Updating toast', { id: action.toast.id });
        return {
          ...state,
          toasts: state.toasts.map(t => (t.id === action.toast.id ? { ...t, ...action.toast } : t))
        };

      case actionTypes.DISMISS_TOAST: {
        const { toastId } = action;

        // Dismiss all toasts if no id is provided
        if (toastId === undefined) {
          toastLogger.debug('Dismissing all toasts');
          return {
            ...state,
            toasts: state.toasts.map(t => ({
              ...t,
              open: false
            }))
          };
        }

        // Dismiss toast with specific id
        toastLogger.debug('Dismissing toast', { id: toastId });
        return {
          ...state,
          toasts: state.toasts.map(t => (t.id === toastId ? { ...t, open: false } : t))
        };
      }

      case actionTypes.REMOVE_TOAST: {
        const { toastId } = action;

        // Remove all toasts if no id is provided
        if (toastId === undefined) {
          toastLogger.debug('Removing all toasts');
          return {
            ...state,
            toasts: []
          };
        }

        // Remove toast with specific id
        toastLogger.debug('Removing toast', { id: toastId });
        return {
          ...state,
          toasts: state.toasts.filter(t => t.id !== toastId)
        };
      }

      default:
        toastLogger.warn('Unknown action type', { type: (action as { type: string }).type });
        return state;
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    toastLogger.error('Error in toast reducer', { error: errorMessage });
    return state; // Return unchanged state on error
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

/**
 * Dispatch an action to update toast state
 * @param action - Action to dispatch
 */
function dispatch(action: Action): void {
  try {
    memoryState = reducer(memoryState, action);
    listeners.forEach(listener => {
      try {
        listener(memoryState);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        toastLogger.error('Error in toast listener', { error: errorMessage });
      }
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    toastLogger.error('Error dispatching toast action', {
      error: errorMessage,
      actionType: action.type
    });
  }
}

export type Toast = Omit<ToasterToast, 'id'>;

/**
 * Create a toast notification
 * @param props - Toast properties
 * @returns Object with methods to control the toast
 */
function toast(props: Toast) {
  try {
    const id = generateId();
    toastLogger.debug('Creating toast', { id });

    const update = (props: ToasterToast) =>
      dispatch({
        type: actionTypes.UPDATE_TOAST,
        toast: { ...props, id }
      });

    const dismiss = () => dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

    dispatch({
      type: actionTypes.ADD_TOAST,
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: open => {
          if (!open) dismiss();
        }
      }
    });

    return {
      id,
      dismiss,
      update
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    toastLogger.error('Error creating toast', { error: errorMessage });
    // Return a no-op object to prevent client code from breaking
    return {
      id: 'error',
      dismiss: () => {},
      update: () => {}
    };
  }
}

/**
 * Hook for accessing and managing toast notifications
 * @returns Object with toast state and methods
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    try {
      toastLogger.debug('Setting up toast listener');
      listeners.push(setState);

      return () => {
        try {
          const index = listeners.indexOf(setState);
          if (index > -1) {
            listeners.splice(index, 1);
            toastLogger.debug('Toast listener removed');
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          toastLogger.error('Error removing toast listener', { error: errorMessage });
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      toastLogger.error('Error setting up toast listener', { error: errorMessage });
      return () => {}; // Empty cleanup function
    }
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: actionTypes.DISMISS_TOAST, toastId })
  };
}

export { toast, useToast };

export default useToast;
