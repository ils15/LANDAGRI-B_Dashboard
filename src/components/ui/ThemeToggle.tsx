import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-lg
        bg-transparent hover:bg-surface-hover
        text-fg-secondary
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500"
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
      title={theme === 'light' ? 'Modo escuro' : 'Modo claro'}
    >
      {theme === 'light' ? (
        <Moon size={18} className="transition-transform duration-300 hover:scale-110" />
      ) : (
        <Sun size={18} className="transition-transform duration-300 hover:scale-110" />
      )}
    </button>
  );
}
