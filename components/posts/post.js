import PostForm from "./postForm";
import {useState} from "react";

const Post = ({onEdit, removePost, handleClickComments, post, showPostControls}) => {
    const [editMod, setEditMod] = useState(false);
    return (
        <div className="card">
            <h5 className="card-header">User: {post.author.username}</h5>
            <div className="card-body">
                {editMod ? (
                    <>
                        <PostForm
                            onSubmit={onEdit}
                            initialPost={post}
                        />
                        <button className="btn btn-danger" onClick={() => {
                            removePost(post)
                        }}>
                            Remove
                        </button>
                    </>
                ) : (
                    <p className="card-text">{post.content}</p>
                )}
                {showPostControls && (
                    <button className="btn btn-primary" onClick={() => {
                        setEditMod(!editMod)
                    }}>
                        {editMod ? "Cancel" : "Edit post"}
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