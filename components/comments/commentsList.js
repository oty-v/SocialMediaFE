import Comment from "./comment";
import Loader from "../common/Loader";
import {useQuery} from "@redux-requests/react";
import {fetchProfile} from "../../redux/auth/action";
import {deleteComment, fetchPostComments, updateComment} from "../../redux/comments/action";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {CenterInScreen} from "../common/CenterInScreen";

const CommentsList = ({postId, onRemoveComment, onEditComment}) => {
    const {data: {username: authUser}} = useQuery({type: fetchProfile});
    const {data: comments, loading} = useQuery({type: fetchPostComments, requestKey: postId});
    const dispatch = useDispatch();
    const handleCommentRemove = useCallback((comment) => {
        dispatch(deleteComment(postId, comment.id));
    },[postId]);

    const handleCommentEdit = useCallback((comment) => {
        dispatch(updateComment(postId, comment.id, comment));
    }, [postId]);
    if (loading) {
        return (
            <CenterInScreen>
                <Loader/>
            </CenterInScreen>
        )
    }
    if (!comments.length) {
        return (
            <CenterInScreen>
                <span>No Comments</span>
            </CenterInScreen>
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