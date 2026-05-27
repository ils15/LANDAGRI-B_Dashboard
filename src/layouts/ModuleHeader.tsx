import { MODULE_THEMES, type ModuleName } from '../types/theme';

interface ModuleHeaderProps {
  moduleName: ModuleName;
  title: string;
  subtitle: string;
}

export default function ModuleHeader({ moduleName, title, subtitle }: ModuleHeaderProps) {
  const theme = MODULE_THEMES[moduleName];

  return (
    <div
      className="rounded-xl p-5 mb-6 border border-white/5"
      style={{ background: theme.headerGradient }}
    >
      <h1
        className="text-3xl md:text-4xl font-bold m-0"
        style={{ color: theme.headerTextColor }}
      >
        {title}
      </h1>
      <p
        className="mt-2 text-base md:text-lg italic"
        style={{ color: theme.headerSubtitleColor }}
      >{subtitle}</p>
    </div>
  );
}
