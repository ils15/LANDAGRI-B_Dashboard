import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MetricCard from '../../components/ui/MetricCard';

describe('MetricCard', () => {
  it('should render label and value', () => {
    render(<MetricCard icon="🎯" label="Accuracy" value="95%" help="Overall" />);
    expect(screen.getByText('Accuracy')).toBeDefined();
    expect(screen.getByText('95%')).toBeDefined();
    expect(screen.getByText('Overall')).toBeDefined();
  });

  it('should apply default variant class', () => {
    const { container } = render(<MetricCard icon="🎯" label="Test" value="50%" />);
    expect(container.firstChild).toHaveClass('from-yellow-100');
  });
});
