export default function PopupImage({ card, isOpen, onClose }) {
    return(
        <section className={`popup popup_picture ${isOpen && 'popup_opened'}`}>
            <div className="popup__card">
            <button className="popup__close popup__close_picture" type="button" onClick={onClose}/>
            <figure className="popup__content">
                <img className="popup__img" src={card.link ? card.link : '#'} alt={card.name ? card.name : '#'} />
                <figcaption className="popup__text">{card.name}</figcaption>
            </figure>
            </div>
      </section>
    )
}