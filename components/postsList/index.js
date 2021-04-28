import styles from "../../styles/posts.module.css";
import Post from "../post";

const PostsList = ({posts, handleClickEdit, authUser}) => {
    return (
        <ul className={styles.list}>
            {posts.map(post => (
                <li key={post.id}>
                    <Post handleClickEdit={() => handleClickEdit(post)} post={post} author={authUser===post.author.username}/>
                </li>
            ))}
        </ul>
    )
}

export default PostsList