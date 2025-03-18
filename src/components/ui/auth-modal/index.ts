/**
 * Auth Modal Index
 * 
 * Exports the Auth Modal components, hooks, and types.
 */

// Main component
export { AuthModal } from './auth-modal';
export { default as default } from './auth-modal';

// Context and provider
export { AuthModalContext } from './auth-modal.context';
export { AuthModalProvider } from './auth-modal.provider';

// Hooks
export { useAuthForm, useAuthModal, useModalPosition } from './auth-modal.hooks';

// Subcomponents
export { AuthModalForm } from './auth-modal.form';
export { Divider, FormInput, OAuthButton, GoogleIcon } from './auth-modal.components';

// Types
export type { 
  AuthMode, 
  AuthModalContextType, 
  AuthModalProps,
  FormInputProps,
  OAuthButtonProps,
  ModalFormProps 
} from './auth-modal.types';

// Utils
export { 
  validateEmail, 
  getModalPosition, 
  getOAuthProviderConfig 
} from './auth-modal.utils';
