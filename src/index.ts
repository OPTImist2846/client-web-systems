import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

import { LibraryService } from './services/LibraryService';
import { NotificationService } from './services/NotificationService';
import { SEED_BOOKS } from './services/seedData';
import { Storage } from './services/Storage';
import { App } from './ui/render';

const root = document.getElementById('app');
if (!root) {
  throw new Error('Не знайдено елемент #app в index.html');
}

const storage = new Storage(window.localStorage);
const service = new LibraryService(storage);
const notifications = new NotificationService();

if (!service.hasSavedData) {
  SEED_BOOKS.forEach((book) => service.addBook(book));
}

new App(root, service, notifications).mount();
