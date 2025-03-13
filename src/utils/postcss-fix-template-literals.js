/**
 * Custom PostCSS plugin to fix template literals in CSS
 * This addresses the specific error with --tw-gradient-from: ${color} var(--tw-gradient-from-position)
 */
const fixTemplateLiteralsPlugin = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-fix-template-literals',
    
    // Process each declaration (property: value pair)
    Declaration(decl) {
      // Check if the declaration contains template literals
      if (decl.value && decl.value.includes('${')) {
        // Find all ${...} patterns
        const templateMatches = decl.value.match(/\${([^}]*)}/g);
        
        if (templateMatches) {
          // For each match, replace it with a safe value
          templateMatches.forEach(match => {
            // Extract the variable name inside ${}
            const varName = match.substring(2, match.length - 1).trim();
            
            // Replace template literal with a CSS variable
            // This is just a fallback value; the real processing should happen in JS
            decl.value = decl.value.replace(match, 'currentColor');
          });
        }
      }
    }
  };
};

fixTemplateLiteralsPlugin.postcss = true;

export default fixTemplateLiteralsPlugin;
