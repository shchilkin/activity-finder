import { z } from 'zod';
import { Activity, ActivitySchema } from '@/schemas/activity';
import activitiesData from '@/data/activities.json';

/**
 * Custom error thrown when an activity is not found.
 */
export class ActivityNotFoundError extends Error {
  constructor(id: number) {
    super(`Activity with ID ${id} not found`);
    this.name = 'ActivityNotFoundError';
  }
}

/**
 * Custom error thrown when activity data validation fails.
 */
export class ActivityDataValidationError extends Error {
  constructor(message: string, cause?: Error) {
    super(`Activity data validation failed: ${message}`);
    this.name = 'ActivityDataValidationError';
    this.cause = cause;
  }
}

/**
 * Custom error thrown when invalid parameters are provided.
 */
export class InvalidActivityParameterError extends Error {
  constructor(parameterName: string, value: unknown) {
    super(`Invalid ${parameterName}: ${value}. Expected a positive number.`);
    this.name = 'InvalidActivityParameterError';
  }
}

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
   * @throws {ActivityDataValidationError} If data validation fails
   */
  async getAllActivities(): Promise<Activity[]> {
    // Simulate async behavior for future API compatibility
    return Promise.resolve(this.loadActivities());
  }

  /**
   * Fetches a single activity by its ID.
   * In the future, this can be replaced with an API call.
   * @param id - The ID of the activity to retrieve
   * @returns Promise resolving to an Activity object
   * @throws {InvalidActivityParameterError} If the ID is not a valid positive number
   * @throws {ActivityNotFoundError} If no activity with the given ID exists
   * @throws {ActivityDataValidationError} If data validation fails
   */
  async getActivityById(id: number): Promise<Activity> {
    // Validate the ID parameter
    if (!Number.isInteger(id) || id <= 0) {
      throw new InvalidActivityParameterError('id', id);
    }

    // Simulate async behavior for future API compatibility
    const activities = this.loadActivities();
    const activity = activities.find((a) => a.id === id);

    if (!activity) {
      throw new ActivityNotFoundError(id);
    }

    return Promise.resolve(activity);
  }

  /**
   * Private method to load and validate activities from JSON data.
   * This encapsulates the data source logic, making it easy to swap
   * with API calls later.
   * @returns Array of validated Activity objects
   * @throws {ActivityDataValidationError} If data validation fails
   */
  private loadActivities(): Activity[] {
    try {
      // Validate that activitiesData is an array
      if (!Array.isArray(activitiesData)) {
        throw new Error('Activities data must be an array');
      }

      // Validate the entire array of activities using Zod
      const ActivitiesArraySchema = z.array(ActivitySchema);
      return ActivitiesArraySchema.parse(activitiesData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationDetails = error.issues
          .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
          .join('; ');
        throw new ActivityDataValidationError(
          `Schema validation failed - ${validationDetails}`,
          error,
        );
      }

      if (error instanceof Error) {
        throw new ActivityDataValidationError(error.message, error);
      }

      throw new ActivityDataValidationError('Unknown validation error');
    }
  }
}

// Export a singleton instance
export const activityService = new ActivityService();

// Also export the class for testing purposes
export default ActivityService;
