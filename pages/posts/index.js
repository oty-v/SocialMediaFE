import Head from "next/head";

import styles from '../../styles/posts.module.css';
import {getApiData} from "../../api";
import Post from "../../components/post";

function Posts({posts}) {
    const postsList = () => {
        if (!!posts.length) {
            return (
                <ul className={styles.list}>
                    {posts.map(post => (
                        <li key={post.id}>
                            <Post post={post}/>
                        </li>
                    ))}
                </ul>
            )
        }
        return <span>No posts</span>

    }
    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <h2>Posts List</h2>
            {postsList()}
        </>
    )

}

export const getServerSideProps = async () => {
    const {data, error} = await getApiData('/posts');
    if (!!error) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            posts: data
        }
    }
}

export default Posts;