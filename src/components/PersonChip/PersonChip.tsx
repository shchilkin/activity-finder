import { Check } from 'lucide-react';
import { getInitials, getColorForName } from '@/utils';

export interface PersonChipProps {
  /** The person's full name */
  name: string;
  /** Whether the person has participated in the activity */
  participated?: boolean;
  /** Optional color class override. If not provided, color is automatically assigned based on name. */
  colorClass?: string;
}

/**
 * A chip component displaying a person's avatar, name, and participation status.
 */
export const PersonChip = ({
  name,
  participated,
  colorClass,
}: PersonChipProps) => {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-gray-200 p-2 dark:border-gray-700 ${
        participated ? 'bg-gray-50 dark:bg-gray-800/50' : ''
      }`}
    >
      <div
        className={`grid size-9 place-items-center rounded-full font-medium ${colorClass || getColorForName(name)}`}
      >
        {getInitials(name)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
          {name}
        </div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {participated ? (
            <span className="inline-flex items-center gap-1">
              <Check className="size-3" /> Participated
            </span>
          ) : (
            'Signed up'
          )}
        </div>
      </div>
    </div>
  );
};
