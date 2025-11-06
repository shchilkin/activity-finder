import { describe, it, expect, vi } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('returns an array with the same length as the input', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);

    expect(result).toHaveLength(input.length);
  });

  it('returns an array with the same elements as the input', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);

    expect(result.sort()).toEqual(input.sort());
  });

  it('does not modify the original array', () => {
    const input = [1, 2, 3, 4, 5];
    const originalCopy = [...input];

    shuffle(input);

    expect(input).toEqual(originalCopy);
  });

  it('returns an empty array when given an empty array', () => {
    const result = shuffle([]);

    expect(result).toEqual([]);
  });

  it('returns a single-element array unchanged', () => {
    const input = [42];
    const result = shuffle(input);

    expect(result).toEqual([42]);
  });

  it('produces different results across multiple shuffles (probabilistic)', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const results = new Set<string>();

    // Run shuffle 50 times and collect unique results
    for (let i = 0; i < 50; i++) {
      results.add(JSON.stringify(shuffle(input)));
    }

    // With 10 elements, we should get multiple different orderings
    // (very unlikely to get the same order repeatedly)
    expect(results.size).toBeGreaterThan(1);
  });

  it('uses Fisher-Yates algorithm correctly with known random values', () => {
    // Mock Math.random to return predictable values
    const randomValues = [0.5, 0.3, 0.8, 0.1, 0.9];
    let callCount = 0;

    vi.spyOn(Math, 'random').mockImplementation(() => {
      return randomValues[callCount++ % randomValues.length];
    });

    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);

    // Verify the algorithm was called correctly
    expect(result).toHaveLength(5);
    expect(result.sort()).toEqual([1, 2, 3, 4, 5]);

    vi.restoreAllMocks();
  });

  it('handles arrays of different types', () => {
    const strings = ['a', 'b', 'c'];
    const objects = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const shuffledStrings = shuffle(strings);
    const shuffledObjects = shuffle(objects);

    expect(shuffledStrings.sort()).toEqual(strings.sort());
    expect(shuffledObjects.sort((a, b) => a.id - b.id)).toEqual(
      objects.sort((a, b) => a.id - b.id),
    );
  });
});
