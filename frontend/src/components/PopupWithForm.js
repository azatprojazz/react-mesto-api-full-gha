function PopupWithForm({ title, name, children, submitBtnText, isOpen, onClose, onSubmit, onOverlay }) {
  // Рендер компонента PopupWithForm
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlay}>
      <div className="popup__container">
        <button
          className="popup__close-btn opacity-on-hover"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-btn opacity-on-hover" type="submit">
            {submitBtnText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
