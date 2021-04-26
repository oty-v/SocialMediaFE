import Head from "next/head";

import styles from '../../../styles/posts.module.css';
import {getUserPosts} from "../../../lib/api";
import Post from "../../../components/post";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {parseCookies} from "../../../lib/parseCookies";
import PostsList from "../../../components/postsList";

function Posts({username, posts, isLoggedIn}) {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push(`/login`);
        }
    });
    const handleClickEdit = (post) => {
        router.push(`/${username}/posts/${post.id}`)
    }
    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>
            <h2>Posts List</h2>
            {!!posts.length ? (
                <PostsList posts={posts} handleClickEdit={handleClickEdit}/>
            ) : (
                <span>No posts</span>
            )}
        </>
    )

}

export const getServerSideProps = async ({req, query}) => {
    const cookies = parseCookies(req);
    const {data, status} = await getUserPosts(cookies.token, query.username);
    if (status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            username: query.username,
            posts: data.data
        }
    };
}

export default Posts;