import useValidationForm from "../../utils/useValidationForm";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const { values, errors, isInputValid, isValid, handleChange, reset } = useValidationForm()

    function resetForClose() {
        onClose()
        reset()
    }

    function handleSubmit(e) {
        e.preventDefault()
        onAddPlace({ title: values.title, link: values.link }, reset)
    }

    return(
        <PopupWithForm
          name='add-card'
          title='Новое место'
          buttonTitle='Создать'
          isOpen={isOpen}
          isValid={isValid}
          onClose={resetForClose}
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            id="title"
            name="title"
            className={`popup__input popup__input_valid ${isInputValid.title === undefined || isInputValid.title ? '' : 'popup__input_invalid'}`}
            placeholder="Название"
            required
            minLength={2}
            maxLength={30}
            value={values.title ? values.title : ''}
            onChange={handleChange}
          />
          <span id="title-error" className="popup__error title-error">{errors.title}</span>
          <input
            type="url"
            id="link"
            name="link"
            className={`popup__input popup__input_valid ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_invalid'}`}
            placeholder="Ссылка на картинку"
            required
            value={values.link ? values.link : ''}
            onChange={handleChange}
          />
          <span id="link-error" className="popup__error link-error">{errors.link}</span>
        </PopupWithForm>
    )
}