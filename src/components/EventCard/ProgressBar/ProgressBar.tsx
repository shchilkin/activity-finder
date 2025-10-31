interface ProgressBarProps {
  percentage: number;
  color?: 'sky' | 'green' | 'blue' | 'purple' | 'red';
  animated?: boolean;
  className?: string;
}

export const ProgressBar = ({
  percentage,
  color = 'sky',
  animated = true,
  className = '',
}: ProgressBarProps) => {
  const colorClasses = {
    sky: 'bg-sky-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
  };

  return (
    <div
      className={`h-2 w-full rounded-full bg-gray-200 dark:bg-slate-700 ${className}`}
    >
      <div
        className={`h-2 rounded-full ${colorClasses[color]} ${animated ? 'transition-all duration-500' : ''}`}
        style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        aria-hidden
      />
    </div>
  );
};
