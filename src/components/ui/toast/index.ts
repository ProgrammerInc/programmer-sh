// Export toast components and types
export * from './toast.types';
export * from './toast.variants';
export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './toast';

// For backwards compatibility
import { Toast } from './toast';
export default Toast;
