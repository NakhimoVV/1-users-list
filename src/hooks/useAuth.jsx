import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import localStorageService, {
    setTokens
} from '../services/localStorage.service'
import { useHistory } from 'react-router-dom'

export const httpAuth = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/',
    params: { key: process.env.REACT_APP_FIREBASE_KEY }
})
const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState()
    const [error, setError] = useState(null)
    //реализуем global загрузку:
    const [isLoading, setLoading] = useState(true)
    const history = useHistory()

    function logOut() {
        localStorageService.removeAuthData() //чистим localStorage
        setUser(null) //чистим текущего пользователя
        history.push('/') //переадресовываем на главную
    }

    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    async function updateUserData(data) {
        try {
            const { content } = await userService.update(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    async function signUp({ email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post('accounts:signUp', {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(1, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest
            })
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'Пользователь с таким Email уже существует'
                    }
                    throw errorObject
                }
            }
        }
    }
    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                'accounts:signInWithPassword',
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            )
            setTokens(data)
            await getUserData() //получаем данные о текущем юзере
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                switch (message) {
                    case 'INVALID_PASSWORD':
                        throw new Error('Email или Пароль введены не корректно')

                    default:
                        throw new Error(
                            'Слишком много попыток входа. Попробуйте позднее'
                        )
                }
            }
        }
    }
    async function createUser(data) {
        try {
            const { content } = await userService.create(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser()
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        } finally {
            //после загрузки пользователя ставим false
            setLoading(false)
        }
    }
    useEffect(() => {
        //если есть токен будем получать текущего (авторизованого) пользователя
        if (localStorageService.getAccessToken) {
            //запрашиваем данные в начале загрузки
            getUserData()
        } else {
            //но если нет этого токена, необходимо отобразить данные
            //для пользователя, который не авторизован --> поэтому else:
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    return (
        <AuthContext.Provider
            value={{ signUp, signIn, currentUser, logOut, updateUserData }}
        >
            {!isLoading ? children : 'Loading...'}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AuthProvider
