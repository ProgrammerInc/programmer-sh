
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
      // Use type assertion to access non-standard browser APIs
      // Cast window to any to access the openDatabase method in Safari
      (window as any).openDatabase(null, null, null, null);
    } catch (e) {
      return true;
    }
  }

  // Additional checks for other browsers could be added here
  return false;
};
