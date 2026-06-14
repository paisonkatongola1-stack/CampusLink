import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  hoverable = true,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'glass rounded-3xl border border-white/10 overflow-hidden transition-all duration-300',
        hoverable ? 'hover:border-primary/30 hover:translate-y-[-2px]' : '',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
