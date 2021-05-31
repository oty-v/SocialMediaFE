import {useRouter} from "next/router";

const BackButton = ({handleClick}) => {
    const router = useRouter();
    return (
        <button className="btn btn-light ps-0 text-primary" onClick={handleClick ?? (() => router.back())}>
            <i className="fas fa-arrow-left fs-3"/>
        </button>
    )
}

export default BackButton