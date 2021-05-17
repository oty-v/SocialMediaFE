import styles from "../../styles/posts.module.css";
import Comment from "./comment";
import {useSelector} from "react-redux";

const CommentsList = ({removeComment, onEditComment, handleClickEdit, waitDispatch}) => {
    const {auth, comments} = useSelector((state) => state);
    const authUser = auth.user.username;
    return (
        <ul className={`list-group ${styles.list}`}>
            {comments.map(comment => (
                <li className="list-group-item list-group-item-action" key={comment.id}>
                    <Comment
                        handleClickEdit={() => handleClickEdit(comment)}
                        comment={comment}
                        showCommentControls={authUser === comment.author.username}
                        onEditComment={onEditComment}
                        removeComment={removeComment}
                        waitDispatch={waitDispatch}
                    />
                </li>
            ))}
        </ul>
    )
}

export default CommentsList