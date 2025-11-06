/**
 * Gets the initials from a person's name.
 * Takes the first letter of each word and returns up to 2 letters.
 *
 * How it works:
 * 1. Splits the name into words (by spaces, tabs, or line breaks)
 * 2. Takes the first letter of each word
 * 3. Keeps only the first 2 letters
 * 4. Converts to uppercase
 *
 * Important notes:
 * - Empty names return an empty string
 * - Single word names return 1 letter: "Alice" → "A"
 * - Multiple words return 2 letters: "John Doe" → "JD"
 * - Extra spaces, tabs, or line breaks are handled correctly
 * - Works with all languages (English, Arabic, Chinese, etc.)
 * - Numbers and special characters work too: "John 2nd" → "J2"
 *
 * @param name - The person's full name
 * @returns The initials in uppercase (0-2 characters)
 *
 * @example
 * getInitials('John Doe')        // 'JD'
 * getInitials('Alice')            // 'A'
 * getInitials('Bob  Smith  Jr')  // 'BS' (handles extra spaces)
 * getInitials('李明')             // '李' (works with Chinese)
 * getInitials('  ')               // '' (empty after trimming)
 */
export const getInitials = (name: string): string =>
  name
    .split(/\s+/) // Split on any whitespace (spaces, tabs, newlines)
    .filter((n) => n.length > 0)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/**
 * Available color classes for participant avatars.
 * Uses a consistent color scheme with both light and dark mode variants.
 * Extended palette provides better distribution for larger groups.
 */
export const avatarColors = [
  'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300',
  'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
] as const;

/**
 * Picks a color for a person based on their name.
 *
 * This function makes sure the same name always gets the same color.
 * It works by converting the name into a number (called a "hash"),
 * then using that number to pick one of the 12 available colors.
 *
 * How it works:
 * 1. Converts each letter in the name to a number
 * 2. Combines these numbers into one big number (the hash)
 * 3. Uses math to pick a color from the list (0 to 11)
 * 4. Returns the color for that person
 *
 * Important notes:
 * - Same name = same color every time
 * - Different names usually get different colors
 * - Capital letters matter: "Alice" and "alice" get different colors
 * - Works with all languages (English, Arabic, Chinese, etc.)
 *
 * @param name - The person's full name
 * @returns A CSS class string with background and text colors
 *
 * @example
 * getColorForName('Alice') // Always returns the same color for 'Alice'
 * getColorForName('Bob')   // Returns a different color (probably)
 * getColorForName('李明')  // Works with Chinese characters
 */
export const getColorForName = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
};
