import { expect } from 'chai';
import { paginate } from '../src/utils/pagination';

const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i + 1);

describe('paginate()', () => {
  it('ділить 40 елементів на 8 сторінок по 5', () => {
    const page = paginate(range(40), 1, 5);
    expect(page.items).to.deep.equal([1, 2, 3, 4, 5]);
    expect(page.totalPages).to.equal(8);
    expect(page.totalItems).to.equal(40);
  });

  it('повертає потрібну сторінку', () => {
    expect(paginate(range(12), 3, 5).items).to.deep.equal([11, 12]);
  });

  it('обмежує номер сторінки зверху (наприклад, після видалення)', () => {
    const page = paginate(range(6), 5, 5);
    expect(page.page).to.equal(2);
    expect(page.items).to.deep.equal([6]);
  });

  it('обмежує номер сторінки знизу', () => {
    expect(paginate(range(6), 0, 5).page).to.equal(1);
    expect(paginate(range(6), -3, 5).page).to.equal(1);
  });

  it('для порожнього списку повертає одну порожню сторінку', () => {
    expect(paginate([], 1, 5)).to.deep.equal({ items: [], page: 1, totalPages: 1, totalItems: 0 });
  });

  it('кидає помилку для некоректного розміру сторінки', () => {
    expect(() => paginate(range(3), 1, 0)).to.throw(RangeError);
  });
});
