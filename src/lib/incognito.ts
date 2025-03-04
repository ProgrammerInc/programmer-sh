/**
 * Detects if the user is browsing in incognito/private mode
 * This is a best-effort detection and may not work in all browsers
 */
export const isIncognitoMode = (): boolean => {
  // Check if localStorage and sessionStorage are available
  try {
    localStorage.setItem('test', 'test');
    localStorage.removeItem('test');
  } catch (e) {
    // If we can't use localStorage, user is likely in private mode
    return true;
  }

  // Additional detection for Safari private mode
  if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
    try {
      // Define the interface for Safari's non-standard openDatabase method
      interface SafariWindow {
        openDatabase(
          name: string | null,
          version: string | null,
          displayName: string | null,
          estimatedSize: number | null
        ): unknown;
      }

      // Use a two-step casting approach as recommended by TypeScript
      // First cast to unknown, then to SafariWindow
      (window as unknown as SafariWindow).openDatabase(null, null, null, null);
    } catch (e) {
      return true;
    }
  }

  // Additional checks for other browsers could be added here
  return false;
};

export default isIncognitoMode;
