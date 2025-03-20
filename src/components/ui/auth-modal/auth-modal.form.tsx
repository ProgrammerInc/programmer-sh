/**
 * Auth Modal Form
 *
 * The form component for the Auth Modal with login/signup functionality.
 */

'use client';

import { Lock, Mail } from 'lucide-react';
import React, { memo, useEffect } from 'react';

import styles from './auth-modal.module.css';
import { Divider, FormInput, OAuthButton } from './auth-modal.components';
import { ModalFormProps } from './auth-modal.types';

/**
 * Auth Modal Form Component
 * 
 * Handles the form inputs, validation, and submission for auth operations
 */
export const AuthModalForm = memo<ModalFormProps>(({ 
  currentMode,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  loading,
  onSubmit,
  onOAuthLogin,
  onToggleMode
}) => {
  // Keep a reference to the latest props to avoid unnecessary rerenders
  const propsRef = React.useRef({
    currentMode,
    loading,
    onSubmit,
    onOAuthLogin,
    onToggleMode
  });
  
  // Update the ref when props change
  React.useEffect(() => {
    propsRef.current = {
      currentMode,
      loading,
      onSubmit,
      onOAuthLogin,
      onToggleMode
    };
  }, [currentMode, loading, onSubmit, onOAuthLogin, onToggleMode]);
  
  // Ensure email input is focused when modal opens
  React.useEffect(() => {
    // Small timeout to ensure the modal is fully rendered and animated in
    const timer = setTimeout(() => {
      const emailInput = document.getElementById('email') as HTMLInputElement;
      if (emailInput) {
        emailInput.focus();
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <form onSubmit={onSubmit} className={styles.form}>
        <FormInput
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          placeholder="your@email.com"
          disabled={loading}
          autoFocus={true}
          icon={<Mail size={16} className="text-terminal-muted" />}
        />
        
        <FormInput
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          placeholder="••••••••"
          disabled={loading}
          icon={<Lock size={16} className="text-terminal-muted" />}
        />
        
        {currentMode === 'signup' && (
          <FormInput
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
            placeholder="••••••••"
            disabled={loading}
            icon={<Lock size={16} className="text-terminal-muted" />}
          />
        )}
        
        <button
          type="submit"
          disabled={loading}
          className={styles.submitButton}
        >
          {loading 
            ? 'Processing...' 
            : currentMode === 'login' 
              ? 'Login' 
              : 'Create Account'}
        </button>
      </form>

      <Divider text="OR" />
      
      <div className={styles.oauthSection}>
        <OAuthButton 
          provider="github" 
          onClick={() => onOAuthLogin('github')} 
          disabled={loading} 
        />
        
        <OAuthButton 
          provider="google" 
          onClick={() => onOAuthLogin('google')} 
          disabled={loading} 
        />
        
        <OAuthButton 
          provider="twitter" 
          onClick={() => onOAuthLogin('twitter')} 
          disabled={loading} 
        />
      </div>
      
      <div className={styles.toggleMode}>
        <button
          type="button"
          onClick={onToggleMode}
          className={styles.toggleModeButton}
        >
          {currentMode === 'login'
            ? 'Need an account? Sign up'
            : 'Already have an account? Log in'}
        </button>
      </div>
    </>
  );
});

AuthModalForm.displayName = 'AuthModalForm';
