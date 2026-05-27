import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import { useInitiatives } from './hooks/useInitiatives';

const OverviewPage = lazy(() => import('./pages/OverviewPage'));
const InitiativeAnalysisPage = lazy(() => import('./pages/InitiativeAnalysisPage'));
const AgriculturalAnalysisPage = lazy(() => import('./pages/AgriculturalAnalysisPage'));
const PredictivePage = lazy(() => import('./pages/PredictivePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));

const queryClient = new QueryClient();

function LoadingSpinner({ message = 'Carregando...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 mx-auto mb-3" style={{ borderColor: 'var(--color-primary)' }} />
        <p className="text-sm text-muted">{message}</p>
      </div>
    </div>
  );
}

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
    return <LoadingSpinner message="Carregando dados do dashboard..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-secondary">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4" style={{ color: 'var(--color-error)' }}>⚠</div>
          <h2 className="text-xl font-bold mb-2 text-primary">Erro ao carregar dados</h2>
          <p className="text-secondary">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8"
        style={{ maxWidth: '1600px' }}
      >
        <Suspense fallback={<LoadingSpinner />}>
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

      <footer className="border-t border-theme py-6 mt-12 text-center text-xs text-muted bg-secondary">
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
