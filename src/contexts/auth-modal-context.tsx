import React, { createContext, useRef, useState } from 'react';

type AuthMode = 'login' | 'signup';

interface AuthModalContextType {
  isModalOpen: boolean;
  modalMode: AuthMode;
  openModal: (mode: AuthMode) => void;
  closeModal: () => void;
  headerRef: React.RefObject<HTMLDivElement>;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

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

export { AuthModalContext };
