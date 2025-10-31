/** @type {import("prettier").Config} */
const config = {
  // Basic formatting
  semi: true,
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 80,
  bracketSpacing: true,
  arrowParens: 'always',

  // JSX/TSX specific
  jsxSingleQuote: false,
  bracketSameLine: false,

  // Prose wrapping (for markdown)
  proseWrap: 'preserve',

  // HTML whitespace handling
  htmlWhitespaceSensitivity: 'css',

  // End of line handling
  endOfLine: 'lf',

  // Embedded language formatting
  embeddedLanguageFormatting: 'auto',

  // Plugins
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
