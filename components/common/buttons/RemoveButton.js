import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const RemoveButton = ({onClick}) => {
    return (
        <button
            className="btn btn-danger m-1"
            onClick={onClick}
        >
            <FontAwesomeIcon icon="trash-alt"/>
        </button>
    )
}

export default RemoveButton;