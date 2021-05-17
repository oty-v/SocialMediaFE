import styles from "../../styles/posts.module.css";
import Post from "./post";
import {useSelector} from "react-redux";

const PostsList = ({removePost, onEdit, handleClickComments, waitDispatch}) => {
    const {auth, posts} = useSelector((state) => state);
    const authUser = auth.user.username;
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
                        waitDispatch={waitDispatch}
                    />
                </li>
            ))}
        </ul>
    )
}

export default PostsList