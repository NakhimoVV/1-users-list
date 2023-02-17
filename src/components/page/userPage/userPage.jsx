import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import api from '../../../api'
import Qualities from '../../ui/qualities'

const UserPage = ({ userId }) => {
    const history = useHistory()
    const [user, setUser] = useState()
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    })
    const goToList = () => {
        user ? history.push('/users') : history.replace('/users')
    }

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <div>completedMeetings: {user.completedMeetings}</div>
                <h2>Rate: {user.rate}</h2>
                <button onClick={goToList}>Все Пользователи</button>
            </>
        )
    } else {
        return <h1>Loading</h1>
    }
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage
