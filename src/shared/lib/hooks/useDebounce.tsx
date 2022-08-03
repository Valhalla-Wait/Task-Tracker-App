import React, { useRef } from 'react';

export const useDebounce = (func: (...args: any) => void, delay: number) => {
  const ref = useRef<any>();
  return (...args: any) => {
    clearTimeout(ref.current);
    ref.current = setTimeout(() => func(...args), delay);
  };
};
