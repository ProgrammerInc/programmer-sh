
// Helper function to create a dangerously set HTML component with proper typings
export const createMarkup = (htmlContent: string) => {
  return { __html: htmlContent };
};

// Helper function to detect if content contains actual HTML tags
// Excludes command-link spans which are handled separately
export const containsHtmlTags = (content: string): boolean => {
  // Enhanced regex to better detect HTML tags while excluding command links
  const htmlTagsRegex = /<(?!span class="command-link")([a-zA-Z][^>]*?>|\/[a-zA-Z][^>]*?>)/;
  
  // Log for debugging
  console.log(`Checking HTML tags in: ${content.substring(0, 50)}...`);
  const result = htmlTagsRegex.test(content);
  console.log(`Contains HTML tags: ${result}`);
  
  return result;
};
