import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import ModuleHeader from '../layouts/ModuleHeader';
import TemporalPage from '../components/initiative-analysis/TemporalAnalysis/TemporalPage';
import ComparativePage from '../components/initiative-analysis/ComparativeAnalysis/ComparativePage';
import DetailedPage from '../components/initiative-analysis/DetailedAnalysis/DetailedPage';

export default function InitiativeAnalysisPage() {
  const location = useLocation();

  const subPages = [
    { path: 'temporal', label: '⏳ Temporal Analysis' },
    { path: 'comparative', label: '🔠 Comparative Analysis' },
    { path: 'detailed', label: '◌ Detailed Analysis' },
  ];

  return (
    <div>
      <ModuleHeader
        moduleName="Initiative Analysis"
        title="🏞 Initiative Analysis"
        subtitle="Comprehensive spatio-temporal analysis of thirteen Land Use and Land Cover (LULC) initiatives."
      />
      <p className="mt-2 text-base md:text-lg italic text-center" style={{ color: '#64748b' }}>
        Reference: {' '}
        <a href="https://doi.org/10.3390/rs17132324" target="_blank" rel="noopener noreferrer" style={{ color: '#80400B', textDecoration: 'underline', fontWeight: 600 }}>
          Santos et al. (2025).
        </a>
      </p>

      {/* Sub-page navigation tabs */}
      <div className="flex border-b border-slate-200 mb-6 overflow-x-auto">
        {subPages.map((tab) => {
          const isActive = location.pathname.includes(tab.path);
          return (
            <Link
              key={tab.path}
              to={`/initiative-analysis/${tab.path}`}
              className="px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all duration-200"
              style={{
                borderColor: isActive ? '#80400B' : 'transparent',
                color: isActive ? '#80400B' : '#64748b',
              }}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>

      <Routes>
        <Route index element={<Navigate to="temporal" replace />} />
        <Route path="temporal" element={<TemporalPage />} />
        <Route path="comparative" element={<ComparativePage />} />
        <Route path="detailed" element={<DetailedPage />} />
      </Routes>
    </div>
  );
}
