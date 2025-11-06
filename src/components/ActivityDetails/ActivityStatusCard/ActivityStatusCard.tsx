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
          {isSignedUp ? (
            <>
              Signed up as <span className="font-medium">{userName}</span>
            </>
          ) : (
            'Not signed up yet'
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isSignedUp && (
          <div>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="What's your name?"
              aria-label="Your name"
            />
          </div>
        )}

        <div
          className={`flex flex-col gap-2 ${!isSignedUp ? 'border-t pt-4 dark:border-gray-700' : ''}`}
        >
          <Button
            onClick={handleSignupToggle}
            disabled={
              (!isSignedUp && isFull) || (!isSignedUp && !userName.trim())
            }
            variant={isSignedUp ? 'destructive' : 'default'}
            className={`w-full ${
              isFull && !isSignedUp
                ? 'bg-gray-100 text-gray-400 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-600 dark:hover:bg-gray-800'
                : ''
            }`}
          >
            {isSignedUp ? (
              <>
                <X className="size-4" /> Cancel my signup
              </>
            ) : isFull ? (
              'Event full'
            ) : (
              'Sign up for This Activity'
            )}
          </Button>

          {isSignedUp && (
            <Button
              variant="outline"
              onClick={handleMarkParticipated}
              className="w-full"
            >
              <CheckCircle2 className="size-4" />
              {hasParticipated
                ? "I haven't attended before"
                : 'I have previously attended'}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
