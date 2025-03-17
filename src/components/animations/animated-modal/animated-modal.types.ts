import { TargetAndTransition, VariantLabels } from 'framer-motion';
import { ReactNode } from 'react';

/**
 * Animation configuration for modal transitions
 */
export interface ModalAnimationConfig {
  /** Initial animation state */
  initial?: VariantLabels | TargetAndTransition;
  /** Animation state when element is visible */
  animate?: VariantLabels | TargetAndTransition;
  /** Animation state when element is exiting */
  exit?: VariantLabels | TargetAndTransition;
  /** Animation transition settings */
  transition?: Record<string, number | string | boolean>;
}

/**
 * Props for components that include children and optional className
 */
export interface ModalComponentProps {
  /** React children elements */
  children: ReactNode;
  /** Optional CSS class names */
  className?: string;
}

/**
 * Props specifically for the Modal component
 */
export interface ModalProps extends ModalComponentProps {
  /** Callback when modal opens */
  onOpen?: () => void;
  /** Callback when modal closes */
  onClose?: () => void;
  /** Whether to close the modal when the escape key is pressed (default: true) */
  closeOnEscape?: boolean;
}

/**
 * Props for the AnimatedModalProvider component
 */
export interface AnimatedModalProviderProps {
  /** React children elements */
  children: ReactNode;
  /** Initial open state (default: false) */
  defaultOpen?: boolean;
}

/**
 * Props for the ModalTrigger component
 *
 * @remarks
 * While currently identical to ModalComponentProps, this interface exists
 * to allow for future extension with trigger-specific properties
 * without affecting other modal components.
 */
export type ModalTriggerProps = ModalComponentProps;

/**
 * Props for the AnimatedModal component
 */
export interface AnimatedModalProps extends ModalComponentProps {
  /** Animation configuration for the modal */
  animation?: ModalAnimationConfig;
  /** Whether to close the modal when clicking outside (default: true) */
  closeOnOutsideClick?: boolean;
  /** Custom z-index for the modal */
  zIndex?: number;
}

/**
 * Props for the ModalBody component
 *
 * @remarks
 * While currently identical to ModalComponentProps, this interface exists
 * to allow for future extension with body-specific properties like transition options
 * without affecting other modal components.
 */
export type ModalBodyProps = ModalComponentProps;

/**
 * Props for the ModalContent component
 *
 * @remarks
 * While currently identical to ModalComponentProps, this interface exists
 * to allow for future extension with content-specific properties
 * without affecting other modal components.
 */
export type ModalContentProps = ModalComponentProps;

/**
 * Props for the ModalHeader component
 *
 * @remarks
 * While currently identical to ModalComponentProps, this interface exists
 * to allow for future extension with header-specific properties
 * without affecting other modal components.
 */
export type ModalHeaderProps = ModalComponentProps;

/**
 * Props for the ModalFooter component
 *
 * @remarks
 * While currently identical to ModalComponentProps, this interface exists
 * to allow for future extension with footer-specific properties like alignment options
 * without affecting other modal components.
 */
export type ModalFooterProps = ModalComponentProps;

/**
 * Props for the Overlay component
 */
export interface OverlayProps {
  /** Optional CSS class names */
  className?: string;
  /** Animation configuration for the overlay */
  animation?: ModalAnimationConfig;
}

/**
 * Type for the ModalContext value
 */
export interface ModalContextValue {
  /** Whether the modal is open */
  open: boolean;
  /** Function to set the open state */
  setOpen: (open: boolean) => void;
}
