import styles from "../../styles/posts.module.css";
import Post from "./post";

const PostsList = ({posts, removePost, onEdit, handleClickComments, authUser}) => {
    return (
        <ul className={`list-group ${styles.list}`}>
            {posts.map(post => (
                <li className="list-group-item list-group-item-action" key={post.id}>
                    <Post
                        removePost={removePost}
                        onEdit={onEdit}
                        handleClickComments={() => handleClickComments(post)}
                        post={post}
                        showPostControls={authUser === post.author.username}
                    />
                </li>
            ))}
        </ul>
    )
}

export default PostsList