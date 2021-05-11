import styles from '../../styles/post.module.css';

const Post = ({handleClickEdit, post, showPostControls}) => {
    return (
        <div className="card">
            <h5 className="card-header">User: {post.author.username}</h5>
            <div className="card-body">
                <p className="card-text">{post.content}</p>
                {showPostControls && (
                    <button
                        className="btn btn-primary"
                        onClick={handleClickEdit}
                    >
                        Edit post
                    </button>
                )}
            </div>
        </div>
    )
}

export default Post