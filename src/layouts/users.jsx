import React from 'react'
import { useParams } from 'react-router-dom'

import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import EditUserPage from '../components/page/editUserPage'
import UserProvider from '../hooks/useUsers'

const Users = () => {
    const { userId, edit } = useParams()
    return (
        <UserProvider>
            {userId ? (
                edit ? (
                    <EditUserPage />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    )
}

export default Users
