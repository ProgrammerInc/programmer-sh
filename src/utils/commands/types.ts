import React from 'react';

export type CommandResult = {
  content: React.ReactNode;
  isError?: boolean;
  isHTML?: boolean;
};

export type Command = {
  name: string;
  description: string;
  usage?: string;
  execute: (args: string[]) => CommandResult;
  hidden?: boolean;
};
