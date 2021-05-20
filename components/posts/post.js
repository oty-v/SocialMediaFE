import {useEffect, useState} from "react";

import PostForm from "./postForm";
import Loader from "../common/Loader";

const Post = ({onEdit, onRemove, onCommentsClick, post, showPostControls, waitDispatch}) => {
    const [editMode, setEditMode] = useState(false);
    useEffect(() => {
        setEditMode(false);
    }, [post])
    return (
        <div className="card">
            <h5 className="card-header">User: {post.author.username}</h5>
            <div className="card-body">
                {editMode ? (
                    <>
                        <PostForm
                            onSubmit={onEdit}
                            post={post}
                            setEditMode={setEditMode}
                            waitDispatch={waitDispatch}
                        />
                        <button
                            className="btn btn-danger"
                            disabled={waitDispatch}
                            onClick={() => {
                                onRemove(post)
                                setEditMode(false)
                            }}
                        >
                            {waitDispatch ? (<Loader/>) : ("Remove")}
                        </button>
                    </>
                ) : (
                    <p className="card-text">{post.content}</p>
                )}
                {showPostControls && (
                    <button className="btn btn-primary" onClick={() => {
                        setEditMode(!editMode)
                    }}>
                        {editMode ? "Cancel" : "Edit post"}
                    </button>
                )}
                {onCommentsClick && (
                    <button
                        className="btn btn-light"
                        onClick={onCommentsClick}
                    >
                        Comments
                    </button>
                )}
            </div>
        </div>
    )
}

export default Post