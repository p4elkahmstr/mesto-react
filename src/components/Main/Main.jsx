import { useEffect, useState } from "react"
import api from "../../utils/api"
import Card from "../Card/Card.jsx"

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCards]) => {
      setUserName(dataUser.name)
      setUserDescription(dataUser.about)
      setUserAvatar(dataUser.avatar)
      dataCards.forEach(data => data.myid = dataUser._id)
      setCards(dataCards)
    })
  }, [])

  return(
    <main>
      <section className="profile">
        <div className="profile__bio">
          <button className="profile__edit-avatar" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="аватар" />
          </button>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}/>
            <p className="profile__subtitle">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}/>
      </section>
      <section className="elements" aria-label="Картинки">
        <ul className="elements__list">
          {cards.map(data => {
            return(
              <li className="element" key = {data._id}>
                <Card card={data} onCardClick={onCardClick}/>
              </li>
          )
          })}
        </ul>
      </section>
    </main>
    )
}