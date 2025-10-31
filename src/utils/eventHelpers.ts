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

export const getAvailabilityStatus = (
  remaining: number,
  capacity: number,
): 'full' | 'low' | 'limited' | 'plenty' => {
  if (remaining <= 0) return 'full';
  const ratio = remaining / capacity;
  if (ratio <= 0.2) return 'low';
  if (ratio <= 0.5) return 'limited';
  return 'plenty';
};

export const calculatePercentage = (numerator: number, denominator: number) => {
  if (denominator === 0) return 0;
  return Math.min(
    100,
    Math.max(0, Math.round((numerator / denominator) * 100)),
  );
};
