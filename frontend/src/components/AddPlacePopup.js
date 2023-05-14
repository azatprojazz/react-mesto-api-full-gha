import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

// Компонент всплывающего окна для добавления новой карточки
function AddPlacePopup({ isOpen, onClose, onAddPlace, onOverlay }) {
  // Состояние для хранения значения полей ввода имени и ссылки на картинку
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  // Эффект для сброса полей ввода при открытии всплывающего окна
  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  // Обработчик изменения поля ввода имени
  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  // Обработчик изменения поля ввода ссылки на картинку
  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  // Обработчик отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    });
    setName('');
    setLink('');
  }

  // Рендер компонента AddPlacePopup
  return (
    <PopupWithForm
      title="Новое место"
      name="cards"
      submitBtnText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlay={onOverlay}
    >
      <input
        className="popup__input popup__input_content_card-name"
        value={name}
        onChange={handleChangeName}
        type="text"
        id="name-card"
        name="name"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        required="required"
        placeholder="Именование картинки"
      />
      <span className="popup__error" id="name-card-error"></span>
      <input
        className="popup__input popup__input_content_card-link"
        value={link}
        onChange={handleChangeLink}
        type="url"
        id="link"
        name="link"
        autoComplete="off"
        required="required"
        placeholder="Ссылка на картинку"
      />
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
