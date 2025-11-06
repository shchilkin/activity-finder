'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Activity } from '@/schemas/activity';

interface ActivityInteractiveContextType {
  userName: string;
  setUserName: (name: string) => void;
  localSignedUp: string[];
  localParticipated: string[];
  isSignedUp: boolean;
  hasParticipated: boolean;
  isFull: boolean;
  handleSignupToggle: () => void;
  handleMarkParticipated: () => void;
  activity: Activity;
}

const ActivityInteractiveContext = createContext<
  ActivityInteractiveContextType | undefined
>(undefined);

export function ActivityInteractiveProvider({
  activity,
  children,
}: {
  activity: Activity;
  children: ReactNode;
}) {
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
      setLocalSignedUp((prev) => prev.filter((name) => name !== userName));
      setLocalParticipated((prev) => prev.filter((name) => name !== userName));
    } else if (!isFull) {
      setLocalSignedUp((prev) => [...prev, userName]);
    }
  };

  const handleMarkParticipated = () => {
    if (isSignedUp && !hasParticipated) {
      setLocalParticipated((prev) => [...prev, userName]);
    }
  };

  return (
    <ActivityInteractiveContext.Provider
      value={{
        userName,
        setUserName,
        localSignedUp,
        localParticipated,
        isSignedUp,
        hasParticipated,
        isFull,
        handleSignupToggle,
        handleMarkParticipated,
        activity,
      }}
    >
      {children}
    </ActivityInteractiveContext.Provider>
  );
}

export function useActivityInteractive() {
  const context = useContext(ActivityInteractiveContext);
  if (!context) {
    throw new Error(
      'useActivityInteractive must be used within ActivityInteractiveProvider',
    );
  }
  return context;
}
