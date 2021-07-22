import {useEffect, useState} from "react";
import {useMutation} from "@redux-requests/react";

import CommentForm from "./commentForm";
import User from "../users/user";
import ParsedContent from "../common/ParsedContent";
import {deleteComment, updateComment} from "../../redux/comments/action";
import Card from "../common/card/Card";
import RemoveButton from "../common/buttons/RemoveButton";
import MinEditButton from "../common/buttons/MinEditButton";
import LikesButton from "../common/buttons/LikesButton";

const Comment = ({onRemove, onEdit, onLike, comment, showCommentControls, following}) => {
    const [editMode, setEditMode] = useState(false);
    const {loading: loadingUpdate} = useMutation({type: updateComment, requestKey: comment.id});
    const {loading: loadingDelete} = useMutation({type: deleteComment, requestKey: comment.id});

    useEffect(() => {
        setEditMode(false);
    }, [comment.content])
    const commentContent = editMode ? (
        <>
            <CommentForm
                onSubmit={onEdit}
                comment={comment}
                loading={loadingUpdate}
            />
            <RemoveButton
                loading={loadingDelete}
                onClick={() => {
                    onRemove(comment)
                }}
            />
        </>
    ) : (
        <ParsedContent
            contentClass="card-text"
            linkClass="mx-1"
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
                    <User
                        user={comment.author}
                        following={following}
                    />
                    {editButton}
                </h5>
            </Card.Header>
            <Card.Body>
                {commentContent}
            </Card.Body>
            <Card.Footer customClassName={"bg-transparent text-muted"}>
                <LikesButton
                    onClick={onLike}
                    liked={comment.userLiked}
                    numberOfLikes={comment.numberOfLikes}
                />
            </Card.Footer>
        </>
    )
}

export default Comment