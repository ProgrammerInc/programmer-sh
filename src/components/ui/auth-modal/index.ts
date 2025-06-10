/**
 * Auth Modal Index
 *
 * Exports the Auth Modal components, hooks, and types.
 */

// Main component
export { AuthModal, default as default } from './auth-modal';

// Context and provider
export { AuthModalContext } from './auth-modal.context';
export { AuthModalProvider } from './auth-modal.provider';

// Hooks
export { useAuthForm, useAuthModal, useModalPosition } from './auth-modal.hooks';

// Subcomponents
export { Divider, FormInput, GoogleIcon, OAuthButton } from './auth-modal.components';
export { AuthModalForm } from './auth-modal.form';

// Types
export type {
  AuthModalContextType,
  AuthModalProps,
  AuthMode,
  FormInputProps,
  ModalFormProps,
  OAuthButtonProps
} from './auth-modal.types';

// Utils
export { getModalPosition, getOAuthProviderConfig, validateEmail } from './auth-modal.utils';
