// Импорт основных библиотек и зависимостей
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css'; // Импорт глобальных стилей
import App from './components/App'; // Импорт главного компонента приложения
import reportWebVitals from './reportWebVitals'; // Импорт функции для измерения производительности

// Создание корневого элемента для рендеринга приложения
const root = ReactDOM.createRoot(document.getElementById('root'));

// Рендеринг приложения с использованием строгого режима и роутера
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

/*
 * basename  - это атрибут, который принимает компонент  BrowserRouter.
 * Он определяет базовый URL-путь для всех дочерних компонентов  Route  и  Link  внутри него.
 * Это полезно, когда ваше приложение размещается в подпапке на сервере, а не в корне домена.
 * process.env.PUBLIC_URL  - это переменная среды, которая хранит публичный URL-путь вашего приложения.
 * Она автоматически определяется и устанавливается средой сборки Create React App во время сборки проекта.
 * Это значит, что при развертывании вашего приложения на сервере, process.env.PUBLIC_URL будет содержать путь к публичной папке вашего приложения.
 * Используя basename={process.env.PUBLIC_URL}, вы гарантируете, что роутер будет работать корректно, даже если ваше приложение будет размещено в подпапке на сервере.
 * Все дочерние компоненты  Route  и  Link  будут использовать этот базовый путь для своих маршрутов и ссылок, предотвращая возможные проблемы с навигацией.
 */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
