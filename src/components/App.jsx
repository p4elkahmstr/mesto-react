import Header from './Header/Header.jsx'
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import PopupWithForm from './PopupWithForm/PopupWithForm.jsx';
import PopupImage from './PopupImage/PopupImage.jsx';
import { useState } from 'react';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setIsImagePopup] = useState(false)

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopup(false)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAppPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  // function handleDelete() {

  // }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopup(true)
    // setEventListenerForDocument()

  }

  return (
    <div className="page__content">

      <Header/>

      <Main
        onEditProfile = {handleEditProfileClick}
        onAddPlace = {handleAppPlaceClick}
        onEditAvatar = {handleEditAvatarClick}
        onCardClick = {handleCardClick}
      />

      <Footer/>

      <PopupWithForm
        name = 'profile-edit'
        title = 'Редактировать профиль'
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          type="text"
          id="username"
          name="username"
          className="popup__input popup__input_valid"
          required=""
          minLength={2}
          maxLength={40}
        />
        <span id="username-error" className="popup__error username-error" />
        <input
          type="text"
          id="description"
          name="description"
          className="popup__input popup__input_valid"
          required=""
          minLength={2}
          maxLength={200}
        />
        <span
          id="description-error"
          className="popup__error description-error"
        />
      </PopupWithForm>

      <PopupWithForm
        name='add-card'
        title='Новое место'
        buttonTitle='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          type="text"
          id="title"
          name="title"
          className="popup__input popup__input_valid"
          placeholder="Название"
          required=""
          minLength={2}
          maxLength={30}
        />
        <span id="title-error" className="popup__error title-error" />
        <input
          type="url"
          id="link"
          name="link"
          className="popup__input popup__input_valid"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span id="link-error" className="popup__error link-error" />
      </PopupWithForm>
      
      <PopupWithForm
        name='avatar-edit'
        title='Редактировать профиль'
        isOpen={isEditAvatarPopupOpen}
        onClose = {closeAllPopups}
      >
        <input
          type="url"
          id="avatar"
          name="avatar"
          className="popup__input popup__input_valid"
          required=""
          minLength={2}
          placeholder="Ссылка на картинку"
        />
        <span id="avatar-error" className="popup__error avatar-error" />
      </PopupWithForm>

      <PopupWithForm
        name='delete'
        title='Вы уверены?'
        buttonTitle='Да'
      />

      <PopupImage
        card={selectedCard}
        isOpen={isImagePopup}
        onClose={closeAllPopups}
        />  
    </div>
  );
}

export default App;
