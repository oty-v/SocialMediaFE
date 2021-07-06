import UserAvatar from "../users/userAvatar";

const ProfileCard = ({user, profileBtn}) => {
    return (
        <>
            <div className="d-flex align-items-end justify-content-between mb-2">
                <UserAvatar
                    userAvatar={user.avatar}
                    width={125}
                    height={125}
                />
                {profileBtn}
            </div>
            <h4 className="card-title">{user.name ? user.name : `ID: ${user.id}`}</h4>
            <p className="card-text">Data registration: {user.created_at}</p>
        </>
    )
}
export default ProfileCard