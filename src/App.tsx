import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import InitiativeAnalysisPage from './pages/InitiativeAnalysisPage';
import AgriculturalAnalysisPage from './pages/AgriculturalAnalysisPage';
import AboutPage from './pages/AboutPage';
import { useInitiatives } from './hooks/useInitiatives';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient();

function AppContent() {
  const navigate = useNavigate();

  // Restore SPA redirect path stored by 404.html
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath && redirectPath !== '/') {
      sessionStorage.removeItem('redirectPath');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  // Load data on mount
  const { isLoading, error } = useInitiatives();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 text-lg">Carregando dados do dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center max-w-md">
          <div className="text-red-500 text-5xl mb-4">⚠</div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Erro ao carregar dados</h2>
          <p className="text-slate-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/overview" replace />} />
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/initiative-analysis/*" element={<InitiativeAnalysisPage />} />
        <Route path="/agricultural-analysis/*" element={<AgriculturalAnalysisPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/LANDAGRI-B_Dashboard">
          <AppContent />
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
