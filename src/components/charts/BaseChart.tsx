import Plot from 'react-plotly.js';
import type { Data, Layout, Config } from 'plotly.js';
import { buildStandardLayout, STANDARD_CONFIG } from '../../lib/chartDefaults';

interface BaseChartProps {
  data: Data[];
  layout?: Partial<Layout>;
  config?: Partial<Config>;
  height?: number;
  useStandardLayout?: boolean;
  className?: string;
}

export default function BaseChart({
  data,
  layout,
  config,
  height = 400,
  useStandardLayout = true,
  className = '',
}: BaseChartProps) {
  const finalLayout = useStandardLayout
    ? buildStandardLayout({ ...layout, height })
    : { ...layout, height };

  return (
    <div className={`w-full ${className}`}>
      <Plot
        data={data}
        layout={finalLayout}
        config={{ ...STANDARD_CONFIG, ...config }}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  );
}
