import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import LoaderButton from "./LoaderButton";

const RemoveButton = ({onClick, loading}) => {
    return loading ? (
        <LoaderButton/>
    ) : (
        <button
            className="btn btn-danger m-1"
            onClick={onClick}
        >
            <FontAwesomeIcon icon="trash-alt"/>
        </button>
    )
}

export default RemoveButton;