import { createContext } from 'react';
import { AuthModalContextType } from './auth-modal.types';

export const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export default AuthModalContext;
