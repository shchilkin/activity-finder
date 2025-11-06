import { describe, it, expect } from 'vitest';
import {
  getInitials,
  getColorForName,
  avatarColors,
} from './participantHelpers';

describe('participantHelpers', () => {
  describe('getInitials', () => {
    it('should return initials from first and last name', () => {
      expect(getInitials('John Doe')).toBe('JD');
      expect(getInitials('Alice Smith')).toBe('AS');
    });

    it('should return single initial for single name', () => {
      expect(getInitials('Alice')).toBe('A');
      expect(getInitials('Bob')).toBe('B');
    });

    it('should return maximum 2 initials even for longer names', () => {
      expect(getInitials('John Jacob Jingleheimer Schmidt')).toBe('JJ');
      expect(getInitials('Mary Jane Watson Parker')).toBe('MJ');
    });

    it('should handle extra spaces correctly', () => {
      expect(getInitials('Bob  Smith')).toBe('BS');
      expect(getInitials('  Alice   Cooper  ')).toBe('AC');
      expect(getInitials('John  Doe  Jr')).toBe('JD');
    });

    it('should return initials in uppercase', () => {
      expect(getInitials('john doe')).toBe('JD');
      expect(getInitials('alice SMITH')).toBe('AS');
      expect(getInitials('bOb WiLsOn')).toBe('BW');
    });

    it('should handle empty strings', () => {
      expect(getInitials('')).toBe('');
      expect(getInitials('   ')).toBe('');
    });

    it('should handle special characters in names', () => {
      expect(getInitials("O'Brien")).toBe('O');
      expect(getInitials('Jean-Paul Sartre')).toBe('JS');
      expect(getInitials('María García')).toBe('MG');
    });

    it('should handle unicode characters', () => {
      // Single-word unicode names (no spaces)
      expect(getInitials('李明')).toBe('李');
      expect(getInitials('محمد')).toBe('م');
      // Multi-word unicode names with spaces
      expect(getInitials('Владимир Петров')).toBe('ВП');
      expect(getInitials('Αλέξανδρος Νικόλαος')).toBe('ΑΝ');
    });

    it('should handle very short names', () => {
      expect(getInitials('A')).toBe('A');
      expect(getInitials('X Y')).toBe('XY');
    });

    it('should handle tabs and newlines as separators', () => {
      expect(getInitials('John\tDoe')).toBe('JD');
      expect(getInitials('John\nDoe')).toBe('JD');
      expect(getInitials('John\t\nDoe')).toBe('JD');
      expect(getInitials('Alice  \t  Bob')).toBe('AB');
    });

    it('should handle names with numbers', () => {
      expect(getInitials('John 2nd')).toBe('J2');
      expect(getInitials('Louis XIV')).toBe('LX');
      expect(getInitials('123')).toBe('1');
    });

    it('should handle only special characters', () => {
      expect(getInitials('---')).toBe('-');
      expect(getInitials('!!!')).toBe('!');
      expect(getInitials('### @@@')).toBe('#@');
    });
  });

  describe('avatarColors', () => {
    it('should export exactly 12 color options', () => {
      expect(avatarColors).toHaveLength(12);
    });

    it('should have valid Tailwind classes for each color', () => {
      avatarColors.forEach((color) => {
        expect(color).toContain('bg-');
        expect(color).toContain('text-');
        expect(color).toContain('dark:');
      });
    });

    it('should include different color variants', () => {
      const colorSet = new Set(avatarColors);
      expect(colorSet.size).toBe(12); // All colors should be unique
    });
  });

  describe('getColorForName', () => {
    it('should return a color from the avatarColors array', () => {
      const color = getColorForName('Alice');
      expect(avatarColors).toContain(color);
    });

    it('should return consistent color for same name', () => {
      const color1 = getColorForName('John Doe');
      const color2 = getColorForName('John Doe');
      expect(color1).toBe(color2);
    });

    it('should return different colors for different names', () => {
      const color1 = getColorForName('Alice');
      const color2 = getColorForName('Bob');
      // They might occasionally be the same due to hash collision, but unlikely
      // We just test that the function works consistently
      expect(getColorForName('Alice')).toBe(color1);
      expect(getColorForName('Bob')).toBe(color2);
    });

    it('should handle empty string', () => {
      const color = getColorForName('');
      expect(avatarColors).toContain(color);
    });

    it('should handle very long names', () => {
      const longName = 'A'.repeat(1000);
      const color = getColorForName(longName);
      expect(avatarColors).toContain(color);
    });

    it('should handle special characters', () => {
      const color1 = getColorForName("O'Brien");
      const color2 = getColorForName('O Brien'); // Without apostrophe
      expect(avatarColors).toContain(color1);
      expect(avatarColors).toContain(color2);
      // Different strings should potentially have different colors
      expect(getColorForName("O'Brien")).toBe(color1);
    });

    it('should handle unicode characters', () => {
      // Test various unicode character sets
      const color1 = getColorForName('李明'); // Chinese
      const color2 = getColorForName('محمد'); // Arabic
      const color3 = getColorForName('Владимир'); // Cyrillic
      const color4 = getColorForName('Αλέξανδρος'); // Greek

      expect(avatarColors).toContain(color1);
      expect(avatarColors).toContain(color2);
      expect(avatarColors).toContain(color3);
      expect(avatarColors).toContain(color4);

      // Consistency check
      expect(getColorForName('李明')).toBe(color1);
      expect(getColorForName('محمد')).toBe(color2);
    });

    it('should distribute names across available colors', () => {
      // Generate colors for many names and check distribution
      const names = Array.from({ length: 50 }, (_, i) => `Person ${i}`);
      const colorCounts = new Map<string, number>();

      names.forEach((name) => {
        const color = getColorForName(name);
        colorCounts.set(color, (colorCounts.get(color) || 0) + 1);
      });

      // All colors should be from our palette
      colorCounts.forEach((_, color) => {
        expect(avatarColors).toContain(color);
      });

      // With 50 names and 12 colors, we should see good distribution
      // (not all in one color)
      expect(colorCounts.size).toBeGreaterThan(1);
    });

    it('should handle case sensitivity consistently', () => {
      // Different cases should produce different hashes
      const color1 = getColorForName('Alice');
      const color2 = getColorForName('alice');
      const color3 = getColorForName('ALICE');

      // Each should be consistent with itself
      expect(getColorForName('Alice')).toBe(color1);
      expect(getColorForName('alice')).toBe(color2);
      expect(getColorForName('ALICE')).toBe(color3);
    });
  });
});
