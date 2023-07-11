export default function PopupWithForm({ name, title, buttonTitle, children, isOpen, onClose, onSubmit, isValid=true }) {
  return(
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
      <div className="popup__container" onClick={(e => e.stopPropagation())}>
        <button className="popup__close" type="button" onClick={onClose}/>
        <form
          action="#"
          className="popup__form"
          name={name}
          noValidate
          id={name}
          onSubmit={onSubmit}
        >
          <h2 className="popup__title">{title}</h2>
          {children}
          <button
            type="submit"
            className={`popup__submit popup__submit_valid ${isValid ? '' : 'popup__submit_invalid'}`}
          >
            {buttonTitle || 'Сохранить'}
          </button>
        </form>
      </div>
    </section>
    )
}