import { Book } from '../models/Book';
import { User } from '../models/User';
import type { IBook } from '../models/interfaces/IBook';
import type { IUser } from '../models/interfaces/IUser';
import { MAX_BOOKS_PER_USER, type Result } from '../types';
import { generateId } from '../utils/idGenerator';
import { Library } from './Library';
import type { Storage } from './Storage';

const BOOKS_KEY = 'books';
const USERS_KEY = 'users';

export type NewBook = Omit<IBook, 'id' | 'borrowedBy'>;
export type NewUser = Omit<IUser, 'id'>;

export type BorrowError =
  'book-not-found' | 'user-not-found' | 'already-borrowed' | 'limit-reached';
export type ReturnError = 'book-not-found' | 'not-borrowed';
export type RemoveBookError = 'book-not-found' | 'book-borrowed';
export type RemoveUserError = 'user-not-found' | 'user-has-books';
export type AddUserError = 'email-taken';

export class LibraryService {
  readonly books: Library<Book>;
  readonly users: Library<User>;
  readonly #storage: Storage;

  constructor(storage: Storage) {
    this.#storage = storage;
    this.books = new Library(storage.load<IBook[]>(BOOKS_KEY, []).map(Book.fromJSON));
    this.users = new Library(storage.load<IUser[]>(USERS_KEY, []).map(User.fromJSON));
  }

  get hasSavedData(): boolean {
    return this.#storage.has(BOOKS_KEY) || this.#storage.has(USERS_KEY);
  }

  addBook(data: NewBook): Book {
    const book = this.books.add(new Book(generateId(), data.title, data.author, data.year));
    this.#persist();
    return book;
  }

  addUser(data: NewUser): Result<User, AddUserError> {
    const email = data.email.toLowerCase();
    if (this.users.find((user) => user.email.toLowerCase() === email)) {
      return {
        ok: false,
        error: 'email-taken',
        message: `Користувач з email ${data.email} вже існує.`,
      };
    }
    const user = this.users.add(new User(generateId(), data.name, email));
    this.#persist();
    return { ok: true, value: user };
  }

  removeBook(bookId: string): Result<Book, RemoveBookError> {
    const book = this.books.findById(bookId);
    if (!book) {
      return { ok: false, error: 'book-not-found', message: 'Книгу не знайдено.' };
    }
    if (book.isBorrowed) {
      return {
        ok: false,
        error: 'book-borrowed',
        message: `Книгу "${book.title}" не можна видалити, поки її не повернули.`,
      };
    }
    this.books.remove(bookId);
    this.#persist();
    return { ok: true, value: book };
  }

  removeUser(userId: string): Result<User, RemoveUserError> {
    const user = this.users.findById(userId);
    if (!user) {
      return { ok: false, error: 'user-not-found', message: 'Користувача не знайдено.' };
    }
    const borrowed = this.countBorrowedBy(userId);
    if (borrowed > 0) {
      return {
        ok: false,
        error: 'user-has-books',
        message: `${user.name} має ${borrowed} неповернених книг. Спершу поверніть їх.`,
      };
    }
    this.users.remove(userId);
    this.#persist();
    return { ok: true, value: user };
  }

  searchBooks(query: string): Book[] {
    const normalized = query.trim().toLocaleLowerCase();
    if (normalized === '') {
      return this.books.getAll();
    }
    return this.books.filter(
      (book) =>
        book.title.toLocaleLowerCase().includes(normalized) ||
        book.author.toLocaleLowerCase().includes(normalized),
    );
  }

  countBorrowedBy(userId: string): number {
    return this.books.filter((book) => book.borrowedBy === userId).length;
  }

  borrowBook(bookId: string, userId: string): Result<{ book: Book; user: User }, BorrowError> {
    const book = this.books.findById(bookId);
    if (!book) {
      return { ok: false, error: 'book-not-found', message: 'Книгу не знайдено.' };
    }
    const user = this.users.findById(userId);
    if (!user) {
      return {
        ok: false,
        error: 'user-not-found',
        message: `Користувача з ID ${userId} не знайдено.`,
      };
    }
    if (book.isBorrowed) {
      return { ok: false, error: 'already-borrowed', message: `${book.toString()} вже позичена.` };
    }
    if (this.countBorrowedBy(userId) >= MAX_BOOKS_PER_USER) {
      return {
        ok: false,
        error: 'limit-reached',
        message: `${user.name} вже має ${MAX_BOOKS_PER_USER} книги. Не можна позичити більше ${MAX_BOOKS_PER_USER}-х книг одночасно — спершу поверніть одну з них.`,
      };
    }

    book.borrow(userId);
    this.#persist();
    return { ok: true, value: { book, user } };
  }

  returnBook(bookId: string): Result<Book, ReturnError> {
    const book = this.books.findById(bookId);
    if (!book) {
      return { ok: false, error: 'book-not-found', message: 'Книгу не знайдено.' };
    }
    if (!book.isBorrowed) {
      return { ok: false, error: 'not-borrowed', message: `${book.toString()} не була позичена.` };
    }

    book.return();
    this.#persist();
    return { ok: true, value: book };
  }

  #persist(): void {
    this.#storage.save<IBook[]>(
      BOOKS_KEY,
      this.books.getAll().map((book) => book.toJSON()),
    );
    this.#storage.save<IUser[]>(
      USERS_KEY,
      this.users.getAll().map((user) => user.toJSON()),
    );
  }
}
