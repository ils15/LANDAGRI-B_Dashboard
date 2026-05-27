import { useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import type { ModuleName } from '../types/theme';

interface BreadcrumbsProps {
  category: ModuleName;
  page?: string;
}

export default function Breadcrumbs({ category, page }: BreadcrumbsProps) {
  const location = useLocation();

  if (!category) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <div
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm"
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border-light)',
        }}
      >
        {/* Desktop: Home icon */}
        <Home
          size={14}
          className="hidden sm:block"
          style={{ color: 'var(--color-text-muted)' }}
        />
        <span
          className="hidden sm:inline"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Dashboard
        </span>
        <ChevronRight
          size={12}
          className="hidden sm:block"
          style={{ color: 'var(--color-text-muted)' }}
        />

        {/* Category — always visible */}
        <span
          className={page ? '' : 'font-semibold'}
          style={{
            color: page
              ? 'var(--color-text-secondary)'
              : 'var(--color-primary)',
          }}
        >
          {category}
        </span>

        {/* Page (desktop always, mobile only when present) */}
        {page && (
          <>
            <ChevronRight
              size={12}
              style={{ color: 'var(--color-text-muted)' }}
            />
            <span
              className="font-semibold truncate max-w-[200px]"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {page}
            </span>
          </>
        )}

        {/* Current route path (mobile only) */}
        <span
          className="sm:hidden ml-auto text-xs truncate max-w-[120px]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {location.pathname.split('/').filter(Boolean).pop()}
        </span>
      </div>
    </nav>
  );
}
