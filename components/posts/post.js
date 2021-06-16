import {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import PostForm from "./postForm";
import Loader from "../common/Loader";
import User from "../users/user";

const Post = ({onEdit, onRemove, onClick, post, showPostControls, loading}) => {
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        setEditMode(false);
    }, [post])
    const postContent = editMode ? (
        <>
            <PostForm
                onSubmit={onEdit}
                post={post}
                loading={loading}
            />
            <button
                className="btn btn-danger m-1"
                disabled={loading}
                onClick={() => {
                    onRemove(post)
                    setEditMode(false)
                }}
            >
                {loading ? (<Loader/>) : (<FontAwesomeIcon icon="trash-alt"/>)}
            </button>
        </>
    ) : (
        <p className="card-text">{post.content}</p>
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