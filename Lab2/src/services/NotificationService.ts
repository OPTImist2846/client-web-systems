export type NotificationLevel = 'success' | 'info' | 'warning' | 'danger';

/**
 * modal — важливе повідомлення в модальному вікні (позичання, повернення, ліміт книг);
 * toast — коротке спливаюче повідомлення (додавання, видалення).
 */
export type NotificationDisplay = 'modal' | 'toast';

export interface AppNotification {
  message: string;
  level: NotificationLevel;
  display: NotificationDisplay;
  /** Текст кнопки закриття модального вікна */
  actionLabel?: string;
}

export type NotificationListener = (notification: AppNotification) => void;

/**
 * Система сповіщень за шаблоном "спостерігач".
 * Сервіс нічого не знає про DOM — UI підписується і сам вирішує, як показати сповіщення.
 */
export class NotificationService {
  readonly #listeners = new Set<NotificationListener>();

  /** Підписка на сповіщення. Повертає функцію для відписки. */
  subscribe(listener: NotificationListener): () => void {
    this.#listeners.add(listener);
    return () => this.#listeners.delete(listener);
  }

  notify(notification: AppNotification): void {
    this.#listeners.forEach((listener) => listener(notification));
  }

  success(message: string, display: NotificationDisplay = 'toast', actionLabel?: string): void {
    this.notify({ message, level: 'success', display, ...(actionLabel && { actionLabel }) });
  }

  info(message: string, display: NotificationDisplay = 'toast', actionLabel?: string): void {
    this.notify({ message, level: 'info', display, ...(actionLabel && { actionLabel }) });
  }

  warning(message: string, display: NotificationDisplay = 'modal', actionLabel?: string): void {
    this.notify({ message, level: 'warning', display, ...(actionLabel && { actionLabel }) });
  }

  error(message: string, display: NotificationDisplay = 'modal', actionLabel?: string): void {
    this.notify({ message, level: 'danger', display, ...(actionLabel && { actionLabel }) });
  }
}
