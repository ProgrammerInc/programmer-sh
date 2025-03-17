/**
 * Sub-components for the AnimatedModal animation component
 */
'use client';

import { ModalContext } from '@/hooks/use-modal.hook';
import { cn } from '@/utils/app.utils';
import { motion } from 'framer-motion';
import { memo, useState } from 'react';
import { CSS_CLASSES } from './animated-modal.constants';
import {
  useCloseHandler,
  useEscapeKeyClose,
  useModalCallbacks,
  useOpenHandler,
  useOverlayAnimation
} from './animated-modal.hooks';
import type {
  ModalBodyProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalTriggerProps,
  OverlayProps
} from './animated-modal.types';

/**
 * Modal component
 *
 * Wrapper component that provides modal context to its children.
 * Use this as the root component for your modal implementation.
 *
 * @example
 * ```tsx
 * <Modal>
 *   <ModalTrigger>
 *     <span>Open Modal</span>
 *   </ModalTrigger>
 *   <ModalBody>
 *     <ModalContent>
 *       <h2>Modal Title</h2>
 *       <p>Modal content goes here</p>
 *     </ModalContent>
 *     <ModalFooter>
 *       <button>Close</button>
 *     </ModalFooter>
 *   </ModalBody>
 * </Modal>
 * ```
 */
export const Modal = memo(function Modal({
  children,
  onOpen,
  onClose,
  closeOnEscape = true
}: ModalProps) {
  const [open, setOpen] = useState(false);

  // Handle effects when open state changes
  useModalCallbacks(open, onOpen, onClose);

  // Keyboard event handler for escape key
  useEscapeKeyClose(open, setOpen, closeOnEscape);

  return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>;
});

/**
 * ModalTrigger component
 *
 * Button component that triggers the modal to open when clicked.
 *
 * @example
 * ```tsx
 * <ModalTrigger className="custom-button-class">
 *   <span>Open Modal</span>
 * </ModalTrigger>
 * ```
 */
export const ModalTrigger = memo(function ModalTrigger({ children, className }: ModalTriggerProps) {
  const handleClick = useOpenHandler();

  return (
    <button
      className={cn(CSS_CLASSES.TRIGGER, className)}
      onClick={handleClick}
      aria-haspopup="dialog"
    >
      {children}
    </button>
  );
});

/**
 * ModalBody component
 *
 * Container for the modal content with animation effects.
 * Handles modal animations, backdrop, and outside click behavior.
 *
 * @example
 * ```tsx
 * <ModalBody className="custom-modal-class">
 *   <ModalContent>Content goes here</ModalContent>
 * </ModalBody>
 * ```
 */
export const ModalBody = memo(function ModalBody({ children, className }: ModalBodyProps) {
  return <div className={cn(CSS_CLASSES.BODY, className)}>{children}</div>;
});

/**
 * ModalContent component
 *
 * Container for the actual modal content with customizable styling.
 *
 * @example
 * ```tsx
 * <ModalContent className="custom-content-class">
 *   <ModalHeader>Title</ModalHeader>
 *   <p>Modal content goes here</p>
 *   <ModalFooter>
 *     <button onClick={closeModal}>Close</button>
 *   </ModalFooter>
 * </ModalContent>
 * ```
 */
export const ModalContent = memo(function ModalContent({ children, className }: ModalContentProps) {
  return <div className={cn(CSS_CLASSES.CONTENT, className)}>{children}</div>;
});

/**
 * ModalHeader component
 *
 * Header component for modal with customizable styling.
 *
 * @example
 * ```tsx
 * <ModalHeader className="custom-header-class">
 *   <h2>Modal Title</h2>
 * </ModalHeader>
 * ```
 */
export const ModalHeader = memo(function ModalHeader({ children, className }: ModalHeaderProps) {
  return <header className={cn(CSS_CLASSES.HEADER, className)}>{children}</header>;
});

/**
 * ModalFooter component
 *
 * Component for styling the footer area of the modal, typically for action buttons.
 *
 * @example
 * ```tsx
 * <ModalFooter className="custom-footer-class">
 *   <button onClick={closeModal}>Cancel</button>
 *   <button onClick={handleSave}>Save</button>
 * </ModalFooter>
 * ```
 */
export const ModalFooter = memo(function ModalFooter({ children, className }: ModalFooterProps) {
  return <div className={cn(CSS_CLASSES.FOOTER, className)}>{children}</div>;
});

/**
 * Overlay component
 *
 * Component for creating a background overlay when the modal is open.
 *
 * @example
 * ```tsx
 * <Overlay className="custom-overlay-class" />
 * ```
 */
export const Overlay = memo(function Overlay({
  className,
  animation,
  zIndex = 40
}: OverlayProps & { zIndex?: number }) {
  // Merge custom animation config with defaults
  const overlayAnimation = useOverlayAnimation(animation);

  return (
    <motion.div
      className={cn(CSS_CLASSES.OVERLAY, className)}
      style={{ zIndex }}
      initial={overlayAnimation.initial}
      animate={overlayAnimation.animate}
      exit={overlayAnimation.exit}
      transition={overlayAnimation.transition}
      aria-hidden="true"
    />
  );
});

/**
 * CloseIcon component
 *
 * Close button component for the modal that appears in the top-right corner.
 */
export const CloseIcon = memo(function CloseIcon() {
  const handleClick = useCloseHandler();

  return (
    <button
      onClick={handleClick}
      className={CSS_CLASSES.CLOSE_BUTTON}
      aria-label="Close modal"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={CSS_CLASSES.CLOSE_ICON}
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  );
});
