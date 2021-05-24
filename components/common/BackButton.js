import Image from "next/image";
import {useRouter} from "next/router";

const BackButton = ({handleClick}) => {
    const router = useRouter();
    return (
        <button className="btn btn-light ps-0" onClick={handleClick ?? (() => router.back())}>
            <Image
                src="/back.svg"
                alt="Back"
                width={20}
                height={20}
            />
        </button>
    )
}

export default BackButton