import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import DashboardSkeleton from './components/ui/DashboardSkeleton';
import { useInitiatives } from './hooks/useInitiatives';

const OverviewPage = lazy(() => import('./pages/OverviewPage'));
const InitiativeAnalysisPage = lazy(() => import('./pages/InitiativeAnalysisPage'));
const AgriculturalAnalysisPage = lazy(() => import('./pages/AgriculturalAnalysisPage'));
const PredictivePage = lazy(() => import('./pages/PredictivePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

const queryClient = new QueryClient();

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath && redirectPath !== '/') {
      sessionStorage.removeItem('redirectPath');
      navigate(redirectPath, { replace: true });
    }
  }, [navigate]);

  const { isLoading, error } = useInitiatives();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface-alt">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4" style={{ color: 'var(--color-error)' }}>⚠</div>
          <h2 className="text-xl font-bold mb-2 text-fg">Erro ao carregar dados</h2>
          <p className="text-fg-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Header />
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8"
        style={{ maxWidth: '1600px' }}
      >
        <Suspense fallback={<DashboardSkeleton />}>
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/initiative-analysis/*" element={<InitiativeAnalysisPage />} />
            <Route path="/agricultural-analysis/*" element={<AgriculturalAnalysisPage />} />
            <Route path="/predictive" element={<PredictivePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </main>

      <footer className="border-t border-border py-6 mt-12 text-center text-xs text-fg-muted bg-surface-alt">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1600px' }}>
          <p>© 2026 LANDAGRI-B Dashboard — Dados: MapBiomas & IBGE</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter basename="/LANDAGRI-B_Dashboard">
              <AppContent />
            </BrowserRouter>
          </QueryClientProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
