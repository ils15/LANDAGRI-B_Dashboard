import BaseChart from './BaseChart';
import type { Data } from 'plotly.js';

interface AreaSeries {
  name: string;
  x: (string | number)[];
  y: number[];
  color?: string;
}

interface StackedAreaChartProps {
  series: AreaSeries[];
  xLabel?: string;
  yLabel?: string;
  title?: string;
  height?: number;
  hovermode?: string;
}

export default function StackedAreaChart({
  series, xLabel, yLabel, title, height, hovermode = 'x unified',
}: StackedAreaChartProps) {
  const traces: Data[] = series.map((s) => ({
    name: s.name,
    x: s.x,
    y: s.y,
    type: 'scatter',
    mode: 'lines',
    stackgroup: 'one',
    line: { color: s.color, width: 1 },
    fillcolor: s.color,
    hovertemplate: '%{y}<extra></extra>',
  }));

  return (
    <BaseChart
      data={traces}
      layout={{
        title: { text: title || '', x: 0 },
        xaxis: { title: { text: xLabel } },
        yaxis: { title: { text: yLabel } },
        hovermode,
        ...(height ? { height } : {}),
      }}
    />
  );
}
