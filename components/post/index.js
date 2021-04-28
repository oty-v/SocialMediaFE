import styles from '../../styles/post.module.css';

const Post = ({handleClickEdit, post, author}) => {
    return (
        <div className={styles.container}>
            <b>User: {post.author.username}</b>
            <hr/>
            <p>{post.content}</p>
            {author && (
                <button onClick={handleClickEdit}>Edit post</button>
            )}
        </div>
    )
}

export default Post