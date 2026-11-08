import type { Book } from '../../models/Book';
import type { User } from '../../models/User';
import { h } from '../dom';
import { card } from './Card';

export interface BookListOptions {
  getBooks: () => Book[];
  getUser: (id: string) => User | undefined;
  onBorrow: (book: Book) => void;
  onReturn: (book: Book) => void;
}

export class BookList {
  readonly element: HTMLElement;
  readonly #options: BookListOptions;
  readonly #list: HTMLUListElement;

  constructor(options: BookListOptions) {
    this.#options = options;
    this.#list = h('ul', { className: 'list-group list-group-flush' });
    this.element = card('Список Книг', this.#list);
  }

  render(): void {
    const books = this.#options.getBooks();

    if (books.length === 0) {
      this.#list.replaceChildren(
        h('li', { className: 'list-group-item text-muted', text: 'Книг поки немає' }),
      );
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
      h('div', { className: 'd-flex gap-2 flex-shrink-0' }, actionButton),
    );
  }
}
