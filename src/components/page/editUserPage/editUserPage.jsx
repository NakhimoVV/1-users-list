import React, { useState, useEffect } from 'react'
import { validator } from '../../../utils/validator'
import api from '../../../api'
import { useHistory, useParams } from 'react-router-dom'

import MultiSelectField from '../../common/form/multiSelectField'
import RadioField from '../../common/form/radioField'
import SelectField from '../../common/form/selectField'
import TextField from '../../common/form/textField'

const EditUserPage = () => {
    const { userId } = useParams()
    const history = useHistory()
    //необходим isLoading потомучто будем загружать данные, и
    //необходимо чтобы форма отобразилась уже с загруженными данными
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    })
    const [professions, setProfessions] = useState([])
    const [qualities, setQualities] = useState([])
    const [errors, setErrors] = useState({})

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label }
            }
        }
    }
    const getQualities = (elements) => {
        const qualitiesArray = []
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    })
                }
            }
        }
        return qualitiesArray
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const { profession, qualities } = data
        api.users
            .update(userId, {
                ...data,
                profession: getProfessionById(profession),
                qualities: getQualities(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`))
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        })
    }
    const transformData = (data) => {
        //каждое качество превращаем в пары label, value
        return data.map((qual) => ({ label: qual.name, value: qual._id }))
    }
    useEffect(() => {
        setIsLoading(true)
        api.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        )
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }))
            setProfessions(professionsList)
        })
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                value: data[optionName]._id,
                label: data[optionName].name,
                color: data[optionName].color
            }))
            setQualities(qualitiesList)
        })
    }, [])
    useEffect(() => {
        //обрабатываем случай когда данные уже обновились
        if (data._id) setIsLoading(false)
    }, [data])

    const validatorConfig = {
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения'
            }
        },
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        }
    }
    useEffect(() => {
        validate()
    }, [data])
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {
                        //условие: в случае если нет загрузки и загружены профессии
                        //то отображаем поля
                        !isLoading && Object.keys(professions).length > 0 ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выберите свою профессию"
                                    defaultOption="Choose..."
                                    name="profession"
                                    options={professions}
                                    value={data.profession}
                                    onChange={handleChange}
                                    error={errors.profession}
                                />
                                <RadioField
                                    label="Выберите ваш пол"
                                    options={[
                                        { name: 'Male', value: 'male' },
                                        { name: 'Female', value: 'female' },
                                        { name: 'Other', value: 'other' }
                                    ]}
                                    name="sex"
                                    onChange={handleChange}
                                    value={data.sex}
                                />
                                <MultiSelectField
                                    label="Выберите ваши качества"
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        ) : (
                            'loading...'
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default EditUserPage
