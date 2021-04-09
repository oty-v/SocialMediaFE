import styles from '../../styles/post.module.css';

const Post = ({handleClickEdit, post}) => {
    return (
        <div className={styles.container}>
            <b>User: {post.username}</b>
            <hr/>
            <p>{post.content}</p>
            <button onClick={handleClickEdit}>Edit post</button>
        </div>
    )
}

export default Post