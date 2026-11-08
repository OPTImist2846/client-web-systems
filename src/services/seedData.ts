import type { NewBook } from './LibraryService';

/** Книги з макету — додаються лише при першому запуску, коли в LocalStorage ще нічого немає */
export const SEED_BOOKS: readonly NewBook[] = [
  { title: 'Code Complete', author: 'Steve McConnell', year: 2004 },
  {
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Роберт Мартін',
    year: 2008,
  },
  {
    title: 'The Pragmatic Programmer: Your Journey to Mastery',
    author: 'Ендрю Хансон, Девід Томас',
    year: 1999,
  },
];
