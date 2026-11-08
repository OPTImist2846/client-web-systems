import { expect } from 'chai';
import { LibraryService } from '../src/services/LibraryService';
import { Storage, type KeyValueStore } from '../src/services/Storage';
import { MAX_BOOKS_PER_USER } from '../src/types';

/** Проста in-memory заміна localStorage для тестів */
class MemoryStore implements KeyValueStore {
  readonly data = new Map<string, string>();

  getItem(key: string): string | null {
    return this.data.get(key) ?? null;
  }

  setItem(key: string, value: string): void {
    this.data.set(key, value);
  }

  removeItem(key: string): void {
    this.data.delete(key);
  }
}

describe('LibraryService', () => {
  let store: MemoryStore;
  let service: LibraryService;

  const addUser = (name: string, email: string): string => {
    const result = service.addUser({ name, email });
    if (!result.ok) throw new Error(result.message);
    return result.value.id;
  };

  beforeEach(() => {
    store = new MemoryStore();
    service = new LibraryService(new Storage(store));
  });

  it('позичає доступну книгу і позначає її як взяту', () => {
    const book = service.addBook({ title: 'Code Complete', author: 'Steve McConnell', year: 2004 });
    const userId = addUser('Артем', 'artem@gmail.com');

    const result = service.borrowBook(book.id, userId);

    expect(result.ok).to.equal(true);
    expect(book.isBorrowed).to.equal(true);
    expect(book.borrowedBy).to.equal(userId);
  });

  it('не дозволяє позичити вже позичену книгу', () => {
    const book = service.addBook({ title: 'Clean Code', author: 'Robert Martin', year: 2008 });
    const first = addUser('Артем', 'artem@gmail.com');
    const second = addUser('Мартін', 'martin@gmail.com');

    service.borrowBook(book.id, first);
    const result = service.borrowBook(book.id, second);

    expect(result).to.include({ ok: false, error: 'already-borrowed' });
  });

  it(`не дозволяє позичити більше ${MAX_BOOKS_PER_USER} книг одному користувачу`, () => {
    const userId = addUser('Артем', 'artem@gmail.com');
    const books = Array.from({ length: MAX_BOOKS_PER_USER + 1 }, (_, i) =>
      service.addBook({ title: `Книга ${i + 1}`, author: 'Автор', year: 2000 }),
    );

    books.slice(0, MAX_BOOKS_PER_USER).forEach((book) => {
      expect(service.borrowBook(book.id, userId).ok).to.equal(true);
    });
    const fourth = service.borrowBook(books[MAX_BOOKS_PER_USER]!.id, userId);

    expect(fourth).to.include({ ok: false, error: 'limit-reached' });
    expect(service.countBorrowedBy(userId)).to.equal(MAX_BOOKS_PER_USER);
  });

  it('повертає книгу і знову робить її доступною', () => {
    const book = service.addBook({ title: 'Code Complete', author: 'Steve McConnell', year: 2004 });
    const userId = addUser('Артем', 'artem@gmail.com');
    service.borrowBook(book.id, userId);

    const result = service.returnBook(book.id);

    expect(result.ok).to.equal(true);
    expect(book.isBorrowed).to.equal(false);
    expect(service.countBorrowedBy(userId)).to.equal(0);
  });

  it('повідомляє про неіснуючого користувача', () => {
    const book = service.addBook({ title: 'Code Complete', author: 'Steve McConnell', year: 2004 });
    expect(service.borrowBook(book.id, '123')).to.include({ ok: false, error: 'user-not-found' });
  });

  describe('searchBooks()', () => {
    beforeEach(() => {
      service.addBook({ title: 'Code Complete', author: 'Steve McConnell', year: 2004 });
      service.addBook({ title: 'Clean Code', author: 'Роберт Мартін', year: 2008 });
      service.addBook({ title: 'The Pragmatic Programmer', author: 'Девід Томас', year: 1999 });
    });

    it('шукає за назвою без урахування регістру', () => {
      expect(service.searchBooks('CODE').map((b) => b.title)).to.deep.equal([
        'Code Complete',
        'Clean Code',
      ]);
    });

    it('шукає за автором (кирилиця)', () => {
      expect(service.searchBooks('мартін').map((b) => b.title)).to.deep.equal(['Clean Code']);
    });

    it('повертає всі книги для порожнього запиту', () => {
      expect(service.searchBooks('   ')).to.have.length(3);
    });

    it('повертає порожній масив, якщо нічого не знайдено', () => {
      expect(service.searchBooks('Гаррі Поттер')).to.deep.equal([]);
    });
  });

  it('не дозволяє додати двох користувачів з однаковим email', () => {
    addUser('Артем', 'artem@gmail.com');
    expect(service.addUser({ name: 'Інший', email: 'ARTEM@gmail.com' })).to.include({
      ok: false,
      error: 'email-taken',
    });
  });

  it('не дозволяє видалити позичену книгу або користувача з книгами', () => {
    const book = service.addBook({ title: 'Code Complete', author: 'Steve McConnell', year: 2004 });
    const userId = addUser('Артем', 'artem@gmail.com');
    service.borrowBook(book.id, userId);

    expect(service.removeBook(book.id)).to.include({ ok: false, error: 'book-borrowed' });
    expect(service.removeUser(userId)).to.include({ ok: false, error: 'user-has-books' });
  });

  it('зберігає стан у сховищі й відновлює його після "перезавантаження"', () => {
    const book = service.addBook({ title: 'Code Complete', author: 'Steve McConnell', year: 2004 });
    const userId = addUser('Артем', 'artem@gmail.com');
    service.borrowBook(book.id, userId);

    const reloaded = new LibraryService(new Storage(store));

    expect(reloaded.books.size).to.equal(1);
    expect(reloaded.users.findById(userId)?.name).to.equal('Артем');
    expect(reloaded.books.findById(book.id)?.borrowedBy).to.equal(userId);
  });
});
