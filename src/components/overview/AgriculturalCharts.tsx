import { useEffect, useState, startTransition } from 'react';
import BaseChart from '../charts/BaseChart';
import type { Data, Layout } from 'plotly.js';
import brazilianAgriData from '../../data/processed/brazilian_agricultural_data.json';
import Card from '../ui/Card';

interface ProductEntry {
  nome: string;
  codigo: string;
  quantidade_produzida_toneladas?: Record<string, number>;
  area_colhida_hectares?: Record<string, number>;
}

const CHART_COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#06b6d4', '#84cc16', '#ec4899', '#f97316', '#6366f1',
];

export default function AgriculturalCharts() {
  const [productionData, setProductionData] = useState<Data[]>([]);
  const [pieData, setPieData] = useState<Data[]>([]);
  const [areaData, setAreaData] = useState<Data[]>([]);

  useEffect(() => {
    try {
      const data = brazilianAgriData as Record<string, unknown>;
      const producao = (data as Record<string, Record<string, Record<string, ProductEntry>>>)?.data?.producao_agricola;

      if (!producao) return;

      // Production evolution (line chart)
      const productKeys = Object.keys(producao).slice(0, 8);
      const years = new Set<number>();
      const series: { name: string; values: Record<number, number> }[] = [];

      productKeys.forEach((productKey) => {
        const prod = producao[productKey];
        const productionByYear = prod.quantidade_produzida_toneladas ?? {};
        const values: Record<number, number> = {};

        Object.entries(productionByYear).forEach(([key, val]) => {
          const year = parseInt(key, 10);
          if (!isNaN(year) && typeof val === 'number') {
            years.add(year);
            values[year] = val;
          }
        });

        series.push({ name: prod.nome || productKey, values });
      });

      const sortedYears = Array.from(years).sort();

      // Line traces
      const lineTraces: Data[] = productKeys.map((productKey, idx) => {
        const s = series[idx];
        return {
          x: sortedYears,
          y: sortedYears.map((y) => (s.values[y] ?? 0) / 1000),
          type: 'scatter',
          mode: 'lines+markers',
          name: s.name,
          marker: { color: CHART_COLORS[idx % CHART_COLORS.length] },
          line: { width: 2 },
        } as Data;
      });

      startTransition(() => setProductionData(lineTraces));

      // Pie chart for latest year distribution
      if (sortedYears.length > 0) {
        const latestYear = sortedYears[sortedYears.length - 1];
        const pieEntries = series
          .map((s) => ({ name: s.name, value: s.values[latestYear] || 0 }))
          .sort((a, b) => b.value - a.value)
          .slice(0, 10);

        if (pieEntries.length > 0) {
          startTransition(() => setPieData([{
            type: 'pie',
            labels: pieEntries.map((e) => e.name),
            values: pieEntries.map((e) => e.value),
            textinfo: 'label+percent',
            textposition: 'outside',
            hole: 0.3,
          } as Data]));
        }
      }

      // Area harvested (bar chart) from area_colhida_hectares
      const areaSeries: { name: string; avg: number }[] = [];

      productKeys.forEach((productKey) => {
        const prod = producao[productKey];
        const areaByYear = prod.area_colhida_hectares ?? {};
        const yearValues = Object.entries(areaByYear)
          .filter(([key]) => !isNaN(parseInt(key, 10)))
          .map(([, val]) => val);

        const avg = yearValues.length > 0
          ? yearValues.reduce((sum, v) => sum + v, 0) / yearValues.length
          : 0;

        areaSeries.push({ name: prod.nome || productKey, avg });
      });

      const sortedArea = areaSeries
        .sort((a, b) => b.avg - a.avg)
        .slice(0, 10);

      startTransition(() => setAreaData([{
        type: 'bar',
        x: sortedArea.map((e) => e.name),
        y: sortedArea.map((e) => e.avg / 1000),
        marker: {
          color: sortedArea.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
        },
      } as Data]));
    } catch (err) {
      console.error('Error processing agricultural data:', err);
    }
  }, []);

  if (productionData.length === 0) return null;

  const lineLayout: Partial<Layout> = {
    title: { text: 'Agricultural Production Evolution (thousands of tons)' },
    xaxis: { title: 'Year' },
    yaxis: { title: 'Production (x1000 tons)' },
  };

  const pieLayout: Partial<Layout> = {
    title: { text: 'Production Distribution (Latest Year)' },
  };

  const areaLayout: Partial<Layout> = {
    title: { text: 'Average Area Harvested (thousands of hectares)' },
    xaxis: { title: 'Product', tickangle: -45 },
    yaxis: { title: 'Area (x1000 ha)' },
  };

  return (
    <div className="space-y-6 mt-8">
      <h2 className="text-xl font-bold text-fg">🌾 Brazilian Agricultural Data</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <BaseChart data={productionData} layout={lineLayout} height={350} />
        </Card>
        <Card>
          <BaseChart data={pieData} layout={pieLayout} height={350} />
        </Card>
      </div>
      <Card>
        <BaseChart data={areaData} layout={areaLayout} height={350} />
      </Card>
    </div>
  );
}
