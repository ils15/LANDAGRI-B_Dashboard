import { useEffect, useRef, useMemo } from 'react';
import Plotly from 'plotly.js-dist-min';
import type { Data, Layout, Config } from 'plotly.js';
import { buildStandardLayout, STANDARD_CONFIG, getChartLayout } from '../../lib/chartDefaults';
import { useTheme } from '../../contexts/ThemeContext';

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
  const { theme } = useTheme();

  const finalLayout = useMemo(() => {
    const base = useStandardLayout
      ? buildStandardLayout({ ...layout, height })
      : { ...layout, height };

    const themeLayout = getChartLayout(theme);

    return {
      ...base,
      ...themeLayout,
      font: {
        ...base.font,
        ...themeLayout.font,
        ...layout?.font,
      },
      xaxis: {
        ...base.xaxis,
        ...themeLayout.xaxis,
        ...layout?.xaxis,
      },
      yaxis: {
        ...base.yaxis,
        ...themeLayout.yaxis,
        ...layout?.yaxis,
      },
      legend: {
        ...base.legend,
        ...themeLayout.legend,
        ...layout?.legend,
      },
    };
  }, [useStandardLayout, layout, height, theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      Plotly.react(container, data, finalLayout, {
        ...STANDARD_CONFIG,
        ...config,
      });
    }
    return () => {
      if (container) {
        Plotly.purge(container);
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
