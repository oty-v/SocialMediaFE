import Link from "next/link";

const Post = ({post}) => {
    return (
        <li>
            <b>User: {post.username}</b>
            <hr/>
            <p>{post.content}</p>
            <Link href={`/posts/${post.id}`}>
                <button>Edit post</button>
            </Link>
        </li>
    )
}

export default Post