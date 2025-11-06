'use client';

import { useActivityInteractive } from '../ActivityInteractiveContext';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/Card';
import { PersonChip } from '@/components/PersonChip';

/**
 * Displays a grid of participants who have signed up for an activity.
 * Shows their names, avatars, and participation status.
 *
 * @future-improvement Add pagination or virtualization for activities with many participants (50+).
 * Currently displays all participants at once, which may impact performance with large lists.
 */
export const ParticipantsList = () => {
  const { localSignedUp, localParticipated } = useActivityInteractive();
  const participants = [...localSignedUp].sort((a, b) => a.localeCompare(b));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Participants</CardTitle>
        <CardDescription>
          People who signed up and their participation status
        </CardDescription>
      </CardHeader>
      <CardContent>
        {participants.length === 0 ? (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            No one has signed up yet.
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {participants.map((name) => (
              <PersonChip
                key={name}
                name={name}
                participated={localParticipated.includes(name)}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
