import { render, screen } from '@testing-library/react';
import { MainClock } from './MainClock';
import '@testing-library/jest-dom';

describe('MainClock', () => {
  test('初期状態のテスト', () => {
    render(<MainClock />);

    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('18')).toBeInTheDocument();
    expect(screen.getByText('06')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByTestId('LongHand')).toBeInTheDocument();
  });
});
