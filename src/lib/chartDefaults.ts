import type { Layout, Template } from 'plotly.js';

/**
 * Build standard Plotly layout — port of apply_standard_layout / build_standard_layout
 */
export function buildStandardLayout(overrides: Partial<Layout> = {}): Partial<Layout> {
  return {
    title: {
      text: '',
      x: 0.5,
      xanchor: 'center',
      font: { size: 15, color: '#2C3E50', family: 'Arial, sans-serif' },
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { family: 'Arial, sans-serif', size: 12, color: '#2C3E50' },
    legend: {
      orientation: 'v',
      x: 1.02,
      y: 1,
      bordercolor: 'rgba(44,62,80,0.1)',
      borderwidth: 1,
      bgcolor: 'rgba(255,255,255,0.9)',
    },
    margin: { l: 80, r: 40, t: 60, b: 80 },
    hovermode: 'closest',
    ...overrides,
  } as Partial<Layout>;
}

/**
 * Modern chart theme template — port of ModernThemes
 */
export const MODERN_TEMPLATE: Partial<Template> = {
  layout: {
    font: {
      family: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      size: 14,
      color: '#1f2937',
    },
    title: {
      font: {
        family: "Inter, system-ui, sans-serif",
        size: 20,
        color: '#111827',
      },
    },
    xaxis: {
      title: { font: { size: 14, color: '#374151' } },
      tickfont: { size: 12, color: '#6b7280' },
      gridcolor: '#f3f4f6',
      linecolor: '#e5e7eb',
      zerolinecolor: '#e5e7eb',
    },
    yaxis: {
      title: { font: { size: 14, color: '#374151' } },
      tickfont: { size: 12, color: '#6b7280' },
      gridcolor: '#f3f4f6',
      linecolor: '#e5e7eb',
      zerolinecolor: '#e5e7eb',
    },
    colorway: [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
      '#06b6d4', '#84cc16', '#ec4899', '#f97316', '#6366f1',
      '#22c55e', '#14b8a6',
    ],
  } as unknown as Partial<Template>['layout'],
};

/**
 * Standard Plotly config
 */
export const STANDARD_CONFIG = {
  responsive: true,
  displayModeBar: false,
  displaylogo: false,
};

/**
 * Hover label templates for various chart types
 */
export const HOVER_TEMPLATES = {
  default: '<b>%{x}</b><br>Value: %{y}<extra></extra>',
  percent: '<b>%{label}</b><br>%{percent}<extra></extra>',
  initiative: '<b>%{x}</b><br>%{y}<extra></extra>',
  heatmap: '<b>%{x}</b> / <b>%{y}</b><br>Value: %{z}<extra></extra>',
  radar: '<b>%{theta}</b><br>%{r:.2f}<extra></extra>',
  scatter: '<b>%{x}</b><br>%{y}<extra></extra>',
};
