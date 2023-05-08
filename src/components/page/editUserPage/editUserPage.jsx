import React, { useState, useEffect } from 'react'
import { validator } from '../../../utils/validator'
import { useHistory, useParams } from 'react-router-dom'

import MultiSelectField from '../../common/form/multiSelectField'
import RadioField from '../../common/form/radioField'
import SelectField from '../../common/form/selectField'
import TextField from '../../common/form/textField'
import BackHistoryButton from '../../common/backButton'
import { useProfessions } from '../../../hooks/useProfession'
import { useQualities } from '../../../hooks/useQualities'
import { useAuth } from '../../../hooks/useAuth'

const EditUserPage = () => {
    const { userId } = useParams()
    const history = useHistory()
    const { currentUser, updateUser } = useAuth()
    const { professions } = useProfessions()
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }))
    const { qualities, getQuality } = useQualities()
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id,
        color: q.color
    }))

    const [data, setData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        profession: currentUser.profession,
        sex: currentUser.sex,
        qualities: transformData(transformQualIds(currentUser.qualities))
    })
    const [errors, setErrors] = useState({})

    const getProfessionById = (id) => {
        for (const prof of professionsList) {
            if (prof.value === id) {
                return prof.value
            }
        }
    }
    const getQualities = (elements) => {
        const qualitiesArray = []
        for (const elem of elements) {
            for (const quality in qualitiesList) {
                if (elem.value === qualitiesList[quality].value) {
                    qualitiesArray.push(qualitiesList[quality].value)
                }
            }
        }
        return qualitiesArray
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const { profession, qualities } = data
        const newData = {
            ...currentUser,
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        }
        try {
            await updateUser(newData)
            history.push(`/users/${newData._id}`)
        } catch (error) {
            setErrors(error)
        }
    }
    function transformData(data) {
        //каждое качество превращаем в пары label, value
        return data.map((qual) => ({ label: qual?.name, value: qual?._id }))
    }
    function transformQualIds(qualIds) {
        return qualIds.map((id) => getQuality(id))
    }

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

    if (currentUser._id === userId) {
        return (
            <div className="container mt-5">
                <BackHistoryButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {professions.length > 0 &&
                        qualities.length > 0 &&
                        currentUser ? (
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
                                    options={professionsList}
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
                                    options={qualitiesList}
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
                        )}
                    </div>
                </div>
            </div>
        )
    } else {
        history.push('/login')
    }
}

export default EditUserPage
