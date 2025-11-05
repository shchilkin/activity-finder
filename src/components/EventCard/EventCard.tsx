'use client';

import { motion } from 'motion/react';
import { Activity } from '@/types/activity';
import { AvailabilityBadge } from './AvailabilityBadge';
import { DateTime } from './DateTime';
import { Location } from './Location';

export const EventCard = ({
  title,
  date,
  time,
  location,
  capacity,
  signedUp,
}: Activity) => {
  const remaining = capacity - signedUp.length;

  return (
    <motion.div
      tabIndex={0}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="rounded-2xl border border-gray-300 bg-white p-4 dark:border-slate-600 dark:bg-slate-800"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-1 flex items-center justify-between gap-2">
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

      {/* Hover focus ring */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-sky-400/0 transition group-hover:ring-2 group-hover:ring-sky-400/30" />
    </motion.div>
  );
};
