import {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import PostForm from "./postForm";
import Loader from "../common/Loader";
import User from "../users/user";
import {useMutation} from "@redux-requests/react";
import {deletePost, updatePost} from "../../redux/posts/action";
import ContentParser from "../common/ContentParser";

const Post = ({onEdit, onRemove, onClick, post, showPostControls}) => {
    const [editMode, setEditMode] = useState(false);
    const {loading: loadingUpdate} = useMutation({type: updatePost, requestKey: post.id});
    const {loading: loadingDelete} = useMutation({type: deletePost, requestKey: post.id});
    useEffect(() => {
        setEditMode(false);
    }, [post])
    const postContent = editMode ? (
        <>
            <PostForm
                setEditMode={editMode && setEditMode}
                onSubmit={onEdit}
                post={post}
                loading={loadingUpdate}
            />
            <button
                className="btn btn-danger m-1"
                disabled={loadingDelete}
                onClick={() => {
                    onRemove(post.id, post.cursor)
                    setEditMode(false)
                }}
            >
                {loadingDelete ? (<Loader/>) : (<FontAwesomeIcon icon="trash-alt"/>)}
            </button>
        </>
    ) : (
        <ContentParser
            contentClass={"card-text"}
            linkClass={"mx-1"}
            parsedUsers={post.mentionedUsers}
        >
            {post.content}
        </ContentParser>
    )
    const editButton = showPostControls ? (
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
    const commentsButton = onClick ? (
        <button
            className="btn-svg"
            onClick={onClick}
        >
            <FontAwesomeIcon icon="comment"/>
        </button>
    ) : null
    return (
        <>
            <h5 className="card-header bg-transparent">
                <div className="d-inline-flex">
                    <User
                        user={post.author}
                    />
                    {editButton}
                </div>
            </h5>
            <div className="card-body">
                {postContent}
            </div>
            <div className="card-footer bg-transparent text-muted">
                {commentsButton}
            </div>
        </>
    )
}

export default Post