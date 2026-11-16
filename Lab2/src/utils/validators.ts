import type { BookInput } from '../models/interfaces/IBook';
import type { UserInput } from '../models/interfaces/IUser';
import type { FieldErrors } from '../types';

export namespace Validation {
  export type Check = string | null;

  export const Messages = {
    required: "Це поле є обов'язковим",
    digitsOnly: 'Поле може містити лише цифри',
    yearFormat: 'Рік має складатися з 4 цифр (наприклад, 2008)',
    yearRange: (max: number): string => `Рік має бути в межах 1000–${max}`,
    email: 'Введіть коректний email (наприклад, name@gmail.com)',
  } as const;

  export const DIGITS_PATTERN = /^\d+$/;
  export const YEAR_PATTERN = /^[1-9]\d{3}$/;
  export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  export function required(value: string): Check {
    return value.trim() === '' ? Messages.required : null;
  }

  export function userId(value: string): Check {
    return required(value) ?? (DIGITS_PATTERN.test(value.trim()) ? null : Messages.digitsOnly);
  }

  export function year(value: string, currentYear: number = new Date().getFullYear()): Check {
    const trimmed = value.trim();
    if (trimmed === '') return Messages.required;
    if (!DIGITS_PATTERN.test(trimmed)) return Messages.digitsOnly;
    if (!YEAR_PATTERN.test(trimmed)) return Messages.yearFormat;
    if (Number(trimmed) > currentYear) return Messages.yearRange(currentYear);
    return null;
  }

  export function email(value: string): Check {
    return required(value) ?? (EMAIL_PATTERN.test(value.trim()) ? null : Messages.email);
  }

  export function validate<T extends object>(
    input: T,
    rules: { [K in keyof T]: (value: T[K]) => Check },
  ): FieldErrors<T> {
    const errors: FieldErrors<T> = {};
    (Object.keys(rules) as (keyof T)[]).forEach((field) => {
      const error = rules[field](input[field]);
      if (error !== null) {
        errors[field] = error;
      }
    });
    return errors;
  }

  export function validateBook(input: BookInput): FieldErrors<BookInput> {
    return validate(input, { title: required, author: required, year: (value) => year(value) });
  }

  export function validateUser(input: UserInput): FieldErrors<UserInput> {
    return validate(input, { name: required, email });
  }

  export function isValid<T>(errors: FieldErrors<T>): boolean {
    return Object.keys(errors).length === 0;
  }
}
