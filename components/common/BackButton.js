import {useRouter} from "next/router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const BackButton = ({handleClick}) => {
    const router = useRouter();
    return (
        <button className="btn btn-light ps-0 text-primary" onClick={handleClick ?? (() => router.back())}>
            <FontAwesomeIcon icon="arrow-left" size="lg"/>
        </button>
    )
}

export default BackButton