import { useMemo } from 'react';
import DataTable from '../../ui/DataTable';
import { useDashboardStore } from '../../../stores/dashboardStore';

interface DataDetailsTabProps {
  selectedInitiatives: string[];
}

export default function DataDetailsTab({ selectedInitiatives }: DataDetailsTabProps) {
  const initiatives = useDashboardStore((s) => s.initiatives);

  const tableData = useMemo(
    () =>
      initiatives
        .filter((i) => selectedInitiatives.includes(i.Name))
        .map((i) => ({
          displayName: i.Display_Name,
          acronym: i.Acronym,
          provider: i.Provider,
          source: i.Source,
          coverage: i.Coverage,
          methodology: i.Methodology,
          accuracy: i.Accuracy > 0 ? i.Accuracy.toFixed(1) : '-',
          accuracyMin: i.Accuracy_Min > 0 ? i.Accuracy_Min.toFixed(1) : '-',
          accuracyMax: i.Accuracy_Max > 0 ? i.Accuracy_Max.toFixed(1) : '-',
          resolution: i.Resolution > 0 ? `${i.Resolution}` : '-',
          resolutionMin: i.Resolution_Min > 0 ? `${i.Resolution_Min}` : '-',
          resolutionMax: i.Resolution_Max > 0 ? `${i.Resolution_Max}` : '-',
          classes: String(i.Number_of_Classes),
          agriClasses: String(i.Number_of_Agriculture_Classes),
          agriCapabilities: i.Agricultural_Capabilities || '-',
          startYear: String(i.Year_Start),
          endYear: String(i.Year_End),
          years: String(i.Available_Years.length),
          frequency: i.Temporal_Frequency,
          algorithm: i.Algorithm,
          classificationMethod: i.Classification_Method,
        })),
    [initiatives, selectedInitiatives],
  );

  const columns = [
    { key: 'displayName', label: 'Initiative' },
    { key: 'acronym', label: 'Acronym' },
    { key: 'provider', label: 'Provider' },
    { key: 'source', label: 'Source' },
    { key: 'coverage', label: 'Coverage' },
    { key: 'methodology', label: 'Methodology' },
    { key: 'accuracy', label: 'Accuracy (%)' },
    { key: 'accuracyMin', label: 'Acc Min' },
    { key: 'accuracyMax', label: 'Acc Max' },
    { key: 'resolution', label: 'Resolution (m)' },
    { key: 'resolutionMin', label: 'Res Min' },
    { key: 'resolutionMax', label: 'Res Max' },
    { key: 'classes', label: 'Classes' },
    { key: 'agriClasses', label: 'Agri Classes' },
    { key: 'agriCapabilities', label: 'Agri Capabilities' },
    { key: 'startYear', label: 'Start Year' },
    { key: 'endYear', label: 'End Year' },
    { key: 'years', label: 'Years of Data' },
    { key: 'frequency', label: 'Frequency' },
    { key: 'algorithm', label: 'Algorithm' },
    { key: 'classificationMethod', label: 'Class Method' },
  ];

  if (tableData.length === 0) {
    return (
      <div className="py-8 text-center text-slate-400">
        No initiatives selected. Use the multi-select above to choose initiatives.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-500">
        Complete data details for selected initiatives with all available metadata.
      </p>
      <DataTable columns={columns} data={tableData} className="max-h-[600px] overflow-y-auto" />
    </div>
  );
}
