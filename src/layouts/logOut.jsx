import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../store/users'

const LogOut = () => {
    const dispatch = useDispatch()

    //и теперь в момент монтирования необходимо вызвать эту функцию
    useEffect(() => {
        dispatch(logOut())
    }, [])

    return <h1>Loading ...</h1>
}

export default LogOut
