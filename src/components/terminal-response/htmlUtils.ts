
// Helper function to create a dangerously set HTML component with proper typings
export const createMarkup = (htmlContent: string) => {
  return { __html: htmlContent };
};

// Helper function to detect if content contains HTML tags but exclude command links
export const containsHtmlTags = (content: string): boolean => {
  // Check for HTML tags but make an exception for command-link spans which are handled separately
  const htmlTagsRegex = /<(?!span class="command-link")[a-z][\s\S]*?>|<\/[a-z]+>/i;
  return htmlTagsRegex.test(content);
};
