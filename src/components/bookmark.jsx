<<<<<<< HEAD
const BookMark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={'bi bi-bookmark' + (status ? '-star-fill' : '')}></i>
        </button>
    )
}
=======
import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ status, ...rest }) => {
    return (
        <button {...rest}>
            <i className={'bi bi-bookmark' + (status ? '-heart-fill' : '')}></i>
        </button>
    )
}
BookMark.propTypes = {
    status: PropTypes.bool.isRequired
}
>>>>>>> standart-version
export default BookMark
