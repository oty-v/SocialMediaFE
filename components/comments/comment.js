import {useState} from "react";
import CommentForm from "./commentForm";
import PostForm from "../posts/postForm";

const Comment = ({removeComment, onEditComment, comment, showCommentControls, waitDispatch}) => {
    const [editMode, setEditMode] = useState(false);
    return (
        <div className="card">
            <h5 className="card-header">User: {comment.author.username}</h5>
            <div className="card-body">
                {editMode ? (
                    <>
                        <CommentForm
                            onSubmit={onEditComment}
                            initialComment={comment}
                            setEditMode={setEditMode}
                            waitDispatch={waitDispatch}
                        />
                        <button className="btn btn-danger" onClick={() => {
                            removeComment(comment)
                            setEditMode(false)
                        }}>
                            Remove
                        </button>
                    </>
                ) : (
                    <p className="card-text">{comment.body}</p>
                )}
                {showCommentControls && (
                    <button className="btn btn-primary" onClick={() => {
                        setEditMode(!editMode)
                    }}>
                        {editMode ? "Cancel" : "Edit post"}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Comment