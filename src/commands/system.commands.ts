import { createFeatureLogger } from '@/services/logger/logger.utils';
import { Command, CommandResult } from './command.types';
import { welcomeCommand } from './welcome.commands';

// Create a dedicated logger for system commands
const systemLogger = createFeatureLogger('SystemCommands');

/**
 * Command to clear the terminal and show the welcome message
 */
export const clearCommand: Command = {
  name: 'clear',
  description: 'Clear the terminal',
  execute: (): CommandResult => {
    try {
      systemLogger.info('Executing clear command');
      // Return a special command result that signals to clear the terminal
      // and then follows with the welcome command output
      return {
        content: 'CLEAR_TERMINAL',
        isError: false,
        runAfterClear: welcomeCommand.execute()
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      systemLogger.error('Error executing clear command', { error: errorMessage });
      return {
        content: `Error clearing terminal: ${errorMessage}`,
        isError: true
      };
    }
  }
};

/**
 * Command to echo back a message to the terminal
 */
export const echoCommand: Command = {
  name: 'echo',
  description: 'Echo a message back to the terminal',
  usage: 'echo [message]',
  execute: (args?: string): CommandResult => {
    try {
      systemLogger.info('Executing echo command', { args: args || '' });

      if (!args || args.trim() === '') {
        systemLogger.debug('Echo command received empty input');
        return {
          content: '',
          isError: false
        };
      }

      return {
        content: args,
        isError: false
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      systemLogger.error('Error executing echo command', { error: errorMessage });
      return {
        content: `Error echoing message: ${errorMessage}`,
        isError: true
      };
    }
  }
};

/**
 * Command to display the current date and time
 */
export const dateCommand: Command = {
  name: 'date',
  description: 'Display the current date and time',
  execute: (): CommandResult => {
    systemLogger.info('Executing date command');

    try {
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

      const formattedDate = now.toLocaleString('en-US', options);
      systemLogger.debug('Date command generated formatted date', { date: formattedDate });

      return {
        content: `Current Date and Time: ${formattedDate}`,
        isError: false
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      systemLogger.error('Error in date command', { error: errorMessage });
      return {
        content: `Error getting current date: ${errorMessage}`,
        isError: true
      };
    }
  }
};

/**
 * Command to display the privacy policy
 */
export const privacyCommand: Command = {
  name: 'privacy',
  description: 'Display the privacy policy',
  execute: (): CommandResult => {
    try {
      systemLogger.info('Executing privacy command');

      return {
        content: `<div class="privacy-policy">
        <h2>Privacy Policy</h2>
        <p>Last Updated: March 11, 2025</p>
        
        <h3>1. Introduction</h3>
        <p>Welcome to the Privacy Policy for the &lt;programmer&gt;.sh website. This document explains how we collect, use, and protect your information when you use our terminal-based portfolio website.</p>
        
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
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      systemLogger.error('Error executing privacy command', { error: errorMessage });
      return {
        content: `Error displaying privacy policy: ${errorMessage}`,
        isError: true
      };
    }
  }
};

/**
 * Command to display terms and conditions
 */
export const termsCommand: Command = {
  name: 'terms',
  description: 'Display terms and conditions',
  execute: (): CommandResult => {
    try {
      systemLogger.info('Executing terms command');

      return {
        content: `<div class="terms-and-conditions">
        <h2>Terms and Conditions</h2>
        <p>Last Updated: March 11, 2025</p>
        
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using &lt;programmer&gt;.sh, you accept and agree to be bound by the terms and conditions of this agreement. If you do not agree to these terms, please do not use this website.</p>
        
        <h3>2. Use License</h3>
        <p>Permission is granted to temporarily view the materials on &lt;programmer&gt;.sh for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>Use the materials for any commercial purpose</li>
          <li>Attempt to decompile or reverse engineer any software contained on the website</li>
          <li>Remove any copyright or other proprietary notations from the materials</li>
          <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
        </ul>
        <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated at any time. Upon terminating your viewing of these materials, you must destroy any downloaded materials in your possession.</p>
        
        <h3>3. Disclaimer</h3>
        <p>The materials on &lt;programmer&gt;.sh are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.</p>
        
        <h3>4. Limitations</h3>
        <p>In no event shall &lt;programmer&gt;.sh or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.</p>
        
        <h3>5. Accuracy of Materials</h3>
        <p>The materials appearing on &lt;programmer&gt;.sh could include technical, typographical, or photographic errors. We do not warrant that any of the materials on this website are accurate, complete, or current. We may make changes to the materials at any time without notice.</p>
        
        <h3>6. Links</h3>
        <p>We have not reviewed all of the sites linked to this website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us. Use of any such linked website is at the user's own risk.</p>
        
        <h3>7. Modifications</h3>
        <p>We may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the current version of these terms and conditions.</p>
        
        <h3>8. Governing Law</h3>
        <p>These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
        
        <h3>9. Contact Us</h3>
        <p>If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:terms@programmer.sh" target="_blank" class="text-terminal-link hover:underline">terms@programmer.sh</a></p>
      </div>`,
        isError: false,
        rawHTML: true
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      systemLogger.error('Error executing terms command', { error: errorMessage });
      return {
        content: `Error displaying terms and conditions: ${errorMessage}`,
        isError: true
      };
    }
  }
};

/**
 * Collection of all system commands
 */
export const systemCommands = {
  clear: clearCommand,
  echo: echoCommand,
  date: dateCommand,
  privacy: privacyCommand,
  terms: termsCommand
};
