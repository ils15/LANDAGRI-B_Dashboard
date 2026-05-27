import { useEffect, useState } from 'react';
import { useDashboardStore } from '../stores/dashboardStore';
import { parseInitiatives } from '../lib/dataParser';
import type { InitiativeMetadata, InitiativeRow } from '../types/initiative';
import type { SensorMap } from '../types/sensor';

const BASE = '/LANDAGRI-B_Dashboard';

/**
 * Hook to load and parse initiative data on mount using fetch (not import)
 */
export function useInitiatives() {
  const { setInitiatives, setSensorsData, setLoading, setError, initiatives, isLoading, error } = useDashboardStore();
  const [sensors, setSensors] = useState<SensorMap>({});

  useEffect(() => {
    let cancelled = false;
    
    async function loadData() {
      try {
        setLoading(true);
        
        const [initiativesData, sensorsData] = await Promise.all([
          fetch(`${BASE}/data/processed/initiatives.json`).then(r => r.json()),
          fetch(`${BASE}/data/processed/sensors.json`).then(r => r.json()),
        ]);
        
        if (cancelled) return;
        
        const metadata = initiativesData as unknown as Record<string, InitiativeMetadata>;
        const parsed = parseInitiatives(metadata);
        
        if (!cancelled) {
          setInitiatives(parsed, metadata);
          setSensorsData(sensorsData as unknown as SensorMap);
          setSensors(sensorsData as unknown as SensorMap);
        }
      } catch (err) {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to load data';
          setError(message);
        }
      }
    }
    
    loadData();
    
    return () => { cancelled = true; };
  }, [setInitiatives, setSensorsData, setLoading, setError]);

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
