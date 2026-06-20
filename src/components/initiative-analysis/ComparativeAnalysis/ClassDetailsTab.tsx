import { useMemo } from 'react';
import BaseChart from '../../charts/BaseChart';
import type { Data } from 'plotly.js';
import { useDashboardStore } from '../../../stores/dashboardStore';
import { CATEGORICAL_COLORS } from '../../../types/theme';

export default function ClassDetailsTab() {
  const initiatives = useDashboardStore((s) => s.initiatives);

  const chartData = useMemo(() => {
    return initiatives
      .filter((i) => i.Number_of_Classes > 0)
      .map((i) => ({
        name: i.Display_Name,
        totalClasses: i.Number_of_Classes,
        agriClasses: i.Number_of_Agriculture_Classes,
        agriFocus:
          i.Number_of_Classes > 0
            ? Math.round((i.Number_of_Agriculture_Classes / i.Number_of_Classes) * 100)
            : 0,
        capabilities: i.Agricultural_Capabilities || 'N/A',
      }))
      .sort((a, b) => b.totalClasses - a.totalClasses);
  }, [initiatives]);

  if (chartData.length === 0) {
    return <div className="py-8 text-center text-fg-muted">No class data available.</div>;
  }

  // Total classes bar
  const classesBar: Data = {
    x: chartData.map((d) => d.name),
    y: chartData.map((d) => d.totalClasses),
    type: 'bar',
    name: 'Total Classes',
    marker: { color: chartData.map((_, i) => CATEGORICAL_COLORS[i % CATEGORICAL_COLORS.length]) },
    text: chartData.map((d) => String(d.totalClasses)),
    textposition: 'outside',
    hovertemplate: '<b>%{x}</b><br>Total Classes: %{y}<extra></extra>',
  };

  // Agriculture focus pie
  const totalAgri = chartData.reduce((s, d) => s + d.agriClasses, 0);
  const totalNonAgri = chartData.reduce((s, d) => s + d.totalClasses, 0) - totalAgri;
  const focusPie: Data = {
    labels: ['Agriculture Classes', 'Other Classes'],
    values: [totalAgri, totalNonAgri],
    type: 'pie',
    marker: { colors: ['#22c55e', '#94a3b8'] },
    textinfo: 'label+percent',
    hovertemplate: '<b>%{label}</b><br>Count: %{value}<extra></extra>',
  };

  // Capabilities visualization (horizontal bar of distinct capabilities)
  const capCount: Record<string, number> = {};
  chartData.forEach((d) => {
    const cap = d.capabilities || 'Unknown';
    capCount[cap] = (capCount[cap] || 0) + 1;
  });
  const capEntries = Object.entries(capCount)
    .map(([cap, count]) => ({ cap, count }))
    .sort((a, b) => b.count - a.count);

  const capBar: Data = {
    y: capEntries.map((d) => d.cap),
    x: capEntries.map((d) => d.count),
    type: 'bar',
    orientation: 'h',
    marker: { color: CATEGORICAL_COLORS.slice(0, capEntries.length) },
    text: capEntries.map((d) => String(d.count)),
    textposition: 'outside',
    hovertemplate: '<b>%{y}</b><br>Initiatives: %{x}<extra></extra>',
  };

  // Grouped bar: total vs agri
  const groupedTraces: Data[] = [
    {
      name: 'Total Classes',
      x: chartData.map((d) => d.name),
      y: chartData.map((d) => d.totalClasses),
      type: 'bar',
      marker: { color: '#3b82f6' },
      hovertemplate: '<b>%{x}</b><br>Total: %{y}<extra></extra>',
    },
    {
      name: 'Agriculture Classes',
      x: chartData.map((d) => d.name),
      y: chartData.map((d) => d.agriClasses),
      type: 'bar',
      marker: { color: '#22c55e' },
      hovertemplate: '<b>%{x}</b><br>Agriculture: %{y}<extra></extra>',
    },
  ];

  // Stacked bar: agri focus %
  const stackedTraces: Data[] = [
    {
      name: 'Agriculture',
      x: chartData.map((d) => d.name),
      y: chartData.map((d) => d.agriFocus),
      type: 'bar',
      marker: { color: '#22c55e' },
      hovertemplate: '<b>%{x}</b><br>Agriculture Focus: %{y}%<extra></extra>',
    },
    {
      name: 'Other',
      x: chartData.map((d) => d.name),
      y: chartData.map((d) => 100 - d.agriFocus),
      type: 'bar',
      marker: { color: '#e2e8f0' },
      hovertemplate: '<b>%{x}</b><br>Other: %{y}%<extra></extra>',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-base font-semibold text-fg mb-2">Total Classes by Initiative</h3>
        <BaseChart
          data={[classesBar]}
          layout={{
            title: { text: 'Number of Classes by Initiative', x: 0 },
            xaxis: { title: '' },
            yaxis: { title: 'Classes', dtick: 1 },
            height: 400,
            margin: { l: 50, r: 20, t: 40, b: 120 },
          }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-base font-semibold text-fg mb-2">Agriculture vs Other Classes</h3>
          <BaseChart
            data={[focusPie]}
            layout={{
              title: { text: 'Agriculture Focus', x: 0 },
              height: 300,
            }}
          />
        </div>
        <div>
          <h3 className="text-base font-semibold text-fg mb-2">Agricultural Capabilities</h3>
          <BaseChart
            data={[capBar]}
            layout={{
              title: { text: 'Capabilities Distribution', x: 0 },
              xaxis: { title: 'Initiatives', dtick: 1 },
              yaxis: { title: '' },
              height: Math.max(250, capEntries.length * 40),
              margin: { l: 180, r: 40, t: 40, b: 50 },
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-base font-semibold text-fg mb-2">Total vs Agriculture Classes</h3>
          <BaseChart
            data={groupedTraces}
            layout={{
              title: { text: 'Class Comparison', x: 0 },
              xaxis: { title: '' },
              yaxis: { title: 'Count' },
              barmode: 'group',
              height: 350,
              margin: { l: 50, r: 20, t: 40, b: 120 },
            }}
          />
        </div>
        <div>
          <h3 className="text-base font-semibold text-fg mb-2">Agriculture Focus (%)</h3>
          <BaseChart
            data={stackedTraces}
            layout={{
              title: { text: 'Agriculture Focus Percentage', x: 0 },
              xaxis: { title: '' },
              yaxis: { title: 'Percentage (%)' },
              barmode: 'stack',
              height: 350,
              margin: { l: 50, r: 20, t: 40, b: 120 },
            }}
          />
        </div>
      </div>
    </div>
  );
}
