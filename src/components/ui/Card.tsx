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
      className={`rounded-xl border ${hover ? 'hover:-translate-y-0.5' : ''}
        ${paddingMap[padding]}
        transition-all duration-300 ${className}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        boxShadow: 'var(--color-shadow-sm)',
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
