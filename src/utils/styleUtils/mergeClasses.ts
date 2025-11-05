import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with clsx and tailwind-merge
 * This ensures proper class deduplication and conflict resolution
 *
 * @param inputs - Any number of class values (strings, objects, arrays, conditionals)
 * @returns Merged and deduplicated class string
 *
 * @example
 * mergeClasses('px-4', 'py-2', condition && 'bg-blue-500')
 * mergeClasses('p-4', 'p-6') // Returns 'p-6' (last conflicting class wins)
 */
export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
