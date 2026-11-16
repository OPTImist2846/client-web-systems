export type KeyValueStore = Pick<globalThis.Storage, 'getItem' | 'setItem' | 'removeItem'>;

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

  clear(): void {
    this.#keys.forEach((key) => this.#store.removeItem(this.#fullKey(key)));
    this.#keys.clear();
  }
}
