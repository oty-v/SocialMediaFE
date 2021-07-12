import Loader from "../Loader";

const LoaderButton = () => {
    return (
        <button
            className="btn btn-warning m-1"
            disabled
        >
            <Loader/>
        </button>
    )
}

export default LoaderButton;