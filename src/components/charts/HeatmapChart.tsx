import BaseChart from './BaseChart';
import type { Data, Layout } from 'plotly.js';

interface HeatmapChartProps {
  z: (number | null)[][];
  x: (string | number)[];
  y: (string | number)[];
  title?: string;
  xlabel?: string;
  ylabel?: string;
  height?: number;
  colorscale?: string | string[][];
  zmin?: number;
  zmax?: number;
  showScale?: boolean;
  layout?: Partial<Layout>;
}

const DEFAULT_HEATMAP_COLORSCALE = [
  [0, '#f7fcf0'],
  [0.25, '#ccebc5'],
  [0.5, '#7bccc4'],
  [0.75, '#2b8cbe'],
  [1, '#084081'],
];

export default function HeatmapChart({
  z, x, y, title, xlabel, ylabel, height = 450,
  colorscale = DEFAULT_HEATMAP_COLORSCALE,
  zmin, zmax, showScale = true, layout: extraLayout,
}: HeatmapChartProps) {
  const data: Data[] = [{
    type: 'heatmap',
    z,
    x,
    y,
    colorscale,
    zmin,
    zmax,
    showscale: showScale,
    hovertemplate: '<b>%{x}</b> / <b>%{y}</b><br>%{z}<extra></extra>',
    colorbar: {
      title: { text: 'Intensity', side: 'right' },
      thickness: 15,
      len: 0.8,
    },
  }];

  const layout: Partial<Layout> = {
    title: title ? { text: title, x: 0.5 } : undefined,
    xaxis: { title: xlabel, tickangle: -45 },
    yaxis: { title: ylabel },
    ...extraLayout,
  };

  return <BaseChart data={data} layout={layout} height={height} />;
}
