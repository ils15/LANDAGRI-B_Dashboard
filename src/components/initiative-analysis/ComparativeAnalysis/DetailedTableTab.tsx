import { useMemo } from 'react';
import DataTable from '../../ui/DataTable';
import { useDashboardStore } from '../../../stores/dashboardStore';

export default function DetailedTableTab() {
  const initiatives = useDashboardStore((s) => s.initiatives);

  const tableData = useMemo(
    () =>
      initiatives.map((i) => ({
        name: i.Display_Name,
        acronym: i.Acronym,
        provider: i.Provider,
        coverage: i.Coverage,
        methodology: i.Methodology,
        accuracy: i.Accuracy > 0 ? `${i.Accuracy.toFixed(1)}%` : '-',
        resolution: i.Resolution > 0 ? `${i.Resolution}m` : '-',
        classes: i.Number_of_Classes,
        agriClasses: i.Number_of_Agriculture_Classes,
        years: i.Available_Years.length,
        period: `${i.Year_Start}–${i.Year_End}`,
        frequency: i.Temporal_Frequency,
      })),
    [initiatives],
  );

  const columns = [
    { key: 'name', label: 'Initiative' },
    { key: 'acronym', label: 'Acronym' },
    { key: 'provider', label: 'Provider' },
    { key: 'coverage', label: 'Coverage' },
    { key: 'methodology', label: 'Methodology' },
    { key: 'accuracy', label: 'Accuracy' },
    { key: 'resolution', label: 'Resolution' },
    { key: 'classes', label: 'Classes' },
    { key: 'agriClasses', label: 'Agri Classes' },
    { key: 'years', label: 'Years' },
    { key: 'period', label: 'Period' },
    { key: 'frequency', label: 'Frequency' },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        Complete comparison table of all LULC initiatives with key metrics.
      </p>
      <DataTable columns={columns} data={tableData} className="max-h-[600px] overflow-y-auto" />
    </div>
  );
}
