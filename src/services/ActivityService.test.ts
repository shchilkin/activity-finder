import { describe, it, expect } from 'vitest';
import { activityService } from './ActivityService';
import activitiesData from '@/data/activities.json';

describe('ActivityService', () => {
  describe('getAllActivities', () => {
    it('should return all activities from the data source', async () => {
      const activities = await activityService.getAllActivities();

      expect(activities).toBeDefined();
      expect(Array.isArray(activities)).toBe(true);
      expect(activities.length).toBe(activitiesData.length);
    });

    it('should return activities with correct structure', async () => {
      const activities = await activityService.getAllActivities();

      expect(activities.length).toBeGreaterThan(0);

      const firstActivity = activities[0];
      expect(firstActivity).toHaveProperty('id');
      expect(firstActivity).toHaveProperty('title');
      expect(firstActivity).toHaveProperty('date');
      expect(firstActivity).toHaveProperty('time');
      expect(firstActivity).toHaveProperty('location');
      expect(firstActivity).toHaveProperty('capacity');
      expect(firstActivity).toHaveProperty('signedUp');
      expect(firstActivity).toHaveProperty('participated');
    });

    it('should return activities with correct data types', async () => {
      const activities = await activityService.getAllActivities();

      const firstActivity = activities[0];
      expect(typeof firstActivity.id).toBe('number');
      expect(typeof firstActivity.title).toBe('string');
      expect(typeof firstActivity.date).toBe('string');
      expect(typeof firstActivity.time).toBe('string');
      expect(typeof firstActivity.location).toBe('string');
      expect(typeof firstActivity.capacity).toBe('number');
      expect(Array.isArray(firstActivity.signedUp)).toBe(true);
      expect(Array.isArray(firstActivity.participated)).toBe(true);
    });

    it('should validate all activities against the schema', async () => {
      const activities = await activityService.getAllActivities();

      activities.forEach((activity) => {
        expect(activity.id).toBeGreaterThan(0);
        expect(activity.title).toBeTruthy();
        expect(activity.capacity).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('getActivityById', () => {
    it('should return an activity by its ID', async () => {
      const activity = await activityService.getActivityById(1);

      expect(activity).toBeDefined();
      expect(activity).not.toBeNull();
      expect(activity?.id).toBe(1);
    });

    it('should return the correct activity details for a specific ID', async () => {
      const activity = await activityService.getActivityById(1);

      expect(activity?.title).toBe('Morning Yoga Session');
      expect(activity?.date).toBe('2025-10-15');
      expect(activity?.time).toBe('07:00');
      expect(activity?.location).toBe('Wellness Center');
      expect(activity?.capacity).toBe(20);
    });

    it('should return null for non-existent ID', async () => {
      const activity = await activityService.getActivityById(99999);

      expect(activity).toBeNull();
    });

    it('should return null for negative ID', async () => {
      const activity = await activityService.getActivityById(-1);

      expect(activity).toBeNull();
    });

    it('should return null for zero ID', async () => {
      const activity = await activityService.getActivityById(0);

      expect(activity).toBeNull();
    });

    it('should return different activities for different IDs', async () => {
      const activity1 = await activityService.getActivityById(1);
      const activity2 = await activityService.getActivityById(2);

      expect(activity1).not.toBeNull();
      expect(activity2).not.toBeNull();
      expect(activity1?.id).not.toBe(activity2?.id);
      expect(activity1?.title).not.toBe(activity2?.title);
    });

    it('should return activity with valid structure when found', async () => {
      const activity = await activityService.getActivityById(5);

      if (activity) {
        expect(activity).toHaveProperty('id');
        expect(activity).toHaveProperty('title');
        expect(activity).toHaveProperty('date');
        expect(activity).toHaveProperty('time');
        expect(activity).toHaveProperty('location');
        expect(activity).toHaveProperty('capacity');
        expect(activity).toHaveProperty('signedUp');
        expect(activity).toHaveProperty('participated');
        expect(typeof activity.id).toBe('number');
        expect(Array.isArray(activity.signedUp)).toBe(true);
        expect(Array.isArray(activity.participated)).toBe(true);
      }
    });
  });

  describe('async behavior', () => {
    it('should return promises from getAllActivities', () => {
      const result = activityService.getAllActivities();
      expect(result).toBeInstanceOf(Promise);
    });

    it('should return promises from getActivityById', () => {
      const result = activityService.getActivityById(1);
      expect(result).toBeInstanceOf(Promise);
    });
  });
});
