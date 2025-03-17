import { supabase } from '../integrations/supabase/supabase.client';
import { Command, CommandResult } from './command.types';
import { authLogger } from '../services/logger/logger.utils';

/**
 * Valid fields that can be updated in a user profile
 */
export enum ProfileUpdateField {
  Username = 'username',
  FullName = 'fullname'
}

/**
 * Type definition for the profile data structure
 */
export interface ProfileData {
  /** Unique user identifier */
  id: string;
  /** User's chosen username */
  username?: string;
  /** User's full name */
  full_name?: string;
  /** Allow for additional properties */
  [key: string]: string | number | boolean | null | undefined;
}

/**
 * Interface for Supabase authentication response
 */
export interface AuthResponse<T> {
  /** Response data (null if error) */
  data: T | null;
  /** Error information (null if success) */
  error: {
    message: string;
  } | null;
}

/**
 * Login command implementation
 * Opens the login modal via custom event
 */
export const loginCommand: Command = {
  name: 'login',
  description: 'Log in to your account',
  execute: (): CommandResult => {
    try {
      // Dispatch custom event to open the login modal
      const event = new CustomEvent('openAuthModal', {
        detail: { mode: 'login' }
      });
      document.dispatchEvent(event);
      
      authLogger.debug('Login modal opened');
      return {
        content: 'Opening login modal...',
        isError: false
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      authLogger.error('Failed to open login modal', { error: errorMessage });
      return {
        content: `Error opening login modal: ${errorMessage}`,
        isError: true
      };
    }
  }
};

/**
 * Signup command implementation
 * Opens the signup modal via custom event
 */
export const signupCommand: Command = {
  name: 'signup',
  description: 'Create a new account',
  execute: (): CommandResult => {
    try {
      // Dispatch custom event to open the signup modal
      const event = new CustomEvent('openAuthModal', {
        detail: { mode: 'signup' }
      });
      document.dispatchEvent(event);
      
      authLogger.debug('Signup modal opened');
      return {
        content: 'Opening signup modal...',
        isError: false
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      authLogger.error('Failed to open signup modal', { error: errorMessage });
      return {
        content: `Error opening signup modal: ${errorMessage}`,
        isError: true
      };
    }
  }
};

/**
 * Logout command implementation
 * Signs the user out of their current session
 */
export const logoutCommand: Command = {
  name: 'logout',
  description: 'Log out of your account',
  execute: (): CommandResult => {
    authLogger.debug('Initiating logout process');
    return {
      content: 'Logging out...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const { error } = await supabase.auth.signOut();

          if (error) {
            authLogger.error('Logout failed', { error: error.message });
            return {
              content: `Logout failed: ${error.message}`,
              isError: true
            };
          }

          authLogger.info('User logged out successfully');
          return {
            content: 'You have been logged out successfully.',
            isError: false
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          authLogger.error('Unexpected error during logout', { error: errorMessage });
          return {
            content: `Logout failed: ${errorMessage}`,
            isError: true
          };
        }
      }
    };
  }
};

/**
 * Format user profile information for display
 * @param userData - User data from auth API
 * @param profileData - User profile data from database
 * @returns Formatted user profile information string
 */
const formatUserProfile = (userData: {
  email?: string;
  id: string;
  last_sign_in_at?: string;
}, profileData: ProfileData | null): string => {
  try {
    const username = profileData?.username || 'Not set';
    const fullName = profileData?.full_name || 'Not set';
    const lastSignIn = userData.last_sign_in_at
      ? new Date(userData.last_sign_in_at).toLocaleString()
      : 'Never';
    
    return `
Logged in as:
Email: ${userData.email || 'Not available'}
User ID: ${userData.id}
Username: ${username}
Full Name: ${fullName}
Last Sign In: ${lastSignIn}
`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    authLogger.error('Error formatting user profile', { error: errorMessage });
    return `
Logged in as:
Email: ${userData.email || 'Not available'}
User ID: ${userData.id}
Username: Error displaying
Full Name: Error displaying
Last Sign In: Error displaying
`;
  }
};

/**
 * Whoami command to show current user information
 * Retrieves and displays the current user's session details
 */
export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'Show current logged in user information',
  execute: (): CommandResult => {
    authLogger.debug('Checking user session');
    return {
      content: 'Checking user session...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const { data, error } = await supabase.auth.getUser();

          if (error) {
            authLogger.error('Error checking user session', { error: error.message });
            return {
              content: `Error checking user session: ${error.message}`,
              isError: true
            };
          }

          if (data.user) {
            try {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', data.user.id)
                .single();

              if (profileError) {
                authLogger.warn('Could not retrieve profile data', { error: profileError.message, userId: data.user.id });
              }

              const profile = profileData as ProfileData | null;
              authLogger.info('User session retrieved', { userId: data.user.id });
              
              return {
                content: formatUserProfile(data.user, profile),
                isError: false
              };
            } catch (profileError) {
              // We can still return user data even if profile fetch fails
              const errorMessage = profileError instanceof Error ? profileError.message : String(profileError);
              authLogger.error('Error retrieving profile data', { error: errorMessage, userId: data.user.id });
              
              return {
                content: `${formatUserProfile(data.user, null)}
Note: Could not retrieve complete profile data.`,
                isError: false
              };
            }
          } else {
            authLogger.info('No active user session found');
            return {
              content: 'You are not logged in.',
              isError: false
            };
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          authLogger.error('Unexpected error checking user session', { error: errorMessage });
          return {
            content: `Error checking user session: ${errorMessage}`,
            isError: true
          };
        }
      }
    };
  }
};


