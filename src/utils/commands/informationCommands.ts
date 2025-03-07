import QRCode from '@/components/ui/qr-code';
import { Command, CommandResult } from './types';

const QRCodeComponent = QRCode;

// About command
export const aboutCommand: Command = {
  name: 'about',
  description: 'Learn about James A. Black Jr.',
  execute: (): CommandResult => {
    return {
      content: `<div class="mb-4">
        <strong class="text-terminal-prompt">James A. Black Jr.</strong>
        <div class="mt-2">
          <p>A passionate software engineer with 25+ years of experience building web applications. Specialized in Angular and React front-end frameworks, working with both JavaScript/TypeScript languages, and well versed with many backend languages and frameworks from Node.JS to Python, Golang and more.</p>
          <p class="mt-2">Dedicated to creating elegant, efficient, and user-friendly solutions that integrate Artificial Intelligence and Machine Learning to take the user experience to the next level.</p>
          <p class="mt-2">Currently working as a Principal Engineer at Programmer Incorporated LLC, based in Frisco, TX.</p>
          <p class="mt-2">Type <span class="command-link" data-command="contact">contact</span> to see how to get in touch with me.</p></div></div>`,
      isError: false,
      rawHTML: true
    };
  }
};

// Contact command
export const contactCommand: Command = {
  name: 'contact',
  description: 'View contact information',
  execute: (): CommandResult => {
    // Create vCard data for QR code
    const vCardData =
      'BEGIN:VCARD\nVERSION:3.0\nN:Black Jr.;James A.;;Mr.;\nFN:James A. Black Jr.\nTITLE:Principal Engineer\nORG:Programmer Incorporated LLC\nTEL;TYPE=CELL:+13475033967\nEMAIL:james.black@programmer.sh\nURL:https://programmer.to/website\nEND:VCARD';

    return {
      content: `<div class="mb-4">
        <strong class="font-bold">Contact Information:</strong>

        <div class="flex flex-col gap-0">
          <div>&nbsp;&nbsp;- Phone: <a href="tel:+13475033967" class="text-terminal-link hover:underline hover:text-terminal-prompt transition-colors">+1 (347) 503-3967</a></div>
          <div>&nbsp;&nbsp;- Email: <a href="mailto:james.black@programmer.sh" class="text-terminal-link hover:underline hover:text-terminal-prompt transition-colors">james.black@programmer.sh</a></div>
          <div>&nbsp;&nbsp;- LinkedIn: <a href="https://linkedin.com/in/ProgrammerInc" target="_blank" class="text-terminal-link hover:underline hover:text-terminal-prompt transition-colors">linkedin.com/in/ProgrammerInc</a></div>
          <div>&nbsp;&nbsp;- GitHub: <a href="https://github.com/ProgrammerInc" target="_blank" class="text-terminal-link hover:underline hover:text-terminal-prompt transition-colors">github.com/ProgrammerInc</a></div>
          <div>&nbsp;&nbsp;- Twitter/X: <a href="https://x.com/ProgrammerInc" target="_blank" class="text-terminal-link hover:underline hover:text-terminal-prompt transition-colors">x.com/ProgrammerInc</a></div>
          <div>&nbsp;&nbsp;- Website: <a href="https://programmer.to/website" target="_blank" class="text-terminal-link hover:underline hover:text-terminal-prompt transition-colors">programmer.to/website</a></div>
        </div></div>`,
      isError: false,
      rawHTML: true
    };
  }
};
