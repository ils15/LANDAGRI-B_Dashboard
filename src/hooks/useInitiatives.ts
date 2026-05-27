import { useEffect, useState } from 'react';
import { useDashboardStore } from '../stores/dashboardStore';
import { parseInitiatives } from '../lib/dataParser';
import type { InitiativeMetadata, InitiativeRow } from '../types/initiative';
import type { SensorMap } from '../types/sensor';

// Import processed data (Vite handles JSON imports)
import initiativesRaw from '../data/processed/initiatives.json';
import sensorsRaw from '../data/processed/sensors.json';

/**
 * Hook to load and parse initiative data on mount
 */
export function useInitiatives() {
  const { setInitiatives, setLoading, setError, initiatives, isLoading, error } = useDashboardStore();
  const [sensors, setSensors] = useState<SensorMap>({});

  useEffect(() => {
    try {
      setLoading(true);
      const metadata = initiativesRaw as unknown as Record<string, InitiativeMetadata>;
      const parsed = parseInitiatives(metadata);
      setInitiatives(parsed, metadata);

      // Load sensors
      const sensorData = sensorsRaw as unknown as SensorMap;
      setSensors(sensorData);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load data';
      setError(message);
    }
  }, [setInitiatives, setLoading, setError]);

  return { initiatives, sensors, isLoading, error };
}

/**
 * Hook to get initiative data for a specific module
 */
export function useFilteredInitiatives(): InitiativeRow[] {
  return useDashboardStore((state) => state.getFilteredInitiatives());
}

/**
 * Hook to get a single initiative by name
 */
export function useInitiative(name: string | null): InitiativeRow | undefined {
  return useDashboardStore((state) => (name ? state.getInitiativeByName(name) : undefined));
}
