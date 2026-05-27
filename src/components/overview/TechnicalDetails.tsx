import type { InitiativeRow } from '../../types/initiative';
import Expandable from '../ui/Expandable';
import { parseAvailableYears } from '../../lib/dataParser';

interface TechnicalDetailsProps {
  data: InitiativeRow;
}

export default function TechnicalDetails({ data }: TechnicalDetailsProps) {
  const years = parseAvailableYears(data.Available_Years);

  return (
    <div className="space-y-3">
      <Expandable title="Basic Information" icon="🏢" defaultExpanded={true}>
        <div className="space-y-2">
          <div><span className="font-medium text-slate-700">Provider:</span> {data.Provider || '-'}</div>
          <div><span className="font-medium text-slate-700">Source:</span> {data.Source || '-'}</div>
          <div><span className="font-medium text-slate-700">Coverage:</span> {data.Coverage || '-'}</div>
        </div>
      </Expandable>

      <Expandable title="Technical Specifications" icon="🔬">
        <div className="space-y-2">
          <div><span className="font-medium text-slate-700">Methodology:</span> {data.Methodology || '-'}</div>
          <div><span className="font-medium text-slate-700">Algorithm:</span> {data.Algorithm || '-'}</div>
          <div><span className="font-medium text-slate-700">Spatial Resolution:</span> {data.Resolution > 0 ? `${data.Resolution}m` : '-'}</div>
          <div><span className="font-medium text-slate-700">Reference System:</span> {data.Reference_System || '-'}</div>
        </div>
      </Expandable>

      <Expandable title="Temporal Information" icon="⏳">
        <div className="space-y-2">
          {years.length > 0 ? (
            <>
              <div><span className="font-medium text-slate-700">First Year:</span> {Math.min(...years)}</div>
              <div><span className="font-medium text-slate-700">Last Year:</span> {Math.max(...years)}</div>
              <div><span className="font-medium text-slate-700">Total Years:</span> {years.length}</div>
            </>
          ) : (
            <div className="text-slate-400 italic">Temporal coverage not available</div>
          )}
        </div>
      </Expandable>
    </div>
  );
}
