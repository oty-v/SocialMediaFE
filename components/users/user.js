import Link from "next/link";
import UserAvatar from "./userAvatar";

const User = ({user, width = 50, height = 50}) => {
    return (
        <div className="d-inline-flex align-items-center">
            <UserAvatar
                userAvatar={user.avatar}
                width={width}
                height={height}
            />
            <Link href={`/${user.username}`}>
                <span className="ms-1 text-muted">{`@${user.username}`}</span>
            </Link>
        </div>
    )
}

export default User;