import { describe, it, expect } from 'vitest';
import { mergeClasses } from './mergeClasses';

describe('mergeClasses', () => {
  describe('basic functionality', () => {
    it('should merge simple class strings', () => {
      const result = mergeClasses('px-4', 'py-2', 'bg-white');
      expect(result).toBe('px-4 py-2 bg-white');
    });

    it('should handle empty inputs', () => {
      expect(mergeClasses()).toBe('');
      expect(mergeClasses('')).toBe('');
      expect(mergeClasses('', '')).toBe('');
    });

    it('should filter out falsy values', () => {
      const result = mergeClasses('px-4', null, undefined, false, '', 'py-2');
      expect(result).toBe('px-4 py-2');
    });
  });

  describe('conditional classes', () => {
    it('should handle conditional classes with &&', () => {
      const isActive = true;
      const isDisabled = false;

      const result = mergeClasses(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class',
      );

      expect(result).toBe('base-class active-class');
    });

    it('should handle object notation', () => {
      const result = mergeClasses('base', {
        active: true,
        disabled: false,
        large: true,
      });

      expect(result).toBe('base active large');
    });

    it('should handle array inputs', () => {
      const result = mergeClasses(['px-4', 'py-2'], ['bg-white', 'text-black']);
      expect(result).toBe('px-4 py-2 bg-white text-black');
    });
  });

  describe('Tailwind class conflict resolution', () => {
    it('should resolve conflicting padding classes', () => {
      const result = mergeClasses('p-4', 'p-6');
      expect(result).toBe('p-6');
    });

    it('should resolve conflicting background classes', () => {
      const result = mergeClasses('bg-red-500', 'bg-blue-500', 'bg-green-500');
      expect(result).toBe('bg-green-500');
    });

    it('should resolve conflicting margin classes', () => {
      const result = mergeClasses('mx-2', 'mx-4', 'my-3');
      expect(result).toBe('mx-4 my-3');
    });

    it('should resolve specific padding conflicts', () => {
      const result = mergeClasses('px-4', 'px-6', 'py-2');
      expect(result).toBe('px-6 py-2');
    });

    it('should resolve text size conflicts', () => {
      const result = mergeClasses('text-sm', 'text-lg', 'text-xl');
      expect(result).toBe('text-xl');
    });
  });

  describe('complex scenarios', () => {
    it('should handle component with base classes and overrides', () => {
      const baseClasses = 'px-4 py-2 bg-blue-500 text-white rounded';
      const conditionalClasses = true && 'hover:bg-blue-600';
      const overrideClasses = 'px-6 bg-red-500'; // Should override px-4 and bg-blue-500

      const result = mergeClasses(
        baseClasses,
        conditionalClasses,
        overrideClasses,
      );
      expect(result).toBe(
        'py-2 text-white rounded hover:bg-blue-600 px-6 bg-red-500',
      );
    });

    it('should handle undefined className prop', () => {
      const className = undefined;
      const result = mergeClasses('base-class', className);
      expect(result).toBe('base-class');
    });

    it('should handle mixed input types', () => {
      const result = mergeClasses(
        'base',
        ['array-class'],
        { 'object-class': true, 'false-class': false },
        true && 'conditional-class',
        'final-class',
      );

      expect(result).toBe(
        'base array-class object-class conditional-class final-class',
      );
    });
  });

  describe('real-world component scenarios', () => {
    it('should work like a Button component with variants', () => {
      const buttonBase = 'px-4 py-2 font-medium rounded focus:outline-none';
      const variantPrimary = 'bg-blue-500 text-white hover:bg-blue-600';
      const sizeSmall = 'px-2 py-1 text-sm'; // Should override px-4 py-2
      const customClass = 'mb-4';

      const result = mergeClasses(
        buttonBase,
        variantPrimary,
        sizeSmall,
        customClass,
      );
      expect(result).toBe(
        'font-medium rounded focus:outline-none bg-blue-500 text-white hover:bg-blue-600 px-2 py-1 text-sm mb-4',
      );
    });

    it('should work with Badge component variants', () => {
      const badgeBase =
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium';
      const variantSuccess = 'bg-green-100 text-green-800';
      const variantError = 'bg-red-100 text-red-800'; // Should override success variant

      const result = mergeClasses(badgeBase, variantSuccess, variantError);
      expect(result).toBe(
        'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-800',
      );
    });
  });
});
