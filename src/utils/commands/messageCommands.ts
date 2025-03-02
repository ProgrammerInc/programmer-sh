import { supabase } from '@/integrations/supabase/client';
import { CommandResult } from './types';

// Define message types
export interface Message {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

// Save a message to Supabase
export const saveMessage = async (content: string): Promise<CommandResult> => {
  try {
    const session = await supabase.auth.getSession();

    if (!session.data.session) {
      return {
        content: 'Error: You must be logged in to save messages.',
        isError: true,
      };
    }

    const { error } = await supabase
      .from('messages')
      .insert({ content, user_id: session.data.session.user.id });

    if (error) {
      console.error('Error saving message:', error);
      return {
        content: `Error saving message: ${error.message}`,
        isError: true,
      };
    }

    return {
      content: 'Message saved successfully!',
      isError: false,
    };
  } catch (error) {
    console.error('Error in saveMessage:', error);
    return {
      content: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`,
      isError: true,
    };
  }
};

// Get all messages from Supabase
export const getMessages = async (): Promise<CommandResult> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching messages:', error);
      return {
        content: `Error fetching messages: ${error.message}`,
        isError: true,
      };
    }

    if (!data || data.length === 0) {
      return {
        content: 'No messages found.',
        isError: false,
      };
    }

    const formattedMessages = data
      .map((msg: Message) => {
        const date = new Date(msg.created_at).toLocaleString();
        return `[${date}] ${msg.content}`;
      })
      .join('\n');

    return {
      content: 'Messages:\n' + formattedMessages,
      isError: false,
    };
  } catch (error) {
    console.error('Error in getMessages:', error);
    return {
      content: `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`,
      isError: true,
    };
  }
};
