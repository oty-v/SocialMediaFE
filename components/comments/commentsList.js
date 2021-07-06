import Comment from "./comment";
import Loader from "../common/Loader";
import {useQuery} from "@redux-requests/react";
import {fetchProfile} from "../../redux/auth/action";
import {deleteComment, fetchPostComments, updateComment} from "../../redux/comments/action";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import CenterInScreen from "../common/CenterInScreen";
import List from "../common/list/List";

const CommentsList = ({postId}) => {
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
            <List>
                {comments.map(comment => (
                    <List.Item key={comment.id}>
                        <Comment
                            postId={postId}
                            comment={comment}
                            showCommentControls={authUser === comment.author.username}
                            onEdit={handleCommentEdit}
                            onRemove={handleCommentRemove}
                        />
                    </List.Item>
                ))}
            </List>
        </>
    )
}

export default CommentsList