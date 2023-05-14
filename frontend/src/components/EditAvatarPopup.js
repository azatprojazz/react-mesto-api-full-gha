import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

// Компонент всплывающего окна для обновления аватара пользователя
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onOverlay }) {
  // Создание ссылки на поле ввода аватара с помощью useRef
  const avatarRef = useRef();

  // Эффект для сброса поля ввода при открытии всплывающего окна
  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  // Обработчик отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();

    // Вызов функции onUpdateAvatar с новым значением аватара
    onUpdateAvatar({
      avatar: avatarRef.current.value, // Значение инпута, полученное с помощью рефа
    });
    avatarRef.current.value = '';
  }

  // Рендер компонента EditAvatarPopup
  return (
    <PopupWithForm
      title="Обновить аватар"
      name="avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlay={onOverlay}
    >
      <input
        className="popup__input"
        ref={avatarRef}
        type="url"
        id="avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
      />
      <span className="popup__error" id="avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
