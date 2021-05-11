import styles from "../../styles/posts.module.css";
import Post from "./post";

const PostsList = ({posts, handleClickEdit, authUser}) => {
    return (
        <ul className={`list-group ${styles.list}`}>
            {posts.map(post => (
                <li className="list-group-item list-group-item-action" key={post.id}>
                    <Post
                        handleClickEdit={() => handleClickEdit(post)}
                        post={post}
                        showPostControls={authUser === post.author.username}
                    />
                </li>
            ))}
        </ul>
    )
}

export default PostsList