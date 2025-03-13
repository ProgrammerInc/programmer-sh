import { AuthModal } from '@/components/ui/auth-modal/auth-modal';
import { Toaster as Sonner } from '@/components/ui/sonner/sonner';
import { Toaster } from '@/components/ui/toaster/toaster';
import { TooltipProvider } from '@/components/ui/tooltip/tooltip';
import { AuthModalProvider } from '@/contexts/auth-modal-context';
import { useAuthModal } from '@/hooks/use-auth-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoggerDemo from './components/demo/logger-demo';
import MemoryLeakDemo from './components/demo/memory-leak-demo';
import SentryDemo from './components/demo/sentry-demo';
import WhyDidYouRenderDemo from './components/demo/wdyr-demo';
import AuthCallback from './pages/AuthCallback';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

// Auth modal wrapper component
const AuthModalWrapper = () => {
  const { isModalOpen, modalMode, closeModal, headerRef, openModal } = useAuthModal();

  // Listen for auth modal open events from terminal commands
  useEffect(() => {
    const handleOpenAuthModal = (event: CustomEvent<{ mode: 'login' | 'signup' }>) => {
      openModal(event.detail.mode);
    };

    // Use type assertion for CustomEvent
    document.addEventListener('openAuthModal', handleOpenAuthModal as EventListener);

    return () => {
      document.removeEventListener('openAuthModal', handleOpenAuthModal as EventListener);
    };
  }, [openModal]);

  return (
    <AuthModal isOpen={isModalOpen} mode={modalMode} anchorRef={headerRef} onClose={closeModal} />
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthModalProvider>
        <Toaster />
        <Sonner />
        <AuthModalWrapper />
        <BrowserRouter
          future={{
            v7_relativeSplatPath: true,
            v7_startTransition: true
          }}
        >
          <Routes>
            {/* Command routes - these will pass the command as a URL parameter */}
            <Route path="/:command" element={<Index />} />
            <Route path="/demo" element={<LoggerDemo />} />
            <Route path="/demo/memory" element={<MemoryLeakDemo />} />
            <Route path="/demo/sentry" element={<SentryDemo />} />
            <Route path="/demo/wdyr" element={<WhyDidYouRenderDemo />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
