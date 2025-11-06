import { describe, it, expect } from 'vitest';
import {
  activityService,
  ActivityNotFoundError,
  InvalidActivityParameterError,
} from './ActivityService';

describe('ActivityService', () => {
  describe('getAllActivities', () => {
    it('should return all activities from the data source', async () => {
      const activities = await activityService.getAllActivities();

      expect(Array.isArray(activities)).toBe(true);
      // There are 25 activities in the data source
      expect(activities.length).toBe(25);
    });

    it('should return the same data on multiple calls', async () => {
      const activities1 = await activityService.getAllActivities();
      const activities2 = await activityService.getAllActivities();

      expect(activities1).toEqual(activities2);
    });
  });

  describe('getActivityById', () => {
    it('should return the correct activity for a valid ID', async () => {
      const activity = await activityService.getActivityById(1);

      expect(activity.id).toBe(1);
      expect(activity.title).toBe('Morning Yoga Session');
      expect(activity.date).toBe('2025-10-15');
      expect(activity.time).toBe('07:00');
      expect(activity.location).toBe('Wellness Center');
      expect(activity.capacity).toBe(20);
    });

    it('should throw ActivityNotFoundError when activity does not exist', async () => {
      await expect(activityService.getActivityById(99999)).rejects.toThrow(
        ActivityNotFoundError,
      );
      await expect(activityService.getActivityById(99999)).rejects.toThrow(
        'Activity with ID 99999 not found',
      );
    });

    it('should include the ID in the error message', async () => {
      await expect(activityService.getActivityById(12345)).rejects.toThrow(
        'Activity with ID 12345 not found',
      );
    });

    it('should throw InvalidActivityParameterError for non-integer ID', async () => {
      await expect(activityService.getActivityById(1.5)).rejects.toThrow(
        InvalidActivityParameterError,
      );
    });

    it('should throw InvalidActivityParameterError for negative ID', async () => {
      await expect(activityService.getActivityById(-1)).rejects.toThrow(
        'Invalid id: -1. Expected a positive number.',
      );
    });

    it('should throw InvalidActivityParameterError for zero ID', async () => {
      await expect(activityService.getActivityById(0)).rejects.toThrow(
        InvalidActivityParameterError,
      );
    });
  });

  describe('data validation', () => {
    it('should validate activities against the Zod schema', async () => {
      // This test ensures Zod validation runs without throwing
      const activities = await activityService.getAllActivities();

      // If we got here, validation passed. Verify we have valid data.
      expect(activities.length).toBeGreaterThan(0);
      activities.forEach((activity) => {
        expect(typeof activity.id).toBe('number');
        expect(typeof activity.title).toBe('string');
        expect(typeof activity.capacity).toBe('number');
        expect(Array.isArray(activity.signedUp)).toBe(true);
        expect(Array.isArray(activity.participated)).toBe(true);
      });
    });

    it('should enforce required fields through Zod schema', async () => {
      // This test verifies that all activities have the required fields
      // If any activity is missing a required field, Zod will throw during loadActivities()
      const activities = await activityService.getAllActivities();

      // Verify each activity has all required fields
      activities.forEach((activity) => {
        expect(activity).toHaveProperty('id');
        expect(activity).toHaveProperty('title');
        expect(activity).toHaveProperty('date');
        expect(activity).toHaveProperty('time');
        expect(activity).toHaveProperty('location');
        expect(activity).toHaveProperty('capacity');
        expect(activity).toHaveProperty('signedUp');
        expect(activity).toHaveProperty('participated');
      });
    });
  });

  describe('getRandomActivities', () => {
    it('should return the requested number of activities', async () => {
      const randomActivities = await activityService.getRandomActivities(3);

      expect(randomActivities).toHaveLength(3);
    });

    it('should return different activities on multiple calls', async () => {
      // This test verifies that the shuffle produces different orderings.
      // We collect multiple results and verify they're not all identical.
      // While theoretically this could fail due to extremely unlikely random chance,
      // the probability is negligible with these parameters.
      const results = await Promise.all([
        activityService.getRandomActivities(5),
        activityService.getRandomActivities(5),
        activityService.getRandomActivities(5),
        activityService.getRandomActivities(5),
        activityService.getRandomActivities(5),
      ]);

      // Convert to JSON strings for comparison
      const resultStrings = results.map((r) => JSON.stringify(r));
      const uniqueResults = new Set(resultStrings);

      // With 5 calls selecting 5 from 25 activities, getting all identical is
      // astronomically unlikely (probability < 1 in 10^20)
      expect(uniqueResults.size).toBeGreaterThan(1);
    });

    it('should return all activities when count exceeds available activities', async () => {
      const allActivities = await activityService.getAllActivities();
      const randomActivities = await activityService.getRandomActivities(
        allActivities.length + 10,
      );

      expect(randomActivities).toHaveLength(allActivities.length);
    });

    it('should return valid activity objects', async () => {
      const randomActivities = await activityService.getRandomActivities(3);

      randomActivities.forEach((activity) => {
        expect(typeof activity.id).toBe('number');
        expect(typeof activity.title).toBe('string');
        expect(typeof activity.date).toBe('string');
        expect(typeof activity.time).toBe('string');
        expect(typeof activity.location).toBe('string');
        expect(typeof activity.capacity).toBe('number');
        expect(Array.isArray(activity.signedUp)).toBe(true);
        expect(Array.isArray(activity.participated)).toBe(true);
      });
    });

    it('should return unique activities without duplicates', async () => {
      const randomActivities = await activityService.getRandomActivities(5);
      const ids = randomActivities.map((a) => a.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it('should use default count of 3 when no count provided', async () => {
      const randomActivities = await activityService.getRandomActivities();

      expect(randomActivities).toHaveLength(3);
    });

    it('should throw InvalidActivityParameterError for non-integer count', async () => {
      await expect(activityService.getRandomActivities(2.5)).rejects.toThrow(
        InvalidActivityParameterError,
      );
    });

    it('should throw InvalidActivityParameterError for negative count', async () => {
      await expect(activityService.getRandomActivities(-1)).rejects.toThrow(
        'Invalid count: -1. Expected a positive number.',
      );
    });

    it('should throw InvalidActivityParameterError for zero count', async () => {
      await expect(activityService.getRandomActivities(0)).rejects.toThrow(
        InvalidActivityParameterError,
      );
    });

    it('should return a single activity when count is 1', async () => {
      const randomActivities = await activityService.getRandomActivities(1);

      expect(randomActivities).toHaveLength(1);
      expect(randomActivities[0]).toHaveProperty('id');
    });
  });

  describe('error handling', () => {
    it('should have proper error name for ActivityNotFoundError', () => {
      const error = new ActivityNotFoundError(123);

      expect(error.name).toBe('ActivityNotFoundError');
      expect(error.message).toBe('Activity with ID 123 not found');
      expect(error).toBeInstanceOf(Error);
    });

    it('should have proper error name and message for InvalidActivityParameterError', () => {
      const error = new InvalidActivityParameterError('id', 'invalid');

      expect(error.name).toBe('InvalidActivityParameterError');
      expect(error.message).toBe(
        'Invalid id: invalid. Expected a positive number.',
      );
      expect(error).toBeInstanceOf(Error);
    });
  });
});
