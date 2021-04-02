import Head from "next/head";

import styles from '../../styles/posts.module.css';
import {getApiData} from "../../api";
import Post from "../../components/post";
import {useRouter} from "next/router";

function Posts({posts}) {
    const router = useRouter()
    const handleClickEdit = (post) => {
        router.push(`/posts/${post.id}`)
    }
    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <h2>Posts List</h2>
            {!!posts.length ? (
                    <ul className={styles.list}>
                        {posts.map(post => (
                            <li key={post.id}>
                                <Post handleClickEdit={()=>handleClickEdit(post)} post={post}/>
                            </li>
                        ))}
                    </ul>
                ) : <span>No posts</span>
            }
        </>
    )

}

export const getServerSideProps = async () => {
    const {data, status} = await getApiData('/posts');
    if (status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            posts: data
        }
    };
}

export default Posts;