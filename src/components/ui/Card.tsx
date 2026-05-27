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
      className={`bg-white rounded-xl border border-slate-200/60 shadow-sm
        ${hover ? 'hover:shadow-md hover:-translate-y-0.5' : ''}
        ${paddingMap[padding]}
        transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
