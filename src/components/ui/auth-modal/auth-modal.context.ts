/**
 * Auth Modal Context
 *
 * Context for managing the Auth Modal state throughout the application.
 */

'use client';

import { createContext } from 'react';

import { AuthModalContextType } from './auth-modal.types';

/**
 * Auth Modal Context
 * 
 * Provides state and functions for managing the auth modal across the application
 */
export const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export default AuthModalContext;
