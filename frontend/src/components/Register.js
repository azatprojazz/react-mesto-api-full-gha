import { useState } from 'react';
import { Link } from 'react-router-dom';

// Компонент формы регистрации
function Register({ onSignup }) {
  // Состояние для хранения значения полей email и пароль
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Обработчики изменения полей email и пароль
  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  // Обработчик отправки формы
  function handleSubmit(e) {
    e.preventDefault();
    onSignup(email, password);
  }

  // Рендер компонента Register
  return (
    <section className="section content">
      <h2 className="section__header">Регистрация</h2>
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
          autoComplete="new-password"
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="Пароль"
        />
        <button className="section__btn opacity-on-hover" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="section__question">
        Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="section__link opacity-on-hover">
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;
