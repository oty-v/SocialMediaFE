import {useEffect, useState} from "react";

import CommentForm from "./commentForm";
import Loader from "../common/Loader";
import EditIconOn from "../../public/icon/edit.svg";
import EditIconOff from "../../public/icon/edit_off.svg";
import User from "../users/user";

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
                loading={loading}
            />
            <button
                className="btn btn-danger m-1"
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
            className="btn btn-light ms-1 p-0 svg-icon"
            onClick={() => {
                setEditMode(!editMode)
            }}
        >
            {editMode ? (
                <EditIconOff height="1rem"/>
            ) : (
                <EditIconOn height="1rem"/>
            )}
        </button>
    ) : null
    return (
        <>
            <h5 className="card-header">
                <div className="d-inline-flex">
                    <User user={comment.author}/>
                    {editButton}
                </div>
            </h5>
            <div className="card-body">
                {commentContent}
            </div>
        </>
    )
}

export default Comment