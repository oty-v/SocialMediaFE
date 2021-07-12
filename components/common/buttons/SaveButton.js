import LoaderButton from "./LoaderButton";

const SaveButton = ({loading, floatEnd}) => {
    return loading ? (
        <LoaderButton/>
    ) : (
        <button
            className={`btn btn-primary m-1 ${floatEnd&&'float-end'}`}
            type="submit"
        >
            Save
        </button>
    )
}

export default SaveButton;