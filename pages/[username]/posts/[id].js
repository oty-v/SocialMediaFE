import {useRouter} from "next/router";
import Head from "next/head";

import {deletePost, editPost, getPost} from "../../../lib/api";
import PostForm from "../../../components/postForm";
import {useEffect} from "react";
import {parseCookies} from "../../../lib/parseCookies";

const PostPage = ({token, username, post, isLoggedIn}) => {
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn) {
            router.push(`/login`);
        }
    });
    const removePost = async (post) => {
        const {status} = await deletePost(token, post.id);
        if (status === 204) {
            router.push(`/${username}/posts`);
        }
    }
    const onEdit = async (inputs) => {
        const {status} = await editPost(token, inputs);
        if (status === 200) {
            router.push(`/${username}/posts`);
        }
    }
    return (
        <>
            <Head>
                <title>Post: {post.id}</title>
            </Head>
            <PostForm
                onSubmit={onEdit}
                initialPost={post}
            />
            <button onClick={() => {
                removePost(post)
            }}>
                Remove
            </button>
        </>
    )
}

export const getServerSideProps = async ({req, query}) => {
    const cookies = parseCookies(req);
    const {data, status} = await getPost(cookies.token, query.id);
    if (status === 404) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            token: cookies.token,
            username: query.username,
            post: data.data
        }
    };
}

export default PostPage