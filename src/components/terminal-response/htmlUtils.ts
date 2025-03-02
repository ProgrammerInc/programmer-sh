
// Helper function to create a dangerously set HTML component with proper typings
export const createMarkup = (htmlContent: string) => {
  return { __html: htmlContent };
};

// Helper function to detect if content contains actual HTML tags
// Excludes command-link spans which are handled separately
export const containsHtmlTags = (content: string): boolean => {
  // This regex looks for standard HTML tags while excluding our command-link spans
  // It matches opening tags like <tag> or <tag attr="value"> but excludes command-link spans
  const htmlTagsRegex = /<(?!span class="command-link")[a-z][\s\S]*?>|<\/(?!span)[a-z]+>/i;
  return htmlTagsRegex.test(content);
};
