import React from 'react'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const isLoggedIn = useSelector(getIsLoggedIn())

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isLoggedIn) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
                //и если он существует мы должны вернуть компонент
                return Component ? <Component {...props} /> : children
            }}
        />
    )
}
ProtectedRoute.propTypes = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ProtectedRoute
