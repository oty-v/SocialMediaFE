import PostForm from "./postForm";
import {useState} from "react";
import Loading from "../common/Loading";

const Post = ({onEdit, removePost, handleClickComments, post, showPostControls, waitDispatch}) => {
    const [editMode, setEditMode] = useState(false);
    return (
        <div className="card">
            <h5 className="card-header">User: {post.author.username}</h5>
            <div className="card-body">
                {editMode ? (
                    <>
                        <PostForm
                            onSubmit={onEdit}
                            initialPost={post}
                            setEditMode={setEditMode}
                            waitDispatch={waitDispatch}
                        />
                        <button
                            className="btn btn-danger"
                            disabled={waitDispatch}
                            onClick={() => {
                                removePost(post)
                                setEditMode(false)
                            }}
                        >
                            {waitDispatch ? (<Loading/>) : ("Remove")}
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
                {handleClickComments && (
                    <button
                        className="btn btn-light"
                        onClick={handleClickComments}
                    >
                        Comments
                    </button>
                )}
            </div>
        </div>
    )
}

export default Post