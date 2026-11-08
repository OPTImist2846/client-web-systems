import type { Page } from '../types';

export const DEFAULT_PAGE_SIZE = 5;

/**
 * Повертає одну сторінку списку. Номер сторінки починається з 1 і автоматично
 * обмежується допустимим діапазоном (наприклад, після видалення останнього елемента сторінки).
 */
export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize = DEFAULT_PAGE_SIZE,
): Page<T> {
  if (!Number.isInteger(pageSize) || pageSize < 1) {
    throw new RangeError('pageSize має бути цілим числом більшим за 0');
  }

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), totalPages);
  const start = (current - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: current,
    totalPages,
    totalItems,
  };
}
