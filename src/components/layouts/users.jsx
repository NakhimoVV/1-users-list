import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
import UserPage from '../userPage'
import UsersList from '../usersList'

const Users = () => {
    const { userId } = useParams()
    const [user, setUser] = useState()

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    }, [userId])

    return <>{userId ? <UserPage user={user} /> : <UsersList />}</>
}

export default Users
