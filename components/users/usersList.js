import Loader from "../common/Loader";
import User from "./user";
import SearchForm from "../common/SearchForm";
import CenterInScreen from "../common/CenterInScreen";
import List from "../common/list/List";


const UserList = ({onSubmit, users, loading}) => {
    const userList = loading || !users ? (
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

    const searchForm = onSubmit && <SearchForm
        onSubmit={onSubmit}
        label="Search user"
        maxSearchLength={25}
    />
    return (
        <>
            {searchForm}
            {userList}
        </>
    )
}

export default UserList