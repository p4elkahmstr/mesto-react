import { useCallback, useState } from "react";

export default function useValidationForm() {

    const [values, setValues] = useState({})
    const [errors, setErrors] = useState({})
    const [isInputValid, setIsInputValid] = useState({})
    const [isValid, setIsValid] = useState(false)

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        const validationMessage = e.target.validationMessage
        const valid = e.target.validity.valid
        const form = e.target.form
        
        setValues((oldValues) => {
            return { ...oldValues, [name]: value }
        })

        setErrors((oldErrors) => {
            return { ...oldErrors, [name]: validationMessage }
        })

        setIsInputValid((oldIsInputValid) => {
            return { ...oldIsInputValid, [name]: valid }
        })

        setIsValid(form.checkValidity())
    }

    function reset(data={}) {
        setValues(data)
        setErrors({})
        setIsInputValid({})
        setIsValid(false)
    }

    const setValue = useCallback((name, value) => {
        setValues((oldValues) => {
            return { ...oldValues, [name]: value }
        })
    }, [])

    return { values, errors, isInputValid, isValid, handleChange, reset, setValue }
}