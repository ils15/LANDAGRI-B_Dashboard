import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const finalLayout = useStandardLayout
    ? buildStandardLayout({ ...layout, height })
    : { ...layout, height };

  useEffect(() => {
    if (containerRef.current) {
      Plotly.react(containerRef.current, data, finalLayout, {
        ...STANDARD_CONFIG,
        ...config,
      });
    }
    return () => {
      if (containerRef.current) {
        Plotly.purge(containerRef.current);
      }
    };
  }, [data, finalLayout, config]);

  return (
    <div
      className="w-full rounded-xl p-3 bg-surface border border-theme"
    >
      <div
        ref={containerRef}
        className={`w-full ${className}`}
        style={{ width: '100%', height: '100%', minHeight: '350px' }}
      />
    </div>
  );
}
