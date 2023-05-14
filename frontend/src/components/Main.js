import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import avatar from '../images/avatar.jpg';
import Card from './Card.js';

// Компонент основного контента страницы
function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards }) {
  // Получение данных текущего пользователя из контекста
  const currentUser = useContext(CurrentUserContext);

  // Рендер компонента Main
  return (
    <main className="content">
      <section className="profile" aria-label="Описание профиля">
        <button className="profile__edit-image" onClick={onEditAvatar} type="button">
          <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : avatar} alt="Аватарка" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-btn opacity-on-hover"
            type="button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-btn opacity-on-hover"
          type="button"
          aria-label="Добавить картинки"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="cards" aria-label="Список карточек">
        <ul className="cards__container">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                name={card.name}
                link={card.link}
                likes={card.likes}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
                card={card}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
