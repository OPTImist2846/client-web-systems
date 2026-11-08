/** Мінімальний інтерфейс сховища — його реалізує window.localStorage і тестові заглушки */
export type KeyValueStore = Pick<globalThis.Storage, 'getItem' | 'setItem' | 'removeItem'>;

/**
 * Обгортка над LocalStorage: зберігає дані як JSON під ключами з префіксом,
 * тому clear() видаляє лише дані цього застосунку, а не весь localStorage.
 */
export class Storage {
  readonly #store: KeyValueStore;
  readonly #prefix: string;
  readonly #keys = new Set<string>();

  constructor(store: KeyValueStore, prefix = 'library-app') {
    this.#store = store;
    this.#prefix = prefix;
  }

  #fullKey(key: string): string {
    return `${this.#prefix}:${key}`;
  }

  save<T>(key: string, value: T): void {
    this.#store.setItem(this.#fullKey(key), JSON.stringify(value));
    this.#keys.add(key);
  }

  /** Повертає збережене значення або fallback, якщо ключа немає чи JSON пошкоджений */
  load<T>(key: string, fallback: T): T {
    const raw = this.#store.getItem(this.#fullKey(key));
    if (raw === null) {
      return fallback;
    }
    this.#keys.add(key);
    try {
      return JSON.parse(raw) as T;
    } catch {
      return fallback;
    }
  }

  has(key: string): boolean {
    return this.#store.getItem(this.#fullKey(key)) !== null;
  }

  remove(key: string): void {
    this.#store.removeItem(this.#fullKey(key));
    this.#keys.delete(key);
  }

  /** Видаляє всі ключі, які цей екземпляр зберігав або читав */
  clear(): void {
    this.#keys.forEach((key) => this.#store.removeItem(this.#fullKey(key)));
    this.#keys.clear();
  }
}
