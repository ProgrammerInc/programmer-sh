import { supabase } from '@/integrations/supabase/supabase.client';
import { createFeatureLogger } from '@/services/logger/logger.utils';
import { CommandResult } from './command.types';

// Create a dedicated logger for message commands
const messageLogger = createFeatureLogger('MessageCommands');

/**
 * Interface for message data structure
 */
export interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

/**
 * Interface for session data
 */
interface SessionData {
  session: {
    user: {
      id: string;
    };
  } | null;
}

/**
 * Interface for database response
 */
interface DatabaseResponse<T> {
  data: T | null;
  error: {
    message: string;
  } | null;
}

/**
 * Save a message to the database
 * @param content - The message content to save
 * @returns CommandResult indicating success or failure
 */
export const saveMessage = async (content: string): Promise<CommandResult> => {
  try {
    if (!content || content.trim() === '') {
      messageLogger.warn('Save message failed: Empty content');
      return {
        content: 'Error: Message content cannot be empty.',
        isError: true
      };
    }

    messageLogger.info('Attempting to save message', { contentLength: content.length });
    const session = await supabase.auth.getSession();

    if (!session.data.session) {
      messageLogger.warn('Save message failed: User not logged in');
      return {
        content: 'Error: You must be logged in to save messages.',
        isError: true
      };
    }

    const { error } = await supabase
      .from('messages')
      .insert({ content, user_id: session.data.session.user.id });

    if (error) {
      messageLogger.error('Error saving message to database', { error: error.message });
      return {
        content: `Error saving message: ${error.message}`,
        isError: true
      };
    }

    messageLogger.info('Message saved successfully');
    return {
      content: 'Message saved successfully!',
      isError: false
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    messageLogger.error('Unexpected error in saveMessage', { error: errorMessage });
    return {
      content: `An unexpected error occurred: ${errorMessage}`,
      isError: true
    };
  }
};

/**
 * Format a single message for display
 * @param message - The message object to format
 * @returns Formatted message string with timestamp
 */
const formatMessage = (message: Message): string => {
  try {
    const date = new Date(message.created_at).toLocaleString();
    return `[${date}] ${message.content}`;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    messageLogger.error('Error formatting message', { messageId: message.id, error: errorMessage });
    return `[Error formatting message] ${message.content}`;
  }
};

/**
 * Get all messages from the database
 * @returns CommandResult with formatted messages or error
 */
export const getMessages = async (): Promise<CommandResult> => {
  try {
    messageLogger.info('Fetching messages');
    const { data, error }: DatabaseResponse<Message[]> = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      messageLogger.error('Error fetching messages from database', { error: error.message });
      return {
        content: `Error fetching messages: ${error.message}`,
        isError: true
      };
    }

    if (!data || data.length === 0) {
      messageLogger.info('No messages found in database');
      return {
        content: 'No messages found.',
        isError: false
      };
    }

    messageLogger.info('Messages retrieved successfully', { count: data.length });

    const formattedMessages = data.map(formatMessage).join('\n');

    return {
      content: `Messages:\n${formattedMessages}`,
      isError: false
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    messageLogger.error('Unexpected error in getMessages', { error: errorMessage });
    return {
      content: `An unexpected error occurred: ${errorMessage}`,
      isError: true
    };
  }
};
