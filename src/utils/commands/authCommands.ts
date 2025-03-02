
import { Command, CommandResult } from './types';
import { supabase } from '../../integrations/supabase/client';

// Helper function to validate email
const isValidEmail = (email: string): boolean => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

// Login command implementation
export const loginCommand: Command = {
  name: 'login',
  description: 'Log in to your account (usage: login <email> <password>)',
  execute: (args: string[]) => {
    if (args.length < 2) {
      return {
        content: 'Usage: login <email> <password>',
        isError: true,
      };
    }

    const email = args[0];
    const password = args.slice(1).join(' '); // Allow spaces in password

    if (!isValidEmail(email)) {
      return {
        content: 'Error: Please provide a valid email address.',
        isError: true,
      };
    }

    return {
      content: `Attempting to log in as ${email}...`,
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            return {
              content: `Login failed: ${error.message}`,
              isError: true,
            };
          }

          if (data.user) {
            return {
              content: `Successfully logged in as ${data.user.email}. Welcome back!`,
              isError: false,
            };
          } else {
            return {
              content: 'Login failed: Unknown error',
              isError: true,
            };
          }
        } catch (error) {
          return {
            content: `Login failed: ${error instanceof Error ? error.message : String(error)}`,
            isError: true,
          };
        }
      },
    };
  },
};

// Signup command implementation
export const signupCommand: Command = {
  name: 'signup',
  description: 'Create a new account (usage: signup <email> <password>)',
  execute: (args: string[]) => {
    if (args.length < 2) {
      return {
        content: 'Usage: signup <email> <password>',
        isError: true,
      };
    }

    const email = args[0];
    const password = args.slice(1).join(' '); // Allow spaces in password

    if (!isValidEmail(email)) {
      return {
        content: 'Error: Please provide a valid email address.',
        isError: true,
      };
    }

    if (password.length < 6) {
      return {
        content: 'Error: Password must be at least 6 characters long.',
        isError: true,
      };
    }

    return {
      content: `Creating account for ${email}...`,
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
          });

          if (error) {
            return {
              content: `Account creation failed: ${error.message}`,
              isError: true,
            };
          }

          if (data.user) {
            return {
              content: `
Account created successfully! 

Email: ${data.user.email}
User ID: ${data.user.id}

A confirmation email has been sent to your email address.
You might need to check your spam folder.

Note: For testing purposes, you can disable email confirmation in Supabase.
              `,
              isError: false,
            };
          } else {
            return {
              content: 'Account creation failed: Unknown error',
              isError: true,
            };
          }
        } catch (error) {
          return {
            content: `Account creation failed: ${error instanceof Error ? error.message : String(error)}`,
            isError: true,
          };
        }
      },
    };
  },
};

// Logout command implementation
export const logoutCommand: Command = {
  name: 'logout',
  description: 'Log out of your account',
  execute: () => {
    return {
      content: 'Logging out...',
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const { error } = await supabase.auth.signOut();

          if (error) {
            return {
              content: `Logout failed: ${error.message}`,
              isError: true,
            };
          }

          return {
            content: 'You have been logged out successfully.',
            isError: false,
          };
        } catch (error) {
          return {
            content: `Logout failed: ${error instanceof Error ? error.message : String(error)}`,
            isError: true,
          };
        }
      },
    };
  },
};

// Whoami command to show current user
export const whoamiCommand: Command = {
  name: 'whoami',
  description: 'Show current logged in user information',
  execute: () => {
    return {
      content: 'Checking user session...',
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const { data, error } = await supabase.auth.getUser();

          if (error) {
            return {
              content: `Error checking user session: ${error.message}`,
              isError: true,
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
              isError: false,
            };
          } else {
            return {
              content: 'You are not logged in.',
              isError: false,
            };
          }
        } catch (error) {
          return {
            content: `Error checking user session: ${error instanceof Error ? error.message : String(error)}`,
            isError: true,
          };
        }
      },
    };
  },
};

// Update profile command
export const profileCommand: Command = {
  name: 'profile',
  description: 'Update your profile information (usage: profile set username <value> | fullname <value>)',
  execute: (args: string[]) => {
    if (args.length < 3 || args[0] !== 'set') {
      return {
        content: `
Usage:
  profile set username <value>  - Set your username
  profile set fullname <value>  - Set your full name
        `,
        isError: true,
      };
    }

    const field = args[1];
    const value = args.slice(2).join(' ');

    if (!['username', 'fullname'].includes(field)) {
      return {
        content: 'Error: You can only update "username" or "fullname"',
        isError: true,
      };
    }

    return {
      content: `Updating your ${field}...`,
      isAsync: true,
      asyncResolver: async (): Promise<CommandResult> => {
        try {
          const { data: userData, error: userError } = await supabase.auth.getUser();

          if (userError || !userData.user) {
            return {
              content: 'Error: You must be logged in to update your profile.',
              isError: true,
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
              isError: true,
            };
          }

          return {
            content: `Your ${field} has been updated to "${value}"`,
            isError: false,
          };
        } catch (error) {
          return {
            content: `Error updating profile: ${error instanceof Error ? error.message : String(error)}`,
            isError: true,
          };
        }
      },
    };
  },
};
