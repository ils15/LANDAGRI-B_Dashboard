import Tabs from '../../ui/Tabs';
import ConabMappingTab from './ConabMappingTab';
import ConabEstimatesTab from './ConabEstimatesTab';
import IbgeEstimatesTab from './IbgeEstimatesTab';

export default function AgricultureOverviewPage() {
  const tabs = [
    { id: 'conab-mapping', label: '🗺️ CONAB Mapping', content: <ConabMappingTab /> },
    { id: 'conab-estimates', label: '🌿 CONAB Estimates', content: <ConabEstimatesTab /> },
    { id: 'ibge-estimates', label: '🌿 IBGE Estimates', content: <IbgeEstimatesTab /> },
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
}
