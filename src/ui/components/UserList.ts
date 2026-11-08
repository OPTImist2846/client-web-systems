import type { User } from '../../models/User';
import { MAX_BOOKS_PER_USER } from '../../types';
import { h } from '../dom';
import { card } from './Card';

export interface UserListOptions {
  getUsers: () => User[];
  countBorrowed: (userId: string) => number;
  onDelete: (user: User) => void;
}

export class UserList {
  readonly element: HTMLElement;
  readonly #options: UserListOptions;
  readonly #list: HTMLUListElement;

  constructor(options: UserListOptions) {
    this.#options = options;
    this.#list = h('ul', { className: 'list-group list-group-flush' });
    this.element = card('Список Користувачів', this.#list);
  }

  render(): void {
    const users = this.#options.getUsers();

    if (users.length === 0) {
      this.#list.replaceChildren(
        h('li', { className: 'list-group-item text-muted', text: 'Користувачів поки немає' }),
      );
      return;
    }

    this.#list.replaceChildren(...users.map((user) => this.#renderItem(user)));
  }

  #renderItem(user: User): HTMLLIElement {
    const borrowed = this.#options.countBorrowed(user.id);

    return h(
      'li',
      { className: 'list-group-item d-flex justify-content-between align-items-center px-1' },
      h('span', { text: user.toString() }),
      h(
        'div',
        { className: 'd-flex gap-2 align-items-center flex-shrink-0' },
        h('span', {
          className: `badge ${borrowed >= MAX_BOOKS_PER_USER ? 'text-bg-danger' : 'text-bg-light'}`,
          text: `Книг: ${borrowed}/${MAX_BOOKS_PER_USER}`,
          attrs: { title: 'Скільки книг зараз позичено' },
        }),
        h('button', {
          className: 'btn btn-outline-danger btn-sm',
          text: 'Видалити',
          attrs: { type: 'button', 'aria-label': `Видалити користувача ${user.name}` },
          on: { click: () => this.#options.onDelete(user) },
        }),
      ),
    );
  }
}
