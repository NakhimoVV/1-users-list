const BookMark = ({ status, ...rest }) => {
    return (
        <button
            className={!status ? 'bi bi-bookmark' : 'bi bi-bookmark-star-fill'}
            onClick={rest.onClickBtn}
        ></button>
    )
}
export default BookMark
