// Компонент всплывающего окна для просмотра изображения
function ImagePopup({ card, onClose, onOverlay }) {
  // Рендер компонента ImagePopup
  return (
    <div className={`popup popup_type_view-card ${card.isOpen ? 'popup_opened' : ''}`} onClick={onOverlay}>
      <div className="popup__view-container">
        <button
          className="popup__close-btn opacity-on-hover"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
