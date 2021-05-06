import Link from "next/link";

const UserList = ({users}) => {
    return (
        <>
            <h3>Users</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <Link href={`/${user.username}`}>
                            <span>{user.username}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default UserList