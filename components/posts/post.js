import {useEffect, useState} from "react";

import PostForm from "./postForm";
import Loader from "../common/Loader";

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
                setEditMode={setEditMode}
                loading={loading}
            />
            <button
                className="btn btn-danger float-end m-1"
                disabled={loading}
                onClick={() => {
                    onRemove(post)
                    setEditMode(false)
                }}
            >
                {loading ? (<Loader/>) : ("Remove")}
            </button>
        </>
    ) : (
        <p className="card-text">{post.content}</p>
    )
    const editButton = showPostControls ? (
        <button
            className="btn btn-primary m-1"
            onClick={() => {
                setEditMode(!editMode)
            }}
        >
            {editMode ? "Cancel" : "Edit post"}
        </button>
    ) : null
    const commentsButton = onClick ? (
        <button
            className="btn btn-light m-1"
            onClick={onClick}
        >
            Comments
        </button>
    ) : null
    return (
        <div className="card">
            <h5 className="card-header">User: {post.author.username}</h5>
            <div className="card-body">
                {postContent}
                {editButton}
                {commentsButton}
            </div>
        </div>
    )
}

export default Post