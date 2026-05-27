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
    <div className="border border-slate-200 rounded-lg mb-3 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 
          text-sm font-medium text-slate-700 transition-colors duration-200"
      >
        {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        {icon && <span>{icon}</span>}
        {title}
      </button>
      {expanded && (
        <div className="px-4 py-3 text-sm text-slate-600">
          {children}
        </div>
      )}
    </div>
  );
}
