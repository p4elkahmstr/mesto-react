export default function PopupWithForm({ name, title, buttonTitle, children, isOpen, onClose }) {
  return(
    <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={onClose}/>
        <form
          action="#"
          className="popup__form"
          name={name}
          noValidate=""
          id={name}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            className="popup__submit popup__submit_valid"
            disabled=""
          >
            {buttonTitle || 'Сохранить'}
          </button>
        </form>
      </div>
    </section>
    )
}