import { z } from 'zod';
import { Activity, ActivitySchema } from '@/types/activity';
import activitiesData from '@/data/activities.json';

/**
 * ActivityService provides methods to retrieve activity data.
 * This service abstracts the data source, making it easy to switch
 * from JSON files to API calls in the future with minimal changes.
 */
class ActivityService {
  /**
   * Fetches all activities from the data source.
   * In the future, this can be replaced with an API call.
   * @returns Promise resolving to an array of Activity objects
   */
  async getAllActivities(): Promise<Activity[]> {
    // Simulate async behavior for future API compatibility
    return Promise.resolve(this.loadActivities());
  }

  /**
   * Fetches a single activity by its ID.
   * In the future, this can be replaced with an API call.
   * @param id - The ID of the activity to retrieve
   * @returns Promise resolving to an Activity object or null if not found
   */
  async getActivityById(id: number): Promise<Activity | null> {
    // Simulate async behavior for future API compatibility
    const activities = this.loadActivities();
    const activity = activities.find((a) => a.id === id);
    return Promise.resolve(activity || null);
  }

  /**
   * Private method to load and validate activities from JSON data.
   * This encapsulates the data source logic, making it easy to swap
   * with API calls later.
   * @returns Array of validated Activity objects
   */
  private loadActivities(): Activity[] {
    // Validate the entire array of activities using Zod
    const ActivitiesArraySchema = z.array(ActivitySchema);
    return ActivitiesArraySchema.parse(activitiesData);
  }
}

// Export a singleton instance
export const activityService = new ActivityService();

// Also export the class for testing purposes
export default ActivityService;
