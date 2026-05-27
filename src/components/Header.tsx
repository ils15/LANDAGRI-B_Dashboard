import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  Calendar,
  Map,
  BrainCircuit,
  BookOpen,
  Menu,
  X,
} from 'lucide-react';
import ThemeToggle from './ui/ThemeToggle';

type TabId = 'overview' | 'initiative-analysis' | 'agricultural-analysis' | 'predictive' | 'about';

interface TabConfig {
  id: TabId;
  label: string;
  path: string;
  icon: React.ElementType;
}

const tabs: TabConfig[] = [
  { id: 'overview', label: 'Visão Geral', path: '/overview', icon: BarChart3 },
  { id: 'initiative-analysis', label: 'Análise de Iniciativas', path: '/initiative-analysis', icon: Calendar },
  { id: 'agricultural-analysis', label: 'Análise Agrícola', path: '/agricultural-analysis', icon: Map },
  { id: 'predictive', label: 'Simulador Preditivo', path: '/predictive', icon: BrainCircuit },
  { id: 'about', label: 'Referências', path: '/about', icon: BookOpen },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab = tabs.find((t) => location.pathname.startsWith(t.path))?.id ?? 'overview';

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'var(--color-sidebar-bg)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, var(--color-primary) 0%, #1e40af 100%)',
              }}
            >
              <BarChart3 size={18} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <h1
                className="text-sm font-bold tracking-tight leading-none"
                style={{ color: 'var(--color-text-primary)' }}
              >
                LANDAGRI-B
              </h1>
              <p
                className="text-[10px] font-mono mt-0.5"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Dashboard de Análise Territorial
              </p>
            </div>
          </div>

          {/* Desktop Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavigate(tab.path)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  style={{
                    backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'var(--color-surface-hover)';
                      e.currentTarget.style.color = 'var(--color-text-primary)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'var(--color-text-secondary)';
                    }
                  }}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg cursor-pointer"
              style={{
                color: 'var(--color-text-secondary)',
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <div className="px-4 py-3 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNavigate(tab.path)}
                    className="flex items-center gap-3 w-full p-3 rounded-xl text-xs font-semibold cursor-pointer transition-all"
                    style={{
                      backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                    }}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
