import Expandable from '../ui/Expandable';
import type { SensorMap, SensorMetadata } from '../../types/sensor';
import sensorsRaw from '../../data/processed/sensors.json';

interface SensorInfoProps {
  sensorKeys: string[];
}

function SensorCard({ sensorKey, sensor }: { sensorKey: string; sensor: SensorMetadata }) {
  const resolutions = sensor.spatial_resolutions_m || [];
  const resStr = resolutions.length > 0
    ? `${Math.min(...resolutions.map(Number))} - ${Math.max(...resolutions.map(Number))}m`
    : '-';

  return (
    <div className="mb-4 p-3 bg-white rounded-lg border border-slate-100">
      <div className="font-semibold text-slate-700 mb-2">
        🛰️ {sensor.display_name || sensorKey}
      </div>

      <Expandable title="Sensor Specifications" icon="🔍" defaultExpanded={true}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div><span className="font-medium">Platform:</span> {sensor.platform_name || '-'}</div>
            <div><span className="font-medium">Family:</span> {sensor.sensor_family || '-'}</div>
            <div><span className="font-medium">Type:</span> {sensor.sensor_type_description || '-'}</div>
          </div>
          <div>
            <div><span className="font-medium">Spatial Res.:</span> {resStr}</div>
            <div><span className="font-medium">Revisit:</span> {sensor.revisit_time_days ? `${sensor.revisit_time_days} days` : '-'}</div>
            <div><span className="font-medium">Status:</span> {sensor.status || '-'}</div>
          </div>
        </div>
      </Expandable>

      {sensor.spectral_bands && Array.isArray(sensor.spectral_bands) && sensor.spectral_bands.length > 0 && (
        <Expandable title="Spectral Bands" icon="🌈">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left px-2 py-1 text-slate-500">Band</th>
                  <th className="text-left px-2 py-1 text-slate-500">Wavelength (nm)</th>
                  <th className="text-left px-2 py-1 text-slate-500">Resolution (m)</th>
                </tr>
              </thead>
              <tbody>
                {sensor.spectral_bands.map((band, idx) => (
                  <tr key={idx} className="border-b border-slate-100">
                    <td className="px-2 py-1">{band.band_name || `Band ${idx + 1}`}</td>
                    <td className="px-2 py-1">{band.wavelength_nm || '-'}</td>
                    <td className="px-2 py-1">{band.resolution_m ?? '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Expandable>
      )}
    </div>
  );
}

export default function SensorInfo({ sensorKeys }: SensorInfoProps) {
  if (sensorKeys.length === 0) {
    return (
      <p className="text-sm text-slate-400 italic">
        No specific sensor information available for this initiative.
      </p>
    );
  }

  const sensors = sensorsRaw as SensorMap;
  const matchedSensors = sensorKeys
    .map((key) => ({ key, sensor: sensors[key] }))
    .filter((s): s is { key: string; sensor: SensorMetadata } => s.sensor !== undefined);

  if (matchedSensors.length === 0) {
    return (
      <p className="text-sm text-slate-400 italic">
        Detailed sensor metadata not available in database.
      </p>
    );
  }

  return (
    <div>
      {matchedSensors.map(({ key, sensor }) => (
        <SensorCard key={key} sensorKey={key} sensor={sensor} />
      ))}
    </div>
  );
}
