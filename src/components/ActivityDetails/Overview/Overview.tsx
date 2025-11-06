'use client';

import { Users, CheckCircle2 } from 'lucide-react';
import { DateTime } from '@/components/EventCard/DateTime';
import { Location } from '@/components/EventCard/Location';
import { useActivityInteractive } from '../ActivityInteractiveContext';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/Card';
import { Progress } from '@/components/Progress';

export function Overview() {
  const { activity, localSignedUp, localParticipated } =
    useActivityInteractive();

  const spotsTaken = localSignedUp.length;
  const spotsLeft = Math.max(activity.capacity - spotsTaken, 0);
  const participatedCount = localParticipated.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <div className="mt-1 flex flex-col gap-1 text-sm text-gray-600 dark:text-gray-400">
          <DateTime date={activity.date} time={activity.time} />
          <Location location={activity.location} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key metric: Spots left */}
        <div className="pb-2">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Spots left
          </div>
          <div
            className={`mt-1 text-3xl font-bold ${
              spotsLeft === 0 ? 'text-red-600 dark:text-red-400' : ''
            }`}
          >
            {spotsLeft}
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Users className="size-3.5" /> Attendance
            </span>
            <span>
              {spotsTaken}/{activity.capacity}
            </span>
          </div>
          <Progress value={spotsTaken} max={activity.capacity} />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="inline-flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <CheckCircle2 className="size-3.5" /> Returning visitors
            </span>
            <span>
              {participatedCount}/{spotsTaken || 0}
            </span>
          </div>
          <Progress value={participatedCount} max={spotsTaken || 1} />
        </div>
      </CardContent>
    </Card>
  );
}
