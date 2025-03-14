'use client';

import { useRef, useState } from 'react';
import { AuthModalContext } from './auth-modal.context';
import { AuthMode } from './auth-modal.types';

export const AuthModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AuthMode>('login');
  const headerRef = useRef<HTMLDivElement>(null);

  const openModal = (mode: AuthMode) => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const value = {
    isModalOpen,
    modalMode,
    openModal,
    closeModal,
    headerRef
  };

  return <AuthModalContext.Provider value={value}>{children}</AuthModalContext.Provider>;
};

export default AuthModalProvider;
