export const formatActivityDateTime = (date: string, time: string) => {
  const dateObj = new Date(`${date}T${time}:00`);

  // Use explicit locale to ensure consistency between server and client
  return {
    date: dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }),
    time: dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Use 24-hour format for consistency
    }),
  };
};

export const getAvailabilityBadgeStyles = (
  remaining: number,
  capacity: number,
) => {
  const ratio = remaining / capacity;
  if (remaining <= 0)
    return 'bg-red-600/20 text-red-300 ring-1 ring-red-500/40';
  if (ratio <= 0.2) return 'bg-red-600/20 text-red-300 ring-1 ring-red-500/40';
  if (ratio <= 0.5)
    return 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30';
  return 'bg-emerald-600/20 text-emerald-300 ring-1 ring-emerald-500/30';
};

export const calculatePercentage = (numerator: number, denominator: number) => {
  if (denominator === 0) return 0;
  return Math.min(
    100,
    Math.max(0, Math.round((numerator / denominator) * 100)),
  );
};
