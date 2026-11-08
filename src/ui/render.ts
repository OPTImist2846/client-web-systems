import type { Book } from '../models/Book';
import type { BookInput } from '../models/interfaces/IBook';
import type { UserInput } from '../models/interfaces/IUser';
import type { LibraryService } from '../services/LibraryService';
import type { AppNotification, NotificationService } from '../services/NotificationService';
import type { FieldErrors } from '../types';
import { Validation } from '../utils/validators';
import { BookForm } from './components/BookForm';
import { BookList } from './components/BookList';
import { Modal } from './components/Modal';
import { Toasts } from './components/Toasts';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { h } from './dom';

/**
 * Кореневий UI-компонент: монтує всі секції в #app, пов'язує їх із сервісами
 * та оновлює списки після кожної зміни стану.
 */
export class App {
  readonly #root: HTMLElement;
  readonly #service: LibraryService;
  readonly #notifications: NotificationService;
  readonly #toasts = new Toasts();
  readonly #bookList: BookList;
  readonly #userList: UserList;

  constructor(root: HTMLElement, service: LibraryService, notifications: NotificationService) {
    this.#root = root;
    this.#service = service;
    this.#notifications = notifications;

    this.#bookList = new BookList({
      getBooks: (query) => this.#service.searchBooks(query),
      getUser: (id) => this.#service.users.findById(id),
      onBorrow: (book) => void this.#borrow(book),
      onReturn: (book) => this.#return(book),
    });

    this.#userList = new UserList({
      getUsers: () => this.#service.users.getAll(),
      countBorrowed: (userId) => this.#service.countBorrowedBy(userId),
    });
  }

  mount(): void {
    this.#notifications.subscribe((notification) => this.#show(notification));

    this.#root.replaceChildren(
      h(
        'main',
        { className: 'container py-4', attrs: { style: 'max-width: 960px' } },
        h('h1', {
          className: 'text-center mb-4 app-title',
          text: 'Система Управління Бібліотекою',
        }),
        new BookForm((input) => this.#addBook(input)).element,
        new UserForm((input) => this.#addUser(input)).element,
        this.#bookList.element,
        this.#userList.element,
      ),
      this.#toasts.element,
    );

    this.#refresh();
  }

  #refresh(): void {
    this.#bookList.render();
    this.#userList.render();
  }

  #show(notification: AppNotification): void {
    if (notification.display === 'toast') {
      this.#toasts.show(notification.message, notification.level);
      return;
    }
    void Modal.message(notification.message, {
      level: notification.level,
      ...(notification.actionLabel && { buttonLabel: notification.actionLabel }),
    });
  }

  #addBook(input: BookInput): FieldErrors<BookInput> {
    const book = this.#service.addBook({
      title: input.title,
      author: input.author,
      year: Number(input.year),
    });
    this.#notifications.success(`Книгу "${book.title}" додано.`);
    this.#refresh();
    return {};
  }

  #addUser(input: UserInput): FieldErrors<UserInput> {
    const result = this.#service.addUser(input);
    if (!result.ok) {
      return { email: result.message };
    }
    this.#notifications.success(`Користувача ${result.value.name} додано. ID: ${result.value.id}`);
    this.#refresh();
    return {};
  }

  async #borrow(book: Book): Promise<void> {
    if (this.#service.users.size === 0) {
      this.#notifications.warning(
        'Спершу додайте хоча б одного користувача.',
        'modal',
        'Зрозуміло!',
      );
      return;
    }

    const userId = await Modal.prompt({
      title: 'Введіть ID користувача для позичення книги:',
      placeholder: 'ID',
      inputMode: 'numeric',
      validate: (value) =>
        Validation.userId(value) ??
        (this.#service.users.has(value) ? null : 'Користувача з таким ID не знайдено'),
    });
    if (userId === null) return;

    const result = this.#service.borrowBook(book.id, userId);
    if (result.ok) {
      const { user } = result.value;
      this.#notifications.success(
        `${book.toString()} позичено користувачем ${user.toString()}.`,
        'modal',
        'Зрозуміло!',
      );
    } else {
      this.#notifications.warning(result.message, 'modal', 'Зрозуміло!');
    }
    this.#refresh();
  }

  #return(book: Book): void {
    const result = this.#service.returnBook(book.id);
    if (result.ok) {
      this.#notifications.success(`${book.toString()} повернуто.`, 'modal', 'Закрити');
    } else {
      this.#notifications.error(result.message);
    }
    this.#refresh();
  }
}
