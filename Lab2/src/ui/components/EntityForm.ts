import type { FieldErrors } from '../../types';
import { h } from '../dom';
import { card } from './Card';
import { FormField, type FieldConfig } from './FormField';

export type FormValues<T> = { [K in keyof T]: string };

export interface EntityFormOptions<T extends FormValues<T>> {
  title: string;
  submitLabel: string;
  fields: { [K in keyof T]: FieldConfig };
  validate: (input: T) => FieldErrors<T>;
  onSubmit: (input: T) => FieldErrors<T>;
}

export class EntityForm<T extends FormValues<T>> {
  readonly element: HTMLElement;
  readonly #fields: Record<keyof T, FormField>;
  readonly #options: EntityFormOptions<T>;

  constructor(options: EntityFormOptions<T>) {
    this.#options = options;

    const keys = Object.keys(options.fields) as (keyof T)[];
    this.#fields = {} as Record<keyof T, FormField>;
    keys.forEach((key) => {
      this.#fields[key] = new FormField(String(key), options.fields[key]);
    });

    const form = h(
      'form',
      { attrs: { novalidate: true }, on: { submit: (event) => this.#handleSubmit(event) } },
      ...keys.map((key) => this.#fields[key].element),
      h('button', {
        className: 'btn btn-success mt-1',
        text: options.submitLabel,
        attrs: { type: 'submit' },
      }),
    );

    this.element = card(options.title, form);
  }

  #values(): T {
    const values = {} as T;
    (Object.keys(this.#fields) as (keyof T)[]).forEach((key) => {
      values[key] = this.#fields[key].value as T[keyof T];
    });
    return values;
  }

  #showErrors(errors: FieldErrors<T>): void {
    (Object.keys(this.#fields) as (keyof T)[]).forEach((key) => {
      this.#fields[key].setError(errors[key]);
    });
    const firstInvalid = (Object.keys(errors) as (keyof T)[])[0];
    if (firstInvalid !== undefined) {
      this.#fields[firstInvalid].input.focus();
    }
  }

  #handleSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const values = this.#values();

    const errors = this.#options.validate(values);
    if (Object.keys(errors).length > 0) {
      this.#showErrors(errors);
      return;
    }

    const submitErrors = this.#options.onSubmit(values);
    if (Object.keys(submitErrors).length > 0) {
      this.#showErrors(submitErrors);
      return;
    }

    Object.values<FormField>(this.#fields).forEach((field) => field.reset());
  }
}
