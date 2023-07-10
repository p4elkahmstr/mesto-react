import { useContext, useEffect } from "react";
import useValidationForm from "../../utils/useValidationForm";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";


export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const { values, errors, isInputValid, isValid, handleChange, reset, setValue } = useValidationForm()
    const currentUser = useContext(CurrentUserContext)

    useEffect(() => {
        setValue("username", currentUser.name)
        setValue("description", currentUser.about)
    }, [currentUser, setValue])

    function resetForClose() {
        onClose()
        reset({ username: currentUser.name, description: currentUser.about })
    }

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateUser({ username: values.username, description: values.description }, reset)
    }

    return(
        <PopupWithForm
          name='profile-edit'
          title='Редактировать профиль'
          isOpen={isOpen}
          onClose={resetForClose}
          isValid={isValid}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="username"
            name="username"
            className={`popup__input popup__input_valid ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_invalid'}`}
            required
            minLength={2}
            maxLength={40}
            value={values.username ? values.username : ''}
            onChange={handleChange}
          />
          <span id="username-error" className="popup__error username-error">{errors.username}</span>
          <input
            type="text"
            id="description"
            name="description"
            className={`popup__input popup__input_valid ${isInputValid.description === undefined || isInputValid.description ? '' : 'popup__input_invalid'}`}
            required
            minLength={2}
            maxLength={200}
            value={values.description ? values.description : ''}
            onChange={handleChange}
          />
          <span
            id="description-error"
            className="popup__error description-error"
          >{errors.description}</span>
        </PopupWithForm>
    )
}