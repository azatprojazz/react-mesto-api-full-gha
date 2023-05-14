import success from '../images/success.svg';
import unsuccess from '../images/unsuccess.svg';

// Компонент всплывающего окна с информационным сообщением и иконкой успеха/неудачи
function InfoTooltip({ name, isOpen, onOverlay, onClose, isSuccess, message }) {
  // Рендер компонента InfoTooltip
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onOverlay}>
      <div className="popup__container popup__container-info">
        <button
          className="popup__close-btn opacity-on-hover"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img className="popup__img-success" src={isSuccess ? success : unsuccess} alt="#" />
        <h3 className="popup__title-success">{message}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
