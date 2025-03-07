export const renderCommandOutput = (command: string, output: string, rawHTML: boolean = false) => {
  const commandHeader = `<div class="mb-1"><span class="text-terminal-prompt">guest@programmer:~$&nbsp;</span><span class="text-terminal-command">${command}</span></div>`;

  if (rawHTML) {
    return `${commandHeader}<div class="whitespace-pre-line">${output}</div>`;
  } else {
    return `${commandHeader}<div class="whitespace-pre-line">${output}</div>`;
  }
};

export const scrollToBottom = (ref: React.RefObject<HTMLDivElement>) => {
  ref.current?.scrollTo({
    top: ref.current.scrollHeight,
    behavior: 'smooth'
  });
};
