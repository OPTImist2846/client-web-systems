import { Modal as BootstrapModal } from 'bootstrap';
import type { NotificationLevel } from '../../services/NotificationService';
import { h, type Child } from '../dom';

export interface MessageOptions {
  buttonLabel?: string;
  level?: NotificationLevel;
}

export interface PromptOptions {
  title: string;
  placeholder: string;
  confirmLabel?: string;
  cancelLabel?: string;
  inputMode?: 'text' | 'numeric';
  /** Повертає текст помилки або null, якщо значення коректне */
  validate?: (value: string) => string | null;
}

export interface ConfirmOptions {
  confirmLabel?: string;
  cancelLabel?: string;
  danger?: boolean;
}

interface ModalContent {
  title?: string;
  body: Child[];
  footer: Child[];
  focus?: HTMLElement;
  /** Викликається при закритті хрестиком, Esc або кліком повз вікно */
  onDismiss: () => void;
}

type ModalBuilder<R> = (close: (result: R) => void) => ModalContent;

/*
 * Модальні вікна на базі Bootstrap Modal (замість заборонених alert/prompt/confirm).
 * Вікна показуються по черзі: наступне відкривається лише після закриття попереднього.
 */

let queue: Promise<unknown> = Promise.resolve();

function button(
  text: string,
  className: string,
  onClick: (event: Event) => void,
): HTMLButtonElement {
  return h('button', { className, text, attrs: { type: 'button' }, on: { click: onClick } });
}

function renderModal(content: ModalContent): HTMLElement {
  const titleId = `modal-title-${Date.now()}`;
  const header = content.title
    ? h(
        'div',
        { className: 'modal-header' },
        h('h2', { className: 'modal-title h4', text: content.title, attrs: { id: titleId } }),
        h('button', {
          className: 'btn-close',
          attrs: { type: 'button', 'data-bs-dismiss': 'modal', 'aria-label': 'Закрити' },
        }),
      )
    : null;

  return h(
    'div',
    {
      className: 'modal fade',
      attrs: {
        tabindex: -1,
        role: 'dialog',
        'aria-modal': 'true',
        ...(content.title && { 'aria-labelledby': titleId }),
      },
    },
    h(
      'div',
      { className: 'modal-dialog modal-dialog-centered' },
      h(
        'div',
        { className: 'modal-content' },
        header,
        h('div', { className: 'modal-body' }, ...content.body),
        h('div', { className: 'modal-footer' }, ...content.footer),
      ),
    ),
  );
}

function open<R>(build: ModalBuilder<R>, dismissValue: R): Promise<R> {
  return new Promise<R>((resolve) => {
    let result = dismissValue;
    let settled = false;

    const close = (value: R): void => {
      if (settled) return;
      settled = true;
      result = value;
      instance.hide();
    };

    const content = build(close);
    const element = renderModal(content);
    document.body.append(element);
    const instance = new BootstrapModal(element);

    element.addEventListener('shown.bs.modal', () => content.focus?.focus());
    element.addEventListener('hide.bs.modal', () => {
      if (!settled) content.onDismiss();
    });
    element.addEventListener('hidden.bs.modal', () => {
      instance.dispose();
      element.remove();
      resolve(result);
    });

    instance.show();
  });
}

function enqueue<R>(build: ModalBuilder<R>, dismissValue: R): Promise<R> {
  const run = (): Promise<R> => open(build, dismissValue);
  const result = queue.then(run, run);
  queue = result.catch(() => undefined);
  return result;
}

/** Повідомлення з однією кнопкою */
function message(text: string, options: MessageOptions = {}): Promise<boolean> {
  const level = options.level ?? 'info';
  return enqueue<boolean>((close) => {
    const ok = button(options.buttonLabel ?? 'Закрити', 'btn btn-primary', () => close(true));
    return {
      body: [h('div', { className: `border-start border-4 border-${level} ps-3 fs-5`, text })],
      footer: [ok],
      focus: ok,
      onDismiss: () => close(false),
    };
  }, false);
}

/** Запит значення у користувача. Повертає введений рядок або null, якщо скасовано. */
function prompt(options: PromptOptions): Promise<string | null> {
  return enqueue<string | null>((close) => {
    const feedback = h('div', { className: 'invalid-feedback' });
    const input = h('input', {
      className: 'form-control form-control-lg',
      attrs: {
        type: 'text',
        placeholder: options.placeholder,
        'aria-label': options.placeholder,
        inputmode: options.inputMode ?? 'text',
        autocomplete: 'off',
      },
      on: { input: () => setError(null) },
    });

    function setError(error: string | null): void {
      input.classList.toggle('is-invalid', error !== null);
      feedback.textContent = error ?? '';
    }

    const submit = (event: Event): void => {
      event.preventDefault();
      const value = input.value.trim();
      const error = options.validate?.(value) ?? null;
      if (error) {
        setError(error);
        input.focus();
        return;
      }
      close(value);
    };

    return {
      title: options.title,
      body: [h('form', { attrs: { novalidate: true }, on: { submit } }, input, feedback)],
      footer: [
        button(options.cancelLabel ?? 'Скасувати', 'btn btn-secondary', () => close(null)),
        button(options.confirmLabel ?? 'Зберегти', 'btn btn-primary', submit),
      ],
      focus: input,
      onDismiss: () => close(null),
    };
  }, null);
}

/** Підтвердження дії. Повертає true, якщо користувач погодився. */
function confirm(text: string, options: ConfirmOptions = {}): Promise<boolean> {
  return enqueue<boolean>((close) => {
    const confirmButton = button(
      options.confirmLabel ?? 'Підтвердити',
      `btn ${options.danger ? 'btn-danger' : 'btn-primary'}`,
      () => close(true),
    );
    return {
      body: [h('p', { className: 'fs-5 mb-0', text })],
      footer: [
        button(options.cancelLabel ?? 'Скасувати', 'btn btn-secondary', () => close(false)),
        confirmButton,
      ],
      focus: confirmButton,
      onDismiss: () => close(false),
    };
  }, false);
}

export const Modal = { message, prompt, confirm } as const;
