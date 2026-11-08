# Система управління бібліотекою

Лабораторна робота №2 — клієнтський застосунок для обліку книг і користувачів
з можливістю позичання та повернення книг.

**Стек:** TypeScript · Bootstrap 5 · webpack 5 (гілка `main`) / Vite 8 (гілка `vite-migration`) ·
ESLint + Prettier · Mocha + Chai · Husky

**Демо (gh-pages):**

- webpack-версія — https://optimist2846.github.io/library-app/webpack/
- Vite-версія — https://optimist2846.github.io/library-app/vite/

## Можливості

- Додавання книг (назва, автор, рік видання) і користувачів (ім'я, email) з валідацією полів
- Позичання книги: модальне вікно запитує ID користувача, після успіху — повідомлення
- Повернення книги з повідомленням у модальному вікні
- Ліміт — не більше **3 книг** на одного користувача; при спробі взяти четверту з'являється модальне вікно
- Пошук книг за назвою або автором
- Видалення книг і користувачів (з підтвердженням; не можна видалити позичену книгу
  чи користувача, який не повернув книги)
- Пагінація списків — по 5 записів на сторінку
- Усі дані зберігаються в LocalStorage і відновлюються після перезавантаження сторінки
- Сповіщення без `alert`: модальні вікна та toast-повідомлення Bootstrap

## Запуск

Потрібен Node.js ≥ 22.12.

```bash
npm install         # встановити залежності (також вмикає Husky-хук)
npm start           # dev-сервер на http://localhost:9000
npm run build       # продакшн-збірка в dist/
npm test            # юніт-тести (Mocha + Chai)
npm run lint        # ESLint
npm run format      # Prettier
npm run typecheck   # перевірка типів TypeScript
npm run deploy      # збірка і публікація на gh-pages
```

## Структура проєкту

```
src/
├── models/                  # чисті дані: класи з геттерами/сеттерами, без DOM і storage
│   ├── Book.ts
│   ├── User.ts
│   └── interfaces/
│       ├── IBook.ts
│       └── IUser.ts
├── services/                # бізнес-логіка, стан, LocalStorage — без DOM
│   ├── Library.ts           # generic-клас Library<T>
│   ├── LibraryService.ts    # позичання/повернення, ліміт 3 книг, пошук, видалення
│   ├── Storage.ts           # обгортка над LocalStorage
│   ├── NotificationService.ts
│   └── seedData.ts          # книги з макету для першого запуску
├── utils/                   # чисті допоміжні функції
│   ├── validators.ts        # namespace Validation
│   ├── pagination.ts        # generic paginate<T>()
│   └── idGenerator.ts
├── ui/                      # єдиний шар, що працює з DOM
│   ├── dom.ts               # рендер-функція h()
│   ├── render.ts            # клас App: монтування і оновлення DOM
│   └── components/          # BookForm, UserForm, BookList, UserList, Modal, Toasts, Pagination…
├── types/index.ts           # спільні типи та enum
├── styles/main.scss         # власні стилі поверх Bootstrap
└── index.ts                 # точка входу
tests/                       # юніт-тести Mocha
public/favicon.svg
index.html                   # лише <div id="app"></div>
```

## Як виконано вимоги

| Вимога                         | Реалізація                                                                                                                                                                 |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Окремий репозиторій            | Цей репозиторій                                                                                                                                                            |
| Жодної розмітки в `index.html` | Лише `<div id="app"></div>`; весь UI створює `src/ui` через `document.createElement` (функція `h()`)                                                                       |
| Класи та інтерфейси            | `Book implements IBook`, `User implements IUser`, `Library<T>`, `Storage`, `LibraryService`, UI-компоненти                                                                 |
| Generics                       | `Library<T extends Identifiable>`, `EntityForm<T>`, `paginate<T>()`, `Result<T, E>`, `FieldErrors<T>`, `Validation.validate<T>()`, `Storage.save<T>()/load<T>()`, `h<K>()` |
| Модулі та простори імен        | ES-модулі за шарами; `namespace Validation` у `utils/validators.ts`                                                                                                        |
| Feature branch workflow        | Кожна функція — окрема гілка `feature/*`, злита в `main` через `--no-ff` merge                                                                                             |
| Conventional Commits           | `feat:`, `fix:`, `test:`, `chore:`, `build:`, `ci:`, `docs:`                                                                                                               |
| Bootstrap через бандлер        | `npm i bootstrap`; CSS і JS (`Modal`, `Toast`) імпортуються в коді, без CDN                                                                                                |
| ESLint + Prettier              | `eslint.config.js`, `.prettierrc`; `npm run lint` — 0 помилок і попереджень                                                                                                |
| Юніт-тести Mocha + Chai        | 69 тестів: `Library<T>`, `Validation`, `LibraryService`, `paginate`                                                                                                        |
| Husky                          | `.husky/pre-commit` запускає lint, перевірку форматування і тести; коміт блокується при помилках                                                                           |
| Валідація                      | Усі поля обов'язкові; ID користувача — лише цифри; рік — лише цифри, регулярний вираз `^[1-9]\d{3}$` і не пізніше поточного року; email — формат                           |
| LocalStorage                   | `Storage` + `LibraryService` зберігають стан після кожної зміни                                                                                                            |

> **Про `.eslintrc`:** ESLint 9+ замінив `.eslintrc.json` на "flat config" (`eslint.config.js`),
> а ESLint 10 старий формат уже не підтримує, тому конфігурація лежить у `eslint.config.js`.

## Гілки

- `main` — фінальна версія на **webpack**
- `vite-migration` — та сама версія на **Vite** (видалено `webpack.config.js` і всі webpack-залежності,
  додано `vite.config.ts`)
- `feature/*` — гілки окремих функцій (злиті в `main`)

## Порівняння webpack і Vite

Заміри зроблено на цьому ж проєкті (Windows 11, Node.js 26, Microsoft Edge). Кожне значення — середнє з 3 запусків.

| Показник                                            | webpack 5                                                                       | Vite 8                               |
| --------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------ |
| Старт dev-сервера (до першої відповіді)             | ~6.5 с                                                                          | ~2.5 с                               |
| Від запуску до відмальованого застосунку в браузері | ~7.1 с                                                                          | ~3.6 с                               |
| Оновлення сторінки після зміни `.ts` файлу          | ~0.9 с                                                                          | ~0.26 с                              |
| Продакшн-збірка, `npm run build` (з запуском npm)   | ~7.4–8.0 с                                                                      | ~3.8–4.0 с (разом із `tsc --noEmit`) |
| Продакшн-збірка, час самого бандлера                | ~2.7–3.0 с                                                                      | ~0.6 с                               |
| JS-бандл (gzip)                                     | 100.3 KB (30.3 KB)                                                              | 100.7 KB (30.8 KB)                   |
| CSS (gzip)                                          | 232.8 KB (30.9 KB)                                                              | 230.1 KB (30.5 KB)                   |
| Рядків конфігурації                                 | 70 (`webpack.config.js`)                                                        | 19 (`vite.config.ts`)                |
| devDependencies для збірки                          | 11 пакетів (webpack, cli, dev-server, 5 лоадерів/плагінів, sass, typescript, …) | 3 пакети (vite, sass, typescript)    |
| Розмір `node_modules`                               | 169 MB                                                                          | 134 MB                               |

### Висновок

**Швидкість dev-сервера та оновлення.** Vite стартує приблизно у 2.5 раза швидше: він не
збирає бандл наперед, а віддає браузеру ES-модулі за запитом і лише перетворює TypeScript.
webpack перед стартом мусить зібрати весь граф модулів, включно з Bootstrap, і ще перевірити
типи через `ts-loader`. Після зміни файлу Vite оновлює сторінку приблизно за чверть секунди,
webpack — майже за секунду. Різниця відчутна навіть на такому маленькому проєкті, а на великих
вона лише зростає.

**Налаштування.** Для webpack довелося вручну підключити й налаштувати `ts-loader`,
`css-loader`, `style-loader`, `sass-loader`, `mini-css-extract-plugin` і `html-webpack-plugin`,
окремо для dev- і prod-режимів. Вийшло 70 рядків конфігурації. Vite обробляє TypeScript, CSS і
SCSS з коробки: потрібен лише пакет `sass`. Конфігурація зводиться до порту dev-сервера та
відносного `base` для gh-pages, усього 19 рядків. Єдине, що довелося змінити поза
конфігурацією, — додати в `index.html` тег `<script type="module" src="/src/index.ts">`, бо у
Vite точкою входу є саме HTML.

**Продакшн-збірка.** Розміри результату практично однакові: обидва інструменти мінімізують JS
і виносять CSS в окремий файл, різниця в межах 1–2 %. Сам бандлер у Vite працює приблизно в
5 разів швидше (0.6 с проти 3 с). Але Vite не перевіряє типи, тому в скрипт `build` додано
`tsc --noEmit`, і саме він займає більшу частину часу збірки.

**TypeScript.** Важлива відмінність: webpack через `ts-loader` показує помилки типів прямо під
час розробки, а Vite лише прибирає типи й нічого не перевіряє. У Vite-версії помилки типів
ловлять редактор, `npm run typecheck` і `tsc` у скрипті збірки.

**UI-фреймворк.** Bootstrap підключається однаково просто: `import 'bootstrap/dist/css/bootstrap.min.css'`
та `import { Modal } from 'bootstrap'`. У webpack для цього потрібні правила для `.css`, у Vite —
нічого.

**Екосистема.** У webpack дуже велика й зріла екосистема лоадерів і плагінів, а налаштувати можна
будь-яку дрібницю. Ціна — складніша конфігурація. Vite сумісний з плагінами Rollup/Rolldown і
закриває типові потреби SPA без плагінів. Для нестандартних збірок гнучкість webpack усе ще може
бути перевагою.

**Суб'єктивна оцінка.** Для невеликого SPA на кшталт цього Vite зручніший: швидший старт і
оновлення, менше залежностей і майже порожня конфігурація. Webpack корисно налаштувати хоча б
раз, щоб зрозуміти, що відбувається «під капотом» (лоадери, плагіни, бандл). Але для нового
проєкту такого розміру я обрав би Vite.
