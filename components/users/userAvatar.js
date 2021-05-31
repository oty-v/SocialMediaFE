import React, {Children} from "react";

const UserAvatar = ({userAvatar, children}) => {
    const child = Children.only(children)
    const src = userAvatar?.length ? userAvatar : '/default.png'
    return React.cloneElement(child, {
        src,
        alt: "User avatar",
    })
}

export default UserAvatar;