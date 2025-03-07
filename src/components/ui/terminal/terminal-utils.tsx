export const renderCommandOutput = (command: string, output: string, rawHTML: boolean = false) => {
  const commandHeader = `<div class="mb-1"><span class="text-terminal-prompt">guest@programmer:~$&nbsp;</span><span class="text-terminal-command">${command}</span></div>`;

  if (rawHTML) {
    return `${commandHeader}<div class="whitespace-pre-line">${output}</div>`;
  } else {
    return `${commandHeader}<div class="whitespace-pre-line">${output}</div>`;
  }
};

export const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
  if (!ref.current) return;
  
  // Force immediate scroll - this is the most reliable method
  const element = ref.current;
  const scrollToBottomForce = () => {
    if (element) {
      // Use both methods for maximum compatibility
      element.scrollTop = element.scrollHeight;
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'auto' // Use 'auto' for immediate scrolling without animation
      });
    }
  };

  // First immediate scroll
  scrollToBottomForce();
  
  // Then ensure we continue scrolling during content loading
  // Use requestAnimationFrame for smoother performance
  const rafScroll = () => {
    scrollToBottomForce();
    // Continue scrolling for a short duration to catch any loading content
    const startTime = Date.now();
    const continueScrolling = () => {
      scrollToBottomForce();
      if (Date.now() - startTime < 2000) { // 2 seconds of continuous scrolling attempts
        requestAnimationFrame(continueScrolling);
      }
    };
    requestAnimationFrame(continueScrolling);
  };
  
  requestAnimationFrame(rafScroll);
  
  // Also use intervals as a backup method
  const intervals = [50, 100, 200, 350, 500, 1000];
  intervals.forEach(delay => {
    setTimeout(scrollToBottomForce, delay);
  });
  
  // Create a single observer instance for efficiency
  if (typeof MutationObserver !== 'undefined') {
    // Use a more selective observer to avoid performance issues
    const observer = new MutationObserver(() => {
      scrollToBottomForce();
    });
    
    observer.observe(element, {
      childList: true,
      subtree: true,
      characterData: true
    });
    
    // Disconnect after some time to avoid performance issues
    setTimeout(() => observer.disconnect(), 3000);
  }
};
