// Импорт React и хуков
import { useState, useEffect } from 'react';

// Импорт компонентов из библиотеки react-router-dom
import { Routes, Route, useNavigate } from 'react-router-dom';

// Импорт пользовательских компонентов
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Loader from './Loader';
import Login from './Login';
import PopupWithForm from './PopupWithForm';
import ProtectedRouteElement from './ProtectedRoute';
import Register from './Register';

// Импорт контекста и утилит
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import { authApi } from '../utils/authApi';

function App() {
  // Состояния для управления открытием и закрытием всплывающих окон
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  // Состояние для хранения сообщения всплывающего окна с информацией
  const [isInfoTooltipMessage, setIsInfoTooltipMessage] = useState('');
  // Состояние для хранения выбранной карточки
  const [selectedCard, setSelectedCard] = useState({});
  // Состояние для хранения текущего пользователя
  const [currentUser, setCurrentUser] = useState({});
  // Состояние для хранения карточек
  const [cards, setCards] = useState([]);
  // Состояние для хранения статуса входа пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  // Состояние для хранения успешности регистрации
  const [isRegistrationSuccess, setIsRegistrationSuccess] = useState(false);
  // Состояние для хранения электронной почты пользователя
  const [userEmail, setUserEmail] = useState('');
  // Состояние для управления отображением индикатора загрузки
  const [isLoading, setIsLoading] = useState(true);

  // Хук для навигации
  const navigate = useNavigate();

  // Проверяем, открыт ли хотя бы один попап
  const isAnyPopupOpen =
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isInfoTooltipOpen ||
    (selectedCard && selectedCard.link);

  // Функция для закрытия всплывающих окон по нажатию на Escape
  const handleEscClose = (evt) => {
    if (evt.code === 'Escape' && isAnyPopupOpen) {
      closeAllPopups();
    }
  };

  // Хук useEffect для добавления и удаления обработчика событий keydown
  // при монтировании и размонтировании компонента
  useEffect(() => {
    window.addEventListener('keydown', handleEscClose);
    return () => {
      window.removeEventListener('keydown', handleEscClose);
    };
  }, [isAnyPopupOpen]);

  // Получение данных пользователя и карточек при успешном входе
  // Запрашиваем данные только если пользователь авторизован (loggedIn === true)
  useEffect(() => {
    const fetchData = async () => {
      if (loggedIn) {
        try {
          const [userData, cardsData] = await Promise.all([api.getUserInfo(), api.getInitialCards()]);
          setCurrentUser(userData);
          setCards((prevCards) => [...prevCards, ...cardsData]);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchData();
  }, [loggedIn]);

  // Проверка токена при монтировании компонента
  // Валидация токена и установка состояния loggedIn и userEmail при успешной валидации
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const { data } = await authApi.validateToken(token);
          if (data) {
            setLoggedIn(true);
            setUserEmail(data.email);
            navigate('/', { replace: true });
          }
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    validateToken();
  }, [navigate]);

  // Функция для обновления информации о пользователе
  // Отправляет запрос на сервер с новыми данными пользователя, обновляет состояние currentUser и закрывает попап
  async function handleUpdateUser({ name, about }) {
    try {
      const userInfo = await api.editUserInfo({ name, about });
      setCurrentUser(userInfo);
      closeAllPopups();
    } catch (err) {
      console.log(err);
    }
  }

  // Функция для обновления аватара пользователя
  // Отправляет запрос на сервер с новым аватаром, обновляет состояние currentUser и закрывает попап
  async function handleUpdateAvatar({ avatar }) {
    try {
      const userData = await api.setNewAvatar({ avatar });
      setCurrentUser(userData);
      closeAllPopups();
    } catch (err) {
      console.log(err);
    }
  }

  // Функция для установки или удаления лайка карточки
  // Отправляет запрос на сервер для установки/удаления лайка и обновляет состояние cards
  async function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    try {
      const newCard = await api.addLikeCard(card._id, !isLiked);
      setCards(cards.map((card) => (card._id === newCard._id ? newCard : card)));
    } catch (err) {
      console.log(err);
    }
  }

  // Функция для добавления новой карточки
  // Отправляет запрос на сервер с данными новой карточки, добавляет новую карточку в состояние cards и закрывает попап
  async function handleAddPlaceSubmit({ name, link }) {
    try {
      const newCard = await api.addNewCard({ name, link });
      setCards([newCard, ...cards]);
      closeAllPopups();
    } catch (err) {
      console.log(err);
    }
  }

  // Функция для удаления карточки
  // Отправляет запрос на сервер для удаления карточки и обновляет состояние cards
  async function handleCardDelete(card) {
    try {
      await api.deleteCard(card._id);
      setCards((prevCards) => prevCards.filter((cards) => cards._id !== card._id));
    } catch (err) {
      console.log(err);
    }
  }

  // Функция для регистрации пользователя
  // Устанавливает состояние соответствующего попапа в true, что приводит к его открытию
  async function handleRegisterClick(email, password) {
    try {
      await authApi.registerUser(email, password);
      navigate('/sign-in', { replace: true });
      setIsRegistrationSuccess(true);
      handleSignup('Вы успешно зарегистрировались!');
    } catch (err) {
      console.log(err);
      setIsRegistrationSuccess(false);
      handleSignup('Что-то пошло не так! Попробуйте еще раз.');
    }
  }

  // Функция для входа пользователя
  // Устанавливает состояние всех попапов в false, что приводит к их закрытию
  async function handleLoginClick(email, password) {
    try {
      const data = await authApi.loginUser(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        setLoggedIn(true);
        setUserEmail(email);
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.log(err);
      setIsRegistrationSuccess(false);
      handleSignup('Что-то пошло не так! Попробуйте еще раз.');
    }
  }

  // Отображение индикатора загрузки, если данные еще не получены
  if (isLoading) {
    return <Loader />;
  }

  // Функция для выхода из аккаунта
  function handleSignout() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate('/sign-in', { replace: true });
  }

  // Функция для отображения сообщения после попытки регистрации или входа
  function handleSignup(message) {
    setIsInfoTooltipMessage(message);
    setIsInfoTooltipOpen(true);
  }

  // Функции для открытия всплывающих окон
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  // Функция для открытия всплывающего окна с изображением карточки
  function handleCardClick(name, link) {
    setSelectedCard({
      isOpen: true,
      name,
      link,
    });
  }

  // Функция для закрытия всплывающих окон по клику на оверлей
  function closePopupsByOverlay(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  // Функция для закрытия всех всплывающих окон
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({
      ...selectedCard,
      isOpen: false,
    });
  }

  // Рендер компонента App
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page">
          <Header userEmail={userEmail} onSignout={handleSignout} />
          <Routes>
            <Route path="/sign-up" element={<Register onSignup={handleRegisterClick} />} />
            <Route path="/sign-in" element={<Login onSignin={handleLoginClick} />} />
            <Route
              exact
              path="/"
              element={
                <ProtectedRouteElement
                  component={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onOverlay={closePopupsByOverlay}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onOverlay={closePopupsByOverlay}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlay={closePopupsByOverlay}
        />

        <PopupWithForm title="Вы уверены?" name="remove" submitBtnText="Да" onOverlay={closePopupsByOverlay} />

        <InfoTooltip
          name="infoTooltip"
          isOpen={isInfoTooltipOpen}
          message={isInfoTooltipMessage}
          isSuccess={isRegistrationSuccess}
          onClose={closeAllPopups}
          onOverlay={closePopupsByOverlay}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} onOverlay={closePopupsByOverlay} />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;
