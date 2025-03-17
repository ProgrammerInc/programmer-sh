/**
 * Reducer for managing ripple state in the Ripple Cursor component.
 */
import { MAX_RIPPLES } from './ripple-cursor.constants';
import type { RippleAction, RippleState } from './ripple-cursor.types';

/**
 * Reducer function for managing ripple state.
 * Handles adding and removing ripples with a maximum limit to prevent performance issues.
 *
 * @param state - Current ripple state
 * @param action - Action to perform on the state
 * @returns Updated ripple state
 */
export const rippleReducer = (state: RippleState, action: RippleAction): RippleState => {
  switch (action.type) {
    case 'ADD_RIPPLE':
      // Add a new ripple and limit the total count
      return [...state, action.payload].slice(-MAX_RIPPLES);

    case 'REMOVE_RIPPLE':
      // Remove a specific ripple by ID
      return state.filter(ripple => ripple.id !== action.payload);

    default:
      return state;
  }
};
