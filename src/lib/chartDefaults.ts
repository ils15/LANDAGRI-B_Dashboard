import type { Layout } from 'plotly.js';

/**
 * Build standard Plotly layout with modern styling
 */
export function buildStandardLayout(overrides: Partial<Layout> = {}): Partial<Layout> {
  return {
    title: {
      text: '',
      x: 0.5,
      xanchor: 'center',
      font: { size: 16, color: '#1e293b', family: "Inter, system-ui, sans-serif", weight: 600 },
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { family: "Inter, system-ui, sans-serif", size: 12, color: '#475569' },
    legend: {
      orientation: 'h',
      y: -0.2,
      x: 0.5,
      xanchor: 'center',
      bordercolor: 'rgba(148,163,184,0.2)',
      borderwidth: 1,
      bgcolor: 'rgba(255,255,255,0.95)',
      font: { size: 11, color: '#475569' },
      itemclick: 'toggle',
      itemdoubleclick: 'toggleothers',
    },
    margin: { l: 60, r: 20, t: 50, b: 80 },
    hovermode: 'closest',
    hoverlabel: {
      bgcolor: '#1e293b',
      font: { color: '#ffffff', size: 12, family: "Inter, system-ui, sans-serif" },
      bordercolor: 'rgba(0,0,0,0.1)',
      borderwidth: 1,
      namelength: 0,
    },
    xaxis: {
      title: { font: { size: 13, color: '#475569', family: "Inter, system-ui, sans-serif" } },
      tickfont: { size: 11, color: '#94a3b8' },
      gridcolor: 'rgba(148,163,184,0.15)',
      linecolor: 'rgba(148,163,184,0.3)',
      zerolinecolor: 'rgba(148,163,184,0.2)',
      automargin: true,
    },
    yaxis: {
      title: { font: { size: 13, color: '#475569', family: "Inter, system-ui, sans-serif" } },
      tickfont: { size: 11, color: '#94a3b8' },
      gridcolor: 'rgba(148,163,184,0.15)',
      linecolor: 'rgba(148,163,184,0.3)',
      zerolinecolor: 'rgba(148,163,184,0.2)',
      automargin: true,
    },
    separators: '.,',
    ...overrides,
  } as Partial<Layout>;
}

/**
 * Get theme-aware chart layout
 */
export function getChartLayout(theme: 'light' | 'dark' = 'light'): Partial<Layout> {
  const isDark = theme === 'dark';
  return {
    plot_bgcolor: 'transparent',
    paper_bgcolor: 'transparent',
    font: {
      family: "Inter, system-ui, sans-serif",
      size: 12,
      color: isDark ? '#e2e8f0' : '#475569',
    },
    hoverlabel: {
      bgcolor: isDark ? '#334155' : '#1e293b',
      font: { color: '#ffffff', size: 12, family: "Inter, system-ui, sans-serif" },
      bordercolor: isDark ? '#475569' : 'rgba(0,0,0,0.1)',
    },
    xaxis: {
      gridcolor: isDark ? 'rgba(51,65,85,0.5)' : 'rgba(148,163,184,0.15)',
      linecolor: isDark ? '#334155' : 'rgba(148,163,184,0.3)',
      zerolinecolor: isDark ? '#1e293b' : 'rgba(148,163,184,0.2)',
      tickfont: { color: isDark ? '#94a3b8' : '#94a3b8' },
      title: { font: { color: isDark ? '#cbd5e1' : '#475569' } },
    },
    yaxis: {
      gridcolor: isDark ? 'rgba(51,65,85,0.5)' : 'rgba(148,163,184,0.15)',
      linecolor: isDark ? '#334155' : 'rgba(148,163,184,0.3)',
      zerolinecolor: isDark ? '#1e293b' : 'rgba(148,163,184,0.2)',
      tickfont: { color: isDark ? '#94a3b8' : '#94a3b8' },
      title: { font: { color: isDark ? '#cbd5e1' : '#475569' } },
    },
    legend: {
      font: { color: isDark ? '#cbd5e1' : '#475569' },
      bordercolor: isDark ? '#334155' : 'rgba(148,163,184,0.2)',
      bgcolor: isDark ? 'rgba(30,41,59,0.9)' : 'rgba(255,255,255,0.95)',
    },
    colorway: isDark
      ? ['#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa', '#22d3ee', '#a3e635', '#f472b6', '#fb923c', '#818cf8']
      : ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#ec4899', '#f97316', '#6366f1'],
  };
}

export const STANDARD_CONFIG = {
  responsive: true,
  displayModeBar: true,
  displaylogo: false,
  modeBarButtonsToRemove: ['lasso2d', 'select2d', 'autoScale2d', 'toggleSpikelines', 'hoverCompareCartesian', 'hoverClosestCartesian'],
  modeBarButtonsToAdd: ['drawline', 'eraseshape'],
  toImageButtonOptions: {
    format: 'png' as const,
    filename: 'landagri-chart',
    height: 600,
    width: 1000,
    scale: 2,
  },
};

export const HOVER_TEMPLATES = {
  default: '<b>%{x}</b><br>Value: %{y}<extra></extra>',
  percent: '<b>%{label}</b><br>%{percent}<extra></extra>',
  initiative: '<b>%{x}</b><br>%{y}<extra></extra>',
  heatmap: '<b>%{x}</b> / <b>%{y}</b><br>Value: %{z:.2f}<extra></extra>',
  radar: '<b>%{theta}</b><br>%{r:.2f}<extra></extra>',
  scatter: '<b>%{x}</b><br>%{y:.1f}<extra></extra>',
  timeline: '<b>%{customdata[0]}</b><br>Year: %{x}<br>Period: %{customdata[1]}<extra></extra>',
};
