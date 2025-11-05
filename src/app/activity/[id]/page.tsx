import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  activityService,
  ActivityNotFoundError,
  InvalidActivityParameterError,
} from '@/services';
import { Calendar, Clock, MapPin, Users, UserCheck, Award } from 'lucide-react';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
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

  const remaining = activity.capacity - activity.signedUp.length;
  const participationRate =
    activity.signedUp.length > 0
      ? Math.round(
          (activity.participated.length / activity.signedUp.length) * 100,
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-100 py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Activities
        </Link>

        {/* Activity Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm dark:border-slate-600 dark:bg-slate-800">
          {/* Header */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-5 dark:border-slate-700 dark:bg-slate-900">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
              {activity.title}
            </h1>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {/* Date & Time Section */}
            <div className="mb-6">
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-slate-400">
                When
              </h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-900 dark:text-slate-100">
                  <Calendar className="mr-3 h-5 w-5 text-gray-400 dark:text-slate-500" />
                  <span className="text-lg">{activity.date}</span>
                </div>
                <div className="flex items-center text-gray-900 dark:text-slate-100">
                  <Clock className="mr-3 h-5 w-5 text-gray-400 dark:text-slate-500" />
                  <span className="text-lg">{activity.time}</span>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="mb-6">
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-slate-400">
                Where
              </h2>
              <div className="flex items-center text-gray-900 dark:text-slate-100">
                <MapPin className="mr-3 h-5 w-5 text-gray-400 dark:text-slate-500" />
                <span className="text-lg">{activity.location}</span>
              </div>
            </div>

            {/* Capacity Section */}
            <div className="mb-6">
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-slate-400">
                Capacity
              </h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-900 dark:text-slate-100">
                  <Users className="mr-3 h-5 w-5 text-gray-400 dark:text-slate-500" />
                  <span className="text-lg">
                    Total Capacity: {activity.capacity}
                  </span>
                </div>
                <div className="flex items-center text-gray-900 dark:text-slate-100">
                  <UserCheck className="mr-3 h-5 w-5 text-gray-400 dark:text-slate-500" />
                  <span className="text-lg">
                    Signed Up: {activity.signedUp.length}
                  </span>
                </div>
                <div className="flex items-center">
                  <div className="mr-3 h-5 w-5" />
                  <span
                    className={`text-lg font-semibold ${
                      remaining === 0
                        ? 'text-red-600 dark:text-red-400'
                        : remaining <= activity.capacity * 0.2
                          ? 'text-orange-600 dark:text-orange-400'
                          : 'text-green-600 dark:text-green-400'
                    }`}
                  >
                    {remaining} spots remaining
                  </span>
                </div>
              </div>
            </div>

            {/* Participation Section */}
            <div className="mb-6">
              <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-slate-400">
                Participation
              </h2>
              <div className="space-y-2">
                <div className="flex items-center text-gray-900 dark:text-slate-100">
                  <Award className="mr-3 h-5 w-5 text-gray-400 dark:text-slate-500" />
                  <span className="text-lg">
                    Participated: {activity.participated.length}
                  </span>
                </div>
                {activity.signedUp.length > 0 && (
                  <div className="flex items-center text-gray-900 dark:text-slate-100">
                    <div className="mr-3 h-5 w-5" />
                    <span className="text-lg">
                      Participation Rate: {participationRate}%
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Participants Lists */}
            {activity.signedUp.length > 0 && (
              <div className="border-t border-gray-200 pt-6 dark:border-slate-700">
                <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-slate-400">
                  Signed Up Participants
                </h2>
                <div className="flex flex-wrap gap-2">
                  {activity.signedUp.map((participant, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {activity.participated.length > 0 && (
              <div className="mt-6 border-t border-gray-200 pt-6 dark:border-slate-700">
                <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-slate-400">
                  Participated
                </h2>
                <div className="flex flex-wrap gap-2">
                  {activity.participated.map((participant, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {participant}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
