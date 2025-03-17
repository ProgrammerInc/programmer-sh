import { AuthModal, AuthModalProvider } from '@/components/ui/auth-modal';
import { Toaster as Sonner } from '@/components/ui/sonner/sonner';
import { Toaster } from '@/components/ui/toaster/toaster';
import { TooltipProvider } from '@/components/ui/tooltip/tooltip';
import { useAuthModal } from '@/hooks/use-auth-modal.hook';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Lazily load page components with explicit chunk names for better dynamic imports
const Index = lazy(() => import(/* webpackChunkName: "index-page" */ './pages/Index.tsx'));
const LoggerDemo = lazy(
  () => import(/* webpackChunkName: "logger-demo" */ './components/demos/LoggerDemo.tsx')
);
const MemoryLeakDemo = lazy(
  () => import(/* webpackChunkName: "memory-leak-demo" */ './components/demos/MemoryLeakDemo.tsx')
);
const SentryDemo = lazy(
  () => import(/* webpackChunkName: "sentry-demo" */ './components/demos/SentryDemo.tsx')
);
const WhyDidYouRenderDemo = lazy(
  () => import(/* webpackChunkName: "wdyr-demo" */ './components/demos/WDYRDemo.tsx')
);
const AuthCallback = lazy(
  () => import(/* webpackChunkName: "auth-callback" */ './pages/AuthCallback.tsx')
);
const NotFound = lazy(() => import(/* webpackChunkName: "not-found" */ './pages/NotFound.tsx'));

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
