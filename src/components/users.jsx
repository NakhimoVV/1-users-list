import React, { useState } from 'react'
import api from '../api'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId))
    }
    const renderPhrase = (number) => {
        let phrase = ' человек тусанет с тобой сегодня'
        if (number <= 4 && number >= 2)
            phrase = ' человека тусанут с тобой сегодня'
        return (
            <span className="badge bg-primary">
                {number}
                {phrase}
            </span>
        )
    }
    const setQualsClasses = (qual) => {
        let classes = 'm-1 badge bg-'
        classes += qual.color
        return classes
    }
    if (users.length === 0) {
        return (
            <h2>
                <span className="badge bg-danger">
                    Никто с тобой не тусанет
                </span>
            </h2>
        )
    }
    return (
        <>
            <h2>{renderPhrase(users.length)}</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>
                                {user.qualities.map((qual) => (
                                    <span
                                        className={setQualsClasses(qual)}
                                        key={qual._id}
                                    >
                                        {qual.name}
                                    </span>
                                ))}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate}/5</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(user._id)}
                                >
                                    delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Users
