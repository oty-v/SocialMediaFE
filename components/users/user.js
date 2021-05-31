import Image from "next/image";
import Link from "next/link";
import UserAvatar from "./userAvatar";

const User = ({user}) => {
    return (
        <div className="d-inline-flex align-items-center">
            <UserAvatar userAvatar={user.avatar}>
                <Image
                    width={35}
                    height={35}
                />
            </UserAvatar>
            <Link href={`/${user.username}`}>
                <span className="ms-1 text-muted">{`@${user.username}`}</span>
            </Link>
        </div>
    )
}

export default User;