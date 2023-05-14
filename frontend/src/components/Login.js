import { useState } from 'react';

// Компонент формы входа пользователя
function Login({ onSignin }) {
  // Состояния для хранения значений полей ввода электронной почты и пароля
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Обработчики изменения полей ввода электронной почты и пароля
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    onSignin(email, password);
  }

  // Рендер компонента Login
  return (
    <section className="section content">
      <h2 className="section__header">Вход</h2>
      <form className="section__form" onSubmit={handleSubmit}>
        <input
          className="section__input"
          autoComplete="email"
          type="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="Email"
        />
        <input
          className="section__input"
          autoComplete="current-password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="Пароль"
        />
        <button className="section__btn opacity-on-hover" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}

export default Login;
