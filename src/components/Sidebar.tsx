import { useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useEffect, useCallback } from 'react';
import { MENU_STRUCTURE, type ModuleName } from '../types/theme';
import ThemeToggle from './ui/ThemeToggle';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  // Close on route change (mobile only)
  useEffect(() => {
    if (window.innerWidth < 1024) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Body scroll lock when drawer open on mobile
  useEffect(() => {
    if (open && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNavigate = useCallback(
    (path: string) => {
      navigate(path);
      if (window.innerWidth < 1024) onClose();
    },
    [navigate, onClose],
  );

  return (
    <>
      {/* Overlay backdrop (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
          style={{ backgroundColor: 'var(--color-overlay)' }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`fixed lg:static z-40 h-screen overflow-y-auto transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{
          width: 'var(--sidebar-width)',
          backgroundColor: 'var(--color-sidebar-bg)',
          borderRight: '1px solid var(--color-border)',
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-5 border-b"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <div>
            <h1 className="text-lg font-bold" style={{ color: 'var(--color-fg)' }}>
              LANDAGRI-B
            </h1>
            <p className="text-xs" style={{ color: 'var(--color-fg-muted)' }}>
              Dashboard
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Close button — visible only on mobile */}
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-lg hover:bg-surface-hover transition-colors"
              aria-label="Fechar menu"
            >
              <X size={18} style={{ color: 'var(--color-fg-secondary)' }} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {MENU_STRUCTURE.map((category) => {
            const isActive = category.pages.some((p) =>
              location.pathname.startsWith(p.path),
            );
            return (
              <div key={category.label}>
                {/* Category header */}
                <button
                  onClick={() => handleNavigate(category.pages[0].path)}
                  className="w-full flex items-center gap-2.5 px-3 py-3 rounded-lg text-sm font-semibold transition-all duration-200 min-h-[44px]"
                  style={{
                    backgroundColor: isActive
                      ? 'var(--color-sidebar-active-bg)'
                      : 'transparent',
                    color: isActive
                      ? 'var(--color-sidebar-text-active)'
                      : 'var(--color-sidebar-text)',
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className="text-lg">{getCategoryIcon(category.label)}</span>
                  {category.label}
                </button>

                {/* Sub-pages */}
                <div className="ml-2 mt-0.5 space-y-0.5">
                  {category.pages.map((page) => (
                    <button
                      key={page.label}
                      onClick={() => handleNavigate(page.path)}
                      className="w-full text-left px-4 py-2.5 pl-8 rounded-md text-sm transition-all duration-200 min-h-[40px]"
                      style={{
                        backgroundColor:
                          location.pathname === page.path
                            ? 'var(--color-primary-light)'
                            : 'transparent',
                        color:
                          location.pathname === page.path
                            ? 'var(--color-sidebar-text-active)'
                            : 'var(--color-sidebar-text)',
                        borderLeft:
                          location.pathname === page.path
                            ? '3px solid var(--color-primary)'
                            : '3px solid transparent',
                      }}
                      aria-current={
                        location.pathname === page.path ? 'page' : undefined
                      }
                    >
                      {page.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

function getCategoryIcon(label: ModuleName): string {
  const icons: Record<ModuleName, string> = {
    Overview: '🔎',
    'Initiative Analysis': '🏞',
    'Agricultural Analysis': '🌾',
    About: 'ℹ️',
  };
  return icons[label] || '📄';
}
