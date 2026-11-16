import { Toast } from 'bootstrap';
import type { NotificationLevel } from '../../services/NotificationService';
import { h } from '../dom';

const TEXT_CLASS: Record<NotificationLevel, string> = {
  success: 'text-bg-success',
  info: 'text-bg-primary',
  warning: 'text-bg-warning',
  danger: 'text-bg-danger',
};

export class Toasts {
  readonly element: HTMLDivElement;

  constructor() {
    this.element = h('div', {
      className: 'toast-container position-fixed top-0 end-0 p-3',
      attrs: { 'aria-live': 'polite', 'aria-atomic': 'true' },
    });
  }

  show(message: string, level: NotificationLevel = 'success'): void {
    const toast = h(
      'div',
      {
        className: `toast align-items-center border-0 ${TEXT_CLASS[level]}`,
        attrs: { role: 'status' },
      },
      h(
        'div',
        { className: 'd-flex' },
        h('div', { className: 'toast-body', text: message }),
        h('button', {
          className: `btn-close ${level === 'warning' ? '' : 'btn-close-white'} me-2 m-auto`,
          attrs: { type: 'button', 'data-bs-dismiss': 'toast', 'aria-label': 'Закрити' },
        }),
      ),
    );

    this.element.append(toast);
    toast.addEventListener('hidden.bs.toast', () => toast.remove());
    new Toast(toast, { delay: 3000 }).show();
  }
}
