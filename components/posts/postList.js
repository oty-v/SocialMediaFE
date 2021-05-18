import styles from "../../styles/posts.module.css";
import Post from "./post";
import {useSelector} from "react-redux";

const PostsList = ({onRemovePost, onEditPost, handleClickComments, loading}) => {
    const auth = useSelector((state) => state.auth);
    const posts = useSelector((state) => state.posts.posts);;
    const authUser = auth.user.username;
    return (
        <ul className={`list-group ${styles.list}`}>
            {posts.map(post => (
                <li className="list-group-item list-group-item-action" key={post.id}>
                    <Post
                        onEdit={onEditPost}
                        onRemove={onRemovePost}
                        onCommentClick={() => handleClickComments(post)}
                        post={post}
                        showPostControls={authUser === post.author.username}
                        loading={loading}
                    />
                </li>
            ))}
        </ul>
    )
}

export default PostsList