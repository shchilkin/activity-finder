import { mergeClasses } from '@/utils';

export interface ProgressProps {
  value: number;
  max: number;
  className?: string;
}

export function Progress({ value, max, className }: ProgressProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div
      className={mergeClasses(
        'h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700',
        className,
      )}
    >
      <div
        className="h-full rounded-full bg-blue-600 transition-all dark:bg-blue-500"
        style={{ width: `${Math.min(percentage, 100)}%` }}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      />
    </div>
  );
}
