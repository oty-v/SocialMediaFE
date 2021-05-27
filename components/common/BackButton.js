import {useRouter} from "next/router";
import BackArrow from "../../public/icon/back.svg";

const BackButton = ({handleClick}) => {
    const router = useRouter();
    return (
        <button className="btn btn-light ps-0" onClick={handleClick ?? (() => router.back())}>
            <BackArrow
                alt="Back"
                width={24}
                height={24}
            />
        </button>
    )
}

export default BackButton