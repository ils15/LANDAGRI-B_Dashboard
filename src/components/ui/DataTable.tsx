import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  format?: (value: unknown) => string;
  sortable?: boolean;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  className?: string;
  searchable?: boolean;
  pageSize?: number;
}

export default function DataTable({ columns, data, className = '', searchable = false, pageSize = 50 }: DataTableProps) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  // Filter
  const filtered = useMemo(() => {
    if (!search) return data;
    return data.filter(row =>
      columns.some(col => {
        const val = row[col.key];
        return val != null && String(val).toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [data, search, columns]);

  // Sort
  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (aVal == null) return 1;
      if (bVal == null) return -1;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDir === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const strA = String(aVal);
      const strB = String(bVal);
      return sortDir === 'asc' ? strA.localeCompare(strB) : strB.localeCompare(strA);
    });
  }, [filtered, sortKey, sortDir]);

  // Paginate
  const paged = useMemo(() => {
    const start = page * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  const totalPages = Math.ceil(sorted.length / pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
    setPage(0);
  };

  return (
    <div className={className}>
      {/* Search */}
      {searchable && (
        <div className="relative mb-3">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none transition-all bg-surface border border-theme text-primary"
          />
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-theme">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-secondary">
              {columns.map(col => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  className="px-4 py-3 text-left font-semibold cursor-pointer select-none whitespace-nowrap transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 text-secondary"
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    {sortKey === col.key &&
                      (sortDir === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-12 text-center text-muted"
                >
                  {search ? 'No results matching your search.' : 'No data available.'}
                </td>
              </tr>
            ) : (
              paged.map((row, idx) => (
                <tr
                  key={idx}
                  className="transition-colors"
                  style={{
                    borderBottom: '1px solid var(--color-border-light)',
                    backgroundColor:
                      idx % 2 === 0 ? 'var(--color-surface)' : 'var(--color-bg-secondary)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = 'var(--color-primary-light)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor =
                      idx % 2 === 0 ? 'var(--color-surface)' : 'var(--color-bg-secondary)';
                  }}
                >
                  {columns.map(col => (
                    <td
                      key={col.key}
                      className="px-4 py-2.5 text-primary"
                    >
                      {col.format ? col.format(row[col.key]) : String(row[col.key] ?? '-')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div
          className="flex items-center justify-between mt-3 text-sm text-secondary"
        >
          <span>{sorted.length} records</span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-3 py-1 rounded transition-colors disabled:opacity-40 bg-secondary"
            >
              Previous
            </button>
            <span className="px-3 py-1">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1 rounded transition-colors disabled:opacity-40 bg-secondary"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
