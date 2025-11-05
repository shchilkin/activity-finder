import { Activity } from '@/schemas/activity';
import activities from './activities.json';

/**
 * Mock function that returns a single activity by ID from the activities.json data
 * @param id - The ID of the activity to retrieve
 * @returns The activity object or undefined if not found
 */
export const getActivityById = (id: number): Activity => {
  return activities.find((activity) => activity.id === id) as Activity;
};

/**
 * Mock function that returns the first activity from the activities.json data
 * Useful for testing and demos
 * @returns The first activity object
 */
export const getMockActivity = (): Activity => {
  return activities[0] as Activity;
};

/**
 * Mock function that returns a random activity from the activities.json data
 * @returns A random activity object
 */
export const getRandomActivity = (): Activity => {
  const randomIndex = Math.floor(Math.random() * activities.length);
  return activities[randomIndex] as Activity;
};
