import { useRef } from "react"
import useValidationForm from "../../utils/useValidationForm"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const input = useRef()
    const { values, errors, isInputValid, isValid, handleChange, reset } = useValidationForm()

    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(e) {
        e.preventDefault()
        onUpdateAvatar({avatar: input.current.value}, reset)
    }

    return(
        <PopupWithForm
          name='avatar-edit'
          title='Редактировать профиль'
          isOpen={isOpen}
          isValid={isValid}
          onClose = {resetForClose}
          onSubmit={handleSubmit}
        >
          <input
            ref={input}
            type="url"
            id="avatar"
            name="avatar"
            className={`popup__input popup__input_valid ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_invalid'}`}
            required
            minLength={2}
            placeholder="Ссылка на картинку"
            value={values.avatar ? values.avatar : ''}
            onChange={handleChange}
          />
          <span id="avatar-error" className="popup__error avatar-error">{errors.avatar}</span>
        </PopupWithForm>
    )
}