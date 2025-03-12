import { Command } from './types';
import { welcomeCommand } from './welcome-commands';

export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal',
  execute: () => {
    // Return a special command result that signals to clear the terminal
    // and then follows with the welcome command output
    return {
      content: 'CLEAR_TERMINAL',
      isError: false,
      runAfterClear: welcomeCommand.execute()
    };
  }
};

export const echoCommand: Command = {
  name: 'echo',
  description: 'Echo a message back to the terminal',
  usage: 'echo [message]',
  execute: (args?: string) => {
    if (!args || args.trim() === '') {
      return {
        content: '',
        isError: false
      };
    }
    return {
      content: args,
      isError: false
    };
  }
};

export const dateCommand: Command = {
  name: 'date',
  description: 'Display the current date and time',
  execute: () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    };

    return {
      content: `Current Date and Time: ${now.toLocaleString('en-US', options)}`,
      isError: false
    };
  }
};

export const privacyCommand: Command = {
  name: 'privacy',
  description: 'Display the privacy policy',
  execute: () => {
    return {
      content: `<div class="privacy-policy">
        <h2>Privacy Policy</h2>
        <p>Last Updated: March 11, 2025</p>
        
        <h3>1. Introduction</h3>
        <p>Welcome to the Privacy Policy for the Programmer.SH website. This document explains how we collect, use, and protect your information when you use our terminal-based portfolio website.</p>
        
        <h3>2. Information We Collect</h3>
        <p>We collect minimal information to provide and improve our services:</p>
        <ul>
          <li><strong>Usage Data:</strong> Information on how you interact with our terminal interface, including commands entered and features used.</li>
          <li><strong>Device Information:</strong> Browser type, operating system, and device specifications to optimize your experience.</li>
          <li><strong>Cookies:</strong> Small text files stored on your device to remember your preferences and session information.</li>
        </ul>
        
        <h3>3. How We Use Your Information</h3>
        <p>We use the collected information to:</p>
        <ul>
          <li>Provide and maintain our service</li>
          <li>Improve user experience</li>
          <li>Analyze usage patterns to enhance functionality</li>
          <li>Remember your preferences between sessions</li>
        </ul>
        
        <h3>4. Data Storage</h3>
        <p>Your command history and preferences are stored locally on your device using browser localStorage. This data is not transmitted to our servers unless explicitly initiated by you.</p>
        
        <h3>5. Third-Party Services</h3>
        <p>We may use third-party analytics tools to help us understand how users interact with our site. These services may collect information about your use of our website.</p>
        
        <h3>6. Your Rights</h3>
        <p>You have the right to:</p>
        <ul>
          <li>Clear your locally stored data through browser controls</li>
          <li>Disable cookies in your browser settings</li>
          <li>Request information about what data is stored locally</li>
        </ul>
        
        <h3>7. Changes to This Policy</h3>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
        
        <h3>8. Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@programmer.sh" target="_blank" class="text-terminal-link hover:underline">privacy@programmer.sh</a></p>
      </div>`,
      isError: false,
      rawHTML: true
    };
  }
};

export const historyCommand: Command = {
  name: 'history',
  description: 'Show command history',
  execute: () => {
    // Try to get command history from localStorage
    try {
      const savedHistory = localStorage.getItem('terminal_command_history');

      if (savedHistory) {
        const parsedHistory = JSON.parse(savedHistory);

        if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
          // Format the history display
          const historyDisplay = parsedHistory
            .map((item, index) => {
              const cmd = item.command || 'unknown';
              return `  ${index + 1}. <strong><span class="command-link" data-command="${cmd}">${cmd}</span></strong>`;
            })
            .join('\n');

          return {
            content:
              historyDisplay.length > 0
                ? `Command History:\n\n${historyDisplay}`
                : 'No command history available.',
            isError: false
          };
        }
      }

      // If we got here, there's no history or it couldn't be parsed
      return {
        content: 'No command history available.',
        isError: false
      };
    } catch (error) {
      console.error('Error fetching command history:', error);
      return {
        content: 'Error fetching command history. Please try again later.',
        isError: true
      };
    }
  }
};
