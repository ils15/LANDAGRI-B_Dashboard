import type { InitiativeRow } from '../../types/initiative';
import MetricCard from '../ui/MetricCard';
import { parseAvailableYears } from '../../lib/dataParser';

interface KeyMetricsCardsProps {
  data: InitiativeRow;
}

export default function KeyMetricsCards({ data }: KeyMetricsCardsProps) {
  const years = parseAvailableYears(data.Available_Years);
  const yearsCoverage = years.length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        icon="🎯"
        label="Accuracy"
        value={data.Accuracy > 0 ? `${data.Accuracy.toFixed(1)}%` : '-'}
        help="Overall accuracy"
        variant="accuracy"
      />
      <MetricCard
        icon="🌌"
        label="Resolution"
        value={data.Resolution > 0 ? `${data.Resolution.toFixed(0)}m` : '-'}
        help="Raster Spatial Resolution"
        variant="resolution"
      />
      <MetricCard
        icon="🏷️"
        label="Classes"
        value={data.Number_of_Classes > 0 ? String(data.Number_of_Classes) : '-'}
        help="Land cover classes"
        variant="classes"
      />
      <MetricCard
        icon="📅"
        label="Temporal Coverage"
        value={yearsCoverage > 0 ? String(yearsCoverage) : '-'}
        help="Years of data"
        variant="frequency"
      />
    </div>
  );
}
