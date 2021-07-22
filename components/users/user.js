import Link from "next/link";
import {useDispatch} from "react-redux";
import UserAvatar from "./userAvatar";
import FollowButton from "../common/buttons/FollowButton";
import {followUser, unfollowUser} from "../../redux/users/action";
import {useQuery} from "@redux-requests/react";
import {fetchProfile} from "../../redux/auth/action";

const User = ({user, width = 50, height = 50, following}) => {
    const {data: authUser} = useQuery({ type: fetchProfile });
    const dispatch = useDispatch();
    const handleClickFollow = () => {
        dispatch(followUser(user.username, authUser))
    }

    const handleClickUnfollow = () => {
        dispatch(unfollowUser(user.username, authUser.username))
    }

    const followButton = (following !== undefined) && (authUser?.id !== user.id) && (
        <FollowButton onClick={following ? handleClickUnfollow : handleClickFollow} following={following} size="small"/>
    )
    return (
        <div className={`${(following !== undefined) ? "d-flex" : "d-inline-flex"} align-items-center`}>
            <UserAvatar
                userAvatar={user.avatar}
                width={width}
                height={height}
            />
            <Link href={`/${user.username}`}>
                <span className="ms-1 text-muted">{`@${user.username}`}</span>
            </Link>
            <div className="ms-auto">{followButton}</div>
        </div>
    )
}

export default User;