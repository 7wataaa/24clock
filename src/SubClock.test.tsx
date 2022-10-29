import { render, screen } from '@testing-library/react';
import { SubClock } from './SubClock';
import '@testing-library/jest-dom';

// Dateオブジェクトを指定の日時に固定する
// 使用後にはjest.useRealTimers()を呼ぶ必要がある
const setMockTime = (mockDate: Date) => {
  jest.useFakeTimers();
  jest.setSystemTime(mockDate);
};

afterEach(() => {
  jest.useRealTimers();
});

describe('SubClock', () => {
  test('初期状態のテスト', () => {
    const mockDate = new Date('2022-10-31T00:00');

    setMockTime(mockDate);

    render(<SubClock />);

    expect(screen.getByText('Now')).toBeInTheDocument();
    expect(screen.getByText('00:00')).toBeInTheDocument();
    expect(screen.getByText(mockDate.toDateString())).toBeInTheDocument();
  });
});
