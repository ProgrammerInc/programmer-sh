// Type declarations for CSS modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Type declarations for path aliases
declare module '@/utils/app.utils' {
  export const cn: (...inputs: any[]) => string;
  export const ensureHttps: (url: string) => string;
  export const genRandomNumbers: (min: number, max: number, count: number) => number[];
}
