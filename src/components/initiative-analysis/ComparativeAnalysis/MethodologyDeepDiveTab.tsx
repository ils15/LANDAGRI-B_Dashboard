import { useMemo } from 'react';
import BaseChart from '../../charts/BaseChart';
import type { Data } from 'plotly.js';
import { useDashboardStore } from '../../../stores/dashboardStore';
import { CATEGORICAL_COLORS } from '../../../types/theme';

export default function MethodologyDeepDiveTab() {
  const initiatives = useDashboardStore((s) => s.initiatives);

  const { methods, methodData, methodAccuracy } = useMemo(() => {
    const methodMap: Record<string, { count: number; totalAccuracy: number; initiatives: string[] }> = {};

    initiatives.forEach((i) => {
      if (!methodMap[i.Methodology]) {
        methodMap[i.Methodology] = { count: 0, totalAccuracy: 0, initiatives: [] };
      }
      methodMap[i.Methodology].count++;
      if (i.Accuracy > 0) methodMap[i.Methodology].totalAccuracy += i.Accuracy;
      methodMap[i.Methodology].initiatives.push(i.Display_Name);
    });

    const methods = Object.keys(methodMap).sort();
    const methodData = methods.map((m) => ({
      method: m,
      count: methodMap[m].count,
      initiatives: methodMap[m].initiatives,
    }));
    const methodAccuracy = methods.map((m) => ({
      method: m,
      avgAccuracy:
        methodMap[m].count > 0
          ? Math.round((methodMap[m].totalAccuracy / methodMap[m].count) * 10) / 10
          : 0,
    }));

    return { methods, methodData, methodAccuracy };
  }, [initiatives]);

  if (methods.length === 0) {
    return <div className="py-8 text-center text-fg-muted">No methodology data available.</div>;
  }

  // Pie: methodology distribution
  const pieTrace: Data = {
    labels: methodData.map((d) => d.method),
    values: methodData.map((d) => d.count),
    type: 'pie',
    marker: { colors: CATEGORICAL_COLORS.slice(0, methodData.length) },
    textinfo: 'label+percent',
    hovertemplate: '<b>%{label}</b><br>Count: %{value}<extra></extra>',
  };

  // Horizontal bar: accuracy by methodology
  const hbarTrace: Data = {
    y: methodAccuracy.map((d) => d.method),
    x: methodAccuracy.map((d) => d.avgAccuracy),
    type: 'bar',
    orientation: 'h',
    marker: {
      color: methodAccuracy.map((_, i) => CATEGORICAL_COLORS[i % CATEGORICAL_COLORS.length]),
    },
    text: methodAccuracy.map((d) => `${d.avgAccuracy}%`),
    textposition: 'outside',
    hovertemplate: '<b>%{y}</b><br>Avg Accuracy: %{x}%<extra></extra>',
  };

  // Line trend: accuracy trends by methodology over time (simplified - show method vs avg accuracy)
  const lineTraces: Data[] = methodAccuracy.map((d, i) => ({
    name: d.method,
    x: [d.method],
    y: [d.avgAccuracy],
    type: 'scatter',
    mode: 'markers',
    marker: {
      size: 16,
      color: CATEGORICAL_COLORS[i % CATEGORICAL_COLORS.length],
      line: { width: 2, color: 'white' },
    },
    hovertemplate: '<b>%{x}</b><br>Avg Accuracy: %{y:.1f}%<extra></extra>',
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-base font-semibold text-fg mb-2">Methodology Distribution</h3>
          <BaseChart
            data={[pieTrace]}
            layout={{
              title: { text: 'Methodology Breakdown', x: 0 },
              height: 350,
            }}
          />
        </div>
        <div>
          <h3 className="text-base font-semibold text-fg mb-2">Avg Accuracy by Methodology</h3>
          <BaseChart
            data={[hbarTrace]}
            layout={{
              title: { text: 'Accuracy by Methodology Type', x: 0 },
              xaxis: { title: 'Avg Accuracy (%)' },
              yaxis: { title: '' },
              height: Math.max(250, methods.length * 50),
              margin: { l: 150, r: 40, t: 40, b: 50 },
            }}
          />
        </div>
      </div>

      {/* Accuracy comparison */}
      <div>
        <h3 className="text-base font-semibold text-fg mb-2">Methodology Accuracy Trends</h3>
        <p className="text-sm text-fg-secondary mb-3">
          Average overall accuracy achieved by each methodology type.
        </p>
        <BaseChart
          data={lineTraces}
          layout={{
            title: { text: 'Methodology Accuracy Comparison', x: 0 },
            xaxis: { title: 'Methodology' },
            yaxis: { title: 'Avg Accuracy (%)', range: [0, 105] },
            height: 400,
            showlegend: true,
          }}
        />
      </div>

      {/* Summary table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-2 text-left font-semibold text-fg-secondary bg-surface-alt">Methodology</th>
              <th className="px-4 py-2 text-right font-semibold text-fg-secondary bg-surface-alt">Count</th>
              <th className="px-4 py-2 text-right font-semibold text-fg-secondary bg-surface-alt">Avg Accuracy</th>
            </tr>
          </thead>
          <tbody>
            {methodData.map((d, idx) => {
              const acc = methodAccuracy.find((a) => a.method === d.method);
              return (
                <tr key={d.method} className={`border-b border-border ${idx % 2 === 0 ? 'bg-surface' : 'bg-surface-alt'}`}>
                  <td className="px-4 py-2 text-fg">{d.method}</td>
                  <td className="px-4 py-2 text-right text-fg">{d.count}</td>
                  <td className="px-4 py-2 text-right text-fg">{acc?.avgAccuracy ?? '-'}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
