import {useState} from "react";
import Loader from "../Loader";

const FollowButton = ({onClick, loading, following, size}) => {
    const [isHover, setIsHover] = useState(false);
    const btnClassName = (size === "small" && "btn-sm") || (size === "large" && "btn-lg") || "btn"
    const followingBtn = following ? (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`${btnClassName} m-1 ${isHover ? 'btn-danger' : 'btn-primary'}`}
        >
            {isHover ? 'Unfollow' : 'Following'}
        </button>
    ) : (
        <button
            onClick={onClick}
            className={`${btnClassName} btn-outline-primary m-1`}
        >
            Follow
        </button>
    )
    return loading ? (
        <button
            className={`${btnClassName} btn-warning m-1`}
            disabled
        >
            <Loader/>
        </button>
    ) : (
        followingBtn
    )
}

export default FollowButton;