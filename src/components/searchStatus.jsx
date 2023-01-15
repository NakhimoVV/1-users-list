const SearchStatus = ({ length }) => {
    let phrase = ' человек тусанет с тобой сегодня'
    if (length <= 4 && length >= 2) phrase = ' человека тусанут с тобой сегодня'

    return (
        <span className={'badge ' + (length > 0 ? 'bg-primary' : 'bg-danger')}>
            {length > 0 ? `${length} ${phrase}` : 'Никто с тобой не тусанет'}
        </span>
    )
}
export default SearchStatus
