'use client';

import { Users, CheckCircle2 } from 'lucide-react';
import { DateTime } from '@/components/EventCard/DateTime';
import { useActivityInteractive } from '../ActivityInteractiveContext';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/Card';
import { Progress } from '@/components/Progress';

export function ActivityOverview() {
  const { activity, localSignedUp, localParticipated } =
    useActivityInteractive();

  const spotsTaken = localSignedUp.length;
  const spotsLeft = Math.max(activity.capacity - spotsTaken, 0);
  const participatedCount = localParticipated.length;
  const participationRate =
    spotsTaken > 0 ? Math.round((participatedCount / spotsTaken) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
        <CardDescription>
          <DateTime date={activity.date} time={activity.time} />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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
            <div className="mt-1 text-lg font-semibold">{spotsTaken}</div>
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
          <Progress value={spotsTaken} max={activity.capacity} />
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
          <Progress value={participatedCount} max={spotsTaken || 1} />
        </div>
      </CardContent>
    </Card>
  );
}
