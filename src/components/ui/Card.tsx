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
      className={`rounded-xl border bg-surface border-theme shadow-[var(--color-shadow-sm)] ${hover ? 'hover:-translate-y-0.5 hover:shadow-card' : ''}
        ${paddingMap[padding]}
        transition-all duration-300 ${className}`}
      style={{
        ...(hover ? { transitionProperty: 'background-color, border-color, box-shadow, transform' } : {}),
      }}
      onMouseEnter={(e) => {
        if (hover) {
          e.currentTarget.style.boxShadow = 'var(--color-shadow)';
        }
      }}
      onMouseLeave={(e) => {
        if (hover) {
          e.currentTarget.style.boxShadow = 'var(--color-shadow-sm)';
        }
      }}
    >
      {children}
    </div>
  );
}
