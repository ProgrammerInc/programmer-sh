/**
 * Auth Modal Provider
 *
 * Provider component for the Auth Modal context, allowing global modal access.
 */

'use client';

import React, { useRef, useState } from 'react';

import { AuthModalContext } from './auth-modal.context';
import { AuthMode } from './auth-modal.types';

/**
 * Auth Modal Provider Component
 *
 * Provides context for managing the auth modal state throughout the application
 */
export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AuthMode>('login');
  const headerRef = useRef<HTMLDivElement>(null);

  // Open the modal with the specified authentication mode
  const openModal = (mode: AuthMode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Value passed to the context provider
  const contextValue = {
    isModalOpen,
    modalMode,
    openModal,
    closeModal,
    headerRef
  };

  return <AuthModalContext.Provider value={contextValue}>{children}</AuthModalContext.Provider>;
};

export default AuthModalProvider;
