import { getAvailabilityStatus } from '@/utils/eventHelpers';

interface AvailabilityBadgeProps {
  remaining: number;
  capacity: number;
  className?: string;
}

const statusStyles = {
  full: 'bg-red-100 text-red-700 ring-1 ring-red-200 dark:bg-red-600/20 dark:text-red-300 dark:ring-red-500/40',
  low: 'bg-red-100 text-red-700 ring-1 ring-red-200 dark:bg-red-600/20 dark:text-red-300 dark:ring-red-500/40',
  limited:
    'bg-amber-100 text-amber-700 ring-1 ring-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:ring-amber-400/30',
  plenty:
    'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200 dark:bg-emerald-600/20 dark:text-emerald-300 dark:ring-emerald-500/30',
};

export const AvailabilityBadge = ({
  remaining,
  capacity,
  className = '',
}: AvailabilityBadgeProps) => {
  const status = getAvailabilityStatus(remaining, capacity);

  return (
    <span
      className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status]} ${className}`}
    >
      {remaining > 0
        ? `${remaining} spot${remaining === 1 ? '' : 's'} left`
        : 'Full'}
    </span>
  );
};
