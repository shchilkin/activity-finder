'use client';

import { Check } from 'lucide-react';
import { useActivityInteractive } from '../ActivityInteractiveContext';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/Card';
import { getInitials, getColorForName } from '@/utils';

interface PersonChipProps {
  name: string;
  participated?: boolean;
}

function PersonChip({ name, participated }: PersonChipProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-gray-200 p-2 dark:border-gray-700 ${
        participated ? 'bg-gray-50 dark:bg-gray-800/50' : ''
      }`}
    >
      <div
        className={`grid size-9 place-items-center rounded-full font-medium ${getColorForName(name)}`}
      >
        {getInitials(name)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
          {name}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {participated ? (
            <span className="inline-flex items-center gap-1">
              <Check className="size-3" /> Participated
            </span>
          ) : (
            'Signed up'
          )}
        </div>
      </div>
    </div>
  );
}

export function ParticipantsList() {
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
}
