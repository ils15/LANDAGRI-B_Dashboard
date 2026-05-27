import { useMemo } from 'react';
import { useDashboardStore } from '../../stores/dashboardStore';
import Card from '../ui/Card';
import { formatNumber } from '../../lib/normalize';

export default function SummaryCards() {
  const initiatives = useDashboardStore((s) => s.initiatives);

  const metrics = useMemo(() => {
    if (initiatives.length === 0) return null;
    
    const totalInitiatives = initiatives.length;
    const avgAccuracy = initiatives.reduce((sum, i) => sum + i.Accuracy, 0) / totalInitiatives;
    const avgResolution = initiatives.reduce((sum, i) => sum + i.Resolution, 0) / totalInitiatives;
    const totalClasses = initiatives.reduce((sum, i) => sum + i.Number_of_Classes, 0);
    const totalYears = new Set(initiatives.flatMap((i) => i.Available_Years)).size;

    const coverageCounts: Record<string, number> = {};
    initiatives.forEach((i) => {
      coverageCounts[i.Coverage] = (coverageCounts[i.Coverage] || 0) + 1;
    });

    return { totalInitiatives, avgAccuracy, avgResolution, totalClasses, totalYears, coverageCounts };
  }, [initiatives]);

  if (!metrics) return null;

  const { totalInitiatives, avgAccuracy, avgResolution, totalClasses, totalYears, coverageCounts } = metrics;

  return (
    <div className="space-y-6">
      {/* Coverage distribution cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(coverageCounts).map(([coverage, count]) => (
          <Card key={coverage} padding="sm">
            <div className="text-center">
              <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">{coverage}</div>
              <div className="text-2xl font-bold text-slate-800 mt-1">{count}</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {((count / totalInitiatives) * 100).toFixed(0)}% of total
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Performance metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-xs font-medium text-slate-500">Avg Accuracy</div>
            <div className="text-xl font-bold text-slate-800">{avgAccuracy.toFixed(1)}%</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl mb-1">🌌</div>
            <div className="text-xs font-medium text-slate-500">Avg Resolution</div>
            <div className="text-xl font-bold text-slate-800">{avgResolution.toFixed(0)}m</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl mb-1">🏷️</div>
            <div className="text-xs font-medium text-slate-500">Total Classes</div>
            <div className="text-xl font-bold text-slate-800">{formatNumber(totalClasses)}</div>
          </div>
        </Card>
        <Card padding="sm">
          <div className="text-center">
            <div className="text-2xl mb-1">📅</div>
            <div className="text-xs font-medium text-slate-500">Temporal Coverage</div>
            <div className="text-xl font-bold text-slate-800">{totalYears} years</div>
          </div>
        </Card>
      </div>
    </div>
  );
}
