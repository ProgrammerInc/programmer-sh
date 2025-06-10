/**
 * Auth Modal Component
 *
 * A modal dialog for user authentication with login and signup capabilities.
 */

'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import React, { memo } from 'react';

import { AuthModalForm } from './auth-modal.form';
import { useAuthForm, useModalPosition } from './auth-modal.hooks';
import styles from './auth-modal.module.css';
import { AuthModalProps } from './auth-modal.types';

/**
 * Auth Modal Component
 *
 * Displays a modal for user authentication with login and signup options.
 */
export const AuthModal = memo<AuthModalProps>(({ isOpen, mode, anchorRef, onClose }) => {
  // Custom hooks for form state and modal positioning
  const {
    currentMode,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    toggleMode,
    handleSubmit,
    handleOAuthLogin
  } = useAuthForm(mode);

  const { modalRef, modalPosition } = useModalPosition(isOpen, anchorRef, onClose);

  // Memoized form submit handler
  const onSubmit = React.useCallback(
    (e: React.FormEvent) => {
      handleSubmit(e, onClose);
    },
    [handleSubmit, onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute',
            top: `${modalPosition.top}px`,
            left: `${modalPosition.left}px`,
            width: `${modalPosition.width}px`,
            zIndex: 50
          }}
          className={styles.container}
        >
          <div className={styles.content}>
            <div className={styles.header}>
              <h2 className={styles.title}>
                {currentMode === 'login' ? 'Login' : 'Create Account'}
              </h2>
              <button onClick={onClose} className={styles.closeButton} aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <AuthModalForm
              currentMode={currentMode}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              loading={loading}
              onSubmit={onSubmit}
              onOAuthLogin={handleOAuthLogin}
              onToggleMode={toggleMode}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

AuthModal.displayName = 'AuthModal';

export default AuthModal;
