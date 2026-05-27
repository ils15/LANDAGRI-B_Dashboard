import { useEffect } from 'react';
import { useDashboardStore } from '../stores/dashboardStore';
import ModuleHeader from '../layouts/ModuleHeader';
import SummaryCards from '../components/overview/SummaryCards';
import InitiativeSelector from '../components/overview/InitiativeSelector';
import KeyMetricsCards from '../components/overview/KeyMetricsCards';
import LulcClasses from '../components/overview/LulcClasses';
import TechnicalDetails from '../components/overview/TechnicalDetails';
import SensorInfo from '../components/overview/SensorInfo';
import AgriculturalCharts from '../components/overview/AgriculturalCharts';

export default function OverviewPage() {
  const { initiatives, selection, rawMetadata, setSelectedInitiative } = useDashboardStore();

  // Auto-select first initiative if none selected
  useEffect(() => {
    if (!selection.selectedInitiative && initiatives.length > 0) {
      setSelectedInitiative(initiatives[0].Name);
    }
  }, [initiatives, selection.selectedInitiative, setSelectedInitiative]);

  const selectedData = selection.selectedInitiative
    ? initiatives.find((i) => i.Name === selection.selectedInitiative)
    : null;

  // Extract classification data
  const classificationJson = selectedData
    ? (selectedData.Detailed_Products && selectedData.Detailed_Products.length > 0
        ? selectedData.Detailed_Products
        : selectedData.Class_Legend || '[]')
    : '[]';

  return (
    <div>
      <ModuleHeader
        moduleName="Overview"
        title="🔎 Overview"
        subtitle="General summary and key metrics of Land Use and Land Cover (LULC) initiatives."
      />

      {/* Summary metrics */}
      <SummaryCards />

      <hr className="my-6 border-slate-200" />

      {/* Initiative Details */}
      <h2 className="text-xl font-bold text-slate-800 mb-4">Initiative Details</h2>
      <InitiativeSelector />

      {selectedData && (
        <>
          {/* Initiative header */}
          <div
            className="rounded-xl px-5 py-4 mb-5 text-center text-white font-bold text-xl shadow-md"
            style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
          >
            {selectedData.Name} ({selectedData.Acronym})
          </div>

          {/* Key Metrics */}
          <div className="flex justify-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800">KEY METRICS</h2>
          </div>
          <KeyMetricsCards data={selectedData} />

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">🏷️ Classification</h3>
              <LulcClasses classification={classificationJson} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">🔧 Technical Details</h3>
              <TechnicalDetails data={selectedData} />

              <h3 className="text-lg font-bold text-slate-800 mb-3 mt-6">🛰️ Sensor Information</h3>
              <SensorInfo sensorKeys={selectedData.Sensors} />
            </div>
          </div>
        </>
      )}

      <hr className="my-6 border-slate-200" />

      {/* Agricultural Data Charts */}
      <AgriculturalCharts />
    </div>
  );
}
