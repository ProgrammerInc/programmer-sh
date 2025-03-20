/**
 * Auth Modal Types
 *
 * Type definitions for the Auth Modal component.
 */

import { type ReactNode, type RefObject } from 'react';

/**
 * Authentication modes supported by the modal
 */
export type AuthMode = 'login' | 'signup';

/**
 * Auth Modal Context Type
 * 
 * @property isModalOpen - Whether the auth modal is currently open
 * @property modalMode - Current authentication mode ('login' or 'signup')
 * @property openModal - Function to open the modal with specified mode
 * @property closeModal - Function to close the modal
 * @property headerRef - Reference to the header element for positioning
 */
export interface AuthModalContextType {
  isModalOpen: boolean;
  modalMode: AuthMode;
  openModal: (mode: AuthMode) => void;
  closeModal: () => void;
  headerRef: RefObject<HTMLDivElement>;
}

/**
 * Auth Modal Component Props
 * 
 * @property isOpen - Whether the modal is currently open
 * @property mode - Current authentication mode ('login' or 'signup')
 * @property anchorRef - Reference to the anchor element for positioning
 * @property onClose - Function to call when the modal is closed
 */
export interface AuthModalProps {
  isOpen: boolean;
  mode: AuthMode;
  anchorRef: RefObject<HTMLDivElement>;
  onClose: () => void;
}

/**
 * Form Input Component Props
 */
export interface FormInputProps {
  id: string;
  type: 'text' | 'email' | 'password';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder: string;
  disabled?: boolean;
  autoFocus?: boolean;
  icon: ReactNode;
}

/**
 * OAuth Button Component Props
 */
export interface OAuthButtonProps {
  provider: 'github' | 'google' | 'twitter';
  onClick: () => void;
  disabled?: boolean;
}

/**
 * Modal Form Component Props
 */
export interface ModalFormProps {
  currentMode: AuthMode;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onOAuthLogin: (provider: 'github' | 'google' | 'twitter') => void;
  onToggleMode: () => void;
}
