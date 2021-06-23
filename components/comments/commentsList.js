import {useSelector} from "react-redux";

import Comment from "./comment";
import Loader from "../common/Loader";
import {useQuery} from "@redux-requests/react";
import {fetchProfile} from "../../redux/auth/action";
import {fetchPost} from "../../redux/posts/action";

const CommentsList = ({comments, onRemoveComment, onEditComment, loading}) => {
    const {data:{username:authUser}} = useQuery({ type: fetchProfile });
    if (loading) {
        return (
            <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
                <Loader/>
            </div>
        )
    }
    if (!comments.length) {
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