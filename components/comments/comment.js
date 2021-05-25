import {useEffect, useState} from "react";

import CommentForm from "./commentForm";
import Loader from "../common/Loader";

const Comment = ({onRemove, onEdit, comment, showCommentControls, loading}) => {
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        setEditMode(false);
    }, [comment])
    const commentContent = editMode ? (
        <>
            <CommentForm
                onSubmit={onEdit}
                comment={comment}
                setEditMode={setEditMode}
                loading={loading}
            />
            <button
                className="btn btn-danger float-end m-1"
                disabled={loading}
                onClick={() => {
                    onRemove(comment)
                    setEditMode(false)
                }}
            >
                {loading ? (<Loader/>) : ("Remove")}
            </button>
        </>
    ) : (
        <p className="card-text">{comment.body}</p>
    )
    const editButton = showCommentControls ? (
        <button
            className="btn btn-primary m-1"
            onClick={() => {
                setEditMode(!editMode)
            }}
        >
            {editMode ? "Cancel" : "Edit comment"}
        </button>
    ) : null
    return (
        <div className="card">
            <h5 className="card-header">User: {comment.author.username}</h5>
            <div className="card-body">
                {commentContent}
                {editButton}
            </div>
        </div>
    )
}

export default Comment