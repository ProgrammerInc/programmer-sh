/**
 * Detects if the user is browsing in incognito/private mode
 * This is a best-effort detection and may not work in all browsers
 */

/**
 * Interface for Safari's non-standard openDatabase method
 */
interface SafariWindow extends Window {
  openDatabase(
    name: string | null,
    version: string | null,
    displayName: string | null,
    estimatedSize: number | null
  ): unknown;
}

/**
 * Error type for localStorage access errors
 */
type StorageError = {
  name: string;
  message: string;
};

/**
 * Detects if the user is browsing in incognito/private mode
 * @returns {boolean} True if the user is likely in incognito mode, false otherwise
 */
export const isIncognitoMode = (): boolean => {
  // Check if localStorage and sessionStorage are available
  try {
    // Attempting to use localStorage which is typically blocked in private mode
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
    // If successful, we're likely not in private mode
  } catch (e) {
    const error = e as StorageError;
    console.warn(`Private browsing detected via localStorage error: ${error.message}`);
    // If we can't use localStorage, user is likely in private mode
    return true;
  }

  // Additional detection for Safari private mode
  if (typeof navigator !== 'undefined' && 
      navigator.userAgent && 
      navigator.userAgent.includes('Safari') && 
      !navigator.userAgent.includes('Chrome')) {
    try {
      // Try to use Safari's openDatabase method which fails in private mode
      // Use a two-step casting approach as recommended by TypeScript
      const safariWindow = window as unknown as SafariWindow;
      safariWindow.openDatabase(null, null, null, null);
      // If successful, we're not in private mode in Safari
    } catch (e) {
      const error = e as Error;
      console.warn(`Safari private browsing detected: ${error.message}`);
      return true;
    }
  }

  // Additional checks for other browsers could be added here
  return false;
};

export default isIncognitoMode;
