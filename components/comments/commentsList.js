import styles from "../../styles/posts.module.css";
import Comment from "./comment";
import {useSelector} from "react-redux";

const CommentsList = ({onRemoveComment, onEditComment, loading}) => {
    const auth = useSelector((state) => state.auth);
    const comments = useSelector((state) => state.comments.comments);
    const authUser = auth.user.username;
    return (
        <ul className={`list-group ${styles.list}`}>
            {comments.map(comment => (
                <li className="list-group-item list-group-item-action" key={comment.id}>
                    <Comment
                        comment={comment}
                        showCommentControls={authUser === comment.author.username}
                        onEdit={onEditComment}
                        onRemove={onRemoveComment}
                        loading={loading}
                    />
                </li>
            ))}
        </ul>
    )
}

export default CommentsList