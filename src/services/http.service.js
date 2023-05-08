import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import { httpAuth } from '../hooks/useAuth'
import localStorageService from './localStorage.service'

const http = axios.create({
    baseURL: configFile.apiFirebasePoint
})

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url)
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
            //Refresh Tokens:
            const expiresDate = localStorageService.getTokenExpiresDate()
            const refreshToken = localStorageService.getRefreshToken()
            //проверка: истек ли токен? и существует ли он вообще?
            if (refreshToken && expiresDate < Date.now()) {
                const { data } = await httpAuth.post('token', {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                })
                //трансформируем данные для того чтобы установить обновленные токены
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                })
            }
            //подпись авторизации
            const accessToken = localStorageService.getAccessToken()
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken }
            }
        }
        return config
    },
    function (error) {
        return Promise.reject(error)
    }
)

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            res.data = { content: transformData(res.data) }
        }
        return res
    },
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500
        if (!expectedErrors) {
            console.log(error)
            toast.error('Somthing was wrong. Try it later!')
        }
        return Promise.reject(error)
    }
)

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
}

export default httpService
