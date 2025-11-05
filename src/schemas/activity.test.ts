import { describe, it, expect } from 'vitest';
import { ActivitySchema } from './activity';
import { ZodError } from 'zod';

describe('ActivitySchema', () => {
  const validActivity = {
    id: 1,
    title: 'Morning Yoga',
    date: '2025-10-15',
    time: '07:00',
    location: 'Wellness Center',
    capacity: 20,
    signedUp: ['Alice', 'Bob'],
    participated: ['Alice'],
  };

  describe('valid data acceptance', () => {
    it('should accept valid activity data', () => {
      const result = ActivitySchema.safeParse(validActivity);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validActivity);
      }
    });

    it('should accept activity with empty participant lists', () => {
      const activity = { ...validActivity, signedUp: [], participated: [] };
      const result = ActivitySchema.safeParse(activity);

      expect(result.success).toBe(true);
    });

    it('should accept zero capacity activities', () => {
      const activity = { ...validActivity, capacity: 0 };
      const result = ActivitySchema.safeParse(activity);

      expect(result.success).toBe(true);
    });

    it('should strip extra fields from input', () => {
      const activity = {
        ...validActivity,
        extraField: 'should be removed',
        anotherExtra: 123,
      };
      const result = ActivitySchema.safeParse(activity);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).not.toHaveProperty('extraField');
        expect(result.data).not.toHaveProperty('anotherExtra');
        expect(result.data).toEqual(validActivity);
      }
    });
  });

  describe('data validation', () => {
    it('should reject invalid participant data in arrays', () => {
      const activity = { ...validActivity, signedUp: [123, 'Alice'] };
      const result = ActivitySchema.safeParse(activity);

      expect(result.success).toBe(false);
    });

    it('should reject when participant lists are not arrays', () => {
      const activity = { ...validActivity, participated: 'Alice, Bob' };
      const result = ActivitySchema.safeParse(activity);

      expect(result.success).toBe(false);
    });
  });

  describe('required field validation', () => {
    it('should reject incomplete activity data', () => {
      const incompleteActivity = {
        id: 1,
        title: 'Test Activity',
        // Missing required fields: date, time, location, capacity, signedUp, participated
      };
      const result = ActivitySchema.safeParse(incompleteActivity);

      expect(result.success).toBe(false);
    });

    it('should reject activity missing essential information', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { title, location, capacity, ...activity } = validActivity;
      const result = ActivitySchema.safeParse(activity);

      expect(result.success).toBe(false);
    });
  });

  describe('error handling', () => {
    it('should throw ZodError when using parse() with invalid data', () => {
      const invalidActivity = { ...validActivity, capacity: 'not-a-number' };

      expect(() => ActivitySchema.parse(invalidActivity)).toThrow(ZodError);
    });

    it('should provide validation errors for multiple invalid fields', () => {
      const invalidActivity = {
        id: 1,
        title: 'Test',
        // Missing multiple required fields
      };
      const result = ActivitySchema.safeParse(invalidActivity);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(1);
      }
    });
  });

  describe('edge cases', () => {
    it('should handle large capacity numbers', () => {
      const activity = { ...validActivity, capacity: 999999 };
      const result = ActivitySchema.safeParse(activity);

      expect(result.success).toBe(true);
    });

    it('should handle long participant lists', () => {
      const manyParticipants = Array.from(
        { length: 100 },
        (_, i) => `Person${i}`,
      );
      const activity = {
        ...validActivity,
        signedUp: manyParticipants,
        participated: manyParticipants.slice(0, 50),
      };
      const result = ActivitySchema.safeParse(activity);

      expect(result.success).toBe(true);
    });

    it('should handle empty string values appropriately', () => {
      const activity = { ...validActivity, title: '', location: '' };
      const result = ActivitySchema.safeParse(activity);

      // Schema currently allows empty strings - this tests current behavior
      expect(result.success).toBe(true);
    });
  });
});
