import type { Identifiable } from '../../types';

/** Дані, які користувач вводить у форму "Додати книгу" */
export interface BookInput {
  title: string;
  author: string;
  year: string;
}

/** Серіалізований стан книги (так книга зберігається в LocalStorage) */
export interface IBook extends Identifiable {
  title: string;
  author: string;
  year: number;
  /** id користувача, який позичив книгу, або null, якщо книга доступна */
  borrowedBy: string | null;
}
