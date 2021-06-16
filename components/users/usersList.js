import Loader from "../common/Loader";
import User from "./user";
import SearchForm from "../common/SearchForm";
import {useQuery} from "@redux-requests/react";

const UserList = ({onSubmit, selectedPage=1}) => {
    const {data: {users}, loading} = useQuery({type: 'FETCH_USERS', requestKey: selectedPage});
    const userList = loading ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Loader/>
        </div>
    ) : (
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
    )
    return (
        <>
            <SearchForm
                onSubmit={onSubmit}
                label="Search user"
                maxSearchLength={25}
            />
            {userList}
        </>
    )
}

export default UserList