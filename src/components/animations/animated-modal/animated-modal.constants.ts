/**
 * Constants for the AnimatedModal animation component
 */
import styles from './animated-modal.module.css';
import type { ModalAnimationConfig } from './animated-modal.types';

/**
 * CSS class names used in the component
 */
export const CSS_CLASSES = {
  /** Modal container className */
  CONTAINER: styles['modal-container'],
  /** Modal content className */
  MODAL: styles['modal-content'],
  /** Modal body className */
  BODY: styles['modal-body'],
  /** Modal content area className */
  CONTENT: styles['modal-content-area'],
  /** Modal header className */
  HEADER: styles['modal-header'],
  /** Modal footer className */
  FOOTER: styles['modal-footer'],
  /** Modal overlay className */
  OVERLAY: styles['modal-overlay'],
  /** Modal trigger className */
  TRIGGER: styles['modal-trigger'],
  /** Close button className */
  CLOSE_BUTTON: styles['close-button'],
  /** Close icon className */
  CLOSE_ICON: styles['close-icon']
};

/**
 * Default animation configuration for backdrop/overlay
 */
export const DEFAULT_BACKDROP_ANIMATION: ModalAnimationConfig = {
  /** Initial state (invisible) */
  initial: { opacity: 0 },
  /** Animated state (visible with blur) */
  animate: { opacity: 1, backdropFilter: 'blur(10px)' },
  /** Exit state (fade out) */
  exit: { opacity: 0, backdropFilter: 'blur(0px)' }
};

/**
 * Default animation configuration for modal
 */
export const DEFAULT_MODAL_ANIMATION: ModalAnimationConfig = {
  /** Initial state (small and tilted) */
  initial: { opacity: 0, scale: 0.5, rotateX: 40, y: 40 },
  /** Animated state (full size) */
  animate: { opacity: 1, scale: 1, rotateX: 0, y: 0 },
  /** Exit state (shrink slightly) */
  exit: { opacity: 0, scale: 0.8, rotateX: 10 },
  /** Spring-based transition */
  transition: { type: 'spring', stiffness: 260, damping: 15 }
};

/**
 * Default values for modal components
 */
export const DEFAULT_VALUES = {
  /** Default open state for modal provider */
  DEFAULT_OPEN: false,
  /** Default setting for closing on outside click */
  CLOSE_ON_OUTSIDE_CLICK: true,
  /** Default setting for closing on escape key press */
  CLOSE_ON_ESCAPE: true,
  /** Default z-index for modal container */
  Z_INDEX: 50,
  /** Default z-index for overlay */
  OVERLAY_Z_INDEX: 40
};
