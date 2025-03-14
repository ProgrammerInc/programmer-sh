export type AuthMode = 'login' | 'signup';

export interface AuthModalContextType {
  isModalOpen: boolean;
  modalMode: AuthMode;
  openModal: (mode: AuthMode) => void;
  closeModal: () => void;
  headerRef: React.RefObject<HTMLDivElement>;
}

export interface AuthModalProps {
  isOpen: boolean;
  mode: AuthMode;
  anchorRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}
