import { getAvailabilityStatus } from '@/utils/eventHelpers';

interface AvailabilityBadgeProps {
  remaining: number;
  capacity: number;
  className?: string;
}

const redStyle =
  'bg-red-100 text-red-700 ring-1 ring-red-700 dark:bg-red-600 dark:text-red-300 dark:ring-red-300';
const yellowStyle =
  'bg-amber-100 text-amber-700 ring-1 ring-amber-700 dark:bg-amber-500 dark:text-amber-300 dark:ring-amber-400';
const greenStyle =
  'bg-emerald-100/50 text-emerald-500 ring-1 ring-emerald-500 dark:bg-emerald-600 dark:text-emerald-300 dark:ring-emerald-500';

const statusStyles = {
  low: redStyle,
  limited: yellowStyle,
  plenty: greenStyle,
};

export const AvailabilityBadge = ({
  remaining,
  capacity,
  className = '',
}: AvailabilityBadgeProps) => {
  const status = getAvailabilityStatus(remaining, capacity);

  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[status]} ${className}`}
    >
      {remaining > 0
        ? `${remaining} spot${remaining === 1 ? '' : 's'} left`
        : 'Full'}
    </span>
  );
};
