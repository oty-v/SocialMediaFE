import Loader from "../common/Loader";
import User from "./user";
import SearchForm from "../common/SearchForm";
import {useQuery} from "@redux-requests/react";
import {fetchUsers} from "../../redux/users/action";
import CenterInScreen from "../common/CenterInScreen";
import List from "../common/list/List";


const UserList = ({onSubmit, selectedPage=1}) => {
    const {data, loading} = useQuery({type: fetchUsers, requestKey: selectedPage});
    const users = data?.users;
    const userList = loading||!users ? (
        <CenterInScreen customClassName="my-5">
            <Loader/>
        </CenterInScreen>
    ) : (
        <List>
            {users.map(user => (
                <List.Item key={user.id}>
                    <User
                        user={user}
                        width={25}
                        height={25}
                    />
                </List.Item>
            ))}
        </List>
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