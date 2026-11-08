import { expect } from 'chai';
import { Library } from '../src/services/Library';
import type { Identifiable } from '../src/types';

interface Item extends Identifiable {
  name: string;
}

const item = (id: string, name = `Item ${id}`): Item => ({ id, name });

describe('Library<T>', () => {
  let library: Library<Item>;

  beforeEach(() => {
    library = new Library<Item>();
  });

  describe('constructor', () => {
    it('створює порожню колекцію за замовчуванням', () => {
      expect(library.size).to.equal(0);
      expect(library.getAll()).to.deep.equal([]);
    });

    it('приймає початкові елементи', () => {
      const filled = new Library([item('1'), item('2')]);
      expect(filled.size).to.equal(2);
    });

    it('кидає помилку, якщо в початкових елементах є дублікати id', () => {
      expect(() => new Library([item('1'), item('1')])).to.throw('вже існує');
    });
  });

  describe('add()', () => {
    it('додає елемент і повертає його', () => {
      const added = library.add(item('1', 'Code Complete'));
      expect(added).to.deep.equal({ id: '1', name: 'Code Complete' });
      expect(library.size).to.equal(1);
      expect(library.has('1')).to.equal(true);
    });

    it('зберігає порядок додавання', () => {
      library.add(item('1'));
      library.add(item('2'));
      library.add(item('3'));
      expect(library.getAll().map((i) => i.id)).to.deep.equal(['1', '2', '3']);
    });

    it('не дозволяє додати два елементи з однаковим id', () => {
      library.add(item('1'));
      expect(() => library.add(item('1', 'Інша назва'))).to.throw(Error, 'вже існує');
      expect(library.size).to.equal(1);
    });
  });

  describe('remove()', () => {
    beforeEach(() => {
      library.add(item('1'));
      library.add(item('2'));
      library.add(item('3'));
    });

    it('видаляє елемент за id і повертає його', () => {
      const removed = library.remove('2');
      expect(removed?.id).to.equal('2');
      expect(library.size).to.equal(2);
      expect(library.has('2')).to.equal(false);
    });

    it('повертає undefined, якщо елемента немає, і не змінює колекцію', () => {
      expect(library.remove('999')).to.equal(undefined);
      expect(library.size).to.equal(3);
    });

    it('не зачіпає інші елементи', () => {
      library.remove('1');
      expect(library.getAll().map((i) => i.id)).to.deep.equal(['2', '3']);
    });
  });

  describe('пошук', () => {
    beforeEach(() => {
      library.add(item('1', 'Code Complete'));
      library.add(item('2', 'Clean Code'));
      library.add(item('3', 'The Pragmatic Programmer'));
    });

    it('findById() знаходить елемент за id', () => {
      expect(library.findById('3')?.name).to.equal('The Pragmatic Programmer');
    });

    it('findById() повертає undefined для неіснуючого id', () => {
      expect(library.findById('42')).to.equal(undefined);
    });

    it('find() повертає перший елемент за умовою', () => {
      expect(library.find((i) => i.name.includes('Code'))?.id).to.equal('1');
    });

    it('filter() повертає всі елементи за умовою', () => {
      const result = library.filter((i) => i.name.includes('Code'));
      expect(result.map((i) => i.id)).to.deep.equal(['1', '2']);
    });

    it('filter() повертає порожній масив, якщо нічого не знайдено', () => {
      expect(library.filter((i) => i.name === 'Немає')).to.deep.equal([]);
    });
  });

  describe('getAll() та clear()', () => {
    it('getAll() повертає копію — зміна результату не впливає на колекцію', () => {
      library.add(item('1'));
      library.getAll().push(item('2'));
      expect(library.size).to.equal(1);
    });

    it('clear() видаляє всі елементи', () => {
      library.add(item('1'));
      library.add(item('2'));
      library.clear();
      expect(library.size).to.equal(0);
    });
  });
});
