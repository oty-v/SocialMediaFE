import {useEffect, useState} from "react";

import PostForm from "./postForm";
import User from "../users/user";
import {useMutation} from "@redux-requests/react";
import {deletePost, updatePost} from "../../redux/posts/action";
import ParsedContent from "../common/ParsedContent";
import Card from "../common/card/Card";
import RemoveButton from "../common/buttons/RemoveButton";
import MinEditButton from "../common/buttons/MinEditButton";
import CommentsButton from "../common/buttons/CommentsButton";

const Post = ({onEdit, onRemove, onClick, post, showPostControls, following}) => {
    const [editMode, setEditMode] = useState(false);
    const {loading: loadingUpdate} = useMutation({type: updatePost, requestKey: post.id});
    const {loading: loadingDelete} = useMutation({type: deletePost, requestKey: post.id});
    useEffect(() => {
        setEditMode(false);
    }, [post.content])
    const postContent = editMode ? (
        <>
            <PostForm
                onSubmit={onEdit}
                post={post}
                loading={loadingUpdate}
            />
            <RemoveButton
                loading={loadingDelete}
                onClick={() => {
                    onRemove(post.id, post.cursor)
                }}
            />
        </>
    ) : (
        <ParsedContent
            contentClass={"card-text"}
            linkClass={"mx-1"}
            parsedUsers={post.mentionedUsers}
        >
            {post.content}
        </ParsedContent>
    )
    const editButton = showPostControls ? (
        <MinEditButton
            editMode={editMode}
            onClick={() => {
                setEditMode(!editMode)
            }}
        />
    ) : null
    const commentsButton = onClick ? (
        <CommentsButton
            onClick={onClick}
        />
    ) : null
    return (
        <>
            <Card.Header>
                <h5 className="d-inline-flex">
                    <User
                        user={post.author}
                        following={following}
                    />
                    {editButton}
                </h5>
            </Card.Header>
            <Card.Body>
                {postContent}
            </Card.Body>
            <Card.Footer customClassName={"bg-transparent text-muted"}>
                {commentsButton}
            </Card.Footer>
        </>
    )
}

export default Post