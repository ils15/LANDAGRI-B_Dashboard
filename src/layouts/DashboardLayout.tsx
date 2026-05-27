import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';
import PageTransition from '../components/PageTransition';
import { MENU_STRUCTURE } from '../types/theme';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Determine active category and page from URL
  const activeCategory = MENU_STRUCTURE.find((cat) =>
    cat.pages.some((p) => location.pathname.startsWith(p.path)),
  );
  const activePage = activeCategory?.pages.find((p) =>
    location.pathname.startsWith(p.path),
  );

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Mobile menu button (hamburger) */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-4 left-4 z-20 lg:hidden flex items-center justify-center w-10 h-10 rounded-lg shadow-md"
        style={{
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text-primary)',
        }}
        aria-label="Abrir menu"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-auto">
        {/* Breadcrumb */}
        {activeCategory && (
          <Breadcrumbs
            category={activeCategory.label}
            page={activePage?.label}
          />
        )}

        {/* Page content with padding for mobile menu button */}
        <div className="pt-12 lg:pt-0 w-full flex justify-center">
          <div className="w-full" style={{ maxWidth: '1600px', paddingLeft: 'clamp(0.5rem, 2vw, 2rem)', paddingRight: 'clamp(0.5rem, 2vw, 2rem)' }}>
            <PageTransition>
              <Outlet />
            </PageTransition>
          </div>
        </div>
      </main>
    </div>
  );
}
