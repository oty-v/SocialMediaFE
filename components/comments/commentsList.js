import Comment from "./comment";
import Loader from "../common/Loader";
import {useQuery} from "@redux-requests/react";
import {fetchProfile} from "../../redux/auth/action";
import {fetchPostComments} from "../../redux/comments/action";

const CommentsList = ({postId, onRemoveComment, onEditComment}) => {
    const {data: {username: authUser}} = useQuery({type: fetchProfile});
    const {data: comments, loading} = useQuery({type: fetchPostComments, requestKey: postId});
    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <Loader/>
            </div>
        )
    }
    if (!comments.length) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <span>No Comments</span>
            </div>
        )
    }
    return (
        <>
            <ul className="list-group">
                {comments.map(comment => (
                    <li className="list-group-item list-group-item-action" key={comment.id}>
                        <Comment
                            postId={postId}
                            comment={comment}
                            showCommentControls={authUser === comment.author.username}
                            onEdit={onEditComment}
                            onRemove={onRemoveComment}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default CommentsList