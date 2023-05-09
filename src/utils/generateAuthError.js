function generateAuthError(message) {
    switch (message) {
        case 'INVALID_PASSWORD':
            return 'Email или Пароль введены не корректно'
        case 'EMAIL_EXISTS':
            return 'Пользователь с таким Email уже существует'
        default:
            return 'Слишком много попыток входа. Попробуйте позднее'
    }
}
export default generateAuthError
