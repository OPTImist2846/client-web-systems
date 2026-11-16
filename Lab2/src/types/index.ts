export interface Identifiable {
  readonly id: string;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

export type Result<T, E extends string = string> =
  { ok: true; value: T } | { ok: false; error: E; message: string };

export enum BookStatus {
  Available = 'available',
  Borrowed = 'borrowed',
}

export const MAX_BOOKS_PER_USER = 3;
