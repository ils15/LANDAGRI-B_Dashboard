import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useDashboardStore } from '../stores/dashboardStore';
import { MENU_STRUCTURE, type ModuleName } from '../types/theme';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { ui, toggleSidebar } = useDashboardStore();

  // Determine active category and page from URL
  const activeCategory = MENU_STRUCTURE.find((cat) =>
    cat.pages.some((p) => location.pathname.startsWith(p.path))
  );
  const activePage = activeCategory?.pages.find((p) => location.pathname.startsWith(p.path));

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile sidebar toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md"
        aria-label="Toggle sidebar"
      >
        {ui.sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`${
          ui.sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed lg:static lg:translate-x-0 z-40 w-[280px] h-screen bg-white border-r border-slate-200 
        overflow-y-auto transition-transform duration-300 ease-in-out shadow-lg lg:shadow-none`}
      >
        {/* Dashboard title */}
        <div className="p-5 border-b border-slate-100">
          <h1 className="text-lg font-bold text-slate-800">LANDAGRI-B</h1>
          <p className="text-xs text-slate-500 mt-0.5">Dashboard</p>
        </div>

        {/* Navigation menu */}
        <nav className="p-3 space-y-1">
          {MENU_STRUCTURE.map((category) => (
            <div key={category.label}>
              {/* Category header */}
              <div
                className={`px-3 py-2.5 rounded-lg text-sm font-semibold cursor-pointer transition-all duration-200
                  flex items-center gap-2.5
                  ${
                    activeCategory?.label === category.label
                      ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                onClick={() => {
                  if (category.pages.length > 0) {
                    navigate(category.pages[0].path);
                  }
                }}
              >
                <span className="text-lg">{getCategoryIcon(category.label)}</span>
                {category.label}
              </div>

              {/* Sub-pages */}
              <div className="ml-2 mt-0.5 space-y-0.5">
                {category.pages.map((page) => (
                  <button
                    key={page.label}
                    onClick={() => navigate(page.path)}
                    className={`w-full text-left px-4 py-2 pl-8 rounded-md text-sm transition-all duration-200
                      flex items-center gap-2 border-l-3
                      ${
                        location.pathname === page.path
                          ? 'bg-blue-50 text-blue-700 font-medium border-l-blue-600'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800 border-l-transparent hover:border-l-slate-300'
                      }`}
                  >
                    {page.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {ui.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 min-w-0 overflow-auto">
        {/* Breadcrumb */}
        {activeCategory && activePage && (
          <div className="flex items-center gap-2 mb-5 px-4 py-2.5 bg-gradient-to-r from-slate-50 to-slate-100 
            rounded-lg border border-slate-200/50 text-sm">
            <span className="text-slate-500">Dashboard</span>
            <span className="text-slate-300">›</span>
            <span className={activePage ? 'text-slate-500' : 'text-blue-700 font-semibold'}>
              {activeCategory.label}
            </span>
            {activePage && (
              <>
                <span className="text-slate-300">›</span>
                <span className="text-blue-700 font-semibold">{activePage.label}</span>
              </>
            )}
          </div>
        )}

        {/* Page content */}
        <Outlet />
      </main>
    </div>
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
