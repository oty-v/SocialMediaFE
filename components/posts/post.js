import {useEffect, useState} from "react";

import PostForm from "./postForm";
import Loader from "../common/Loader";
import EditIconOn from "../../public/icon/edit.svg";
import EditIconOff from "../../public/icon/edit_off.svg";
import ComentIcon from "../../public/icon/comment.svg";

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
                className="btn btn-danger m-1"
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
            className="btn btn-light ms-1 p-0 pb-2 svg-icon"
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
    const commentsButton = onClick ? (
        <button
            className="btn btn-light svg-icon"
            onClick={onClick}
        >
            <ComentIcon height="1.25rem"/>
        </button>
    ) : null
    return (
        <>
            <h5 className="card-header">
                User: {post.author.username}
                {editButton}
            </h5>
            <div className="card-body">
                {postContent}
            </div>
            <div className="card-footer text-muted">
                {commentsButton}
            </div>
        </>
    )
}

export default Post