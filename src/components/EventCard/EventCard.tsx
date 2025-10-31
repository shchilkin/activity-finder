'use client';

import { Users, Ticket } from 'lucide-react';
import { motion } from 'motion/react';
import { Activity } from '@/types/activity';
import { calculatePercentage } from '@/utils/eventHelpers';
import { AvailabilityBadge } from './AvailabilityBadge';
import { ProgressBar } from './ProgressBar';
import { DateTime } from './DateTime';
import { Location } from './Location';

export const EventCard = ({
  title,
  date,
  time,
  location,
  capacity,
  signedUp,
  participated,
}: Activity) => {
  const remaining = capacity - signedUp.length;
  const fillPct = calculatePercentage(signedUp.length, capacity);
  const participatedPct =
    signedUp.length > 0
      ? Math.round((participated.length / signedUp.length) * 100)
      : 0;

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 dark:border-slate-800 dark:bg-slate-900/70 dark:hover:shadow-black/20"
      role="button"
      tabIndex={0}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1 inline-flex items-center gap-2">
            <span className="truncate text-lg font-semibold tracking-tight text-gray-900 dark:text-slate-100">
              {title}
            </span>
          </div>
          <div className="mt-1 flex flex-col gap-1 text-sm text-gray-600 dark:text-slate-300/90">
            <DateTime date={date} time={time} />
            <Location location={location} />
          </div>
        </div>
        <AvailabilityBadge remaining={remaining} capacity={capacity} />
      </div>

      {/* Middle stats */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-gray-700 dark:text-slate-300">
          <Users size={16} className="opacity-90" />
          <span className="tabular-nums">
            {signedUp.length}/{capacity} signed up
          </span>
        </div>
        <div className="text-right text-gray-600 dark:text-slate-400">
          {participatedPct}% participated previously
        </div>
      </div>

      <ProgressBar percentage={fillPct} className="mt-3" />

      {/* Footer actions */}
      <div className="mt-4 flex items-center justify-between">
        <button className="inline-flex items-center gap-2 rounded-xl bg-sky-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-sky-400 focus:ring-2 focus:ring-sky-400 focus:outline-none">
          <Ticket size={16} /> Join
        </button>
        <button className="rounded-xl px-2 py-1 text-sm text-gray-700 transition hover:text-gray-900 dark:text-slate-300 dark:hover:text-white">
          Details
        </button>
      </div>

      {/* Hover focus ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-sky-400/0 transition group-hover:ring-2 group-hover:ring-sky-400/30" />
    </motion.div>
  );
};
