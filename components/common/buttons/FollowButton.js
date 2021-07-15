import {useState} from "react";
import LoaderButton from "./LoaderButton";

const FollowButton = ({onClick, loading, following}) => {
    const [isHover, setIsHover] = useState(false);
    const followingBtn = following ? (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            className={`btn m-1 ${isHover ? 'btn-danger' : 'btn-primary'}`}
        >
            {isHover ? 'Unfollow' : 'Following'}
        </button>
    ) : (
        <button
            onClick={onClick}
            className="btn btn-outline-primary m-1"
        >
            Follow
        </button>
    )
    return loading ? (
        <LoaderButton/>
    ) : (
        followingBtn
    )
}

export default FollowButton;