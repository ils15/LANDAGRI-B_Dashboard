import BaseChart from './BaseChart';
import type { Data } from 'plotly.js';

interface RadarSeries {
  name: string;
  r: number[];
  color?: string;
  fill?: string;
}

interface RadarChartProps {
  theta: string[];
  series: RadarSeries[];
  title?: string;
  height?: number;
  showlegend?: boolean;
}

export default function RadarChart({
  theta, series, title, height, showlegend = true,
}: RadarChartProps) {
  const traces: Data[] = series.map((s) => ({
    name: s.name,
    r: s.r,
    theta,
    type: 'scatterpolar',
    fill: s.fill || 'toself',
    fillcolor: s.color ? `${s.color}44` : undefined,
    line: { color: s.color, width: 2 },
    marker: { color: s.color, size: 6 },
    hovertemplate: '<b>%{theta}</b><br>%{r:.2f}<extra></extra>',
  }));

  return (
    <BaseChart
      data={traces}
      layout={{
        title: { text: title || '', x: 0 },
        polar: {
          radialaxis: {
            visible: true,
            range: [0, 1],
          },
        },
        showlegend,
        ...(height ? { height } : {}),
      }}
    />
  );
}
