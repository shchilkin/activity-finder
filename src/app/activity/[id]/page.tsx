import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  activityService,
  ActivityNotFoundError,
  InvalidActivityParameterError,
} from '@/services';
import { Users, CheckCircle2, ArrowLeft } from 'lucide-react';
import { AvailabilityBadge } from '@/components/EventCard/AvailabilityBadge';
import { DateTime } from '@/components/EventCard/DateTime';
import { Location } from '@/components/EventCard/Location';
import { ActivityInteractiveProvider } from './ActivityInteractiveContext';
import { ActivityStatusCard } from './ActivityStatusCard';
import { ParticipantsList } from './ParticipantsList';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Progress bar component (server-side for Overview section)
function ProgressBar({ value, max }: { value: number; max: number }) {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
      <div
        className="h-full rounded-full bg-blue-600 transition-all dark:bg-blue-500"
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
}

export default async function ActivityDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const activityId = parseInt(id, 10);

  // Return 404 if ID is not a valid number
  if (isNaN(activityId)) {
    notFound();
  }

  // Fetch activity with error handling
  let activity;
  try {
    activity = await activityService.getActivityById(activityId);
  } catch (error) {
    if (
      error instanceof ActivityNotFoundError ||
      error instanceof InvalidActivityParameterError
    ) {
      notFound();
    }
    // Re-throw other errors to be handled by error boundary
    throw error;
  }

  const spotsTaken = activity.signedUp.length;
  const spotsLeft = Math.max(activity.capacity - spotsTaken, 0);
  const participatedCount = activity.participated.length;
  const participationRate =
    spotsTaken > 0 ? Math.round((participatedCount / spotsTaken) * 100) : 0;

  return (
    <ActivityInteractiveProvider activity={activity}>
      <div className="bg-background text-foreground min-h-screen">
        {/* Top bar */}
        <div className="bg-background/80 sticky top-0 z-10 border-b backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="truncate text-lg font-semibold sm:text-xl md:text-2xl">
                  {activity.title}
                </h1>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  #{activity.id}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 sm:text-sm dark:text-gray-400">
                <DateTime date={activity.date} time={activity.time} />
                <Location location={activity.location} />
              </div>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <AvailabilityBadge
                remaining={spotsLeft}
                capacity={activity.capacity}
              />
            </div>
          </div>
        </div>

        {/* Content area */}
        <main className="mx-auto grid max-w-5xl gap-6 px-4 py-6 md:grid-cols-12">
          {/* Left: Overview */}
          <section className="flex flex-col gap-6 md:col-span-5 lg:col-span-4">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <h2 className="text-base font-semibold">Overview</h2>
                <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  <DateTime date={activity.date} time={activity.time} />
                </div>
              </div>
              <div className="space-y-4 px-6 py-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-gray-200 p-3 dark:border-gray-700">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Capacity
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {activity.capacity}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 p-3 dark:border-gray-700">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Signed up
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {spotsTaken}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 p-3 dark:border-gray-700">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Spots left
                    </div>
                    <div
                      className={`mt-1 text-lg font-semibold ${
                        spotsLeft === 0 ? 'text-red-600 dark:text-red-400' : ''
                      }`}
                    >
                      {spotsLeft}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-gray-200 p-3 dark:border-gray-700">
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Participation
                    </div>
                    <div className="mt-1 text-lg font-semibold">
                      {participationRate}%
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <Users className="size-3.5" /> Capacity fill
                    </span>
                    <span>
                      {spotsTaken}/{activity.capacity}
                    </span>
                  </div>
                  <ProgressBar value={spotsTaken} max={activity.capacity} />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
                      <CheckCircle2 className="size-3.5" /> Participation rate
                    </span>
                    <span>
                      {participatedCount}/{spotsTaken || 0}
                    </span>
                  </div>
                  <ProgressBar
                    value={participatedCount}
                    max={spotsTaken || 1}
                  />
                </div>
              </div>
            </div>

            {/* Your Status - Interactive */}
            <ActivityStatusCard />
          </section>

          {/* Right: Participants */}
          <section className="md:col-span-7 lg:col-span-8">
            <ParticipantsList />
          </section>
        </main>
      </div>
    </ActivityInteractiveProvider>
  );
}
