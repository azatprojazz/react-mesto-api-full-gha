import logo from '../images/header-logo.svg';
import Navbar from './Navbar';

// Компонент шапки (заголовка) для отображения логотипа и навигационного меню
function Header({ userEmail, onSignout }) {
  // Рендер компонента Header
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип Россия" />
      <Navbar userEmail={userEmail} onSignout={onSignout} />
    </header>
  );
}

export default Header;
