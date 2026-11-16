import { h } from '../dom';

export interface FieldConfig {
  placeholder: string;
  type?: 'text' | 'email';
  inputMode?: 'text' | 'numeric' | 'email';
  maxLength?: number;
}

export class FormField {
  readonly element: HTMLDivElement;
  readonly input: HTMLInputElement;
  readonly #feedback: HTMLDivElement;

  constructor(name: string, config: FieldConfig) {
    const id = `field-${name}-${Math.random().toString(36).slice(2, 8)}`;

    this.input = h('input', {
      className: 'form-control',
      attrs: {
        id,
        name,
        type: config.type ?? 'text',
        placeholder: config.placeholder,
        'aria-label': config.placeholder,
        'aria-describedby': `${id}-feedback`,
        inputmode: config.inputMode ?? 'text',
        autocomplete: 'off',
        ...(config.maxLength && { maxlength: config.maxLength }),
      },
      on: { input: () => this.setError(undefined) },
    });

    this.#feedback = h('div', { className: 'invalid-feedback', attrs: { id: `${id}-feedback` } });
    this.element = h('div', { className: 'mb-2' }, this.input, this.#feedback);
  }

  get value(): string {
    return this.input.value.trim();
  }

  setError(message: string | undefined): void {
    this.input.classList.toggle('is-invalid', Boolean(message));
    this.#feedback.textContent = message ?? '';
  }

  reset(): void {
    this.input.value = '';
    this.setError(undefined);
  }
}
