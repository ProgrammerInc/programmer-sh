'use client';

import useModal, { ModalContext } from '@/hooks/use-modal.hook';
import { cn } from '@/utils/app.utils';
import { AnimatePresence, motion } from 'framer-motion';
import { memo, useMemo, useRef, useState } from 'react';
import { CSS_CLASSES, DEFAULT_VALUES } from './animated-modal.constants';
import {
  useBodyScrollLock,
  useCloseHandler,
  useEscapeKeyClose,
  useModalAnimation,
  useModalCallbacks,
  useModalOutsideClick,
  useOpenHandler,
  useOverlayAnimation
} from './animated-modal.hooks';
import {
  AnimatedModalProps,
  AnimatedModalProviderProps,
  ModalAnimationConfig,
  ModalBodyProps,
  ModalContentProps,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
  ModalTriggerProps,
  OverlayProps
} from './animated-modal.types';

/**
 * Default animation configurations
 */
const defaultBackdropAnimation: ModalAnimationConfig = {
  initial: { opacity: 0 },
  animate: { opacity: 1, backdropFilter: 'blur(10px)' },
  exit: { opacity: 0, backdropFilter: 'blur(0px)' }
};

const defaultModalAnimation: ModalAnimationConfig = {
  initial: { opacity: 0, scale: 0.5, rotateX: 40, y: 40 },
  animate: { opacity: 1, scale: 1, rotateX: 0, y: 0 },
  exit: { opacity: 0, scale: 0.8, rotateX: 10 },
  transition: { type: 'spring', stiffness: 260, damping: 15 }
};

/**
 * AnimatedModalProvider component
 *
 * Provider component that manages modal state through context.
 *
 * @example
 * ```tsx
 * <AnimatedModalProvider>
 *   <Modal>
 *     <ModalTrigger>
 *       <button>Open Modal</button>
 *     </ModalTrigger>
 *     <ModalBody>
 *       <ModalContent>
 *         <h2>Modal Title</h2>
 *         <p>Modal content goes here</p>
 *       </ModalContent>
 *       <ModalFooter>
 *         <button>Close</button>
 *       </ModalFooter>
 *     </ModalBody>
 *   </Modal>
 * </AnimatedModalProvider>
 * ```
 */
const AnimatedModalProvider = memo(function AnimatedModalProvider({
  children,
  defaultOpen = DEFAULT_VALUES.DEFAULT_OPEN
}: AnimatedModalProviderProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const contextValue = useMemo(() => ({ open, setOpen }), [open]);

  return <ModalContext.Provider value={contextValue}>{children}</ModalContext.Provider>;
});

AnimatedModalProvider.displayName = 'AnimatedModalProvider';

/**
 * AnimatedModal component
 *
 * Fully animated modal component with overlay, header, body, and footer sections.
 *
 * @example
 * ```tsx
 * <AnimatedModalProvider>
 *   <ModalTrigger>
 *     <button>Open Modal</button>
 *   </ModalTrigger>
 *   <AnimatedModal>
 *     <ModalHeader>Modal Title</ModalHeader>
 *     <ModalBody>
 *       <p>Modal content goes here</p>
 *     </ModalBody>
 *     <ModalFooter>
 *       <button>Close</button>
 *     </ModalFooter>
 *   </AnimatedModal>
 * </AnimatedModalProvider>
 * ```
 */
const AnimatedModal = memo(function AnimatedModal({
  children,
  className,
  animation,
  closeOnOutsideClick = DEFAULT_VALUES.CLOSE_ON_OUTSIDE_CLICK,
  zIndex = DEFAULT_VALUES.Z_INDEX
}: AnimatedModalProps) {
  const { open, setOpen } = useModal();
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside if closeOnOutsideClick is true
  useModalOutsideClick(modalRef, closeOnOutsideClick, setOpen);

  // Keyboard event handler for accessibility (Escape key close)
  useEscapeKeyClose(open, setOpen);

  // Control body scroll when modal is open
  useBodyScrollLock(open);

  // Merge custom animation config with defaults
  const modalAnimation = useModalAnimation(animation);

  return (
    <AnimatePresence>
      {open && (
        <div className={cn(CSS_CLASSES.CONTAINER)} style={{ zIndex }}>
          <Overlay zIndex={zIndex - 1} />

          <motion.div
            ref={modalRef}
            className={cn(CSS_CLASSES.MODAL, className)}
            initial={modalAnimation.initial}
            animate={modalAnimation.animate}
            exit={modalAnimation.exit}
            transition={modalAnimation.transition}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <CloseIcon />
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

AnimatedModal.displayName = 'AnimatedModal';

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
const Modal = memo(function Modal({
  children,
  onOpen,
  onClose,
  closeOnEscape = DEFAULT_VALUES.CLOSE_ON_ESCAPE
}: ModalProps) {
  const [open, setOpen] = useState(false);

  // Handle effects when open state changes
  useModalCallbacks(open, onOpen, onClose);

  // Keyboard event handler for escape key
  useEscapeKeyClose(open, setOpen, closeOnEscape);

  return <ModalContext.Provider value={{ open, setOpen }}>{children}</ModalContext.Provider>;
});

Modal.displayName = 'Modal';

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
const ModalTrigger = memo(function ModalTrigger({ children, className }: ModalTriggerProps) {
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

ModalTrigger.displayName = 'ModalTrigger';

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
const ModalBody = memo(function ModalBody({ children, className }: ModalBodyProps) {
  return <div className={cn(CSS_CLASSES.BODY, className)}>{children}</div>;
});

ModalBody.displayName = 'ModalBody';

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
const ModalContent = memo(function ModalContent({ children, className }: ModalContentProps) {
  return <div className={cn(CSS_CLASSES.CONTENT, className)}>{children}</div>;
});

ModalContent.displayName = 'ModalContent';

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
const ModalHeader = memo(function ModalHeader({ children, className }: ModalHeaderProps) {
  return <header className={cn(CSS_CLASSES.HEADER, className)}>{children}</header>;
});

ModalHeader.displayName = 'ModalHeader';

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
const ModalFooter = memo(function ModalFooter({ children, className }: ModalFooterProps) {
  return <div className={cn(CSS_CLASSES.FOOTER, className)}>{children}</div>;
});

ModalFooter.displayName = 'ModalFooter';

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
const Overlay = memo(function Overlay({
  className,
  animation,
  zIndex = DEFAULT_VALUES.OVERLAY_Z_INDEX
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

Overlay.displayName = 'Overlay';

/**
 * CloseIcon component
 *
 * Close button component for the modal that appears in the top-right corner.
 */
const CloseIcon = memo(function CloseIcon() {
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

CloseIcon.displayName = 'CloseIcon';

export {
  AnimatedModal,
  AnimatedModalProvider,
  CloseIcon,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTrigger,
  Overlay
};

export default AnimatedModal;
