import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { AvailabilityBadge } from '@/components/EventCard/AvailabilityBadge';
import { DateTime } from '@/components/EventCard/DateTime';
import { Location } from '@/components/EventCard/Location';
import type { Activity } from '@/schemas/activity';

interface ActivityHeaderProps {
  activity: Activity;
  spotsLeft: number;
}

export function ActivityHeader({ activity, spotsLeft }: ActivityHeaderProps) {
  return (
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
  );
}
