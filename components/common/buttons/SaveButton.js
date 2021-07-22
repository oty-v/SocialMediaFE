import LoaderButton from "./LoaderButton";

const SaveButton = ({loading}) => {
    return loading ? (
        <LoaderButton/>
    ) : (
        <button
            className="btn btn-primary m-1"
            type="submit"
        >
            Save
        </button>
    )
}

export default SaveButton;