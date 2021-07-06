import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const MinEditButton = ({onClick, editMode}) => {
    return (
        <button
            className="btn-svg"
            onClick={onClick}
        >
            {editMode ? (
                <FontAwesomeIcon icon="times-circle" size="xs"/>
            ) : (
                <FontAwesomeIcon icon="edit" size="xs"/>
            )}
        </button>
    )
}

export default MinEditButton;