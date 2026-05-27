interface MetricCardProps {
  icon: string;
  label: string;
  value: string | number;
  help?: string;
  variant?: 'accuracy' | 'resolution' | 'classes' | 'frequency';
  className?: string;
}

export default function MetricCard({ icon, label, value, help, variant = 'accuracy', className = '' }: MetricCardProps) {
  return (
    <div
      data-testid="metric-card"
      className={`rounded-xl p-4 flex flex-col items-center min-h-[120px] shadow-sm hover:scale-105 transition-all duration-300 ${className}`}
      style={{
        background: `var(--gradient-${variant})`,
      }}
    >
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-0.5">{label}</div>
      <div className="text-2xl font-bold text-slate-800 dark:text-white">{value}</div>
      {help && <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 text-center">{help}</div>}
    </div>
  );
}
