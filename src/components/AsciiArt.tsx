
import React from 'react';

const AsciiArt: React.FC = () => {
  const asciiArt = [
    '  ____                                                          ____  _   _   ',
    ' |  _ \\ _ __ ___   __ _ _ __ __ _ _ __ ___  ___ _ __   ___ _ __/ ___|| | | | ',
    " | |_) | '__/ _ \\ / _` | '__/ _` | '_ ` _ \\| '_ ` _ \\ / _ \\ '__\\___ \\| |_| | ",
    ' |  __/| | | (_) | (_| | | | (_| | | | | | | | | | | |  __/ |_  ___) |  _  | ',
    ' |_|   |_|  \\___/ \\__,_|_|  \\__,_|_| |_| |_|_| |_| |_|\\___|_(_)|____/|_| |_| ',
    '                  |___/                                                     ',
  ];

  return (
    <div className="mb-6 text-terminal-prompt font-mono text-xs md:text-sm">
      {asciiArt.map((line, i) => (
        <div key={i} className="whitespace-pre">
          {line}
        </div>
      ))}
    </div>
  );
};

export default AsciiArt;
