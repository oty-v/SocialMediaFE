import PostForm from "./postForm";
import {useState} from "react";
import Loader from "../common/Loader";

const Post = ({onEdit, onRemove, onCommentClick, post, showPostControls, waitDispatch}) => {
    const [editMode, setEditMode] = useState(false);
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
                {onCommentClick && (
                    <button
                        className="btn btn-light"
                        onClick={onCommentClick}
                    >
                        Comments
                    </button>
                )}
            </div>
        </div>
    )
}

export default Post