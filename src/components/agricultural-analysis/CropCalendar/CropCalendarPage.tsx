import { useState, useMemo, useEffect, startTransition } from 'react';
import Tabs from '../../ui/Tabs';
import CropCalendarFilters from './CropCalendarFilters';
import CalendarHeatmapsTab from './CalendarHeatmapsTab';
import ActivitiesTimelineTab from './ActivitiesTimelineTab';
import SpatioTemporalTab from './SpatioTemporalTab';
import SeasonalOverviewTab from './SeasonalOverviewTab';
import CropDistributionTab from './CropDistributionTab';
import MonthlyIntensityTab from './MonthlyIntensityTab';
import ActivityIntensityTab from './ActivityIntensityTab';
import conabMapping from '../../../data/processed/conab_mapping.json';

interface MappingDataType {
  crop_calendar?: Record<string, unknown[]>;
}

export default function CropCalendarPage() {
  const mappingData = conabMapping as MappingDataType;
  const cropCalendar = mappingData?.crop_calendar;

  const crops = useMemo(() => {
    if (!cropCalendar) return [];
    return Object.keys(cropCalendar).sort();
  }, [cropCalendar]);

  const regions = ['North', 'Northeast', 'Central-West', 'Southeast', 'South'];

  const [selectedCrops, setSelectedCrops] = useState<string[]>(crops);
  const [selectedRegions, setSelectedRegions] = useState<string[]>(regions);

  // Sync selected crops when data loads (use startTransition to avoid cascading renders)
  useEffect(() => {
    if (crops.length > 0 && selectedCrops.length === 0) {
      startTransition(() => setSelectedCrops(crops));
    }
  }, [crops, selectedCrops.length]);

  const filterProps = {
    crops,
    regions,
    selectedCrops,
    selectedRegions,
    onCropsChange: setSelectedCrops,
    onRegionsChange: setSelectedRegions,
  };

  const calendarTabs = [
    {
      id: 'heatmaps',
      label: '🗓️ Calendar Heatmaps',
      content: <CalendarHeatmapsTab selectedCrops={selectedCrops} selectedRegions={selectedRegions} />,
    },
    {
      id: 'timeline',
      label: '⏳ Activities Timeline',
      content: <ActivitiesTimelineTab selectedCrops={selectedCrops} selectedRegions={selectedRegions} />,
    },
    {
      id: 'spatiotemporal',
      label: '🗺️ Spatio-temporal Distribution',
      content: <SpatioTemporalTab selectedCrops={selectedCrops} selectedRegions={selectedRegions} />,
    },
    {
      id: 'seasonal',
      label: '🌞 Seasonal Overview',
      content: <SeasonalOverviewTab selectedCrops={selectedCrops} selectedRegions={selectedRegions} />,
    },
    {
      id: 'distribution',
      label: '📊 Crop Distribution',
      content: <CropDistributionTab selectedCrops={selectedCrops} selectedRegions={selectedRegions} />,
    },
    {
      id: 'intensity',
      label: '📈 Monthly Intensity',
      content: <MonthlyIntensityTab selectedCrops={selectedCrops} selectedRegions={selectedRegions} />,
    },
    {
      id: 'activity',
      label: '⚡ Activity Intensity',
      content: <ActivityIntensityTab selectedCrops={selectedCrops} selectedRegions={selectedRegions} />,
    },
  ];

  return (
    <div>
      <CropCalendarFilters {...filterProps} />
      <Tabs tabs={calendarTabs} />
    </div>
  );
}
