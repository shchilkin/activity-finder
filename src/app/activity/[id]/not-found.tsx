import Link from 'next/link';
import { Home } from 'lucide-react';
import { activityService } from '@/services';
import { EventCard } from '@/components/EventCard';
import type { Activity } from '@/schemas/activity';

/* TODO: Encapsulate logic into component and write component tests for storybook
  What happens if API returns an error? */

export default async function NotFound() {
  // Fetch random activities with error handling
  let randomActivities: Activity[] = [];
  try {
    randomActivities = await activityService.getRandomActivities(3);
  } catch (error) {
    // If fetching random activities fails, use empty array as fallback
    // This ensures the 404 page still renders even if the service fails
    console.error('Failed to fetch random activities:', error);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-4xl">
        <div className="mb-12 text-center">
          <div className="mb-8">
            <h1 className="mb-2 text-6xl font-bold text-gray-900 dark:text-gray-100">
              404
            </h1>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Activity Not Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              The activity you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <Home className="size-4" />
            Back to Activities
          </Link>
        </div>

        {/* Random activities suggestion - only show if activities were fetched successfully */}
        {randomActivities.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-center text-lg font-semibold text-gray-700 dark:text-gray-300">
              You might be interested in these activities:
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {randomActivities.map((activity) => (
                <EventCard
                  key={activity.id}
                  id={activity.id}
                  title={activity.title}
                  date={activity.date}
                  time={activity.time}
                  location={activity.location}
                  capacity={activity.capacity}
                  signedUp={activity.signedUp}
                  participated={activity.participated}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
