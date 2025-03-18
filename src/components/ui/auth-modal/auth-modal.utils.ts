/**
 * Auth Modal Utilities
 *
 * Utility functions for the Auth Modal component.
 */

'use client';

import { Github, Twitter } from 'lucide-react';
import React from 'react';

import { GoogleIcon } from './auth-modal.components';

/**
 * Validate email format
 * 
 * @param email - Email address to validate
 * @returns True if email is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Calculate modal position relative to an anchor element
 * 
 * @param anchorRef - Reference to the anchor element
 * @param modalWidth - Width of the modal in pixels
 * @returns Calculated position coordinates
 */
export const getModalPosition = (anchorRef: HTMLDivElement | null, modalWidth = 400): { top: number; left: number; width: number } => {
  if (!anchorRef) {
    return { top: 0, left: 0, width: modalWidth };
  }

  const rect = anchorRef.getBoundingClientRect();
  const responsiveWidth = Math.min(modalWidth, window.innerWidth - 40);

  return {
    top: rect.bottom,
    left: rect.left + rect.width / 2 - responsiveWidth / 2,
    width: responsiveWidth
  };
};

/**
 * Type for OAuth provider configuration
 */
type OAuthProviderConfig = {
  [key in 'github' | 'google' | 'twitter']: {
    icon: React.ReactNode;
    label: string;
    className: string;
    color: string;
  }
};

/**
 * Get OAuth provider configuration
 * 
 * @returns Configuration object for OAuth providers
 */
export const getOAuthProviderConfig = (): OAuthProviderConfig => {
  return {
    github: {
      icon: React.createElement(Github, { size: 18 }),
      label: 'Continue with GitHub',
      className: 'github-button',
      color: '#24292e'
    },
    google: {
      icon: React.createElement(GoogleIcon, { size: 18 }),
      label: 'Continue with Google',
      className: 'google-button',
      color: '#4285F4'
    },
    twitter: {
      icon: React.createElement(Twitter, { size: 18 }),
      label: 'Continue with Twitter',
      className: 'twitter-button',
      color: '#1DA1F2'
    }
  };
};

/**
 * Get redirect URL for OAuth providers
 * 
 * @returns The redirect URL for OAuth callbacks
 */
export const getOAuthRedirectUrl = (): string => {
  return `${window.location.origin}/auth/callback`;
};

/**
 * Get the opposite auth mode
 * 
 * @param currentMode - Current auth mode ('login' or 'signup')
 * @returns The opposite auth mode
 */
export const getOppositeAuthMode = (currentMode: 'login' | 'signup') => {
  return currentMode === 'login' ? 'signup' : 'login';
};
