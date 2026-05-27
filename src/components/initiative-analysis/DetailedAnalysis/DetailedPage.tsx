import { useState, useMemo } from 'react';
import { useDashboardStore } from '../../../stores/dashboardStore';
import Tabs from '../../ui/Tabs';
import BarChartTab from './BarChartTab';
import RadarTab from './RadarTab';
import HeatmapTab from './HeatmapTab';
import DataDetailsTab from './DataDetailsTab';
import AnnualCoverageTab from './AnnualCoverageTab';

export default function DetailedPage() {
  const initiatives = useDashboardStore((s) => s.initiatives);

  const initiativeOptions = useMemo(
    () => initiatives.map((i) => ({ value: i.Name, label: i.Display_Name })),
    [initiatives],
  );

  // Default: first 3 initiatives
  const defaultSelected = useMemo(
    () => initiatives.slice(0, 3).map((i) => i.Name),
    [initiatives],
  );

  const [selected, setSelected] = useState<string[]>(defaultSelected);

  const toggleInitiative = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name],
    );
  };

  const tabs = [
    { id: 'bar', label: '📊 Bar Chart', content: <BarChartTab selectedInitiatives={selected} /> },
    { id: 'radar', label: '🎯 Radar Chart', content: <RadarTab selectedInitiatives={selected} /> },
    { id: 'heatmap', label: '🔥 Heatmap', content: <HeatmapTab selectedInitiatives={selected} /> },
    { id: 'data', label: '📋 Data Details', content: <DataDetailsTab selectedInitiatives={selected} /> },
    { id: 'coverage', label: '📅 Annual Coverage', content: <AnnualCoverageTab selectedInitiatives={selected} /> },
  ];

  return (
    <div className="space-y-6">
      {/* Multi-select for initiatives */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Select Initiatives to Compare
        </label>
        <div className="flex flex-wrap gap-2">
          {initiativeOptions.map((opt) => {
            const isSelected = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                onClick={() => toggleInitiative(opt.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Click to toggle. Selected: {selected.length} initiative{selected.length !== 1 ? 's' : ''}
        </p>
      </div>

      <Tabs tabs={tabs} />
    </div>
  );
}
