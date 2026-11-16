import type { UserInput } from '../../models/interfaces/IUser';
import type { FieldErrors } from '../../types';
import { Validation } from '../../utils/validators';
import { EntityForm } from './EntityForm';

export class UserForm extends EntityForm<UserInput> {
  constructor(onSubmit: (input: UserInput) => FieldErrors<UserInput>) {
    super({
      title: 'Додати Користувача',
      submitLabel: 'Додати Користувача',
      fields: {
        name: { placeholder: "Ім'я" },
        email: { placeholder: 'Email', type: 'email', inputMode: 'email' },
      },
      validate: Validation.validateUser,
      onSubmit,
    });
  }
}
