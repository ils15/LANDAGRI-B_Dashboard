import BaseChart from './BaseChart';
import type { Data } from 'plotly.js';

interface ScatterChartProps {
  x: (string | number)[];
  y: number[];
  text?: string[];
  xLabel?: string;
  yLabel?: string;
  title?: string;
  color?: string[];
  height?: number;
}

export default function ScatterChart({
  x, y, text, xLabel, yLabel, title, color, height,
}: ScatterChartProps) {
  const trace: Data = {
    x,
    y,
    text,
    type: 'scatter',
    mode: 'markers+text',
    marker: {
      size: 12,
      line: { width: 2, color: 'white' },
      color: color || '#3b82f6',
    },
    textposition: 'top center',
    hovertemplate: '<b>%{text}</b><br>%{x}: %{y}<extra></extra>',
  };

  return (
    <BaseChart
      data={[trace]}
      layout={{
        title: { text: title || '', x: 0 },
        xaxis: { title: xLabel },
        yaxis: { title: yLabel },
        ...(height ? { height } : {}),
      }}
    />
  );
}
