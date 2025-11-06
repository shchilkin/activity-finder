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
            {participants.map((name, index) => (
              <PersonChip
                key={index}
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
