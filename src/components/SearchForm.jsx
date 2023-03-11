import React from 'react'
import PropTypes from 'prop-types'

const SearchForm = ({ value, onChange }) => {
    return (
        <input
            name="searchQuery"
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search..."
            autoComplete="off"
            className="form-control"
        />
    )
}
SearchForm.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired
}
export default SearchForm
