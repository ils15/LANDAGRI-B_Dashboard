import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from './layouts/DashboardLayout';
import OverviewPage from './pages/OverviewPage';
import InitiativeAnalysisPage from './pages/InitiativeAnalysisPage';
import AgriculturalAnalysisPage from './pages/AgriculturalAnalysisPage';
import AboutPage from './pages/AboutPage';
import { useInitiatives } from './hooks/useInitiatives';

const queryClient = new QueryClient();

function AppContent() {
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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/LANDAGRI-B_Dashboard">
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
