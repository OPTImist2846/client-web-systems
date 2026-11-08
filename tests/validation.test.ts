import { expect } from 'chai';
import { Validation } from '../src/utils/validators';

const { Messages } = Validation;

describe('Validation', () => {
  describe('required()', () => {
    it('повертає помилку для порожнього рядка', () => {
      expect(Validation.required('')).to.equal(Messages.required);
    });

    it('повертає помилку для рядка з пробілів', () => {
      expect(Validation.required('   ')).to.equal(Messages.required);
    });

    it('приймає заповнене значення', () => {
      expect(Validation.required('Clean Code')).to.equal(null);
    });
  });

  describe('userId()', () => {
    it('приймає id з цифр', () => {
      expect(Validation.userId('1725533394038')).to.equal(null);
    });

    it('ігнорує пробіли по краях', () => {
      expect(Validation.userId(' 123 ')).to.equal(null);
    });

    it("вимагає обов'язкове значення", () => {
      expect(Validation.userId('')).to.equal(Messages.required);
    });

    for (const invalid of ['abc', '12a3', '-5', '1.5', '12 34']) {
      it(`відхиляє "${invalid}" — лише цифри`, () => {
        expect(Validation.userId(invalid)).to.equal(Messages.digitsOnly);
      });
    }
  });

  describe('year()', () => {
    const currentYear = 2026;

    for (const valid of ['1999', '2004', '2008', '1000', '2026']) {
      it(`приймає рік ${valid}`, () => {
        expect(Validation.year(valid, currentYear)).to.equal(null);
      });
    }

    it("вимагає обов'язкове значення", () => {
      expect(Validation.year('', currentYear)).to.equal(Messages.required);
    });

    it('відхиляє не-цифри', () => {
      expect(Validation.year('20o8', currentYear)).to.equal(Messages.digitsOnly);
      expect(Validation.year('-2008', currentYear)).to.equal(Messages.digitsOnly);
    });

    for (const invalid of ['99', '208', '20080', '0999']) {
      it(`відхиляє "${invalid}" — не відповідає формату року`, () => {
        expect(Validation.year(invalid, currentYear)).to.equal(Messages.yearFormat);
      });
    }

    it('відхиляє рік з майбутнього', () => {
      expect(Validation.year('2027', currentYear)).to.equal(Messages.yearRange(currentYear));
    });
  });

  describe('email()', () => {
    it('приймає коректний email', () => {
      expect(Validation.email('artem@gmail.com')).to.equal(null);
    });

    it("вимагає обов'язкове значення", () => {
      expect(Validation.email('')).to.equal(Messages.required);
    });

    for (const invalid of ['artem', 'artem@', '@gmail.com', 'artem@gmail', 'a b@gmail.com']) {
      it(`відхиляє "${invalid}"`, () => {
        expect(Validation.email(invalid)).to.equal(Messages.email);
      });
    }
  });

  describe('validateBook()', () => {
    it('не повертає помилок для коректної книги', () => {
      const errors = Validation.validateBook({
        title: 'Code Complete',
        author: 'Steve McConnell',
        year: '2004',
      });
      expect(errors).to.deep.equal({});
      expect(Validation.isValid(errors)).to.equal(true);
    });

    it("позначає всі порожні поля як обов'язкові", () => {
      const errors = Validation.validateBook({ title: '', author: '', year: '' });
      expect(errors).to.deep.equal({
        title: Messages.required,
        author: Messages.required,
        year: Messages.required,
      });
      expect(Validation.isValid(errors)).to.equal(false);
    });

    it('повертає помилку лише для некоректного поля', () => {
      const errors = Validation.validateBook({
        title: 'Clean Code',
        author: 'Robert Martin',
        year: 'abc',
      });
      expect(errors).to.deep.equal({ year: Messages.digitsOnly });
    });
  });

  describe('validateUser()', () => {
    it('не повертає помилок для коректного користувача', () => {
      expect(Validation.validateUser({ name: 'Артем', email: 'artem@gmail.com' })).to.deep.equal(
        {},
      );
    });

    it('перевіряє обидва поля', () => {
      expect(Validation.validateUser({ name: ' ', email: 'wrong' })).to.deep.equal({
        name: Messages.required,
        email: Messages.email,
      });
    });
  });
});
