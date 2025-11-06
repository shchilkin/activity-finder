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
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80 dark:border-slate-700 dark:bg-gray-900/95 dark:supports-backdrop-filter:bg-gray-900/80">
      <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 sm:py-4">
        {/* Back button */}
        <Link
          href="/"
          className="mb-2 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <ArrowLeft className="size-4" />
          <span>Back to Activities</span>
        </Link>

        {/* Title and metadata */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h1 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl dark:text-slate-100">
                {activity.title}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
