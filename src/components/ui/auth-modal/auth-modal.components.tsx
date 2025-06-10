/**
 * Auth Modal Components
 *
 * Reusable subcomponents for the Auth Modal.
 */

'use client';

import { cn } from '@/utils/app.utils';
import React from 'react';

import styles from './auth-modal.module.css';
import { FormInputProps, OAuthButtonProps } from './auth-modal.types';
import { getOAuthProviderConfig } from './auth-modal.utils';

/**
 * Form Input Component
 *
 * Renders a styled form input with label and icon
 */
export const FormInput: React.FC<FormInputProps> = ({
  id,
  type,
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  autoFocus = false,
  icon
}) => {
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className="relative">
        <div className={styles.inputIcon}>{icon}</div>
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className={styles.input}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
        />
      </div>
    </div>
  );
};

/**
 * The Google icon component
 */
export const GoogleIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 18,
  className
}) => (
  <svg
    className={className}
    width={size}
    height={size}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

/**
 * OAuth Button Component
 *
 * Renders a styled button for OAuth authentication
 */
export const OAuthButton: React.FC<OAuthButtonProps> = ({
  provider,
  onClick,
  disabled = false
}) => {
  // Get provider configuration from utils
  const providerConfig = getOAuthProviderConfig();
  const config = providerConfig[provider];

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(styles.oauthButton, config.className)}
      style={{ backgroundColor: config.color }}
    >
      <span className={styles.oauthButtonIcon}>{config.icon}</span>
      {config.label}
    </button>
  );
};

/**
 * Divider Component
 *
 * Renders a horizontal divider with text
 */
export const Divider: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className={styles.divider}>
      <div className={styles.dividerLine} />
      <span className={styles.dividerText}>{text}</span>
      <div className={styles.dividerLine} />
    </div>
  );
};
