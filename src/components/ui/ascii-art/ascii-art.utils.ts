/**
 * ASCII Art Utilities
 *
 * Helper functions for the ASCII Art component.
 */

/**
 * Trigger the welcome command by dispatching a custom event
 * 
 * @param delay - Delay in milliseconds before triggering (default: 100ms)
 * @returns A cleanup function to cancel the timeout if component unmounts
 */
export const triggerWelcomeCommand = (delay = 100): (() => void) => {
  const timer = setTimeout(() => {
    const welcomeEvent = new CustomEvent('runWelcomeCommand');
    document.dispatchEvent(welcomeEvent);
  }, delay);

  return () => clearTimeout(timer);
};
