import {useQuery} from "@redux-requests/react";
import {useDispatch} from "react-redux";

import Comment from "./comment";
import {fetchProfile} from "../../redux/auth/action";
import {deleteComment, fetchPostComments, updateComment} from "../../redux/comments/action";
import CenterInScreen from "../common/CenterInScreen";
import List from "../common/list/List";

const CommentsList = ({postId}) => {
    const {data: {username: authUser}} = useQuery({type: fetchProfile});
    const {data: comments} = useQuery({type: fetchPostComments, requestKey: postId});
    const dispatch = useDispatch();
    const handleCommentRemove = (comment) => {
        dispatch(deleteComment(postId, comment.id));
    };

    const handleCommentEdit = (comment) => {
        dispatch(updateComment(postId, comment.id, comment));
    };

    if (!comments.length) {
        return (
            <CenterInScreen customClassName="my-3">
                No Comments
            </CenterInScreen>
        )
    }
    return (
        <List>
            {comments.map(comment => (
                <List.Item key={comment.id}>
                    <Comment
                        comment={comment}
                        showCommentControls={authUser === comment.author.username}
                        onEdit={handleCommentEdit}
                        onRemove={handleCommentRemove}
                    />
                </List.Item>
            ))}
        </List>
    )
}

export default CommentsList