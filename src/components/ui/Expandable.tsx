import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface ExpandableProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
  icon?: string;
}

export default function Expandable({ title, children, defaultExpanded = false, icon }: ExpandableProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div
      className="rounded-lg mb-3 overflow-hidden border border-theme"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 bg-secondary text-primary"
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
        }}
      >
        {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        {icon && <span>{icon}</span>}
        {title}
      </button>
      {expanded && (
        <div className="px-4 py-3 text-sm text-secondary">
          {children}
        </div>
      )}
    </div>
  );
}
