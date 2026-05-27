import { useMemo } from 'react';
import BaseChart from '../../charts/BaseChart';
import type { Data } from 'plotly.js';
import { useDashboardStore } from '../../../stores/dashboardStore';
import { CATEGORICAL_COLORS } from '../../../types/theme';

export default function MethodologyDistributionTab() {
  const initiatives = useDashboardStore((s) => s.initiatives);

  const { methods, coverageTypes, groupedData } = useMemo(() => {
    const methods = [...new Set(initiatives.map((i) => i.Methodology))].sort();
    const coverages = [...new Set(initiatives.map((i) => i.Coverage))].sort();

    const grouped: Record<string, Record<string, number>> = {};
    methods.forEach((m) => {
      grouped[m] = {};
      coverages.forEach((c) => {
        grouped[m][c] = 0;
      });
    });

    initiatives.forEach((i) => {
      if (grouped[i.Methodology] && grouped[i.Methodology][i.Coverage] !== undefined) {
        grouped[i.Methodology][i.Coverage]++;
      }
    });

    return { methods, coverageTypes: coverages, groupedData: grouped };
  }, [initiatives]);

  if (methods.length === 0) {
    return <div className="py-8 text-center text-slate-400">No methodology data available.</div>;
  }

  const traces: Data[] = coverageTypes.map((cov, idx) => ({
    name: cov,
    x: methods,
    y: methods.map((m) => groupedData[m]?.[cov] || 0),
    type: 'bar',
    marker: { color: CATEGORICAL_COLORS[idx % CATEGORICAL_COLORS.length] },
    hovertemplate: `<b>%{x}</b><br>${cov}: %{y}<extra></extra>`,
  }));

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        Distribution of initiatives by methodology type, grouped by coverage category (Global, Regional, National).
      </p>
      <BaseChart
        data={traces}
        layout={{
          title: { text: 'Methodology × Coverage Distribution', x: 0 },
          xaxis: { title: 'Methodology' },
          yaxis: { title: 'Count', dtick: 1 },
          barmode: 'group',
          height: 400,
        }}
      />
    </div>
  );
}
