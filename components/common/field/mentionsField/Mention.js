import UserAvatar from "../../../users/userAvatar";

const Mention = ({user, width = 25, height = 25}) => {
    return (
        <div className="d-inline-flex align-items-center mention">
            <UserAvatar
                userAvatar={user.avatar}
                width={width}
                height={height}
            />
            <div className="d-inline-flex flex-column">
                {user.name && <span className="ms-1">{user.name}</span>}
                <span className="ms-1 text-muted">{`@${user.username}`}</span>
            </div>
        </div>
    )
}

export default Mention;