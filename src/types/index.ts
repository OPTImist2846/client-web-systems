/** Будь-яка сутність, яку можна зберігати в Library<T>, має унікальний id */
export interface Identifiable {
  readonly id: string;
}

/** Помилки валідації для полів форми: ключ — назва поля, значення — текст помилки */
export type FieldErrors<T> = Partial<Record<keyof T, string>>;

/** Одна сторінка пагінованого списку */
export interface Page<T> {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
}

/** Результат операції бізнес-логіки: успіх із даними або помилка з причиною */
export type Result<T, E extends string = string> =
  { ok: true; value: T } | { ok: false; error: E; message: string };

export enum BookStatus {
  Available = 'available',
  Borrowed = 'borrowed',
}

/** Максимальна кількість книг, яку один користувач може тримати одночасно */
export const MAX_BOOKS_PER_USER = 3;
