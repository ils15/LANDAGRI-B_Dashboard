interface MetricCardProps {
  icon: string;
  label: string;
  value: string | number;
  help?: string;
  variant?: 'accuracy' | 'resolution' | 'classes' | 'frequency';
  className?: string;
}

const GRADIENTS = {
  accuracy: 'from-yellow-100 to-amber-200',
  resolution: 'from-emerald-100 to-emerald-300',
  classes: 'from-pink-100 to-pink-300',
  frequency: 'from-sky-100 to-sky-300',
};

export default function MetricCard({ icon, label, value, help, variant = 'accuracy', className = '' }: MetricCardProps) {
  return (
    <div
      className={`rounded-xl p-4 flex flex-col items-center min-h-[120px] shadow-sm
        bg-gradient-to-br ${GRADIENTS[variant]} ${className}`}
    >
      <div className="text-3xl mb-1">{icon}</div>
      <div className="text-sm font-semibold text-slate-600 mb-0.5">{label}</div>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
      {help && <div className="text-xs text-slate-500 mt-1 text-center">{help}</div>}
    </div>
  );
}
