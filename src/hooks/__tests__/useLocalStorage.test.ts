import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should return initial value when localStorage is empty', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should return stored value from localStorage', () => {
    const getItemMock = vi.fn().mockReturnValue(JSON.stringify('stored'));
    localStorage.getItem = getItemMock;
    
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));
    expect(result.current[0]).toBe('stored');
    expect(getItemMock).toHaveBeenCalledWith('test-key');
  });

  it('should update localStorage when value changes', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'test-key',
      JSON.stringify('updated')
    );
  });

  it('should support functional updates', () => {
    const getItemMock = vi.fn().mockReturnValue(JSON.stringify(5));
    localStorage.getItem = getItemMock;
    
    const { result } = renderHook(() => useLocalStorage('test-key', 5));

    act(() => {
      result.current[1]((prev: number) => prev + 1);
    });

    expect(result.current[0]).toBe(6);
  });

  it('should remove item from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('stored');
    });

    act(() => {
      result.current[2](); // remove function
    });

    expect(result.current[0]).toBe('initial');
    expect(localStorage.removeItem).toHaveBeenCalledWith('test-key');
  });

  it('should work with complex objects', () => {
    const initialValue = { name: 'John', age: 30 };
    const { result } = renderHook(() => useLocalStorage('user', initialValue));

    act(() => {
      result.current[1]({ name: 'Jane', age: 25 });
    });

    expect(result.current[0]).toEqual({ name: 'Jane', age: 25 });
  });
});

