import { act, renderHook } from '@testing-library/react-hooks';
import { useNowTime } from './useNowTime';

// Dateオブジェクトを指定の日時に固定する
// 使用後にはjest.useRealTimers()を呼ぶ必要がある
const setMockTime = (mockDate: Date) => {
  jest.useFakeTimers();
  jest.setSystemTime(mockDate);
};

afterEach(() => {
  jest.useRealTimers();
});

describe('useNowTime', () => {
  test('デフォルト値は現在時刻', () => {
    const n = new Date();
    setMockTime(n);

    const { result } = renderHook(() => useNowTime());

    expect(result.current).toStrictEqual(n);
  });

  test('updateMillisecond後に変化する', () => {
    const n = new Date();
    setMockTime(n);

    const { result } = renderHook(() =>
      useNowTime({ updateMillisecond: 10000 })
    );

    expect(+result.current).toBe(+n);

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(+result.current).toBe(+n + 10000);
  });
});
