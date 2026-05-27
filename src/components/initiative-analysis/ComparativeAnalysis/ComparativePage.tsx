import Tabs from '../../ui/Tabs';
import PairwiseTab from './PairwiseTab';
import DistributionsTab from './DistributionsTab';
import GlobalAccuracyTab from './GlobalAccuracyTab';
import MethodologyDistributionTab from './MethodologyDistributionTab';
import ClassDetailsTab from './ClassDetailsTab';
import MethodologyDeepDiveTab from './MethodologyDeepDiveTab';
import NormalizedPerformanceTab from './NormalizedPerformanceTab';
import DetailedTableTab from './DetailedTableTab';

export default function ComparativePage() {
  const tabs = [
    { id: 'pairwise', label: '𝒂/𝓫 Pairwise Performance', content: <PairwiseTab /> },
    { id: 'distributions', label: '📉 Distributions Analysis', content: <DistributionsTab /> },
    { id: 'accuracy', label: '🎯 Global Accuracy', content: <GlobalAccuracyTab /> },
    { id: 'methodology', label: '🧮 Methodology Distribution', content: <MethodologyDistributionTab /> },
    { id: 'classes', label: '🏷️ Class Details', content: <ClassDetailsTab /> },
    { id: 'deepdive', label: '🔬 Methodology Deep Dive', content: <MethodologyDeepDiveTab /> },
    { id: 'normalized', label: '🔥 Normalized Performance', content: <NormalizedPerformanceTab /> },
    { id: 'table', label: '📋 Detailed Table', content: <DetailedTableTab /> },
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
}
