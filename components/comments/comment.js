import {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import CommentForm from "./commentForm";
import Loader from "../common/Loader";
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
                {loading ? (<Loader/>) : (<FontAwesomeIcon icon="trash-alt"/>)}
            </button>
        </>
    ) : (
        <p className="card-text">{comment.body}</p>
    )
    const editButton = showCommentControls ? (
        <button
            className="btn btn-light ms-1 p-0 icon focus-off"
            onClick={() => {
                setEditMode(!editMode)
            }}
        >
            {editMode ? (
                <FontAwesomeIcon icon="times-circle"/>
            ) : (
                <FontAwesomeIcon icon="edit"/>
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