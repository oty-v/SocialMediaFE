import {useSelector} from "react-redux";

import Comment from "./comment";

const CommentsList = ({onRemoveComment, onEditComment, loading}) => {
    const auth = useSelector((state) => state.auth);
    const comments = useSelector((state) => state.comments.comments);
    const authUser = auth.profile.username;
    if (!!comments) {
        return <span>No Comments</span>
    }
    return (
        <ul className="list-group">
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