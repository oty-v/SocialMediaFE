import {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import CommentForm from "./commentForm";
import Loader from "../common/Loader";
import User from "../users/user";
import ContentParser from "../common/ContentParser";
import {useMutation} from "@redux-requests/react";
import {deleteComment, updateComment} from "../../redux/comments/action";

const Comment = ({onRemove, onEdit, comment, showCommentControls}) => {
    const [editMode, setEditMode] = useState(false);
    const {loading: loadingUpdate} = useMutation({type: updateComment, requestKey: comment.id});
    const {loading: loadingDelete} = useMutation({type: deleteComment, requestKey: comment.id});
    useEffect(() => {
        setEditMode(false);
    }, [comment, comment.content])
    const commentContent = editMode ? (
        <>
            <CommentForm
                onSubmit={onEdit}
                comment={comment}
                loading={loadingUpdate}
            />
            <button
                className="btn btn-danger m-1"
                disabled={loadingDelete}
                onClick={() => {
                    onRemove(comment)
                }}
            >
                {loadingDelete ? (<Loader/>) : (<FontAwesomeIcon icon="trash-alt"/>)}
            </button>
        </>
    ) : (
        <ContentParser
            contentClass={"card-text"}
            linkClass={"mx-1"}
            parsedUsers={comment.mentionedUsers}
        >
            {comment.content}
        </ContentParser>
    )
    const editButton = showCommentControls ? (
        <button
            className="btn-svg"
            onClick={() => {
                setEditMode(!editMode)
            }}
        >
            {editMode ? (
                <FontAwesomeIcon icon="times-circle" size="xs"/>
            ) : (
                <FontAwesomeIcon icon="edit" size="xs"/>
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