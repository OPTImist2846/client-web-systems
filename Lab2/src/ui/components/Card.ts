import { h, type Child } from '../dom';

export function card(title: string, ...children: Child[]): HTMLElement {
  return h(
    'section',
    { className: 'card shadow-sm border-0 mb-3' },
    h(
      'div',
      { className: 'card-body p-4' },
      h('h2', { className: 'h4 card-title mb-3', text: title }),
      ...children,
    ),
  );
}
