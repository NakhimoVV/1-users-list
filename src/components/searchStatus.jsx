<<<<<<< HEAD
const SearchStatus = ({ length }) => {
    let phrase = ' человек тусанет с тобой сегодня'
    if (length <= 4 && length >= 2) phrase = ' человека тусанут с тобой сегодня'

=======
import React from 'react'
import PropTypes from 'prop-types'

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1))
        if (number > 4 && number < 15) {
            return 'человек тусанет'
        }
        if (lastOne === 1) return 'человек тусанет'
        if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут'
        return 'человек тусанет'
    }
>>>>>>> standart-version
    return (
        <h2>
            <span
                className={'badge ' + (length > 0 ? 'bg-primary' : 'bg-danger')}
            >
                {length > 0
<<<<<<< HEAD
                    ? `${length} ${phrase}`
=======
                    ? `${length + ' ' + renderPhrase(length)}   с тобой сегодня`
>>>>>>> standart-version
                    : 'Никто с тобой не тусанет'}
            </span>
        </h2>
    )
}
<<<<<<< HEAD
=======
SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
}
>>>>>>> standart-version
export default SearchStatus
