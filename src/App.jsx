import React, { useState } from 'react'
import api from './api'
import Users from './components/users'
import SearchStatus from './components/searchStatus'

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId))
    }
    const handleToggleBookMark = (id) => {
        const newUsers = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        setUsers(newUsers)
    }
    return (
        <>
            <h2>
                <SearchStatus length={users.length} />
            </h2>
            {users.length > 0 && (
                <Users
                    users={users}
                    onUserClick={handleDelete}
                    onBookMarkClick={handleToggleBookMark}
                />
            )}
        </>
    )
}
export default App
