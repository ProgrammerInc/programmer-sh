
// Helper function to create a dangerously set HTML component with proper typings
export const createMarkup = (htmlContent: string) => {
  return { __html: htmlContent };
};

// Helper function to detect if content contains actual HTML tags
// Excludes command-link spans which are handled separately
export const containsHtmlTags = (content: string): boolean => {
  // More robust regex to detect HTML tags
  // Matches any HTML tag but excludes our command-link spans
  const htmlTagsRegex = /<(?!span class="command-link")[a-zA-Z][^>]*?>|<\/[a-zA-Z][^>]*?>/i;
  return htmlTagsRegex.test(content);
};
