import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * create a debounce function that will take another function and a delay var
 * a time
 */

export function debounce<Type extends unknown[]>(
  func: (...args: Type) => void,
  wait: number,
) {
  let timer: ReturnType<typeof setTimeout>;

  return function (...args: Type) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
