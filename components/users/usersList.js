import Loader from "../common/Loader";
import {useSelector} from "react-redux";
import User from "./user";
import SearchForm from "../common/SearchForm";

const UserList = ({onSubmit}) => {
    const users = useSelector((state) => state.users.users);
    if (!users) {
        return (
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <Loader/>
            </div>
        )
    }
    return (
        <>
            <SearchForm
                onSubmit={onSubmit}
                label="Search user"
                maxSearchLength={25}
            />
            <ul className="list-group">
                {users.map(user => (
                    <li className="list-group-item list-group-item-action" key={user.id}>
                        <User
                            user={user}
                            width={25}
                            height={25}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default UserList