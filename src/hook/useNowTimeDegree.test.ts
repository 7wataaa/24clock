import { act, renderHook } from '@testing-library/react-hooks';
import { calcTimeDeg, useNowTimeDegree } from './useNowTimeDegree';

// Dateオブジェクトを指定の日時に固定する
// 使用後にはjest.useRealTimers()を呼ぶ必要がある
const setMockTime = (mockDate: Date) => {
  jest.useFakeTimers();
  jest.setSystemTime(mockDate);
};

afterEach(() => {
  jest.useRealTimers();
});

describe('calcTimeDeg', () => {
  test('00:00のときの角度', () => {
    const result = calcTimeDeg(new Date('2022-09-24T00:00'));
    expect(result).toBe(0);
  });

  test('00:59の時の角度', () => {
    const result = calcTimeDeg(new Date('2022-09-24T00:59'));
    expect(result).toBe(0.25 * 59); // 1分につき0.25°刻む
  });

  test('23:00の時の角度', () => {
    const result = calcTimeDeg(new Date('2022-09-24T23:00'));
    expect(result).toBe(15 * 23); // 1時間につき15°刻む
  });

  test('23:59の時の角度', () => {
    const result = calcTimeDeg(new Date('2022-09-24T23:59'));
    expect(result).toBe(15 * 23 + 0.25 * 59); // 1時間につき15°刻み、1分につき0.25°刻む
  });
});

describe('useNowTimeDegree', () => {
  test('デフォルト値はcalcTimeDeg()で計算されるその時刻の角度になる', () => {
    const mockDate = new Date('2022-09-24T00:00');
    setMockTime(mockDate);

    const { result } = renderHook(() => useNowTimeDegree());

    expect(result.current).toBe(calcTimeDeg(mockDate));
  });

  test('00:00から1分後には0.25°進む', () => {
    const mockDate = new Date('2022-09-24T00:00');
    setMockTime(mockDate);

    const { result } = renderHook(() => useNowTimeDegree());

    act(() => {
      jest.advanceTimersByTime(1000 * 60);
    });

    expect(result.current).toBe(0.25);
  });

  test('00:00から2分後には0.5°進む', () => {
    const mockDate = new Date('2022-09-24T00:00');
    setMockTime(mockDate);

    const { result } = renderHook(() => useNowTimeDegree());

    act(() => {
      jest.advanceTimersByTime(1000 * (60 * 2));
    });

    expect(result.current).toBe(0.5);
  });

  test('00:00から1時間後には15°進む', () => {
    const mockDate = new Date('2022-09-24T00:00');
    setMockTime(mockDate);

    const { result } = renderHook(() => useNowTimeDegree());

    act(() => {
      jest.advanceTimersByTime(1000 * 60 * 60);
    });

    expect(result.current).toBe(15);
  });

  test('00:00から2時間後には30°進む', () => {
    const mockDate = new Date('2022-09-24T00:00');
    setMockTime(mockDate);

    const { result } = renderHook(() => useNowTimeDegree());

    act(() => {
      jest.advanceTimersByTime(1000 * 60 * (60 * 2));
    });

    expect(result.current).toBe(30);
  });

  test('00:00から24時間後には0°進む', () => {
    const mockDate = new Date('2022-09-24T00:00');
    setMockTime(mockDate);

    const { result } = renderHook(() => useNowTimeDegree());

    act(() => {
      jest.advanceTimersByTime(1000 * 60 * (60 * 24));
    });

    expect(result.current).toBe(0);
  });

  test('00:00から24時間と1分後には0.25°進む', () => {
    const mockDate = new Date('2022-09-24T00:00');
    setMockTime(mockDate);

    const { result } = renderHook(() => useNowTimeDegree());

    act(() => {
      jest.advanceTimersByTime(1000 * 60 * (60 * 24) + 1000 * 60);
    });

    expect(result.current).toBe(0.25);
  });
});
