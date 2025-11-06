/**
 * Extracts initials from a person's name.
 * Takes the first letter of each word, up to a maximum of 2 letters.
 *
 * @param name - The full name to extract initials from
 * @returns The initials in uppercase (max 2 characters)
 *
 * @example
 * getInitials('John Doe') // 'JD'
 * getInitials('Alice') // 'A'
 * getInitials('Bob  Smith  Jr') // 'BS' (handles extra spaces)
 */
export const getInitials = (name: string): string =>
  name
    .split(' ')
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
 * Generates a consistent color class for a given name.
 * Uses a hash function to ensure the same name always gets the same color.
 *
 * @param name - The name to generate a color for
 * @returns A Tailwind CSS color class string
 *
 * @example
 * getColorForName('Alice') // Always returns the same color for 'Alice'
 * getColorForName('Bob') // Returns a different color than 'Alice'
 */
export const getColorForName = (name: string): string => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
};
