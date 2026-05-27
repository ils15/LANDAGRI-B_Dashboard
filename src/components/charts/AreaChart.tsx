import BaseChart from './BaseChart';
import type { Data } from 'plotly.js';

interface AreaChartProps {
  x: (string | number)[];
  y: number[];
  name?: string;
  xLabel?: string;
  yLabel?: string;
  title?: string;
  color?: string;
  height?: number;
  fill?: string;
  showlegend?: boolean;
}

export default function AreaChart({
  x, y, name, xLabel, yLabel, title, color, height,
  fill = 'tozeroy', showlegend = true,
}: AreaChartProps) {
  const trace: Data = {
    name,
    x,
    y,
    type: 'scatter',
    mode: 'lines+markers',
    marker: { color, size: 6 },
    line: { color, width: 2 },
    fill,
    fillcolor: color ? `${color}33` : 'rgba(59,130,246,0.2)',
  };

  return (
    <BaseChart
      data={[trace]}
      layout={{
        title: { text: title || '', x: 0 },
        xaxis: { title: xLabel },
        yaxis: { title: yLabel },
        showlegend,
        ...(height ? { height } : {}),
      }}
    />
  );
}
