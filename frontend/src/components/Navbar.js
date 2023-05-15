import { Routes, Route, NavLink } from 'react-router-dom';

// Компонент навигационного меню
function Navbar({ userEmail, onSignout }) {
  // Рендер компонента Navbar
  return (
    <nav className="menu">
      <Routes>
        <Route
          path="/signup"
          element={
            <NavLink to="/signin" className="menu__link opacity-on-hover">
              Войти
            </NavLink>
          }
        />
        <Route
          path="/signin"
          element={
            <NavLink to="/signup" className="menu__link opacity-on-hover">
              Регистрация
            </NavLink>
          }
        />
        <Route
          path="/"
          element={
            <>
              <p className="menu__email">{userEmail}</p>
              <button type="button" className="menu__btn-exit opacity-on-hover" onClick={onSignout}>
                Выйти
              </button>
            </>
          }
        />
      </Routes>
    </nav>
  );
}

export default Navbar;
