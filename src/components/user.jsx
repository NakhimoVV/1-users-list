import Qualitie from './qualitie'
import BookMark from './bookmark'

const User = (props) => {
    const { name, qualities, profession, completedMeetings, rate, bookmark } =
        props
    return (
        <tr>
            <td>{name}</td>
            <td>
                {qualities.map((qual) => (
                    <Qualitie key={qual._id} {...qual} />
                ))}
            </td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate} /5</td>
            <td>
                <button
                    className={
                        !bookmark
                            ? 'bi bi-bookmark'
                            : 'bi bi-bookmark-star-fill'
                    }
                    onClick={() => props.onToggle(props._id)}
                ></button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => props.onDelete(props._id)}
                >
                    delete
                </button>
            </td>
        </tr>
    )
}
export default User