/**
 * Profile command implementation
 * Allows users to update their profile information
 */
export const profileCommand: Command = {
  name: 'profile',
  description:
    'Update your profile information (usage: profile set username <value> | fullname <value>)',
  execute: (args?: string): CommandResult => {
    const usage = `
Usage:
  profile set username <value>  - Set your username
  profile set fullname <value>  - Set your full name
        `;
    
    try {
      if (!args || args.trim() === '') {
        authLogger.debug('Profile command executed without arguments');
        return {
          content: usage,
          isError: true
        };
      }

      const argArray = args.trim().split(/\s+/);
      if (argArray.length < 3 || argArray[0] !== 'set') {
        authLogger.debug('Profile command executed with invalid arguments', { args });
        return {
          content: usage,
          isError: true
        };
      }

      // Use enum for type safety
      const fieldInput = argArray[1].toLowerCase();
      let field: ProfileUpdateField | undefined;
      
      if (fieldInput === 'username') {
        field = ProfileUpdateField.Username;
      } else if (fieldInput === 'fullname') {
        field = ProfileUpdateField.FullName;
      }
      
      if (!field) {
        authLogger.debug('Profile command attempted with invalid field', { fieldInput });
        return {
          content: 'Error: You can only update "username" or "fullname"',
          isError: true
        };
      }

      const value = argArray.slice(2).join(' ');
      
      authLogger.debug('Starting profile update process', { field });
      return {
        content: `Updating your ${field}...`,
        isAsync: true,
        isError: false,
        asyncResolver: async (): Promise<CommandResult> => {
          try {
            const { data: userData, error: userError } = await supabase.auth.getUser();

            if (userError || !userData.user) {
              authLogger.error('Profile update failed: Not logged in', { error: userError?.message || 'No user data' });
              return {
                content: 'Error: You must be logged in to update your profile.',
                isError: true
              };
            }

            const userId = userData.user.id;
            const updateData: Record<string, string> = {};

            // Map field names to database column names
            if (field === ProfileUpdateField.Username) {
              updateData.username = value;
            } else if (field === ProfileUpdateField.FullName) {
              updateData.full_name = value;
            }

            authLogger.info('Updating user profile', { userId, field, value });
            const { error: updateError } = await supabase
              .from('profiles')
              .update(updateData)
              .eq('id', userId);

            if (updateError) {
              authLogger.error('Profile update failed', { error: updateError.message });
              return {
                content: `Failed to update profile: ${updateError.message}`,
                isError: true
              };
            }

            authLogger.info('Profile updated successfully', { userId, field });
            return {
              content: `Your ${field} has been updated to "${value}"`,
              isError: false
            };
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            authLogger.error('Error updating profile', { error: errorMessage });
            return {
              content: `Error updating profile: ${errorMessage}`,
              isError: true
            };
          }
        }
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      authLogger.error('Unexpected error in profile command execution', { error: errorMessage });
      return {
        content: `An error occurred: ${errorMessage}`,
        isError: true
      };
    }
  }
};
