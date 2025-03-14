import { supabase } from '../integrations/supabase/supabase.client';
import { Command, CommandResult } from './command.types';

// Login command implementation
export const loginCommand: Command = {
  name: 'login',
  description: 'Log in to your account',
  execute: () => {
    // Dispatch custom event to open the login modal
    const event = new CustomEvent('openAuthModal', {
      detail: { mode: 'login' }
    });
    document.dispatchEvent(event);

    return {
      content: 'Opening login modal...',
      isError: false
    };
  }
};

// Signup command implementation
export const signupCommand: Command = {
  name: 'signup',
  description: 'Create a new account',
  execute: () => {
    // Dispatch custom event to open the signup modal
    const event = new CustomEvent('openAuthModal', {
      detail: { mode: 'signup' }
    });
    document.dispatchEvent(event);

    return {
      content: 'Opening signup modal...',
      isError: false
    };
  }
};

// Logout command implementation
export const logoutCommand: Command = {
  name: 'logout',
  description: 'Log out of your account',
  execute: () => {
    return {
      content: 'Logging out...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const { error } = await supabase.auth.signOut();

          if (error) {
            return {
              content: `Logout failed: ${error.message}`,
              isError: true
            };
          }

          return {
            content: 'You have been logged out successfully.',
            isError: false
          };
        } catch (error) {
          return {
            content: `Logout failed: ${error instanceof Error ? error.message : String(error)}`,
            isError: true
          };
        }
      }
    };
  }
};

// Whoami command to show current user
export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'Show current logged in user information',
  execute: () => {
    return {
      content: 'Checking user session...',
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const { data, error } = await supabase.auth.getUser();

          if (error) {
            return {
              content: `Error checking user session: ${error.message}`,
              isError: true
            };
          }

          if (data.user) {
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();

            const username = profileData?.username || 'Not set';
            const fullName = profileData?.full_name || 'Not set';

            return {
              content: `
Logged in as:
Email: ${data.user.email}
User ID: ${data.user.id}
Username: ${username}
Full Name: ${fullName}
Last Sign In: ${new Date(data.user.last_sign_in_at || '').toLocaleString() || 'Never'}
              `,
              isError: false
            };
          } else {
            return {
              content: 'You are not logged in.',
              isError: false
            };
          }
        } catch (error) {
          return {
            content: `Error checking user session: ${error instanceof Error ? error.message : String(error)}`,
            isError: true
          };
        }
      }
    };
  }
};

// Update profile command
export const profileCommand: Command = {
  name: 'profile',
  description:
    'Update your profile information (usage: profile set username <value> | fullname <value>)',
  execute: (args?: string) => {
    if (!args || args.trim() === '') {
      return {
        content: `
Usage:
  profile set username <value>  - Set your username
  profile set fullname <value>  - Set your full name
        `,
        isError: true
      };
    }

    const argArray = args.trim().split(/\s+/);
    if (argArray.length < 3 || argArray[0] !== 'set') {
      return {
        content: `
Usage:
  profile set username <value>  - Set your username
  profile set fullname <value>  - Set your full name
        `,
        isError: true
      };
    }

    const field = argArray[1];
    const value = argArray.slice(2).join(' ');

    if (!['username', 'fullname'].includes(field)) {
      return {
        content: 'Error: You can only update "username" or "fullname"',
        isError: true
      };
    }

    return {
      content: `Updating your ${field}...`,
      isAsync: true,
      isError: false,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const { data: userData, error: userError } = await supabase.auth.getUser();

          if (userError || !userData.user) {
            return {
              content: 'Error: You must be logged in to update your profile.',
              isError: true
            };
          }

          const userId = userData.user.id;
          const updateData: Record<string, string> = {};

          // Map field names to database column names
          if (field === 'username') {
            updateData.username = value;
          } else if (field === 'fullname') {
            updateData.full_name = value;
          }

          const { error: updateError } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', userId);

          if (updateError) {
            return {
              content: `Failed to update profile: ${updateError.message}`,
              isError: true
            };
          }

          return {
            content: `Your ${field} has been updated to "${value}"`,
            isError: false
          };
        } catch (error) {
          return {
            content: `Error updating profile: ${error instanceof Error ? error.message : String(error)}`,
            isError: true
          };
        }
      }
    };
  }
};
