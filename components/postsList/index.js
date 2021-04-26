import styles from "../../styles/posts.module.css";
import Post from "../post";

const PostsList = ({posts, handleClickEdit}) => {
    return (
        <ul className={styles.list}>
            {posts.map(post => (
                <li key={post.id}>
                    <Post handleClickEdit={() => handleClickEdit(post)} post={post}/>
                </li>
            ))}
        </ul>
    )
}

export default PostsList