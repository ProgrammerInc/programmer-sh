import { AuthModal } from '@/components/ui/auth-modal/auth-modal';
import { Toaster as Sonner } from '@/components/ui/sonner/sonner';
import { Toaster } from '@/components/ui/toaster/toaster';
import { TooltipProvider } from '@/components/ui/tooltip/tooltip';
import { AuthModalProvider } from '@/contexts/auth-modal-context';
import { useAuthModal } from '@/hooks/use-auth-modal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Lazily load page components
const Index = lazy(() => import('./pages/Index'));
const LoggerDemo = lazy(() => import('./components/demo/logger-demo'));
const MemoryLeakDemo = lazy(() => import('./components/demo/memory-leak-demo'));
const SentryDemo = lazy(() => import('./components/demo/sentry-demo'));
const WhyDidYouRenderDemo = lazy(() => import('./components/demo/wdyr-demo'));
const AuthCallback = lazy(() => import('./pages/AuthCallback'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex h-screen w-screen items-center justify-center">
    <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-purple-500"></div>
  </div>
);

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
          <Suspense fallback={<LoadingSpinner />}>
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
          </Suspense>
        </BrowserRouter>
      </AuthModalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
