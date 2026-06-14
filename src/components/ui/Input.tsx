import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  className,
  label,
  icon,
  error,
  id,
  ...props
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && <label htmlFor={id} className="text-sm font-medium text-gray-400">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>}
        <input
          id={id}
          className={cn(
            'w-full bg-secondary border border-white/10 rounded-xl py-3 pr-4 focus:border-primary transition-all outline-none text-sm text-white placeholder:text-gray-600',
            icon ? 'pl-12' : 'pl-4',
            error ? 'border-red-500/50 focus:border-red-500' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
