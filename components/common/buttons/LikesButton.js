import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const LikesButton = ({onClick, liked, numberOfLikes}) => {
    return (
        <button
            className={`btn-svg d-inline-flex align-items-center ${liked && 'liked'}`}
            onClick={onClick}
        >
            <FontAwesomeIcon icon="heart"/>
            <div className="mx-2">{!!numberOfLikes && numberOfLikes}</div>
        </button>
    )
}

export default LikesButton;