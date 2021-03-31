import Link from "next/link";

import styles from '../../styles/post.module.css';

const Post = ({post}) => {
    return (
        <div className={styles.container}>
            <b>User: {post.username}</b>
            <hr/>
            <p>{post.content}</p>
            <Link href={`/posts/${post.id}`}>
                <button>Edit post</button>
            </Link>
        </div>
    )
}

export default Post