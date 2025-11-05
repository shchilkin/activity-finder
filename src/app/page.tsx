import { EventCard } from '@/components/EventCard';
import { Activity } from '@/types/activity';
import activities from '@/data/activities.json';

export default function Home() {
  const allActivities = activities as Activity[];

  return (
    <div className="min-h-screen bg-gray-100 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Activity Finder
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Discover and join activities in your community
          </p>
        </header>

        <div className="grid gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3 lg:gap-4">
          {allActivities.map((activity) => (
            <EventCard key={activity.id} {...activity} />
          ))}
        </div>
      </div>
    </div>
  );
}
