import {useRouter} from 'next/router'

import styles from '../../styles/post.module.css';

const Post = ({post}) => {
    const router = useRouter()
    const handleClickEdit = () => {
        router.push(`/posts/${post.id}`)
    }
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