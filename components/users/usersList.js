import Link from "next/link";
import Loader from "../common/Loader";
import {useSelector} from "react-redux";

const UserList = () => {
    const users = useSelector((state) => state.users.users);
    if (!!users) {
        return (
            <div className="vh-100 d-flex flex-column  justify-content-center align-items-center">
                <Loader/>
            </div>
        )
    }
    return (
        <>
            <div className="mx-5">
                <div className="my-3">
                    <h4>Users</h4>
                    <ul className="list-group">
                        {users.map(user => (
                            <li className="list-group-item list-group-item-action" key={user.id}>
                                <Link href={`/${user.username}`}>
                                    <span>{user.username}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default UserList