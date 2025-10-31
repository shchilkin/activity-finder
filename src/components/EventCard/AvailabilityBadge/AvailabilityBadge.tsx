import { getAvailabilityBadgeStyles } from '@/utils/eventHelpers';

interface AvailabilityBadgeProps {
  remaining: number;
  capacity: number;
  className?: string;
}

export const AvailabilityBadge = ({
  remaining,
  capacity,
  className = '',
}: AvailabilityBadgeProps) => {
  return (
    <span
      className={`shrink-0 rounded-full px-2 py-1 text-xs font-medium ${getAvailabilityBadgeStyles(remaining, capacity)} ${className}`}
    >
      {remaining > 0
        ? `${remaining} spot${remaining === 1 ? '' : 's'} left`
        : 'Full'}
    </span>
  );
};
