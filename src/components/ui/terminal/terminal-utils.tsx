export const renderCommandOutput = (command: string, output: string, rawHTML: boolean = false) => {
  const commandHeader = `<div class="mb-1"><span class="text-terminal-prompt">guest@programmer.sh:~$&nbsp;</span>${command}</div>`;

  if (rawHTML) {
    return `${commandHeader}<div class="whitespace-pre-line">${output}</div>`;
  } else {
    return `${commandHeader}<div class="whitespace-pre-line">${output}</div>`;
  }
};

export const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
  if (!ref.current) return;

  // Cache the element reference for better performance
  const element = ref.current;

  // Function for immediate scrolling (used for initial scroll)
  const scrollImmediately = () => {
    if (element) {
      // Set scroll position directly for immediate effect
      element.scrollTop = element.scrollHeight;
    }
  };

  // Function for gentle scrolling that can be interrupted by user
  const scrollGently = () => {
    if (element) {
      element.scrollTo({
        top: element.scrollHeight,
        behavior: 'smooth' // Use smooth scrolling for better UX
      });
    }
  };

  // First do an immediate scroll to ensure content is visible
  scrollImmediately();

  // Then do a few gentle scroll attempts with decreasing frequency
  // This helps with dynamically loading content without preventing user interaction
  const shortIntervals = [50, 150, 300];
  shortIntervals.forEach(delay => {
    setTimeout(scrollGently, delay);
  });

  // One final scroll after content should be fully loaded
  // Using a shorter duration ensures users can scroll up sooner
  setTimeout(scrollGently, 500);

  // Create a single observer instance for efficiency
  if (typeof MutationObserver !== 'undefined') {
    // Use a more selective observer to avoid performance issues
    const observer = new MutationObserver(() => {
      scrollGently();
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
