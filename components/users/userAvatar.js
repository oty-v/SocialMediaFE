import Image from "next/image";

const UserAvatar = ({userAvatar, width, height}) => {
    const src = userAvatar?.length ? userAvatar : '/default.png'
    return (
        <Image
            src={src}
            alt="User avatar"
            width={width}
            height={height}
        />
    )
}

export default UserAvatar;