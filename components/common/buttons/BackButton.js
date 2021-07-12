import {useRouter} from "next/router";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const BackButton = ({onClick}) => {
    const router = useRouter();
    return (
        <button className="btn-svg ps-0 text-primary" onClick={onClick || (() => router.back())}>
            <FontAwesomeIcon icon="arrow-left" size="lg"/>
        </button>
    )
}

export default BackButton