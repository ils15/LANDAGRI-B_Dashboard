import BaseChart from './BaseChart';
import type { Data, Layout } from 'plotly.js';
import { CATEGORICAL_COLORS } from '../../types/theme';

interface BarChartProps {
  x: (string | number)[];
  y: (number | null)[];
  name?: string;
  title?: string;
  xlabel?: string;
  ylabel?: string;
  color?: string;
  height?: number;
  orientation?: 'v' | 'h';
  showLegend?: boolean;
  layout?: Partial<Layout>;
}

export default function BarChart({
  x, y, name = '', title, xlabel, ylabel,
  color = CATEGORICAL_COLORS[0], height = 400,
  orientation = 'v', showLegend = false,
  layout: extraLayout,
}: BarChartProps) {
  const data: Data[] = [{
    type: 'bar',
    x: orientation === 'v' ? x : y,
    y: orientation === 'v' ? y : x,
    name,
    marker: { color, line: { color: '#fff', width: 1 } },
    hovertemplate: orientation === 'v'
      ? '<b>%{x}</b><br>%{y:,.1f}<extra></extra>'
      : '<b>%{y}</b><br>%{x:,.1f}<extra></extra>',
  }];

  const layout: Partial<Layout> = {
    title: title ? { text: title, x: 0.5 } : undefined,
    xaxis: { title: xlabel, tickangle: orientation === 'v' ? -45 : 0 },
    yaxis: { title: ylabel },
    showlegend: showLegend,
    ...extraLayout,
  };

  return <BaseChart data={data} layout={layout} height={height} />;
}
