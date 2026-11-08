import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.scss';

const root = document.getElementById('app');
if (root) {
  const title = document.createElement('h1');
  title.className = 'text-center my-4 app-title';
  title.textContent = 'Система Управління Бібліотекою';
  root.append(title);
}
