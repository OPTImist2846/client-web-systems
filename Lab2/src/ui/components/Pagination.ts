import { h } from '../dom';

export class Pagination {
  readonly element: HTMLElement;
  readonly #list: HTMLUListElement;
  readonly #onChange: (page: number) => void;

  constructor(label: string, onChange: (page: number) => void) {
    this.#onChange = onChange;
    this.#list = h('ul', { className: 'pagination pagination-sm justify-content-center mb-0' });
    this.element = h('nav', { className: 'mt-3', attrs: { 'aria-label': label } }, this.#list);
  }

  render(page: number, totalPages: number): void {
    this.element.hidden = totalPages <= 1;
    if (totalPages <= 1) {
      this.#list.replaceChildren();
      return;
    }

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.#list.replaceChildren(
      this.#item('«', page - 1, page === 1, false, 'Попередня сторінка'),
      ...pages.map((n) => this.#item(String(n), n, false, n === page, `Сторінка ${n}`)),
      this.#item('»', page + 1, page === totalPages, false, 'Наступна сторінка'),
    );
  }

  #item(
    text: string,
    target: number,
    disabled: boolean,
    active: boolean,
    label: string,
  ): HTMLLIElement {
    return h(
      'li',
      { className: `page-item${disabled ? ' disabled' : ''}${active ? ' active' : ''}` },
      h('button', {
        className: 'page-link',
        text,
        attrs: {
          type: 'button',
          'aria-label': label,
          disabled,
          ...(active && { 'aria-current': 'page' }),
        },
        on: { click: () => this.#onChange(target) },
      }),
    );
  }
}
