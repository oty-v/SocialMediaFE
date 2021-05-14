import {useState} from "react";
import CommentForm from "./commentForm";

const Comment = ({removeComment, onEditComment, comment, showCommentControls}) => {
    const [editMod, setEditMod] = useState(false);
    return (
        <div className="card">
            <h5 className="card-header">User: {comment.author.username}</h5>
            <div className="card-body">
                {editMod ? (
                    <>
                        <CommentForm
                            onSubmit={onEditComment}
                            initialComment={comment}
                        />
                        <button className="btn btn-danger" onClick={() => {
                            removeComment(comment)
                        }}>
                            Remove
                        </button>
                    </>
                ) : (
                    <p className="card-text">{comment.body}</p>
                )}
                {showCommentControls && (
                    <button className="btn btn-primary" onClick={() => {
                        setEditMod(!editMod)
                    }}>
                        {editMod ? "Cancel" : "Edit post"}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Comment