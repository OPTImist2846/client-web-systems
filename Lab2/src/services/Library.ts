import type { Identifiable } from '../types';

export class Library<T extends Identifiable> {
  #items: T[];

  constructor(items: readonly T[] = []) {
    this.#items = [];
    items.forEach((item) => this.add(item));
  }

  get size(): number {
    return this.#items.length;
  }

  add(item: T): T {
    if (this.has(item.id)) {
      throw new Error(`Об'єкт з id "${item.id}" вже існує.`);
    }
    this.#items.push(item);
    return item;
  }

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

  find(predicate: (item: T) => boolean): T | undefined {
    return this.#items.find(predicate);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.#items.filter(predicate);
  }

  getAll(): T[] {
    return [...this.#items];
  }

  clear(): void {
    this.#items = [];
  }
}
