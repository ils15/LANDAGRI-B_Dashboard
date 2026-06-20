import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  title?: string;
}

export default function Card({ children, className = '', padding = 'md', hover = true }: CardProps) {
  const paddingMap = { sm: 'p-4', md: 'p-5', lg: 'p-6' };

  return (
    <div
      className={`rounded-xl border bg-surface border-border shadow-sm ${hover ? 'hover:-translate-y-0.5 hover:shadow-lg' : ''}
        ${paddingMap[padding]}
        transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
