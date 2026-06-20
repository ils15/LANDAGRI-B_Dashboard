import { MODULE_THEMES, type ModuleName } from '../types/theme';
import { useTheme } from '../contexts/ThemeContext';

const MODULE_CSS_VAR: Record<ModuleName, string> = {
  Overview: 'overview',
  'Initiative Analysis': 'initiative',
  'Agricultural Analysis': 'agricultural',
  About: 'about',
};

interface ModuleHeaderProps {
  moduleName: ModuleName;
  title: string;
  subtitle: string;
}

export default function ModuleHeader({ moduleName, title, subtitle }: ModuleHeaderProps) {
  const { theme } = useTheme();
  const moduleTheme = MODULE_THEMES[moduleName];

  const headerGradient =
    theme === 'dark'
      ? `var(--color-header-${MODULE_CSS_VAR[moduleName]})`
      : moduleTheme?.headerGradient || 'var(--color-primary)';

  return (
    <div
      className="rounded-xl p-5 mb-6 border border-white/5"
      style={{ background: headerGradient }}
    >
      <h1
        className="text-3xl md:text-4xl font-bold m-0"
        style={{ color: moduleTheme.headerTextColor }}
      >
        {title}
      </h1>
      <p
        className="mt-2 text-base md:text-lg italic"
        style={{ color: moduleTheme.headerSubtitleColor }}
      >{subtitle}</p>
    </div>
  );
}
