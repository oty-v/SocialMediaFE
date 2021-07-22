import {useQuery} from "@redux-requests/react";
import {useDispatch} from "react-redux";

import Comment from "./comment";
import {fetchProfile} from "../../redux/auth/action";
import {deleteComment, fetchPostComments, likeComment, unlikeComment, updateComment} from "../../redux/comments/action";
import CenterInScreen from "../common/CenterInScreen";
import List from "../common/list/List";
import {fetchUserFollowings} from "../../redux/users/action";

const CommentsList = ({postId}) => {
    const {data: authUser} = useQuery({ type: fetchProfile });
    const {data: followings} = useQuery({type: fetchUserFollowings, requestKey: authUser?.username})
    const {data: comments} = useQuery({type: fetchPostComments, requestKey: postId});
    const dispatch = useDispatch();
    const handleCommentRemove = (comment) => {
        dispatch(deleteComment(postId, comment.id));
    };

    const handleCommentEdit = (comment) => {
        dispatch(updateComment(postId, comment.id, comment));
    };

    const handleLike = (commentId, postId, userLiked) => {
        userLiked ? (
            dispatch(unlikeComment(commentId, postId))
        ) : (
            dispatch(likeComment(commentId, postId))
        )
    }

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
                        showCommentControls={authUser?.username === comment.author.username}
                        onEdit={handleCommentEdit}
                        onRemove={handleCommentRemove}
                        onLike={() => handleLike(comment.id, postId, comment.userLiked)}
                        following={followings && followings.some(following => following.username === comment.author.username)}
                    />
                </List.Item>
            ))}
        </List>
    )
}

export default CommentsList