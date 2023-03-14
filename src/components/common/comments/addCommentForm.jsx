import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import api from '../../../api'
import { validator } from '../../../utils/validator'

import SelectField from '../form/selectField'
import TextAreaField from '../form/textAreaField'

const initialData = { userId: '', content: '' }

const AddCommentForm = ({ onSubmit }) => {
    const [data, setData] = useState(initialData)
    const [users, setUsers] = useState({})
    const [errors, setErrors] = useState({})
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const validatorConfig = {
        userId: {
            isRequired: {
                message: 'Выберите от чьего имени вы хотите отправить сообщение'
            }
        },
        content: {
            isRequired: {
                message: 'Сообщение не может быть пустым'
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])
    const cleanForm = () => {
        setData(initialData)
        setErrors({})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        onSubmit(data)
        cleanForm()
    }
    //трансформируем объект для select'a
    const arrayOfUsers =
        users &&
        Object.keys(users).map((userId) => ({
            label: users[userId].name,
            value: users[userId]._id
        }))
    return (
        <div>
            <h2>New comment</h2>
            <form onSubmit={handleSubmit}>
                <SelectField
                    name="userId"
                    options={arrayOfUsers}
                    onChange={handleChange}
                    value={data.userId}
                    defaultOption="Выберите пользователя"
                    error={errors.userId}
                />
                <TextAreaField
                    label="Сообщение"
                    name="content"
                    onChange={handleChange}
                    value={data.content}
                    error={errors.content}
                />
                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary">Опубликовать</button>
                </div>
            </form>
        </div>
    )
}
AddCommentForm.propTypes = {
    onSubmit: PropTypes.func
}

export default AddCommentForm
