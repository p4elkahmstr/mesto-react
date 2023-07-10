import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import LikeButton from "../LikeButton/LikeButton"

export default function Card({ card, onCardClick, onDelete }) {
    const currentUser = useContext(CurrentUserContext)
    return(
        // <li className="element">
        <article className="element__article">
            {currentUser._id === card.owner._id && <button className="element__busket" type="button" onClick={() => onDelete(card._id)} />}
            <img
                className="element__image"
                src={card.link}
                alt={card.name}
                onClick={() => onCardClick({link: card.link, name: card.name})} />
            {/* <button className="element__busket" type="button" onClick={onDelete} /> */}
            <div className="element__menu">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <LikeButton likes={card.likes} myid={currentUser._id} cardid={card._id}/>
                </div>
            </div>
        </article>
        //  </li>
    )
}