'use client';

import { X, CheckCircle2 } from 'lucide-react';
import { useActivityInteractive } from '../ActivityInteractiveContext';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export function ActivityStatusCard() {
  const {
    userName,
    setUserName,
    isSignedUp,
    hasParticipated,
    isFull,
    handleSignupToggle,
    handleMarkParticipated,
  } = useActivityInteractive();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Status</CardTitle>
        <CardDescription>
          Signed in as <span className="font-medium">{userName}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
            className="flex-1"
          />
          <Button variant="secondary" onClick={() => setUserName('You')}>
            Reset
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleSignupToggle}
            disabled={!isSignedUp && isFull}
            variant={isSignedUp ? 'destructive' : 'default'}
            className={
              isFull && !isSignedUp
                ? 'bg-gray-100 text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-600 dark:hover:bg-gray-800'
                : ''
            }
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
          </Button>

          <Button
            variant="outline"
            onClick={handleMarkParticipated}
            disabled={!isSignedUp || hasParticipated}
          >
            <CheckCircle2 className="size-4" /> Mark participated
          </Button>
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
      </CardContent>
    </Card>
  );
}
