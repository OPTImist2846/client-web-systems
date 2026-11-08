import type { Identifiable } from '../../types';

/** Дані, які користувач вводить у форму "Додати користувача" */
export interface UserInput {
  name: string;
  email: string;
}

/** Серіалізований стан користувача (так користувач зберігається в LocalStorage) */
export interface IUser extends Identifiable {
  name: string;
  email: string;
}
