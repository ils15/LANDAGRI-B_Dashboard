import { useDashboardStore } from '../../stores/dashboardStore';
import Select from '../ui/Select';

export default function InitiativeSelector() {
  const { initiatives, selection, setSelectedInitiative } = useDashboardStore();

  const options = initiatives.map((i) => ({
    value: i.Name,
    label: `${i.Name} (${i.Acronym})`,
  }));

  return (
    <Select
      label="Select an initiative for detailed analysis:"
      options={options}
      value={selection.selectedInitiative || ''}
      onChange={(val) => setSelectedInitiative(val)}
      placeholder="Choose an initiative..."
    />
  );
}
