export const renderCommandOutput = (command: string, output: string, rawHTML: boolean = false) => {
  const commandHeader = `<div class="mb-1"><span class="text-terminal-prompt">guest@programmer:~$&nbsp;</span><span class="text-terminal-command">${command}</span></div>`;

  if (rawHTML) {
    return `${commandHeader}<div class="whitespace-pre-line">${output}</div>`;
  } else {
    return `${commandHeader}<div class="whitespace-pre-line">${output}</div>`;
  }
};

export const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
  if (ref.current) {
    // First attempt immediate scroll
    ref.current.scrollTop = ref.current.scrollHeight;

    // Then use smooth scrolling for better UX
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTo({
          top: ref.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }, 50);

    // Final attempt after content has likely settled
    setTimeout(() => {
      if (ref.current) {
        ref.current.scrollTop = ref.current.scrollHeight;
      }
    }, 300);
  }
};
