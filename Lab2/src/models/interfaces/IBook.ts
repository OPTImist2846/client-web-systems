import type { Identifiable } from '../../types';

export interface BookInput {
  title: string;
  author: string;
  year: string;
}

export interface IBook extends Identifiable {
  title: string;
  author: string;
  year: number;
  borrowedBy: string | null;
}
