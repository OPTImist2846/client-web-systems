import type { Identifiable } from '../../types';

export interface UserInput {
  name: string;
  email: string;
}

export interface IUser extends Identifiable {
  name: string;
  email: string;
}
