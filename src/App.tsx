import { Toaster as Sonner } from '@/components/ui/sonner/sonner';
import { Toaster } from '@/components/ui/toaster/toaster';
import { TooltipProvider } from '@/components/ui/tooltip/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoggerDemo from './components/demo/logger-demo';
import WhyDidYouRenderDemo from './components/demo/wdyr-demo';
import Index from './pages/Index';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
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
          <Route path="/demo/wdyr" element={<WhyDidYouRenderDemo />} />
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
