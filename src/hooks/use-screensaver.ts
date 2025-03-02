
import { useState, useEffect, useCallback } from 'react';

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

export function useScreensaver() {
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  
  // Reset screensaver and update last activity time
  const handleUserActivity = useCallback(() => {
    if (isScreensaverActive) {
      setIsScreensaverActive(false);
    }
    setLastActivity(Date.now());
  }, [isScreensaverActive]);

  // Check for inactivity
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const inactiveTime = now - lastActivity;
      
      if (!isScreensaverActive && inactiveTime >= INACTIVITY_TIMEOUT) {
        setIsScreensaverActive(true);
      }
    }, 10000); // Check every 10 seconds
    
    return () => clearInterval(interval);
  }, [lastActivity, isScreensaverActive]);

  // Attach activity listeners
  useEffect(() => {
    const activityEvents = [
      'mousedown', 'mousemove', 'keypress', 
      'scroll', 'touchstart', 'click', 'keydown'
    ];
    
    activityEvents.forEach(event => {
      window.addEventListener(event, handleUserActivity);
    });
    
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [handleUserActivity]);

  return {
    isScreensaverActive,
    handleUserActivity
  };
}
