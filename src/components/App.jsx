import Header from './Header/Header.jsx'
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import PopupWithForm from './PopupWithForm/PopupWithForm.jsx';
import ImagePopup from './ImagePopup/ImagePopup.jsx';
import { useCallback, useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js'
import api from "../utils/api.js"
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.jsx';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [isImagePopup, setIsImagePopup] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

  const [currentUser, setCurrentUser] = useState({})

  const [cards, setCards] = useState([])
  const [deleteCardId, setDeleteCardId] = useState('')

  const setAllStatesForClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopup(false)
    setIsDeletePopupOpen(false)
  }, [])

  const closePopupByEsc = useCallback ((e) => {
    if (e.key === 'Escape') {
      setAllStatesForClosePopups()
      document.removeEventListener('keydown', closePopupByEsc)
  }}, [setAllStatesForClosePopups])

  const closeAllPopups = useCallback(() => {
    setAllStatesForClosePopups()
    document.removeEventListener('keydown', closePopupByEsc)
  }, [setAllStatesForClosePopups, closePopupByEsc])

  function setEventListenerForDocument() {
    document.addEventListener('keydown', closePopupByEsc)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleAppPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    setEventListenerForDocument()
  }

  function handleDeleteCardClick(cardId) {
    setDeleteCardId(cardId)
    setIsDeletePopupOpen(true)
    setEventListenerForDocument()
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopup(true)
    setEventListenerForDocument()

  }

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCards]) => {
      setCurrentUser(dataUser)
      setCards(dataCards)
    })
    .catch((err) => console.log(err));
  }, [])

  function handleCardDelete(e) {
    e.preventDefault()
    api.deleteCard(deleteCardId)
    .then(() => {
      setCards(cards.filter(card => {
        return card._id !== deleteCardId
      }))
      closeAllPopups()
    })
    .catch((err) => console.log(err))
  }

  function handleUpdateUser(dataUser, reset) {
    api.setUserInfo(dataUser)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
      reset()
    })
    .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(dataUser, reset) {
    api.setNewAvatar(dataUser)
    .then(res => {
      setCurrentUser(res)
      closeAllPopups()
      reset()
    })
    .catch((err) => console.log(err))
  }

  function handleAddCard(dataCard, reset) {
    api.addCard(dataCard)
    .then((res) => {
      setCards([res, ...cards])
      closeAllPopups()
      reset()
    })
    .catch((err => console.log(err)))
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">

        <Header/>

        <Main
          onEditProfile = {handleEditProfileClick}
          onAddPlace = {handleAppPlaceClick}
          onEditAvatar = {handleEditAvatarClick}
          onCardClick = {handleCardClick}
          onDelete = {handleDeleteCardClick}
          cards = {cards}
        />

        <Footer/>

        <EditProfilePopup
          onUpdateUser = {handleUpdateUser}
          isOpen = {isEditProfilePopupOpen}
          onClose ={closeAllPopups}
        />

        <AddPlacePopup 
        onAddPlace = {handleAddCard}
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        />

        <EditAvatarPopup
        onUpdateAvatar = {handleUpdateAvatar}
        isOpen = {isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
        />

        <PopupWithForm
          name = 'delete'
          title = 'Вы уверены?'
          buttonTitle = 'Да'
          isOpen = {isDeletePopupOpen}
          onClose = {closeAllPopups}
          onSubmit = {handleCardDelete}
        />

        <ImagePopup
          card = {selectedCard}
          isOpen = {isImagePopup}
          onClose = {closeAllPopups}
          />  
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
