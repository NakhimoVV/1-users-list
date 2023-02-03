import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import QualitiesList from './qualitiesList'

const UserPage = ({ user }) => {
    const history = useHistory()
    const goToList = () => {
        user ? history.push('/users') : history.replace('/users')
    }

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <div>completedMeetings: {user.completedMeetings}</div>
                <h2>Rate: {user.rate}</h2>
                <button onClick={goToList}>Все Пользователи</button>
            </>
        )
    }
    return <h1>Loading</h1>
}

UserPage.propTypes = {
    user: PropTypes.object
}

export default UserPage
