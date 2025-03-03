import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper to ensure URLs have https:// prefix
export const ensureHttps = (url: string): string => {
  if (!url) return url;
  return url.startsWith('http') ? url : `https://${url}`;
};

// Helper function to merge Tailwind classes
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

// Helper function to validate an email address
export const isValidEmail = (email: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};
