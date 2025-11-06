/**
 * Shuffles an array using the Fisher-Yates (Knuth) algorithm.
 * This provides O(n) time complexity and uniform distribution,
 * unlike sort(() => Math.random() - 0.5) which is O(n log n) and biased.
 *
 * @param array - The array to shuffle (will not be modified)
 * @returns A new shuffled array
 *
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * const shuffled = shuffle(numbers);
 * // Original array remains unchanged
 * console.log(numbers); // [1, 2, 3, 4, 5]
 * console.log(shuffled); // [3, 1, 5, 2, 4] (random order)
 */
export function shuffle<T>(array: T[]): T[] {
  // Create a copy to avoid mutating the original array
  const result = [...array];

  // Fisher-Yates shuffle algorithm
  for (let i = result.length - 1; i > 0; i--) {
    // Generate random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at indices i and j
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}
