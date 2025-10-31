import { useMemo } from 'react';
import { CalendarClock } from 'lucide-react';
import { formatActivityDateTime } from '@/utils/eventHelpers';

interface DateTimeProps {
  date: string;
  time: string;
  showIcon?: boolean;
  className?: string;
}

export const DateTime = ({
  date,
  time,
  showIcon = true,
  className = '',
}: DateTimeProps) => {
  const { date: formattedDate, time: formattedTime } = useMemo(
    () => formatActivityDateTime(date, time),
    [date, time],
  );

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      {showIcon && <CalendarClock size={16} className="opacity-90" />}
      {formattedDate}{' '}
      <span className="text-gray-500 dark:text-slate-400">at</span>{' '}
      {formattedTime}
    </span>
  );
};
