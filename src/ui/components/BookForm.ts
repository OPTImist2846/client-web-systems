import type { BookInput } from '../../models/interfaces/IBook';
import type { FieldErrors } from '../../types';
import { Validation } from '../../utils/validators';
import { EntityForm } from './EntityForm';

export class BookForm extends EntityForm<BookInput> {
  constructor(onSubmit: (input: BookInput) => FieldErrors<BookInput>) {
    super({
      title: 'Додати Книгу',
      submitLabel: 'Додати Книгу',
      fields: {
        title: { placeholder: 'Назва книги' },
        author: { placeholder: 'Автор' },
        year: { placeholder: 'Рік видання', inputMode: 'numeric', maxLength: 4 },
      },
      validate: Validation.validateBook,
      onSubmit,
    });
  }
}
