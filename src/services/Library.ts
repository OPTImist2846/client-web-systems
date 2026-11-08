import type { Identifiable } from '../types';

/**
 * Узагальнена колекція об'єктів з унікальним id.
 * Використовується і для книг (Library<Book>), і для користувачів (Library<User>).
 */
export class Library<T extends Identifiable> {
  #items: T[];

  constructor(items: readonly T[] = []) {
    this.#items = [];
    items.forEach((item) => this.add(item));
  }

  get size(): number {
    return this.#items.length;
  }

  /** Додає об'єкт. Кидає помилку, якщо об'єкт з таким id вже існує. */
  add(item: T): T {
    if (this.has(item.id)) {
      throw new Error(`Об'єкт з id "${item.id}" вже існує.`);
    }
    this.#items.push(item);
    return item;
  }

  /** Видаляє об'єкт за id. Повертає видалений об'єкт або undefined, якщо його не знайдено. */
  remove(id: string): T | undefined {
    const index = this.#items.findIndex((item) => item.id === id);
    if (index === -1) {
      return undefined;
    }
    const [removed] = this.#items.splice(index, 1);
    return removed;
  }

  has(id: string): boolean {
    return this.#items.some((item) => item.id === id);
  }

  findById(id: string): T | undefined {
    return this.#items.find((item) => item.id === id);
  }

  /** Перший об'єкт, що задовольняє умову */
  find(predicate: (item: T) => boolean): T | undefined {
    return this.#items.find(predicate);
  }

  /** Усі об'єкти, що задовольняють умову */
  filter(predicate: (item: T) => boolean): T[] {
    return this.#items.filter(predicate);
  }

  /** Копія всіх об'єктів (зовнішній код не може змінити внутрішній масив) */
  getAll(): T[] {
    return [...this.#items];
  }

  clear(): void {
    this.#items = [];
  }
}
