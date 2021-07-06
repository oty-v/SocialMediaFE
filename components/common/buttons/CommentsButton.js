import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CommentsButton = ({onClick}) => {
    return (
        <button
            className="btn-svg"
            onClick={onClick}
        >
            <FontAwesomeIcon icon="comment"/>
        </button>
    )
}

export default CommentsButton;