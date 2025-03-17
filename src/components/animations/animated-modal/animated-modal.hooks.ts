/**
 * Custom hooks for the AnimatedModal animation component
 */
import { useOutsideClick } from '@/hooks';
import useModal from '@/hooks/use-modal.hook';
import { RefObject, useCallback, useEffect, useMemo } from 'react';
import { DEFAULT_BACKDROP_ANIMATION, DEFAULT_MODAL_ANIMATION } from './animated-modal.constants';
import type { ModalAnimationConfig } from './animated-modal.types';

/**
 * Hook for handling escape key press to close the modal
 * @param open Whether the modal is open
 * @param setOpen Function to set the open state
 * @param closeOnEscape Whether to close on escape key press
 */
export const useEscapeKeyClose = (
  open: boolean,
  setOpen: (open: boolean) => void,
  closeOnEscape: boolean = true
): void => {
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (open && event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [open, closeOnEscape, setOpen]);
};

/**
 * Hook for controlling body scroll when modal is open
 * @param open Whether the modal is open
 */
export const useBodyScrollLock = (open: boolean): void => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to ensure body overflow is restored
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [open]);
};

/**
 * Hook for handling outside clicks to close the modal
 * @param ref Reference to the modal element
 * @param closeOnOutsideClick Whether to close on outside click
 * @param setOpen Function to set the open state
 */
export const useModalOutsideClick = (
  ref: RefObject<HTMLElement>,
  closeOnOutsideClick: boolean,
  setOpen: (open: boolean) => void
): void => {
  const handleOutsideClick = useCallback(() => {
    if (closeOnOutsideClick) {
      setOpen(false);
    }
  }, [closeOnOutsideClick, setOpen]);

  useOutsideClick(ref, handleOutsideClick);
};

/**
 * Hook for open/close callbacks
 * @param open Whether the modal is open
 * @param onOpen Callback when modal opens
 * @param onClose Callback when modal closes
 */
export const useModalCallbacks = (
  open: boolean,
  onOpen?: () => void,
  onClose?: () => void
): void => {
  useEffect(() => {
    if (open && onOpen) {
      onOpen();
    } else if (!open && onClose) {
      onClose();
    }
  }, [open, onOpen, onClose]);
};

/**
 * Hook for managing modal animation configuration
 * @param customAnimation Custom animation configuration
 * @returns Merged animation configuration
 */
export const useModalAnimation = (customAnimation?: ModalAnimationConfig): ModalAnimationConfig => {
  return useMemo(
    () => ({
      initial: customAnimation?.initial || DEFAULT_MODAL_ANIMATION.initial,
      animate: customAnimation?.animate || DEFAULT_MODAL_ANIMATION.animate,
      exit: customAnimation?.exit || DEFAULT_MODAL_ANIMATION.exit,
      transition: customAnimation?.transition || DEFAULT_MODAL_ANIMATION.transition
    }),
    [customAnimation]
  );
};

/**
 * Hook for managing overlay animation configuration
 * @param customAnimation Custom animation configuration
 * @returns Merged animation configuration
 */
export const useOverlayAnimation = (
  customAnimation?: ModalAnimationConfig
): ModalAnimationConfig => {
  return useMemo(
    () => ({
      initial: customAnimation?.initial || DEFAULT_BACKDROP_ANIMATION.initial,
      animate: customAnimation?.animate || DEFAULT_BACKDROP_ANIMATION.animate,
      exit: customAnimation?.exit || DEFAULT_BACKDROP_ANIMATION.exit,
      transition: customAnimation?.transition
    }),
    [customAnimation]
  );
};

/**
 * Hook for creating a close handler function
 * @returns Function to close the modal
 */
export const useCloseHandler = (): (() => void) => {
  const { setOpen } = useModal();
  return useCallback(() => setOpen(false), [setOpen]);
};

/**
 * Hook for creating an open handler function
 * @returns Function to open the modal
 */
export const useOpenHandler = (): (() => void) => {
  const { setOpen } = useModal();
  return useCallback(() => setOpen(true), [setOpen]);
};
