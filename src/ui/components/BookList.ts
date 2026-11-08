import type { Book } from '../../models/Book';
import type { User } from '../../models/User';
import { h } from '../dom';
import { card } from './Card';

export interface BookListOptions {
  /** Повертає книги, що відповідають пошуковому запиту */
  getBooks: (query: string) => Book[];
  getUser: (id: string) => User | undefined;
  onBorrow: (book: Book) => void;
  onReturn: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export class BookList {
  readonly element: HTMLElement;
  readonly #options: BookListOptions;
  readonly #list: HTMLUListElement;
  #query = '';

  constructor(options: BookListOptions) {
    this.#options = options;
    this.#list = h('ul', { className: 'list-group list-group-flush' });

    const search = h('input', {
      className: 'form-control',
      attrs: {
        type: 'search',
        placeholder: 'Пошук за назвою або автором',
        'aria-label': 'Пошук книг за назвою або автором',
      },
      on: {
        input: () => {
          this.#query = search.value;
          this.render();
        },
      },
    });

    this.element = card('Список Книг', h('div', { className: 'mb-2' }, search), this.#list);
  }

  render(): void {
    const books = this.#options.getBooks(this.#query);

    if (books.length === 0) {
      const text = this.#query.trim()
        ? `За запитом "${this.#query.trim()}" нічого не знайдено`
        : 'Книг поки немає';
      this.#list.replaceChildren(h('li', { className: 'list-group-item text-muted', text }));
      return;
    }

    this.#list.replaceChildren(...books.map((book) => this.#renderItem(book)));
  }

  #renderItem(book: Book): HTMLLIElement {
    const borrower = book.borrowedBy ? this.#options.getUser(book.borrowedBy) : undefined;

    const actionButton = book.isBorrowed
      ? h('button', {
          className: 'btn btn-warning btn-sm',
          text: 'Повернути',
          attrs: { type: 'button' },
          on: { click: () => this.#options.onReturn(book) },
        })
      : h('button', {
          className: 'btn btn-primary btn-sm',
          text: 'Позичити',
          attrs: { type: 'button' },
          on: { click: () => this.#options.onBorrow(book) },
        });

    return h(
      'li',
      { className: 'list-group-item d-flex justify-content-between align-items-center px-1' },
      h(
        'div',
        {},
        h('span', { text: book.toString() }),
        borrower &&
          h('div', { className: 'small text-muted', text: `Позичив(-ла): ${borrower.name}` }),
      ),
      h(
        'div',
        { className: 'd-flex gap-2 flex-shrink-0' },
        actionButton,
        h('button', {
          className: 'btn btn-outline-danger btn-sm',
          text: 'Видалити',
          attrs: { type: 'button', 'aria-label': `Видалити книгу ${book.title}` },
          on: { click: () => this.#options.onDelete(book) },
        }),
      ),
    );
  }
}
