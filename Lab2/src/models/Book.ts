import { BookStatus } from '../types';
import type { IBook } from './interfaces/IBook';

export class Book implements IBook {
  readonly #id: string;
  #title: string;
  #author: string;
  #year: number;
  #borrowedBy: string | null;

  constructor(
    id: string,
    title: string,
    author: string,
    year: number,
    borrowedBy: string | null = null,
  ) {
    this.#id = id;
    this.#title = title;
    this.#author = author;
    this.#year = year;
    this.#borrowedBy = borrowedBy;
  }

  static fromJSON(data: IBook): Book {
    return new Book(data.id, data.title, data.author, data.year, data.borrowedBy);
  }

  get id(): string {
    return this.#id;
  }

  get title(): string {
    return this.#title;
  }

  set title(value: string) {
    this.#title = value.trim();
  }

  get author(): string {
    return this.#author;
  }

  set author(value: string) {
    this.#author = value.trim();
  }

  get year(): number {
    return this.#year;
  }

  set year(value: number) {
    this.#year = value;
  }

  get borrowedBy(): string | null {
    return this.#borrowedBy;
  }

  get status(): BookStatus {
    return this.#borrowedBy === null ? BookStatus.Available : BookStatus.Borrowed;
  }

  get isBorrowed(): boolean {
    return this.status === BookStatus.Borrowed;
  }

  borrow(userId: string): void {
    if (this.isBorrowed) {
      throw new Error(`Книга "${this.#title}" вже позичена.`);
    }
    this.#borrowedBy = userId;
  }

  return(): void {
    if (!this.isBorrowed) {
      throw new Error(`Книга "${this.#title}" не була позичена.`);
    }
    this.#borrowedBy = null;
  }

  toString(): string {
    return `${this.#title} by ${this.#author} (${this.#year})`;
  }

  toJSON(): IBook {
    return {
      id: this.#id,
      title: this.#title,
      author: this.#author,
      year: this.#year,
      borrowedBy: this.#borrowedBy,
    };
  }
}
