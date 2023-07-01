export default function Card({ card, onCardClick }) {
    return(
        // <li className="element">
        <article className="element__article">
            <img
                className="element__image"
                src={card.link}
                alt={card.name}
                onClick={() => onCardClick({link: card.link, name: card.name})} />
            <button className="element__busket" type="button" />
            <div className="element__menu">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button className="element__like" type="button" />
                    <span className="element__likes" />
                </div>
            </div>
        </article>
        //  </li>
    )
}