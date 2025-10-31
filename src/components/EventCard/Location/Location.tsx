import { MapPin } from 'lucide-react';

interface LocationProps {
  location: string;
  showIcon?: boolean;
  className?: string;
}

export const Location = ({
  location,
  showIcon = true,
  className = '',
}: LocationProps) => {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      {showIcon && <MapPin size={16} className="opacity-90" />}
      {location}
    </span>
  );
};
