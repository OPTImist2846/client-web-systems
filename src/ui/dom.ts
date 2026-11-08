/** Дочірній вузол для h(): елемент, текст або "нічого" (зручно для умовного рендеру) */
export type Child = Node | string | number | null | undefined | false;

type EventHandlers = {
  [E in keyof HTMLElementEventMap]?: (event: HTMLElementEventMap[E]) => void;
};

export interface ElementOptions {
  className?: string;
  text?: string;
  attrs?: Record<string, string | number | boolean>;
  on?: EventHandlers;
}

const isRenderable = (child: Child): child is Node | string | number =>
  child !== null && child !== undefined && child !== false;

/**
 * Рендер-функція: створює DOM-елемент із класами, атрибутами, обробниками подій і дітьми.
 * Generic по тегу: h('input') повертає HTMLInputElement, h('button') — HTMLButtonElement.
 */
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: ElementOptions = {},
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);

  if (options.className) {
    element.className = options.className;
  }
  if (options.text !== undefined) {
    element.textContent = options.text;
  }
  Object.entries(options.attrs ?? {}).forEach(([name, value]) => {
    if (value !== false) {
      element.setAttribute(name, value === true ? '' : String(value));
    }
  });
  Object.entries(options.on ?? {}).forEach(([event, handler]) => {
    element.addEventListener(event, handler as EventListener);
  });

  element.append(
    ...children
      .filter(isRenderable)
      .map((child) => (typeof child === 'number' ? String(child) : child)),
  );
  return element;
}
