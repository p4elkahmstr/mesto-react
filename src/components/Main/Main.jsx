import { useContext } from "react"
import Card from "../Card/Card.jsx"
import CurrentUserContext from "../../contexts/CurrentUserContext"

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onDelete, cards }) {
  const currentUser = useContext(CurrentUserContext)

  return(
    <main>
      <section className="profile">
        <div className="profile__bio">
          <button className="profile__edit-avatar" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : '#'} alt="аватар" />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name ? currentUser.name : ''}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}/>
            <p className="profile__subtitle">{currentUser.about ? currentUser.about : ''}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}/>
      </section>
      <section className="elements" aria-label="Картинки">
        <ul className="elements__list">
          {cards.map(data => {
            return(
              <li className="element" key = {data._id}>
                <Card card={data} onCardClick={onCardClick} onDelete={onDelete}/>
              </li>
          )
          })}
        </ul>
      </section>
    </main>
    )
}