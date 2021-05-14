import styles from "../../styles/posts.module.css";
import Comment from "./comment";

const CommentsList = ({comments,  removeComment, onEditComment, handleClickEdit, authUser}) => {
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
                    />
                </li>
            ))}
        </ul>
    )
}

export default CommentsList