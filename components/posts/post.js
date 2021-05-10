import styles from '../../styles/post.module.css';

const Post = ({handleClickEdit, post, showPostControls}) => {
    return (
        <div className={styles.container}>
            <b>User: {post.author.username}</b>
            <hr/>
            <p>{post.content}</p>
            {showPostControls && (
                <button onClick={handleClickEdit}>Edit post</button>
            )}
        </div>
    )
}

export default Post