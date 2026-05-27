import BarChart from './BarChart';

interface HorizontalBarChartProps {
  y: (string | number)[];
  x: (number | null)[];
  name?: string;
  title?: string;
  xlabel?: string;
  ylabel?: string;
  color?: string;
  height?: number;
}

export default function HorizontalBarChart(props: HorizontalBarChartProps) {
  return <BarChart {...props} orientation="h" />;
}
