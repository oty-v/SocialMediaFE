import {useEffect, useState} from "react";

import CommentForm from "./commentForm";
import User from "../users/user";
import ParsedContent from "../common/ParsedContent";
import {useMutation} from "@redux-requests/react";
import {deleteComment, updateComment} from "../../redux/comments/action";
import Card from "../common/card/Card";
import LoaderButton from "../common/buttons/LoaderButton";
import RemoveButton from "../common/buttons/RemoveButton";
import MinEditButton from "../common/buttons/MinEditButton";

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
            {loadingDelete ? (
                <LoaderButton/>
            ) : (
                <RemoveButton
                    onClick={() => {
                        onRemove(comment)
                    }}
                />
            )}
        </>
    ) : (
        <ParsedContent
            contentClass={"card-text"}
            linkClass={"mx-1"}
            parsedUsers={comment.mentionedUsers}
        >
            {comment.content}
        </ParsedContent>
    )
    const editButton = showCommentControls ? (
        <MinEditButton
            editMode={editMode}
            onClick={() => {
                setEditMode(!editMode)
            }}
        />
    ) : null
    return (
        <>
            <Card.Header>
                <h5 className="d-inline-flex">
                    <User user={comment.author}/>
                    {editButton}
                </h5>
            </Card.Header>
            <Card.Body>
                {commentContent}
            </Card.Body>
        </>
    )
}

export default Comment