'use client';

import { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import type { Activity } from '@/schemas/activity';
import { ParticipantsList } from './ParticipantsList';

interface ActivityStatusProps {
  activity: Activity;
}

export function ActivityStatusSection({ activity }: ActivityStatusProps) {
  const [userName, setUserName] = useState('You');
  const [localSignedUp, setLocalSignedUp] = useState<string[]>(
    activity.signedUp,
  );
  const [localParticipated, setLocalParticipated] = useState<string[]>(
    activity.participated,
  );

  const spotsTaken = localSignedUp.length;
  const isFull = spotsTaken >= activity.capacity;
  const isSignedUp = localSignedUp.includes(userName);
  const hasParticipated = localParticipated.includes(userName);

  const handleSignupToggle = () => {
    if (isSignedUp) {
      // Cancel signup
      setLocalSignedUp((prev) => prev.filter((name) => name !== userName));
      setLocalParticipated((prev) => prev.filter((name) => name !== userName));
    } else if (!isFull) {
      // Sign up
      setLocalSignedUp((prev) => [...prev, userName]);
    }
  };

  const handleMarkParticipated = () => {
    if (isSignedUp && !hasParticipated) {
      setLocalParticipated((prev) => [...prev, userName]);
    }
  };

  return (
    <>
      {/* Status Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-base font-semibold">Your Status</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Signed in as <span className="font-medium">{userName}</span>
          </p>
        </div>
        <div className="space-y-3 px-6 py-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your name"
              className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:focus:border-blue-400"
              aria-label="Your name"
            />
            <button
              onClick={() => setUserName('You')}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Reset
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleSignupToggle}
              disabled={!isSignedUp && isFull}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                isSignedUp
                  ? 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'
                  : isFull
                    ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
              }`}
            >
              {isSignedUp ? (
                <>
                  <X className="size-4" /> Cancel signup
                </>
              ) : isFull ? (
                'Event full'
              ) : (
                'Sign up'
              )}
            </button>

            <button
              onClick={handleMarkParticipated}
              disabled={!isSignedUp || hasParticipated}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <CheckCircle2 className="size-4" /> Mark participated
            </button>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400">
            💡 Try changing your name, signing up, then marking yourself as
            participated to see live updates.
          </p>

          {/* Status indicator */}
          {isSignedUp && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-900/20">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                ✓ You are signed up for this activity
                {hasParticipated && ' and marked as participated'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Participants List - reactive to state changes */}
      <ParticipantsList
        signedUp={localSignedUp}
        participated={localParticipated}
      />
    </>
  );
}
