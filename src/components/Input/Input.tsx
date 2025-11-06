import { mergeClasses } from '@/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={mergeClasses(
          'flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm ring-blue-500/20 transition-colors outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:placeholder:text-gray-500 dark:focus:border-blue-400',
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
