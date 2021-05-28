import Image from "next/image";
import Link from "next/link";

const User = ({user}) => {
    return (
        <div className="d-inline-flex align-items-center">
            <Image
                src={user.avatar?.length ? user.avatar : '/default.png'}
                alt="User avatar"
                width={25}
                height={25}
            />
            <Link href={`/${user.username}`}>
                <span className="ms-1 text-muted">{`@${user.username}`}</span>
            </Link>
        </div>
    )
}

export default User;