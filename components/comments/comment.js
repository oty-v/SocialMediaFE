import {useEffect, useState} from "react";

import CommentForm from "./commentForm";

const Comment = ({onRemove, onEdit, comment, showCommentControls, loading}) => {
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        setEditMode(false);
    }, [comment])
    return (
        <div className="card">
            <h5 className="card-header">User: {comment.author.username}</h5>
            <div className="card-body">
                {editMode ? (
                    <>
                        <CommentForm
                            onSubmit={onEdit}
                            comment={comment}
                            setEditMode={setEditMode}
                            loading={loading}
                        />
                        <button className="btn btn-danger" onClick={() => {
                            onRemove(comment)
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