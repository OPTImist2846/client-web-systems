import type { IUser } from './interfaces/IUser';

export class User implements IUser {
  readonly #id: string;
  #name: string;
  #email: string;

  constructor(id: string, name: string, email: string) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
  }

  static fromJSON(data: IUser): User {
    return new User(data.id, data.name, data.email);
  }

  get id(): string {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value.trim();
  }

  get email(): string {
    return this.#email;
  }

  set email(value: string) {
    this.#email = value.trim().toLowerCase();
  }

  toString(): string {
    return `${this.#id} ${this.#name} (${this.#email})`;
  }

  toJSON(): IUser {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
    };
  }
}
