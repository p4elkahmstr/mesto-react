export default function ImagePopup({ card, isOpen, onClose }) {
    return(
        <section className={`popup popup_picture ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>
            <div className="popup__card" onClick={(e => e.stopPropagation())}>
            <button className="popup__close popup__close_picture" type="button" onClick={onClose}/>
            <figure className="popup__content">
                <img className="popup__img" src={card.link ? card.link : '#'} alt={card.name ? card.name : '#'} />
                <figcaption className="popup__text">{card.name}</figcaption>
            </figure>
            </div>
      </section>
    )
}